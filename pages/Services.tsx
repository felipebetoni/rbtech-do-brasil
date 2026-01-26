import React from 'react';
import { PenTool, Repeat, GraduationCap, Truck, Headset, Shield, Settings, Zap, Cpu, ArrowRight, CheckSquare } from 'lucide-react';
import { Link } from '../context/ThemeContext';
import { useContent } from '../context/ContentContext';

// Mapeamento de strings para componentes de ícone
const IconMap: Record<string, any> = {
  Shield, PenTool, Repeat, GraduationCap, Truck, Headset, Settings, Zap, Cpu
};

export const Services: React.FC = () => {
  const { services } = useContent();

  return (
    <div className="animate-fade-in bg-[#f1f1f1] dark:bg-slate-950 min-h-screen transition-colors">
      
      {/* Hero */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-black/5">
         <div className="max-w-4xl">
           <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6 block">Suporte Técnico</span>
           <h1 className="text-5xl md:text-7xl font-black text-black dark:text-white mb-8 tracking-tighter uppercase leading-[0.9]">
              Serviços <br/>
              <span className="font-card-serif lowercase tracking-normal">especializados</span>
            </h1>
           <p className="text-lg font-medium text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
             15 anos de expertise técnica. Atuamos como o braço direito da sua gráfica, garantindo que sua pré-impressão nunca pare.
           </p>
         </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Services Grid - Dynamic */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-black/10 dark:border-white/10">
          {services.map((service) => {
            const IconComponent = IconMap[service.icon] || Settings; // Fallback icon

            return (
              <div key={service.id} className="bg-white dark:bg-slate-900 p-12 border-r border-b border-black/10 dark:border-white/10 hover:bg-black hover:text-white transition-all duration-300 group">
                <IconComponent size={32} strokeWidth={1.5} className="mb-8 text-slate-400 group-hover:text-white transition-colors" />
                <h3 className="text-2xl font-black uppercase tracking-tighter mb-4">{service.title}</h3>
                <p className="text-sm font-medium leading-relaxed opacity-60 group-hover:opacity-100 transition-opacity">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-24 bg-black text-white p-12 md:p-20 relative overflow-hidden">
           <div className="relative z-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-12">
             <div className="max-w-xl">
               <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-4 block">Especialidade</span>
               <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6">Expertise em <br/> Basysprint</h2>
               <p className="text-slate-400 text-lg font-light leading-relaxed">
                 Dominamos a tecnologia das gerações <strong>IV, V e VI</strong>. Oferecemos diagnóstico avançado que poucos no mercado conseguem realizar.
               </p>
             </div>
             <Link to="/contato" className="bg-white text-black px-10 py-5 text-xs font-black uppercase tracking-[0.2em] hover:bg-slate-200 transition-colors flex items-center gap-4">
               Agendar Visita <ArrowRight size={16}/>
             </Link>
           </div>
        </div>
      </div>
    </div>
  );
};