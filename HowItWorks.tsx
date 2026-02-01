export function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Diagnóstico',
      description: 'Preencha nosso formulário de briefing com as informações da sua barbearia. Entendemos seu negócio, seu público e seus objetivos.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      number: '02',
      title: 'Criação com IA',
      description: 'Nossa inteligência artificial gera um projeto exclusivo para sua barbearia em minutos. Design moderno, otimizado para conversão.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      number: '03',
      title: 'Lançamento',
      description: 'Após sua aprovação, colocamos seu site no ar. Você recebe acesso completo, domínio configurado e suporte contínuo.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
        </svg>
      ),
    },
  ];

  return (
    <section id="como-funciona" className="py-20 md:py-32 bg-dark-lighter relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <span className="text-gold text-sm font-semibold uppercase tracking-wider">Processo Simples</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
            Como Funciona
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Do primeiro contato ao site no ar em tempo recorde. Nosso processo é transparente e eficiente.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-12 relative">
          {/* Connection Line */}
          <div className="hidden md:block absolute top-24 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-gold/20 via-gold/50 to-gold/20"></div>

          {steps.map((step, index) => (
            <div
              key={step.number}
              className="relative group"
            >
              {/* Card */}
              <div className="bg-graphite/50 border border-graphite-light rounded-2xl p-8 hover:border-gold/30 transition-all duration-500 hover:-translate-y-2 h-full">
                {/* Step Number */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-5xl font-bold text-gold/20">{step.number}</span>
                  <div className="w-16 h-16 bg-gold/10 rounded-xl flex items-center justify-center text-gold group-hover:bg-gold/20 transition-colors">
                    {step.icon}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-4">{step.title}</h3>
                <p className="text-gray-400 leading-relaxed">{step.description}</p>
              </div>

              {/* Connector Dot */}
              <div className="hidden md:block absolute -bottom-4 left-1/2 -translate-x-1/2">
                {index < steps.length - 1 && (
                  <svg className="w-6 h-6 text-gold/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
