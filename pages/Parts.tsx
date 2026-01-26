import React from 'react';
import { Link } from '../context/ThemeContext';
import { Cpu, Wrench, Settings2, ArrowRight } from 'lucide-react';

export const Parts: React.FC = () => {
  return (
    <div className="animate-fade-in bg-[#f1f1f1] dark:bg-slate-950 min-h-screen transition-colors">
      
      {/* Hero */}
      <section className="bg-black text-white py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
           <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-4 block">Manutenção & Reparo</span>
           <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6">Peças de <br/><span className="font-card-serif lowercase">reposição</span></h1>
           <p className="text-slate-400 max-w-xl text-lg font-light leading-relaxed">
             Estoque original para garantir a longevidade do seu parque gráfico. Atendemos emergências com agilidade.
           </p>
        </div>
        <div className="absolute right-0 bottom-0 opacity-10 map-brazil w-1/3 h-full mix-blend-overlay"></div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* CTP DOIE Card */}
          <div className="bg-white dark:bg-slate-900 p-10 shadow-xl border border-black/5 hover:border-black transition-colors group">
            <Cpu size={40} className="mb-8 text-slate-300 group-hover:text-black dark:group-hover:text-white transition-colors" strokeWidth={1} />
            <h3 className="text-2xl font-black uppercase tracking-tighter mb-4">CTP DOIE</h3>
            <p className="text-slate-500 text-sm mb-8 leading-relaxed font-medium min-h-[80px]">
              Peças genuínas para sistemas UV e Thermal. Garantia de precisão no ponto e durabilidade dos componentes.
            </p>
            <ul className="space-y-4 mb-10 border-t border-black/5 pt-6">
              {['Diodos Laser', 'Sensores', 'Motores', 'Placas Eletrônicas'].map(item => (
                <li key={item} className="text-xs font-bold uppercase tracking-widest text-slate-600 dark:text-slate-400 flex items-center">
                  <div className="w-1 h-1 bg-black dark:bg-white mr-3"></div>
                  {item}
                </li>
              ))}
            </ul>
            <Link to="/contato" className="block w-full text-center border-2 border-black/10 hover:border-black hover:bg-black hover:text-white text-black dark:text-white dark:border-white/10 dark:hover:bg-white dark:hover:text-black py-4 text-xs font-black uppercase tracking-[0.2em] transition-all">
              Consultar
            </Link>
          </div>

          {/* Basysprint Card */}
          <div className="bg-black text-white p-10 shadow-2xl relative md:-mt-12 flex flex-col">
            <div className="absolute top-0 right-0 p-4 opacity-20">
              <Settings2 size={80} strokeWidth={0.5} />
            </div>
            <h3 className="text-2xl font-black uppercase tracking-tighter mb-4 mt-8">Basysprint</h3>
            <p className="text-slate-400 text-sm mb-8 leading-relaxed font-medium min-h-[80px]">
              Especialistas nas gerações IV, V e VI. Mantenha seu clássico operando com performance de novo.
            </p>
            <ul className="space-y-4 mb-10 border-t border-white/20 pt-6 flex-grow">
              {['Lâmpadas UV', 'Módulos Ópticos', 'Correias', 'Placas de Controle'].map(item => (
                <li key={item} className="text-xs font-bold uppercase tracking-widest text-slate-300 flex items-center">
                  <div className="w-1 h-1 bg-white mr-3"></div>
                  {item}
                </li>
              ))}
            </ul>
            <Link to="/contato" className="block w-full text-center bg-white text-black py-4 text-xs font-black uppercase tracking-[0.2em] hover:bg-slate-200 transition-colors">
              Consultar Estoque
            </Link>
          </div>

          {/* Processadoras Card */}
          <div className="bg-white dark:bg-slate-900 p-10 shadow-xl border border-black/5 hover:border-black transition-colors group">
            <Wrench size={40} className="mb-8 text-slate-300 group-hover:text-black dark:group-hover:text-white transition-colors" strokeWidth={1} />
            <h3 className="text-2xl font-black uppercase tracking-tighter mb-4">Processadoras</h3>
            <p className="text-slate-500 text-sm mb-8 leading-relaxed font-medium min-h-[80px]">
              Componentes para WISDOM e multimarcas. Foco na estabilidade química e mecânica do revelador.
            </p>
            <ul className="space-y-4 mb-10 border-t border-black/5 pt-6">
              {['Escovas', 'Rolos Emborrachados', 'Bombas', 'Resistências'].map(item => (
                <li key={item} className="text-xs font-bold uppercase tracking-widest text-slate-600 dark:text-slate-400 flex items-center">
                  <div className="w-1 h-1 bg-black dark:bg-white mr-3"></div>
                  {item}
                </li>
              ))}
            </ul>
            <Link to="/contato" className="block w-full text-center border-2 border-black/10 hover:border-black hover:bg-black hover:text-white text-black dark:text-white dark:border-white/10 dark:hover:bg-white dark:hover:text-black py-4 text-xs font-black uppercase tracking-[0.2em] transition-all">
              Consultar
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};