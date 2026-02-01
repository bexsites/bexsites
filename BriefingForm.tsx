import { useState } from 'react';
import { trackFormSubmission } from '../services/analytics';

interface FormData {
  ownerName: string;
  barbershopName: string;
  whatsapp: string;
  email: string;
  objective: string;
  styleReferences: string;
  mustHave: string;
}

export function BriefingForm() {
  const [formData, setFormData] = useState<FormData>({
    ownerName: '',
    barbershopName: '',
    whatsapp: '',
    email: '',
    objective: '',
    styleReferences: '',
    mustHave: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generateClaudePrompt = (data: FormData): string => {
    return `Crie um site profissional e moderno para a barbearia "${data.barbershopName}", propriedade de ${data.ownerName}.

OBJETIVO DO SITE:
${data.objective}

REFERÊNCIAS DE ESTILO:
${data.styleReferences || 'Estilo moderno e minimalista, dark mode com detalhes em dourado'}

ELEMENTOS OBRIGATÓRIOS:
${data.mustHave || 'Galeria de cortes, integração WhatsApp, sistema de agendamento'}

CONTATO DO CLIENTE:
- WhatsApp: ${data.whatsapp}
- Email: ${data.email}

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Generate the Claude prompt
    const claudePrompt = generateClaudePrompt(formData);

    // Create email body
    const emailBody = `
NOVO BRIEFING - BEX SITES
==========================

DADOS DO CLIENTE:
-----------------
Nome do Dono: ${formData.ownerName}
Nome da Barbearia: ${formData.barbershopName}
WhatsApp: ${formData.whatsapp}
Email: ${formData.email}

DETALHES DO PROJETO:
--------------------
Objetivo do Site:
${formData.objective}

Referências de Estilo:
${formData.styleReferences || 'Não especificado'}

O que não pode faltar:
${formData.mustHave || 'Não especificado'}

==========================
PROMPT PARA CLAUDE:
==========================

${claudePrompt}
    `.trim();

    // Create mailto link (for demonstration - in production you'd use a backend)
    const mailtoLink = `mailto:allyssonoliveira454@gmail.com?subject=Novo Briefing - ${encodeURIComponent(formData.barbershopName)}&body=${encodeURIComponent(emailBody)}`;
    
    // Open email client
    window.location.href = mailtoLink;

    // Registra no sistema de analytics
    trackFormSubmission({
      ownerName: formData.ownerName,
      barbershopName: formData.barbershopName,
      whatsapp: formData.whatsapp,
      email: formData.email,
      objective: formData.objective,
      styleReferences: formData.styleReferences,
      mustHave: formData.mustHave,
    });

    // Simulate submission delay for UX
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Reset form after success
      setTimeout(() => {
        setFormData({
          ownerName: '',
          barbershopName: '',
          whatsapp: '',
          email: '',
          objective: '',
          styleReferences: '',
          mustHave: '',
        });
      }, 1000);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <section id="briefing" className="py-20 md:py-32 bg-dark-lighter relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent"></div>
        
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-graphite/50 border border-gold/30 rounded-2xl p-8 md:p-12">
            <div className="w-20 h-20 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Obrigado!</h3>
            <p className="text-gray-400 text-lg mb-6">
              Recebemos seu briefing. Em breve você receberá no seu WhatsApp um projeto exclusivo e o valor estimado para sua nova presença digital.
            </p>
            <button
              onClick={() => setIsSuccess(false)}
              className="text-gold hover:text-gold-light transition-colors"
            >
              Enviar outro briefing
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="briefing" className="py-20 md:py-32 bg-dark-lighter relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent"></div>
      <div className="absolute top-1/4 -right-32 w-96 h-96 bg-gold/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 -left-32 w-96 h-96 bg-gold/5 rounded-full blur-3xl"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-gold text-sm font-semibold uppercase tracking-wider">Começar Agora</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
            Formulário de Briefing
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Preencha as informações abaixo e nossa equipe entrará em contato com uma proposta exclusiva.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-graphite/30 border border-graphite-light rounded-2xl p-6 md:p-10">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Owner Name */}
            <div>
              <label htmlFor="ownerName" className="block text-white font-medium mb-2">
                Nome do Dono *
              </label>
              <input
                type="text"
                id="ownerName"
                name="ownerName"
                value={formData.ownerName}
                onChange={handleChange}
                required
                placeholder="Seu nome completo"
                className="w-full bg-dark border border-graphite-light rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-colors"
              />
            </div>

            {/* Barbershop Name */}
            <div>
              <label htmlFor="barbershopName" className="block text-white font-medium mb-2">
                Nome da Barbearia *
              </label>
              <input
                type="text"
                id="barbershopName"
                name="barbershopName"
                value={formData.barbershopName}
                onChange={handleChange}
                required
                placeholder="Ex: Barber King"
                className="w-full bg-dark border border-graphite-light rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-colors"
              />
            </div>

            {/* WhatsApp */}
            <div>
              <label htmlFor="whatsapp" className="block text-white font-medium mb-2">
                WhatsApp *
              </label>
              <input
                type="tel"
                id="whatsapp"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
                required
                placeholder="(11) 99999-9999"
                className="w-full bg-dark border border-graphite-light rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-colors"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-white font-medium mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="seu@email.com"
                className="w-full bg-dark border border-graphite-light rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-colors"
              />
            </div>

            {/* Objective */}
            <div className="md:col-span-2">
              <label htmlFor="objective" className="block text-white font-medium mb-2">
                Objetivo do Site *
              </label>
              <select
                id="objective"
                name="objective"
                value={formData.objective}
                onChange={handleChange}
                required
                className="w-full bg-dark border border-graphite-light rounded-xl px-4 py-3 text-white focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-colors"
              >
                <option value="">Selecione o objetivo principal</option>
                <option value="Aumentar agendamentos online">Aumentar agendamentos online</option>
                <option value="Fortalecer presença digital">Fortalecer presença digital</option>
                <option value="Divulgar serviços e preços">Divulgar serviços e preços</option>
                <option value="Fidelizar clientes">Fidelizar clientes</option>
                <option value="Abrir nova unidade">Divulgar nova unidade</option>
                <option value="Todos os anteriores">Todos os anteriores</option>
              </select>
            </div>

            {/* Style References */}
            <div className="md:col-span-2">
              <label htmlFor="styleReferences" className="block text-white font-medium mb-2">
                Referências de Estilo
              </label>
              <textarea
                id="styleReferences"
                name="styleReferences"
                value={formData.styleReferences}
                onChange={handleChange}
                rows={3}
                placeholder="Descreva o estilo visual que você gostaria. Ex: moderno, minimalista, cores escuras, inspiração em barbershops americanas..."
                className="w-full bg-dark border border-graphite-light rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-colors resize-none"
              />
            </div>

            {/* Must Have */}
            <div className="md:col-span-2">
              <label htmlFor="mustHave" className="block text-white font-medium mb-2">
                O que não pode faltar
              </label>
              <textarea
                id="mustHave"
                name="mustHave"
                value={formData.mustHave}
                onChange={handleChange}
                rows={3}
                placeholder="Liste funcionalidades essenciais. Ex: galeria de cortes, sistema de agendamento, mapa de localização, preços dos serviços..."
                className="w-full bg-dark border border-graphite-light rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-colors resize-none"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-8 bg-gradient-to-r from-gold to-gold-dark text-dark font-bold py-4 rounded-xl hover:shadow-lg hover:shadow-gold/30 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Enviando...
              </>
            ) : (
              <>
                Enviar Briefing
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </>
            )}
          </button>

          <p className="text-center text-gray-500 text-sm mt-4">
            Ao enviar, você concorda em receber contato via WhatsApp e email.
          </p>
        </form>
      </div>
    </section>
  );
}
