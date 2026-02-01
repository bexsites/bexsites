import { useState } from 'react';
import { trackSatisfaction } from '../services/analytics';

interface SatisfactionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SatisfactionModal({ isOpen, onClose }: SatisfactionModalProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [clientName, setClientName] = useState('');
  const [barbershopName, setBarbershopName] = useState('');
  const [comment, setComment] = useState('');
  const [wouldRecommend, setWouldRecommend] = useState<boolean | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0 || wouldRecommend === null || !clientName || !barbershopName) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    setIsSubmitting(true);

    // Registra a avaliação
    trackSatisfaction({
      clientName,
      barbershopName,
      rating,
      comment,
      wouldRecommend,
    });

    // Simula delay de envio
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset após 3 segundos
    setTimeout(() => {
      setRating(0);
      setClientName('');
      setBarbershopName('');
      setComment('');
      setWouldRecommend(null);
      setIsSubmitted(false);
      onClose();
    }, 3000);
  };

  if (!isOpen) return null;

  if (isSubmitted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
        <div className="bg-graphite border border-gold/30 rounded-2xl p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Obrigado pela Avaliação!</h3>
          <p className="text-gray-400">
            Sua opinião é muito importante para nós. Agradecemos por escolher a Bex Sites!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-graphite border border-graphite-light rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-graphite-light">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">Avalie sua Experiência</h2>
              <p className="text-gray-400 text-sm mt-1">Sua opinião nos ajuda a melhorar</p>
            </div>
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Rating Stars */}
          <div>
            <label className="block text-white font-medium mb-3">
              Como você avalia nosso serviço? *
            </label>
            <div className="flex gap-2 justify-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="text-4xl transition-transform hover:scale-110"
                >
                  <span className={
                    star <= (hoverRating || rating)
                      ? 'text-gold'
                      : 'text-gray-600'
                  }>
                    ★
                  </span>
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="text-center text-gold text-sm mt-2">
                {rating === 1 && 'Precisa melhorar'}
                {rating === 2 && 'Regular'}
                {rating === 3 && 'Bom'}
                {rating === 4 && 'Muito bom'}
                {rating === 5 && 'Excelente!'}
              </p>
            )}
          </div>

          {/* Client Name */}
          <div>
            <label htmlFor="clientName" className="block text-white font-medium mb-2">
              Seu Nome *
            </label>
            <input
              type="text"
              id="clientName"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              required
              placeholder="Digite seu nome"
              className="w-full bg-dark border border-graphite-light rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-gold focus:outline-none"
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
              value={barbershopName}
              onChange={(e) => setBarbershopName(e.target.value)}
              required
              placeholder="Nome da sua barbearia"
              className="w-full bg-dark border border-graphite-light rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-gold focus:outline-none"
            />
          </div>

          {/* Comment */}
          <div>
            <label htmlFor="comment" className="block text-white font-medium mb-2">
              Deixe um Comentário
            </label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
              placeholder="Conte-nos sobre sua experiência..."
              className="w-full bg-dark border border-graphite-light rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-gold focus:outline-none resize-none"
            />
          </div>

          {/* Would Recommend */}
          <div>
            <label className="block text-white font-medium mb-3">
              Você recomendaria a Bex Sites? *
            </label>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setWouldRecommend(true)}
                className={`flex-1 py-3 rounded-xl font-medium transition-all ${
                  wouldRecommend === true
                    ? 'bg-green-500 text-white'
                    : 'bg-dark border border-graphite-light text-gray-400 hover:border-green-500/50'
                }`}
              >
                👍 Sim
              </button>
              <button
                type="button"
                onClick={() => setWouldRecommend(false)}
                className={`flex-1 py-3 rounded-xl font-medium transition-all ${
                  wouldRecommend === false
                    ? 'bg-red-500 text-white'
                    : 'bg-dark border border-graphite-light text-gray-400 hover:border-red-500/50'
                }`}
              >
                👎 Não
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-gold to-gold-dark text-dark font-bold py-4 rounded-xl hover:shadow-lg hover:shadow-gold/30 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
              'Enviar Avaliação'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
