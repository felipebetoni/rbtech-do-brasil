import React from 'react';
import { Check, Zap, Gauge, Layers, Sliders, Droplet, ArrowRight } from 'lucide-react';
import { Link } from '../context/ThemeContext';

export const Equipment: React.FC = () => {
  return (
    <div className="animate-fade-in bg-[#f1f1f1] dark:bg-slate-950 transition-colors">
      
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden border-b border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6 block">Tecnologia Industrial</span>
            <h1 className="text-5xl md:text-7xl font-black text-black dark:text-white mb-8 tracking-tighter uppercase leading-[0.9]">
              Linha de <br/>
              <span className="font-card-serif lowercase tracking-normal">equipamentos</span>
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed font-medium">
              Representantes exclusivos DOIE e WISDOM. Soluções robustas projetadas para alta performance e precisão nanométrica.
            </p>
          </div>
        </div>
        <div className="absolute right-0 top-0 w-1/3 h-full opacity-5 pointer-events-none">
           <img src="https://i.imgur.com/7hCs05k.png" className="w-full h-full object-contain object-right grayscale invert" alt="" />
        </div>
      </section>

      {/* DOIE Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <div className="inline-block px-4 py-2 border border-black dark:border-white text-[10px] font-black uppercase tracking-[0.2em] mb-8">
              Exclusividade RBTech
            </div>
            <h2 className="text-4xl font-black uppercase tracking-tighter mb-6">
              Sistemas CTcP <br/><span className="font-card-serif lowercase">doie uv & thermal</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-10 leading-relaxed font-medium">
              A união perfeita entre velocidade e precisão. Os sistemas DOIE garantem gravação de chapas com tecnologia de ponta, otimizando seu fluxo de trabalho com economia operacional real.
            </p>
            
            <div className="space-y-6 mb-10 border-l-2 border-black/10 dark:border-white/10 pl-6">
              {[
                "Resolução máxima de 2400 DPI",
                "Produtividade de até 43 chapas/hora",
                "Compatibilidade multi-formato",
                "Balanço automático de cilindro",
                "Diodos de longa vida útil"
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <Check size={18} className="mt-1 flex-shrink-0" />
                  <span className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">{item}</span>
                </div>
              ))}
            </div>

            <Link to="/contato" className="group inline-flex items-center gap-4 text-xs font-black uppercase tracking-[0.2em] border-b-2 border-black dark:border-white pb-2 hover:opacity-70 transition-opacity">
              Solicitar Especificações <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform"/>
            </Link>
          </div>
          
          <div className="order-1 md:order-2 flex justify-center">
             <div className="relative w-full max-w-lg aspect-[4/3] bg-white dark:bg-slate-900 p-8 border border-black/5 shadow-2xl group">
               <div className="absolute inset-0 border border-black/5 m-2 pointer-events-none"></div>
               <img 
                 src="https://i.imgur.com/IqANRoE.png" 
                 alt="CTP DOIE Machine" 
                 className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-700"
               />
               <div className="absolute bottom-6 right-6 text-right">
                  <span className="block text-4xl font-black tracking-tighter">43</span>
                  <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Chapas / Hora</span>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-4"><div className="h-[1px] bg-black/5 dark:bg-white/5 w-full"></div></div>

      {/* Wisdom Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          <div className="flex justify-center">
             <div className="relative w-full max-w-lg aspect-[4/3] bg-white dark:bg-slate-900 p-8 border border-black/5 shadow-2xl group">
               <div className="absolute inset-0 border border-black/5 m-2 pointer-events-none"></div>
               <img 
                 src="https://i.imgur.com/YZN3OoP.png" 
                 alt="Wisdom Processor" 
                 className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-700"
               />
               <div className="absolute bottom-6 left-6">
                  <span className="block text-4xl font-black tracking-tighter">XZ</span>
                  <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Série Industrial</span>
               </div>
             </div>
          </div>

          <div>
            <div className="inline-block px-4 py-2 bg-black text-white dark:bg-white dark:text-black text-[10px] font-black uppercase tracking-[0.2em] mb-8">
              Processamento Automático
            </div>
            <h2 className="text-4xl font-black uppercase tracking-tighter mb-6">
              Processadoras <br/><span className="font-card-serif lowercase">wisdom</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-10 leading-relaxed font-medium">
              Robustez para o dia a dia. A linha WISDOM XZ oferece controle químico preciso e estabilidade térmica, essenciais para a consistência da sua gravação.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-10">
              {[
                { icon: Gauge, title: "Controle CLP", desc: "Precisão industrial" },
                { icon: Droplet, title: "Químicos", desc: "Reposição auto" },
                { icon: Layers, title: "Proteção", desc: "Escovas premium" },
                { icon: Sliders, title: "Versátil", desc: "CTP/CTcP Online" }
              ].map((feature, i) => (
                <div key={i} className="border border-black/10 p-4 hover:bg-black hover:text-white transition-all group">
                   <feature.icon size={20} className="mb-3 text-slate-400 group-hover:text-white"/>
                   <h4 className="font-black uppercase tracking-wider text-xs mb-1">{feature.title}</h4>
                   <p className="text-[10px] uppercase tracking-widest opacity-60">{feature.desc}</p>
                </div>
              ))}
            </div>

            <Link to="/contato" className="group inline-flex items-center gap-4 text-xs font-black uppercase tracking-[0.2em] border-b-2 border-black dark:border-white pb-2 hover:opacity-70 transition-opacity">
              Consultar Modelos <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform"/>
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
};