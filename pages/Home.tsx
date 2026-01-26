import React from 'react';
import { Link } from '../context/ThemeContext';
import { ArrowRight, Settings, Users, ShieldCheck, Newspaper, QrCode } from 'lucide-react';
import { useContent } from '../context/ContentContext';

export const Home: React.FC = () => {
  const { config, news } = useContent();

  return (
    <div className="animate-fade-in bg-white dark:bg-slate-950">
      {/* Hero Section - Stark White with Black Text */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-[0.03] pointer-events-none">
           <img src="https://i.imgur.com/7hCs05k.png" className="w-full h-full object-contain object-right scale-150 grayscale" alt="" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid lg:grid-cols-2 items-center gap-12 py-20 relative z-10">
          
          <div className="space-y-12">
            <div className="inline-flex items-center gap-4 border-l-4 border-black dark:border-white pl-4">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">
                Soluções para Pré-Impressão
              </span>
            </div>
            
            <div className="space-y-6">
               <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-black dark:text-white leading-[0.9]">
                 {config.heroTitle}
               </h1>
               <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 font-medium leading-relaxed max-w-lg border-l border-slate-200 dark:border-slate-800 pl-6">
                 {config.heroSubtitle}
               </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-5 pt-10 w-full sm:w-auto">
              <Link 
                to="/equipamentos" 
                className="bg-black dark:bg-white text-white dark:text-black px-8 py-6 text-sm sm:text-xs font-black uppercase tracking-[0.25em] hover:scale-105 active:scale-[0.98] transition-all shadow-xl flex items-center justify-center gap-3 w-full sm:w-auto text-center rounded-lg sm:rounded-none"
              >
                Equipamentos
              </Link>
              <Link 
                to="/contato" 
                className="border-2 border-black dark:border-white text-black dark:text-white px-8 py-6 text-sm sm:text-xs font-black uppercase tracking-[0.25em] hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black active:scale-[0.98] transition-all flex items-center justify-center w-full sm:w-auto text-center rounded-lg sm:rounded-none"
              >
                Contato
              </Link>
            </div>
          </div>

          <div className="hidden lg:flex justify-end relative">
             <div className="relative z-10 p-2 border border-black/10 dark:border-white/10 bg-white dark:bg-slate-900 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] max-w-md w-full animate-float">
                <div className="aspect-square bg-slate-50 dark:bg-black overflow-hidden relative group">
                  <div className="absolute top-4 right-4 z-20 mix-blend-difference text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <QrCode size={48} />
                  </div>
                  <img src={config.heroImage} alt="Destaque Hero" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                </div>
                <div className="p-6 bg-white dark:bg-slate-900 border-t border-black/5">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2">Tecnologia</p>
                  <h3 className="text-xl font-black uppercase tracking-tighter">Performance Industrial</h3>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Dynamic News Section */}
      {news.length > 0 && (
        <section className="bg-slate-50 dark:bg-black py-24 border-y border-black/5 dark:border-white/5">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-4 mb-16">
               <div className="h-px bg-black dark:bg-white w-12"></div>
               <h2 className="text-2xl font-black uppercase tracking-widest text-black dark:text-white">Últimas Atualizações</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-12">
              {news.map((item) => (
                <article key={item.id} className="group cursor-pointer">
                  <div className="aspect-[3/2] bg-white dark:bg-slate-900 mb-6 overflow-hidden border border-black/5 dark:border-white/5">
                    {item.image ? (
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-200">
                        <Newspaper size={32} />
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-3">{item.date}</span>
                  <h3 className="text-xl font-bold mb-3 group-hover:underline decoration-1 underline-offset-4 leading-tight">{item.title}</h3>
                  <p className="text-sm text-slate-500 line-clamp-3 leading-relaxed">{item.excerpt}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features - Clean Grid */}
      <section className="py-32 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-16 border-t border-black/10 dark:border-white/10 pt-16">
            {[
              { icon: Settings, title: "Suporte 24/7", text: "Manutenção técnica especializada para equipamentos críticos." },
              { icon: ShieldCheck, title: "Peças Originais", text: "Certificados de fábrica e garantia de procedência." },
              { icon: Users, title: "Consultoria", text: "Treinamento operacional para maximizar sua produção." }
            ].map((f, i) => (
              <div key={i} className="space-y-6 group">
                <f.icon size={40} strokeWidth={1} className="text-black dark:text-white" />
                <h3 className="text-xl font-black uppercase tracking-widest">{f.title}</h3>
                <p className="text-sm text-slate-500 font-medium leading-loose border-l-2 border-slate-100 dark:border-slate-800 pl-4">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action - Minimalist */}
      <section className="py-32 bg-black text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <div className="inline-block border border-white/20 px-4 py-2 mb-8 rounded-full">
            <span className="text-[10px] uppercase tracking-[0.3em]">RBTech do Brasil</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-12 leading-tight">
            Excelência técnica para<br/>o mercado gráfico
          </h2>
          <Link to="/contato" className="inline-block bg-white text-black px-16 py-6 text-xs font-black uppercase tracking-[0.3em] hover:bg-slate-200 transition-colors">
            Solicitar Orçamento
          </Link>
        </div>
      </section>
    </div>
  );
};