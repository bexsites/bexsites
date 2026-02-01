import { useState, useEffect } from 'react';
import {
  getAnalyticsData,
  updateSubmissionStatus,
  sendWhatsAppReport,
  sendEmailReport,
  type AnalyticsData,
  type FormSubmission,
} from '../services/analytics';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AdminDashboard({ isOpen, onClose }: AdminDashboardProps) {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'leads' | 'satisfaction' | 'reports'>('overview');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [selectedLead, setSelectedLead] = useState<FormSubmission | null>(null);

  // Senha do admin (em produção, isso seria no backend)
  const ADMIN_PASSWORD = 'bex2024';

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      loadData();
      const interval = setInterval(loadData, 30000); // Atualiza a cada 30s
      return () => clearInterval(interval);
    }
  }, [isOpen, isAuthenticated]);

  const loadData = () => {
    const analyticsData = getAnalyticsData();
    setData(analyticsData);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setPassword('');
    } else {
      alert('Senha incorreta!');
    }
  };

  const handleStatusUpdate = (id: string, status: FormSubmission['status']) => {
    updateSubmissionStatus(id, status);
    loadData();
  };

  const generateClaudePrompt = (lead: FormSubmission): string => {
    return `Crie um site profissional e moderno para a barbearia "${lead.barbershopName}", propriedade de ${lead.ownerName}.

OBJETIVO DO SITE:
${lead.objective}

REFERÊNCIAS DE ESTILO:
${lead.styleReferences || 'Estilo moderno e minimalista, dark mode com detalhes em dourado'}

ELEMENTOS OBRIGATÓRIOS:
${lead.mustHave || 'Galeria de cortes, integração WhatsApp, sistema de agendamento'}

CONTATO DO CLIENTE:
- WhatsApp: ${lead.whatsapp}
- Email: ${lead.email}

INSTRUÇÕES TÉCNICAS:
- Use React com Tailwind CSS
- Design responsivo (mobile-first)
- Paleta de cores escura (dark mode) com detalhes em dourado
- Animações suaves e profissionais
- Otimizado para conversão
- Botão flutuante de WhatsApp
- Seções: Hero, Sobre, Serviços, Galeria, Depoimentos, Localização, Contato
- SEO otimizado para barbearias`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Prompt copiado para a área de transferência!');
  };

  if (!isOpen) return null;

  // Tela de login
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
        <div className="bg-graphite border border-graphite-light rounded-2xl p-8 max-w-md w-full">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white">Painel Admin</h2>
            <p className="text-gray-400 mt-2">Área restrita - Bex Sites</p>
          </div>

          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite a senha"
              className="w-full bg-dark border border-graphite-light rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-gold focus:outline-none mb-4"
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-gold to-gold-dark text-dark font-bold py-3 rounded-xl"
            >
              Entrar
            </button>
          </form>

          <button
            onClick={onClose}
            className="w-full mt-4 text-gray-400 hover:text-white transition-colors"
          >
            Cancelar
          </button>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const avgRating = data.satisfactionRatings.length > 0
    ? (data.satisfactionRatings.reduce((sum, r) => sum + r.rating, 0) / data.satisfactionRatings.length).toFixed(1)
    : '0';

  return (
    <div className="fixed inset-0 z-[100] bg-dark overflow-auto">
      {/* Header */}
      <header className="sticky top-0 bg-graphite border-b border-graphite-light p-4 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-gold to-gold-dark rounded-lg flex items-center justify-center">
              <span className="text-dark font-bold">B</span>
            </div>
            <div>
              <h1 className="text-white font-bold">Painel Bex Sites</h1>
              <p className="text-gray-400 text-sm">Central de Notificações</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Notificação de novos leads */}
            {data.formSubmissions.filter(s => s.status === 'pending').length > 0 && (
              <div className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                {data.formSubmissions.filter(s => s.status === 'pending').length} novos
              </div>
            )}

            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-graphite/50 border-b border-graphite-light">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto">
            {(['overview', 'leads', 'satisfaction', 'reports'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab
                    ? 'text-gold border-b-2 border-gold'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab === 'overview' && '📊 Visão Geral'}
                {tab === 'leads' && `📝 Leads (${data.formSubmissions.length})`}
                {tab === 'satisfaction' && `⭐ Satisfação (${data.satisfactionRatings.length})`}
                {tab === 'reports' && '📤 Relatórios'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto p-4">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-graphite/50 border border-graphite-light rounded-xl p-4">
                <div className="text-gray-400 text-sm mb-1">Total Visitantes</div>
                <div className="text-2xl font-bold text-white">{data.totalVisitors}</div>
                <div className="text-green-400 text-sm mt-1">+{data.todayVisitors} hoje</div>
              </div>
              <div className="bg-graphite/50 border border-graphite-light rounded-xl p-4">
                <div className="text-gray-400 text-sm mb-1">Formulários</div>
                <div className="text-2xl font-bold text-gold">{data.formSubmissions.length}</div>
                <div className="text-gray-500 text-sm mt-1">{data.formSubmissions.filter(s => s.status === 'pending').length} pendentes</div>
              </div>
              <div className="bg-graphite/50 border border-graphite-light rounded-xl p-4">
                <div className="text-gray-400 text-sm mb-1">Taxa Conversão</div>
                <div className="text-2xl font-bold text-white">{data.conversionRate.toFixed(1)}%</div>
                <div className="text-gray-500 text-sm mt-1">leads/visitantes</div>
              </div>
              <div className="bg-graphite/50 border border-graphite-light rounded-xl p-4">
                <div className="text-gray-400 text-sm mb-1">Satisfação Média</div>
                <div className="text-2xl font-bold text-gold">{avgRating}/5</div>
                <div className="text-gray-500 text-sm mt-1">{data.satisfactionRatings.length} avaliações</div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-graphite/50 border border-graphite-light rounded-xl p-6">
              <h3 className="text-white font-bold mb-4">Atividade Recente</h3>
              <div className="space-y-3">
                {data.formSubmissions.slice(-5).reverse().map((submission) => (
                  <div
                    key={submission.id}
                    className="flex items-center justify-between bg-dark/50 rounded-lg p-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        submission.status === 'pending' ? 'bg-yellow-500' :
                        submission.status === 'contacted' ? 'bg-blue-500' : 'bg-green-500'
                      }`}></div>
                      <div>
                        <div className="text-white font-medium">{submission.barbershopName}</div>
                        <div className="text-gray-400 text-sm">{submission.ownerName}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-gray-400 text-sm">
                        {new Date(submission.timestamp).toLocaleDateString('pt-BR')}
                      </div>
                      <div className="text-gray-500 text-xs">
                        {new Date(submission.timestamp).toLocaleTimeString('pt-BR')}
                      </div>
                    </div>
                  </div>
                ))}
                {data.formSubmissions.length === 0 && (
                  <p className="text-gray-500 text-center py-4">Nenhum lead ainda</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Leads Tab */}
        {activeTab === 'leads' && (
          <div className="space-y-4">
            {data.formSubmissions.slice().reverse().map((lead) => (
              <div
                key={lead.id}
                className="bg-graphite/50 border border-graphite-light rounded-xl p-4"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-white font-bold text-lg">{lead.barbershopName}</h3>
                    <p className="text-gray-400">{lead.ownerName}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <select
                      value={lead.status}
                      onChange={(e) => handleStatusUpdate(lead.id, e.target.value as FormSubmission['status'])}
                      className={`text-sm rounded-full px-3 py-1 border-0 ${
                        lead.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                        lead.status === 'contacted' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-green-500/20 text-green-400'
                      }`}
                    >
                      <option value="pending">Pendente</option>
                      <option value="contacted">Contatado</option>
                      <option value="converted">Convertido</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <span className="text-gray-500 text-sm">WhatsApp:</span>
                    <a
                      href={`https://wa.me/${lead.whatsapp.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gold hover:underline block"
                    >
                      {lead.whatsapp}
                    </a>
                  </div>
                  <div>
                    <span className="text-gray-500 text-sm">Email:</span>
                    <a
                      href={`mailto:${lead.email}`}
                      className="text-gold hover:underline block"
                    >
                      {lead.email}
                    </a>
                  </div>
                  <div>
                    <span className="text-gray-500 text-sm">Objetivo:</span>
                    <p className="text-white">{lead.objective}</p>
                  </div>
                  <div>
                    <span className="text-gray-500 text-sm">Data:</span>
                    <p className="text-white">{new Date(lead.timestamp).toLocaleString('pt-BR')}</p>
                  </div>
                </div>

                {lead.styleReferences && (
                  <div className="mb-3">
                    <span className="text-gray-500 text-sm">Referências de Estilo:</span>
                    <p className="text-gray-300">{lead.styleReferences}</p>
                  </div>
                )}

                {lead.mustHave && (
                  <div className="mb-4">
                    <span className="text-gray-500 text-sm">O que não pode faltar:</span>
                    <p className="text-gray-300">{lead.mustHave}</p>
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedLead(lead)}
                    className="bg-gold/20 text-gold px-4 py-2 rounded-lg text-sm font-medium hover:bg-gold/30 transition-colors"
                  >
                    📋 Gerar Prompt Claude
                  </button>
                  <a
                    href={`https://wa.me/${lead.whatsapp.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-500/20 text-green-400 px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-500/30 transition-colors"
                  >
                    💬 WhatsApp
                  </a>
                  <a
                    href={`https://instagram.com/bex_sites`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-pink-500/20 text-pink-400 px-4 py-2 rounded-lg text-sm font-medium hover:bg-pink-500/30 transition-colors"
                  >
                    📸 Instagram
                  </a>
                </div>
              </div>
            ))}

            {data.formSubmissions.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📭</div>
                <p className="text-gray-400">Nenhum lead recebido ainda</p>
              </div>
            )}
          </div>
        )}

        {/* Satisfaction Tab */}
        {activeTab === 'satisfaction' && (
          <div className="space-y-4">
            {data.satisfactionRatings.slice().reverse().map((rating) => (
              <div
                key={rating.id}
                className="bg-graphite/50 border border-graphite-light rounded-xl p-4"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-white font-bold">{rating.clientName}</h3>
                    <p className="text-gray-400 text-sm">{rating.barbershopName}</p>
                  </div>
                  <div className="text-gold text-lg">
                    {'⭐'.repeat(rating.rating)}
                  </div>
                </div>
                <p className="text-gray-300 mb-3">{rating.comment}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className={rating.wouldRecommend ? 'text-green-400' : 'text-red-400'}>
                    {rating.wouldRecommend ? '✅ Recomendaria' : '❌ Não recomendaria'}
                  </span>
                  <span className="text-gray-500">
                    {new Date(rating.timestamp).toLocaleString('pt-BR')}
                  </span>
                </div>
              </div>
            ))}

            {data.satisfactionRatings.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">⭐</div>
                <p className="text-gray-400">Nenhuma avaliação recebida ainda</p>
              </div>
            )}
          </div>
        )}

        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <div className="space-y-6">
            <div className="bg-graphite/50 border border-graphite-light rounded-xl p-6">
              <h3 className="text-white font-bold mb-4">Enviar Relatório</h3>
              <p className="text-gray-400 mb-6">
                Envie um relatório completo do site para você mesmo.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={sendWhatsAppReport}
                  className="flex items-center gap-2 bg-green-500/20 text-green-400 px-6 py-3 rounded-xl font-medium hover:bg-green-500/30 transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Enviar via WhatsApp
                </button>
                <button
                  onClick={sendEmailReport}
                  className="flex items-center gap-2 bg-blue-500/20 text-blue-400 px-6 py-3 rounded-xl font-medium hover:bg-blue-500/30 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Enviar via Email
                </button>
              </div>
            </div>

            <div className="bg-graphite/50 border border-graphite-light rounded-xl p-6">
              <h3 className="text-white font-bold mb-4">Informações de Contato Admin</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">WhatsApp</div>
                    <div className="text-white">+55 (93) 98415-5558</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">Email</div>
                    <div className="text-white">allyssonoliveira454@gmail.com</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal do Prompt Claude */}
      {selectedLead && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80">
          <div className="bg-graphite border border-graphite-light rounded-2xl max-w-3xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-bold text-lg">Prompt para Claude - {selectedLead.barbershopName}</h3>
                <button
                  onClick={() => setSelectedLead(null)}
                  className="text-gray-400 hover:text-white"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="bg-dark rounded-xl p-4 mb-4 max-h-96 overflow-y-auto">
                <pre className="text-gray-300 text-sm whitespace-pre-wrap font-mono">
                  {generateClaudePrompt(selectedLead)}
                </pre>
              </div>

              <button
                onClick={() => {
                  copyToClipboard(generateClaudePrompt(selectedLead));
                  setSelectedLead(null);
                }}
                className="w-full bg-gradient-to-r from-gold to-gold-dark text-dark font-bold py-3 rounded-xl"
              >
                📋 Copiar Prompt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
