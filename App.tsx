import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { Plans } from './components/Plans';
import { BriefingForm } from './components/BriefingForm';
import { Footer } from './components/Footer';
import { AdminDashboard } from './components/AdminDashboard';
import { SatisfactionModal } from './components/SatisfactionModal';
import { trackVisit, getAnalyticsData } from './services/analytics';

export function App() {
  const [showAdmin, setShowAdmin] = useState(false);
  const [showSatisfaction, setShowSatisfaction] = useState(false);
  const [showNotificationBadge, setShowNotificationBadge] = useState(false);

  // Rastreia visita ao carregar a página
  useEffect(() => {
    trackVisit('home');
    
    // Verifica se há leads pendentes (para exibir badge)
    const data = getAnalyticsData();
    const pendingLeads = data.formSubmissions.filter(s => s.status === 'pending').length;
    setShowNotificationBadge(pendingLeads > 0);
  }, []);

  // Atalho secreto para abrir admin: Ctrl + Shift + A
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        e.preventDefault();
        setShowAdmin(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-dark text-white">
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <Plans />
        <BriefingForm />
      </main>
      <Footer />
      
      {/* Botão Admin Secreto (canto inferior esquerdo) */}
      <button
        onClick={() => setShowAdmin(true)}
        className="fixed bottom-6 left-6 z-40 w-12 h-12 bg-graphite/50 hover:bg-graphite border border-graphite-light hover:border-gold/30 rounded-full flex items-center justify-center transition-all duration-300 group opacity-30 hover:opacity-100"
        title="Painel Admin (Ctrl+Shift+A)"
      >
        <svg className="w-5 h-5 text-gray-500 group-hover:text-gold transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        
        {/* Badge de notificação */}
        {showNotificationBadge && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
            <span className="w-2 h-2 bg-red-300 rounded-full animate-ping absolute"></span>
          </span>
        )}
      </button>

      {/* Botão Satisfação */}
      <button
        onClick={() => setShowSatisfaction(true)}
        className="fixed bottom-6 left-20 z-40 bg-graphite/80 hover:bg-graphite border border-graphite-light hover:border-gold/30 rounded-full px-4 py-2 flex items-center gap-2 transition-all duration-300 group"
        title="Deixe sua avaliação"
      >
        <span className="text-lg">⭐</span>
        <span className="text-gray-400 group-hover:text-white text-sm font-medium hidden sm:inline">
          Avaliar
        </span>
      </button>
      
      {/* Instagram Floating Button */}
      <a
        href="https://instagram.com/bex_sites"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 group"
        aria-label="Siga no Instagram"
      >
        <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
        
        {/* Tooltip */}
        <span className="absolute right-full mr-3 bg-dark text-white text-sm px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
          @bex_sites
        </span>
      </a>

      {/* Admin Dashboard Modal */}
      <AdminDashboard 
        isOpen={showAdmin} 
        onClose={() => {
          setShowAdmin(false);
          // Atualiza badge ao fechar
          const data = getAnalyticsData();
          const pendingLeads = data.formSubmissions.filter(s => s.status === 'pending').length;
          setShowNotificationBadge(pendingLeads > 0);
        }} 
      />

      {/* Satisfaction Modal */}
      <SatisfactionModal 
        isOpen={showSatisfaction} 
        onClose={() => setShowSatisfaction(false)} 
      />
    </div>
  );
}
