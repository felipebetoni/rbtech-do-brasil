import React, { useState } from 'react';
import { Link } from '../context/ThemeContext';
import { Tag, CheckCircle, Filter, XCircle } from 'lucide-react';
import { Machine } from '../types';

// Mock Data simulating a backend response
const mockMachines: Machine[] = [
  {
    id: '1',
    name: 'CTP Basysprint UV-Setter 860x',
    category: 'CTP',
    image: 'https://i.imgur.com/IqANRoE.png',
    description: 'Equipamento revisado, Geração V. Excelente estado de conservação.',
    condition: 'Seminovo',
    year: '2018'
  },
  {
    id: '2',
    name: 'Processadora Glunz & Jensen',
    category: 'Processadora',
    image: 'https://i.imgur.com/YZN3OoP.png',
    description: 'Processadora térmica 85cm. Rolos novos e sistema de circulação revisado.',
    condition: 'Revisado',
    year: '2019'
  },
  {
    id: '3',
    name: 'CTP Cron UVP-4632',
    category: 'CTP',
    image: 'https://i.imgur.com/IqANRoE.png',
    description: 'Formato 4 páginas. Laser UV. Acompanha bridge e stacker.',
    condition: 'Seminovo',
    year: '2017'
  }
];

export const Marketplace: React.FC = () => {
  const [filter, setFilter] = useState<'Todos' | 'CTP' | 'Processadora'>('Todos');

  const filteredMachines = filter === 'Todos' 
    ? mockMachines 
    : mockMachines.filter(m => m.category === filter);

  return (
    <div className="animate-fade-in bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors">
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center gap-4 mb-4">
             <div className="bg-sky-50 dark:bg-sky-900/20 p-3 rounded-xl">
               <Tag className="text-accent" size={32} />
             </div>
             <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Marketplace de Seminovos</h1>
          </div>
          <p className="text-slate-600 dark:text-slate-300 max-w-3xl text-lg">
            Oportunidade com Qualidade Garantida. Equipamentos revisados e certificados pela RBTech.
            Economia sem abrir mão da produtividade.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Benefits Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {['Revisados por Especialistas', 'Garantia de Procedência', 'Preços Competitivos', 'Suporte na Instalação'].map((benefit, i) => (
             <div key={i} className="bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-md border border-slate-100 dark:border-slate-800 flex items-center gap-3 text-sm font-bold text-slate-700 dark:text-slate-300 hover:scale-[1.02] transition-transform">
               <CheckCircle size={20} className="text-green-500" />
               {benefit}
             </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-12">
          <div className="flex items-center gap-2 text-slate-500 font-medium mr-2">
            <Filter size={20} />
            <span>Filtrar por:</span>
          </div>
          {['Todos', 'CTP', 'Processadora'].map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category as any)}
              className={`px-6 py-2 rounded-full font-bold text-sm transition-all duration-300 ${
                filter === category
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-lg scale-105'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Listings Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredMachines.map((machine) => (
            <div key={machine.id} className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 dark:border-slate-800 flex flex-col hover:scale-[1.02] group">
              <div className="h-56 overflow-hidden relative p-4 bg-gray-100 dark:bg-slate-800">
                <img 
                  src={machine.image} 
                  alt={machine.name} 
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 mix-blend-multiply dark:mix-blend-normal"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur text-slate-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                  {machine.condition}
                </div>
              </div>
              <div className="p-8 flex-grow flex flex-col">
                <div className="text-xs text-accent font-bold uppercase tracking-widest mb-2">{machine.category} • {machine.year}</div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{machine.name}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-8 flex-grow leading-relaxed">
                  {machine.description}
                </p>
                <div className="mt-auto">
                   <Link 
                     to="/contato" 
                     className="block w-full text-center bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white py-3 rounded-xl font-bold transition-all shadow-[0_4px_0_#020617] hover:shadow-[0_2px_0_#020617] hover:translate-y-[2px] active:shadow-none active:translate-y-[4px]"
                   >
                     Tenho Interesse
                   </Link>
                </div>
              </div>
            </div>
          ))}

          {filteredMachines.length === 0 && (
             <div className="col-span-full py-20 text-center text-slate-500">
               <XCircle size={48} className="mx-auto mb-4 opacity-30" />
               <p className="text-lg font-medium">Nenhum equipamento encontrado nesta categoria no momento.</p>
               <button onClick={() => setFilter('Todos')} className="text-accent hover:underline mt-2">Ver todos os equipamentos</button>
             </div>
          )}
          
          {/* Placeholder for "Advertise Here" or Empty State */}
          <div className="bg-slate-50 dark:bg-slate-900/50 rounded-3xl border-2 border-dashed border-slate-300 dark:border-slate-700 flex flex-col items-center justify-center p-10 text-center min-h-[400px] hover:border-accent hover:bg-sky-50 dark:hover:bg-slate-900 transition-colors group">
            <Tag size={56} className="text-slate-300 dark:text-slate-600 mb-6 group-hover:text-accent transition-colors" />
            <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300 mb-3">Procurando algo específico?</h3>
            <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-xs mx-auto">
              Temos acesso a uma vasta rede de parceiros. Entre em contato e nos diga o que precisa.
            </p>
            <Link to="/contato" className="text-accent font-bold hover:text-sky-700 dark:hover:text-sky-400 hover:underline text-lg">
              Fale com um consultor
            </Link>
          </div>
        </div>

        <div className="mt-16 text-center text-sm text-slate-400 italic">
          * As imagens são ilustrativas. O estoque de seminovos é atualizado constantemente. Consulte disponibilidade.
        </div>
      </div>
    </div>
  );
};