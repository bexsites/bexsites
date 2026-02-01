// Analytics Service - Rastreia acessos e interações do site
// Em produção, isso seria conectado a um backend real

export interface VisitorData {
  id: string;
  timestamp: string;
  page: string;
  userAgent: string;
  referrer: string;
  screenSize: string;
  city?: string;
  country?: string;
}

export interface FormSubmission {
  id: string;
  timestamp: string;
  ownerName: string;
  barbershopName: string;
  whatsapp: string;
  email: string;
  objective: string;
  styleReferences: string;
  mustHave: string;
  status: 'pending' | 'contacted' | 'converted';
}

export interface SatisfactionRating {
  id: string;
  timestamp: string;
  clientName: string;
  barbershopName: string;
  rating: number; // 1-5
  comment: string;
  wouldRecommend: boolean;
}

export interface AnalyticsData {
  visitors: VisitorData[];
  formSubmissions: FormSubmission[];
  satisfactionRatings: SatisfactionRating[];
  pageViews: { [key: string]: number };
  totalVisitors: number;
  todayVisitors: number;
  conversionRate: number;
}

const STORAGE_KEY = 'bex_sites_analytics';
const ADMIN_PHONE = '+55 (93) 98415-5558';
const ADMIN_EMAIL = 'allyssonoliveira454@gmail.com';

// Gera ID único
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Carrega dados do localStorage
const loadData = (): AnalyticsData => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Error loading analytics data:', e);
  }
  return {
    visitors: [],
    formSubmissions: [],
    satisfactionRatings: [],
    pageViews: {},
    totalVisitors: 0,
    todayVisitors: 0,
    conversionRate: 0,
  };
};

// Salva dados no localStorage
const saveData = (data: AnalyticsData): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Error saving analytics data:', e);
  }
};

// Registra visita
export const trackVisit = (page: string = 'home'): void => {
  const data = loadData();
  const today = new Date().toISOString().split('T')[0];
  
  const visitor: VisitorData = {
    id: generateId(),
    timestamp: new Date().toISOString(),
    page,
    userAgent: navigator.userAgent,
    referrer: document.referrer || 'direct',
    screenSize: `${window.innerWidth}x${window.innerHeight}`,
  };
  
  data.visitors.push(visitor);
  data.totalVisitors = data.visitors.length;
  data.todayVisitors = data.visitors.filter(v => 
    v.timestamp.split('T')[0] === today
  ).length;
  
  // Atualiza page views
  data.pageViews[page] = (data.pageViews[page] || 0) + 1;
  
  // Calcula taxa de conversão
  if (data.totalVisitors > 0) {
    data.conversionRate = (data.formSubmissions.length / data.totalVisitors) * 100;
  }
  
  saveData(data);
};

// Registra submissão de formulário
export const trackFormSubmission = (formData: Omit<FormSubmission, 'id' | 'timestamp' | 'status'>): FormSubmission => {
  const data = loadData();
  
  const submission: FormSubmission = {
    ...formData,
    id: generateId(),
    timestamp: new Date().toISOString(),
    status: 'pending',
  };
  
  data.formSubmissions.push(submission);
  
  // Atualiza taxa de conversão
  if (data.totalVisitors > 0) {
    data.conversionRate = (data.formSubmissions.length / data.totalVisitors) * 100;
  }
  
  saveData(data);
  
  return submission;
};

// Registra avaliação de satisfação
export const trackSatisfaction = (rating: Omit<SatisfactionRating, 'id' | 'timestamp'>): SatisfactionRating => {
  const data = loadData();
  
  const satisfaction: SatisfactionRating = {
    ...rating,
    id: generateId(),
    timestamp: new Date().toISOString(),
  };
  
  data.satisfactionRatings.push(satisfaction);
  saveData(data);
  
  return satisfaction;
};

// Obtém dados de analytics
export const getAnalyticsData = (): AnalyticsData => {
  return loadData();
};

// Atualiza status de uma submissão
export const updateSubmissionStatus = (id: string, status: FormSubmission['status']): void => {
  const data = loadData();
  const submission = data.formSubmissions.find(s => s.id === id);
  if (submission) {
    submission.status = status;
    saveData(data);
  }
};

