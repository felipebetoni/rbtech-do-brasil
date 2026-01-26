import React, { createContext, useContext, useState, useEffect } from 'react';

// Tipos de dados
export interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  image?: string;
}

export interface ServiceItem {
  id: number;
  title: string;
  description: string;
  icon: string; // Nome do ícone como string
}

export interface SiteConfig {
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  contactPhone: string;
  contactEmail: string;
}

interface ContentContextType {
  config: SiteConfig;
  updateConfig: (newConfig: Partial<SiteConfig>) => void;
  news: NewsItem[];
  addNews: (item: Omit<NewsItem, 'id' | 'date'>) => void;
  removeNews: (id: number) => void;
  services: ServiceItem[];
  addService: (item: Omit<ServiceItem, 'id'>) => void;
  removeService: (id: number) => void;
  updateService: (id: number, item: Partial<ServiceItem>) => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

// Dados iniciais (Padrão)
const initialConfig: SiteConfig = {
  heroTitle: "Líder em Soluções Gráficas",
  heroSubtitle: "Tecnologia industrial de ponta para otimizar sua linha de produção de pré-impressão.",
  heroImage: "https://i.imgur.com/IqANRoE.png",
  contactPhone: "+55 41 99226-1285",
  contactEmail: "contato@rbtechbrasil.com"
};

const initialServices: ServiceItem[] = [
  { id: 1, title: "Preventiva", description: "Planos de manutenção programada.", icon: "Shield" },
  { id: 2, title: "Reparos", description: "Diagnóstico técnico preciso e substituição.", icon: "PenTool" },
  { id: 3, title: "Treinamento", description: "Capacitação técnica operacional.", icon: "GraduationCap" },
];

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Carregar do LocalStorage ou usar padrão
  const [config, setConfig] = useState<SiteConfig>(() => {
    const saved = localStorage.getItem('rbtech_config');
    return saved ? JSON.parse(saved) : initialConfig;
  });

  const [news, setNews] = useState<NewsItem[]>(() => {
    const saved = localStorage.getItem('rbtech_news');
    return saved ? JSON.parse(saved) : [];
  });

  const [services, setServices] = useState<ServiceItem[]>(() => {
    const saved = localStorage.getItem('rbtech_services');
    return saved ? JSON.parse(saved) : initialServices;
  });

  // Salvar no LocalStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem('rbtech_config', JSON.stringify(config));
  }, [config]);

  useEffect(() => {
    localStorage.setItem('rbtech_news', JSON.stringify(news));
  }, [news]);

  useEffect(() => {
    localStorage.setItem('rbtech_services', JSON.stringify(services));
  }, [services]);

  // Actions
  const updateConfig = (newConfig: Partial<SiteConfig>) => {
    setConfig(prev => ({ ...prev, ...newConfig }));
  };

  const addNews = (item: Omit<NewsItem, 'id' | 'date'>) => {
    const newItem: NewsItem = {
      ...item,
      id: Date.now(),
      date: new Date().toLocaleDateString('pt-BR')
    };
    setNews(prev => [newItem, ...prev]);
  };

  const removeNews = (id: number) => {
    setNews(prev => prev.filter(n => n.id !== id));
  };

  const addService = (item: Omit<ServiceItem, 'id'>) => {
    const newItem: ServiceItem = { ...item, id: Date.now() };
    setServices(prev => [...prev, newItem]);
  };

  const removeService = (id: number) => {
    setServices(prev => prev.filter(s => s.id !== id));
  };

  const updateService = (id: number, item: Partial<ServiceItem>) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, ...item } : s));
  };

  return (
    <ContentContext.Provider value={{ 
      config, updateConfig, 
      news, addNews, removeNews, 
      services, addService, removeService, updateService 
    }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) throw new Error('useContent must be used within a ContentProvider');
  return context;
};