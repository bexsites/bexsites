import { useState } from 'react';

interface PlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: {
    title: string;
    subtitle: string;
    price: string;
    features: string[];
    mockupType: 'start' | 'pro' | 'elite';
  };
}

function PlanModal({ isOpen, onClose, plan }: PlanModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      {/* Modal */}
      <div className="relative bg-graphite border border-graphite-light rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white z-10"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content */}
        <div className="p-6 md:p-8">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-white">{plan.title}</h3>
            <p className="text-gold mt-2">{plan.subtitle}</p>
          </div>

          {/* Mockup Preview */}
          <div className="bg-dark rounded-xl p-4 mb-6">
            <div className="aspect-video rounded-lg overflow-hidden border border-graphite-light">
              {plan.mockupType === 'start' && (
                <div className="w-full h-full bg-gradient-to-br from-graphite to-dark-lighter p-6">
                  {/* Landing Page Mockup */}
                  <div className="h-full flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gold/20 rounded-lg"></div>
                        <div className="w-24 h-3 bg-gold/20 rounded"></div>
                      </div>
                      <div className="flex gap-2">
                        <div className="w-16 h-3 bg-gray-700 rounded"></div>
                        <div className="w-16 h-3 bg-gray-700 rounded"></div>
                      </div>
                    </div>
                    <div className="flex-1 flex items-center">
                      <div className="w-1/2 pr-4">
                        <div className="w-3/4 h-4 bg-white/20 rounded mb-2"></div>
                        <div className="w-full h-3 bg-white/10 rounded mb-4"></div>
                        <div className="w-24 h-8 bg-gold rounded-lg"></div>
                      </div>
                      <div className="w-1/2 bg-gray-800/50 rounded-xl h-32"></div>
                    </div>
                    <div className="flex justify-center gap-2 mt-4">
                      <div className="w-2 h-2 bg-gold rounded-full"></div>
                      <div className="w-2 h-2 bg-gray-700 rounded-full"></div>
                      <div className="w-2 h-2 bg-gray-700 rounded-full"></div>
                    </div>
                  </div>
                </div>
              )}
              
              {plan.mockupType === 'pro' && (
                <div className="w-full h-full bg-gradient-to-br from-graphite to-dark-lighter p-6">
                  {/* Full Site with Booking Mockup */}
                  <div className="h-full flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gold/20 rounded-lg"></div>
                        <div className="w-24 h-3 bg-gold/20 rounded"></div>
                      </div>
                      <div className="flex gap-2">
                        <div className="w-12 h-3 bg-gray-700 rounded"></div>
                        <div className="w-12 h-3 bg-gray-700 rounded"></div>
                        <div className="w-12 h-3 bg-gray-700 rounded"></div>
                        <div className="w-16 h-6 bg-gold rounded"></div>
                      </div>
                    </div>
                    <div className="flex-1 grid grid-cols-2 gap-4">
                      <div className="bg-gray-800/30 rounded-lg p-3">
                        <div className="w-full h-2 bg-white/20 rounded mb-2"></div>
                        <div className="grid grid-cols-7 gap-1 mb-2">
                          {[...Array(7)].map((_, i) => (
                            <div key={i} className="w-full aspect-square bg-gray-700/50 rounded text-[6px] flex items-center justify-center text-gray-500"></div>
                          ))}
                        </div>
                        <div className="space-y-1">
                          <div className="w-full h-4 bg-gold/20 rounded"></div>
                          <div className="w-full h-4 bg-gray-700/50 rounded"></div>
                          <div className="w-full h-4 bg-gray-700/50 rounded"></div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="bg-gray-800/30 rounded-lg p-2 flex items-center gap-2">
                          <div className="w-8 h-8 bg-gold/20 rounded-full"></div>
                          <div>
                            <div className="w-16 h-2 bg-white/20 rounded"></div>
                            <div className="w-12 h-2 bg-gray-700 rounded mt-1"></div>
                          </div>
                        </div>
                        <div className="bg-gray-800/30 rounded-lg p-2 flex items-center gap-2">
                          <div className="w-8 h-8 bg-gold/20 rounded-full"></div>
                          <div>
                            <div className="w-16 h-2 bg-white/20 rounded"></div>
                            <div className="w-12 h-2 bg-gray-700 rounded mt-1"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {plan.mockupType === 'elite' && (
                <div className="w-full h-full bg-gradient-to-br from-graphite to-dark-lighter p-6">
                  {/* Elite with AI & CRM Mockup */}
                  <div className="h-full flex flex-col">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gold rounded-lg flex items-center justify-center">
                          <span className="text-xs text-dark font-bold">AI</span>
                        </div>
                        <div className="w-24 h-3 bg-gold/20 rounded"></div>
                      </div>
                      <div className="flex gap-1">
                        <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        </div>
                        <div className="w-6 h-6 bg-gold/20 rounded-full"></div>
                      </div>
                    </div>
                    <div className="flex-1 grid grid-cols-3 gap-2">
                      {/* Dashboard */}
                      <div className="col-span-2 bg-gray-800/30 rounded-lg p-2">
                        <div className="flex gap-2 mb-2">
                          <div className="flex-1 bg-gold/10 rounded p-2 text-center">
                            <div className="text-gold text-xs font-bold">32</div>
                            <div className="text-[6px] text-gray-500">Agendamentos</div>
                          </div>
                          <div className="flex-1 bg-green-500/10 rounded p-2 text-center">
                            <div className="text-green-500 text-xs font-bold">R$2.4k</div>
                            <div className="text-[6px] text-gray-500">Faturamento</div>
                          </div>
                        </div>
                        <div className="h-12 bg-gray-800/50 rounded flex items-end p-1 gap-1">
                          {[40, 60, 45, 80, 65, 90, 75].map((h, i) => (
                            <div key={i} className="flex-1 bg-gold/60 rounded-t" style={{ height: `${h}%` }}></div>
                          ))}
                        </div>
                      </div>
                      {/* Chat/CRM */}
                      <div className="bg-gray-800/30 rounded-lg p-2">
                        <div className="w-full h-2 bg-white/10 rounded mb-2"></div>
                        <div className="space-y-1">
                          <div className="flex gap-1 items-start">
                            <div className="w-4 h-4 bg-gold/20 rounded-full flex-shrink-0"></div>
                            <div className="flex-1 bg-gray-700/50 rounded p-1">
                              <div className="w-full h-1 bg-white/20 rounded"></div>
                            </div>
                          </div>
                          <div className="flex gap-1 items-start justify-end">
                            <div className="flex-1 bg-gold/20 rounded p-1">
                              <div className="w-full h-1 bg-gold/40 rounded"></div>
                            </div>
                          </div>
                          <div className="flex gap-1 items-start">
                            <div className="w-4 h-4 bg-gold/20 rounded-full flex-shrink-0"></div>
                            <div className="flex-1 bg-gray-700/50 rounded p-1">
                              <div className="w-3/4 h-1 bg-white/20 rounded"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center justify-center gap-2">
                      <div className="px-2 py-1 bg-gold/20 rounded text-[8px] text-gold">WhatsApp Bot</div>
                      <div className="px-2 py-1 bg-gold/20 rounded text-[8px] text-gold">CRM Integrado</div>
                      <div className="px-2 py-1 bg-gold/20 rounded text-[8px] text-gold">Remarketing</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Features List */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold">O que está incluso:</h4>
            <ul className="grid sm:grid-cols-2 gap-2">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2 text-gray-300">
                  <svg className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <button
            onClick={() => {
              onClose();
              document.getElementById('briefing')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full mt-6 bg-gradient-to-r from-gold to-gold-dark text-dark font-bold py-4 rounded-xl hover:shadow-lg hover:shadow-gold/30 transition-all"
          >
            Solicitar Este Plano
          </button>
        </div>
      </div>
    </div>
  );
}

export function Plans() {
  const [selectedPlan, setSelectedPlan] = useState<{
    title: string;
    subtitle: string;
    price: string;
    features: string[];
    mockupType: 'start' | 'pro' | 'elite';
  } | null>(null);

  const [budget, setBudget] = useState(1500);

  const plans = [
    {
      title: 'Bex Barber Start',
      subtitle: 'Landing Page de Alta Conversão',
      price: 'R$ 497',
      badge: 'Popular',
      mockupType: 'start' as const,
      features: [
        'Landing Page Responsiva',
        'Design Premium Personalizado',
        'Otimização para Mobile',
        'Integração WhatsApp',
        'Botão de Agendamento',
        'Galeria de Cortes',
        'Hospedagem por 1 ano',
        'Domínio .com.br grátis',
      ],
    },
    {
      title: 'Bex Barber Pro',
      subtitle: 'Site Completo + Agendamento',
      price: 'R$ 997',
      badge: 'Recomendado',
      highlighted: true,
      mockupType: 'pro' as const,
      features: [
        'Tudo do Plano Start',
        'Sistema de Agendamento Online',
        'Painel Administrativo',
        'Gestão de Barbeiros',
        'Notificações Automáticas',
        'Página de Serviços',
        'Depoimentos de Clientes',
        'SEO Otimizado',
        'Suporte Premium 30 dias',
      ],
    },
    {
      title: 'Bex Barber Elite',
      subtitle: 'Site + IA + CRM Completo',
      price: 'R$ 2.497',
      badge: 'Elite',
      mockupType: 'elite' as const,
      features: [
        'Tudo do Plano Pro',
        'Chatbot com IA no WhatsApp',
        'CRM para Gestão de Clientes',
        'Automação de Remarketing',
        'Relatórios Avançados',
        'Integração com Redes Sociais',
        'Campanhas de Fidelização',
        'Análise de Performance',
        'Suporte VIP por 90 dias',
        'Treinamento Exclusivo',
      ],
    },
  ];

  return (
    <section id="planos" className="py-20 md:py-32 bg-dark relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-gold text-sm font-semibold uppercase tracking-wider">Nossos Planos</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
            Escolha o Plano Ideal
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Soluções sob medida para cada fase do seu negócio. Clique para ver a visualização completa.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-20">
          {plans.map((plan) => (
            <div
              key={plan.title}
              onClick={() => setSelectedPlan(plan)}
              className={`relative bg-graphite/50 border rounded-2xl p-6 lg:p-8 cursor-pointer transition-all duration-300 hover:-translate-y-2 group ${
                plan.highlighted
                  ? 'border-gold shadow-xl shadow-gold/10'
                  : 'border-graphite-light hover:border-gold/30'
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className={`absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-semibold ${
                  plan.highlighted
                    ? 'bg-gold text-dark'
                    : 'bg-graphite-light text-white'
                }`}>
                  {plan.badge}
                </div>
              )}

              {/* Header */}
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-white mb-2">{plan.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{plan.subtitle}</p>
                <div className="text-3xl font-bold text-gold">{plan.price}</div>
              </div>

              {/* Preview Button */}
              <div className="flex items-center justify-center gap-2 text-gold group-hover:text-gold-light transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span className="text-sm font-medium">Ver Visualização Completa</span>
              </div>

              {/* Quick Features */}
              <ul className="mt-6 space-y-2">
                {plan.features.slice(0, 4).map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-400 text-sm">
                    <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
                {plan.features.length > 4 && (
                  <li className="text-gold text-sm font-medium">
                    + {plan.features.length - 4} benefícios
                  </li>
                )}
              </ul>
            </div>
          ))}
        </div>

        {/* Custom Budget Section */}
        <div className="bg-graphite/30 border border-graphite-light rounded-2xl p-8 max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">Plano Personalizado</h3>
            <p className="text-gray-400">Selecione seu orçamento disponível e criaremos uma proposta sob medida</p>
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-400">Orçamento:</span>
              <span className="text-2xl font-bold text-gold">
                {budget >= 3000 ? `R$ ${budget.toLocaleString('pt-BR')}+` : `R$ ${budget.toLocaleString('pt-BR')}`}
              </span>
            </div>
            <input
              type="range"
              min="300"
              max="3000"
              step="100"
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>R$ 300</span>
              <span>R$ 3.000+</span>
            </div>
          </div>

          <button
            onClick={() => document.getElementById('briefing')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full bg-gradient-to-r from-gold to-gold-dark text-dark font-bold py-4 rounded-xl hover:shadow-lg hover:shadow-gold/30 transition-all"
          >
            Solicitar Proposta Personalizada
          </button>
        </div>
      </div>

      {/* Modal */}
      <PlanModal
        isOpen={!!selectedPlan}
        onClose={() => setSelectedPlan(null)}
        plan={selectedPlan || { title: '', subtitle: '', price: '', features: [], mockupType: 'start' }}
      />
    </section>
  );
}
