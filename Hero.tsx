export function Hero() {
  const scrollToBriefing = () => {
    const element = document.getElementById('briefing');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-dark pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-gold/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-gold/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-gold/5 to-transparent rounded-full"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" 
          style={{
            backgroundImage: `linear-gradient(rgba(212, 175, 55, 0.5) 1px, transparent 1px), 
                              linear-gradient(90deg, rgba(212, 175, 55, 0.5) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-graphite/50 border border-graphite-light rounded-full px-4 py-2 mb-8 animate-fade-in-up">
          <span className="w-2 h-2 bg-gold rounded-full animate-pulse"></span>
          <span className="text-gray-400 text-sm">Especialistas em Sites para Barbearias</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          Transformamos sua Barbearia em uma{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-light">
            Máquina de Agendamentos
          </span>{' '}
          com IA
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          A <strong className="text-white">Bex Sites</strong> é uma agência de tecnologia especializada em criar sites de alta conversão, sistemas de agendamento e automações inteligentes para barbearias. Tecnologia de ponta para o seu negócio crescer.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <button
            onClick={scrollToBriefing}
            className="group relative bg-gradient-to-r from-gold to-gold-dark text-dark font-bold px-8 py-4 rounded-xl text-lg hover:shadow-2xl hover:shadow-gold/30 transition-all duration-300 hover:-translate-y-1"
          >
            <span className="relative z-10 flex items-center gap-2">
              Solicitar Meu Projeto
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </button>
          
          <a
            href="#planos"
            className="text-gray-300 hover:text-white font-medium px-8 py-4 rounded-xl border border-graphite-light hover:border-gold/50 transition-all duration-300 flex items-center gap-2"
          >
            Ver Planos
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 sm:gap-8 mt-16 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gold mb-1">100+</div>
            <div className="text-xs sm:text-sm text-gray-500">Sites Entregues</div>
          </div>
          <div className="text-center border-x border-graphite-light">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gold mb-1">48h</div>
            <div className="text-xs sm:text-sm text-gray-500">Prazo Médio</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gold mb-1">98%</div>
            <div className="text-xs sm:text-sm text-gray-500">Satisfação</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