// Gera relatório para WhatsApp
export const generateWhatsAppReport = (): string => {
  const data = loadData();
  const today = new Date().toISOString().split('T')[0];
  
  const todaySubmissions = data.formSubmissions.filter(s => 
    s.timestamp.split('T')[0] === today
  );
  
  const avgRating = data.satisfactionRatings.length > 0
    ? (data.satisfactionRatings.reduce((sum, r) => sum + r.rating, 0) / data.satisfactionRatings.length).toFixed(1)
    : 'N/A';
  
  const report = `📊 *RELATÓRIO BEX SITES*
📅 ${new Date().toLocaleDateString('pt-BR')}

👥 *ACESSOS*
• Total: ${data.totalVisitors}
• Hoje: ${data.todayVisitors}
• Taxa Conversão: ${data.conversionRate.toFixed(1)}%

📝 *FORMULÁRIOS*
• Total: ${data.formSubmissions.length}
• Hoje: ${todaySubmissions.length}
• Pendentes: ${data.formSubmissions.filter(s => s.status === 'pending').length}

⭐ *SATISFAÇÃO*
• Avaliações: ${data.satisfactionRatings.length}
• Média: ${avgRating}/5
• Recomendariam: ${data.satisfactionRatings.filter(r => r.wouldRecommend).length}

${todaySubmissions.length > 0 ? `
🆕 *NOVOS LEADS HOJE*
${todaySubmissions.map(s => `• ${s.barbershopName} - ${s.whatsapp}`).join('\n')}
` : ''}
---
Bex Sites | Agência de IA`;
  
  return report;
};

// Envia relatório via WhatsApp
export const sendWhatsAppReport = (): void => {
  const report = generateWhatsAppReport();
  const phone = ADMIN_PHONE.replace(/\D/g, '');
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(report)}`;
  window.open(url, '_blank');
};

// Gera relatório para email
export const generateEmailReport = (): { subject: string; body: string } => {
  const data = loadData();
  const today = new Date().toLocaleDateString('pt-BR');
  
  const subject = `[Bex Sites] Relatório Diário - ${today}`;
  
  const body = `
RELATÓRIO BEX SITES
Data: ${today}

==================
RESUMO DE ACESSOS
==================
Total de Visitantes: ${data.totalVisitors}
Visitantes Hoje: ${data.todayVisitors}
Taxa de Conversão: ${data.conversionRate.toFixed(1)}%

==================
FORMULÁRIOS
==================
Total de Submissões: ${data.formSubmissions.length}
Pendentes: ${data.formSubmissions.filter(s => s.status === 'pending').length}
Contatados: ${data.formSubmissions.filter(s => s.status === 'contacted').length}
Convertidos: ${data.formSubmissions.filter(s => s.status === 'converted').length}

==================
SATISFAÇÃO DOS CLIENTES
==================
Total de Avaliações: ${data.satisfactionRatings.length}
Média: ${data.satisfactionRatings.length > 0 
  ? (data.satisfactionRatings.reduce((sum, r) => sum + r.rating, 0) / data.satisfactionRatings.length).toFixed(1)
  : 'N/A'}/5

==================
ÚLTIMAS SUBMISSÕES
==================
${data.formSubmissions.slice(-5).map(s => `
${s.barbershopName} (${s.ownerName})
WhatsApp: ${s.whatsapp}
Email: ${s.email}
Objetivo: ${s.objective}
Status: ${s.status}
Data: ${new Date(s.timestamp).toLocaleString('pt-BR')}
---`).join('\n')}

==================
ÚLTIMAS AVALIAÇÕES
==================
${data.satisfactionRatings.slice(-5).map(r => `
${r.clientName} - ${r.barbershopName}
Nota: ${'⭐'.repeat(r.rating)}
Comentário: ${r.comment}
Recomendaria: ${r.wouldRecommend ? 'Sim' : 'Não'}
---`).join('\n')}
  `.trim();
  
  return { subject, body };
};

// Envia relatório por email
export const sendEmailReport = (): void => {
  const { subject, body } = generateEmailReport();
  const mailtoLink = `mailto:${ADMIN_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailtoLink;
};

// Limpa dados antigos (mais de 30 dias)
export const cleanOldData = (): void => {
  const data = loadData();
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  data.visitors = data.visitors.filter(v => 
    new Date(v.timestamp) > thirtyDaysAgo
  );
  
  saveData(data);
};

export { ADMIN_PHONE, ADMIN_EMAIL };
