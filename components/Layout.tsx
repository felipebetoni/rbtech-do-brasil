import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail, MapPin, Sun, Moon, MessageCircle, Globe, Lock, LayoutDashboard, ChevronRight, Instagram } from 'lucide-react';
import { useTheme, Link, useLocation } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { Logo } from './Logo';

const navItems = [
  { label: 'Início', path: '/' },
  { label: 'Equipamentos', path: '/equipamentos' },
  { label: 'Peças', path: '/pecas' },
  { label: 'Serviços', path: '/servicos' },
  { label: 'Sobre', path: '/sobre' },
  { label: 'Contato', path: '/contato' },
];

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated } = useAuth();

  // Bloquear scroll quando menu mobile estiver aberto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 font-sans">
      {/* Top Bar - Adaptada para Mobile */}
      <div className="bg-black text-white text-[10px] uppercase tracking-[0.2em] py-3 px-4 relative z-50">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0 text-center sm:text-left">
          <div className="flex gap-4 sm:gap-8 justify-center sm:justify-start w-full sm:w-auto">
            <a href="tel:+5541992261285" className="flex items-center gap-2 font-bold hover:text-slate-300 transition-colors">
              <Phone size={10} /> 
              <span>+55 41 99226-1285</span>
            </a>
            <span className="hidden sm:flex items-center gap-2 font-bold"><Globe size={10} /> CURITIBA | BRASIL</span>
          </div>
          <div className="hidden sm:flex gap-3 font-bold opacity-80">
             EXCELÊNCIA EM PRÉ-IMPRESSÃO
          </div>
        </div>
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-black/5 dark:border-white/10 transition-all duration-300">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 md:h-28 items-center">
            <div className="flex items-center z-50 relative">
              <Link to="/" className="flex items-center group" onClick={closeMenu}>
                <Logo className="h-10 md:h-16 w-auto transition-transform duration-300 group-hover:scale-105" dark={theme === 'dark'} />
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8 lg:space-x-12">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-[11px] font-black uppercase tracking-[0.15em] transition-all relative group py-2 ${
                    location.pathname === item.path 
                      ? 'text-black dark:text-white' 
                      : 'text-slate-500 hover:text-black dark:text-slate-400 dark:hover:text-white'
                  }`}
                >
                  {item.label}
                  <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-black dark:bg-white transition-transform origin-left duration-300 ${location.pathname === item.path ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
                </Link>
              ))}
              
              {isAuthenticated && (
                <Link 
                  to="/admin" 
                  className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 text-[10px] font-black uppercase tracking-widest hover:opacity-80 flex items-center gap-2"
                >
                  <LayoutDashboard size={12} /> Painel
                </Link>
              )}

              <div className="w-[1px] h-6 bg-slate-200 dark:bg-slate-800 mx-2"></div>

              <button 
                onClick={toggleTheme} 
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Alternar tema"
              >
                {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
              </button>
            </div>

            {/* Mobile Menu Toggle - Z-Index alto para ficar sobre o menu aberto */}
            <div className="md:hidden flex items-center gap-4 z-50 relative">
               <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </button>
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)} 
                className="p-2 text-black dark:text-white focus:outline-none"
                aria-label="Menu"
              >
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Full Screen Menu Overlay */}
        <div 
          className={`fixed inset-0 bg-white dark:bg-slate-950 z-40 flex flex-col justify-center px-8 transition-all duration-500 ease-in-out md:hidden ${
            isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'
          }`}
        >
          <div className="space-y-6">
            {navItems.map((item, idx) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={closeMenu}
                className={`block text-2xl font-black uppercase tracking-tighter text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-900 pb-4 flex justify-between items-center ${
                  location.pathname === item.path ? 'opacity-100 pl-4 border-l-4 border-l-black dark:border-l-white' : 'opacity-60'
                }`}
                style={{ transitionDelay: `${idx * 50}ms` }}
              >
                {item.label}
                <ChevronRight size={20} className="opacity-50" />
              </Link>
            ))}
            
            {isAuthenticated && (
              <Link
                to="/admin"
                onClick={closeMenu}
                className="block text-xl font-black uppercase tracking-widest text-white bg-black dark:text-black dark:bg-white p-4 text-center mt-8"
              >
                Acessar Painel
              </Link>
            )}
          </div>

          <div className="absolute bottom-10 left-0 w-full px-8 text-center space-y-4">
             <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Entre em contato</p>
             <div className="flex justify-center gap-6">
                <a href="tel:+5541992261285" className="p-3 bg-slate-50 dark:bg-slate-900 rounded-full"><Phone size={20}/></a>
                <a href="mailto:contato@rbtechbrasil.com" className="p-3 bg-slate-50 dark:bg-slate-900 rounded-full"><Mail size={20}/></a>
                <a href="https://wa.me/5541992261285" className="p-3 bg-slate-50 dark:bg-slate-900 rounded-full"><MessageCircle size={20}/></a>
             </div>
          </div>
        </div>
      </header>

      <main className="flex-grow pt-0">
        {children}
      </main>

      {/* Floating WhatsApp - Movido para a direita */}
      <a 
        href="https://wa.me/5541992261285" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40 bg-[#25D366] text-white p-3 md:p-4 rounded-full shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] hover:scale-110 transition-all border-4 border-white dark:border-slate-800"
        aria-label="WhatsApp"
      >
        <MessageCircle className="w-6 h-6 md:w-7 md:h-7" fill="currentColor" />
      </a>

      {/* Footer - Minimalist White/Black */}
      <footer className="bg-white dark:bg-slate-950 text-black dark:text-white pt-16 md:pt-24 pb-8 md:pb-12 border-t border-black/5 dark:border-white/5 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)] relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12 md:mb-20">
            <div className="md:col-span-5 space-y-6 md:space-y-8 text-center md:text-left">
              <div className="flex justify-center md:justify-start">
                <Logo className="h-12 md:h-16 w-auto" dark={theme === 'dark'} />
              </div>
              <p className="max-w-sm mx-auto md:mx-0 text-sm text-slate-500 font-medium leading-relaxed">
                Especialistas em pré-impressão.
                <br/>
                Equipamentos. Serviços. Produtos.
              </p>
            </div>
            
            <div className="md:col-span-3 space-y-6 md:space-y-8">
              <h4 className="text-xs uppercase tracking-[0.4em] font-black border-l-2 border-black dark:border-white pl-4">Soluções</h4>
              <ul className="text-xs font-bold uppercase tracking-widest space-y-4 pl-4">
                <li><Link to="/equipamentos" className="hover:text-slate-400 transition-colors">Equipamentos CTcP</Link></li>
                <li><Link to="/servicos" className="hover:text-slate-400 transition-colors">Manutenção Técnica</Link></li>
                <li><Link to="/pecas" className="hover:text-slate-400 transition-colors">Peças Originais</Link></li>
              </ul>
            </div>

            <div className="md:col-span-4 space-y-6 md:space-y-8">
              <h4 className="text-xs uppercase tracking-[0.4em] font-black border-l-2 border-black dark:border-white pl-4">Contato</h4>
              <div className="text-xs font-bold space-y-4 pl-4">
                 <p className="flex items-center gap-3 tracking-wide"><Phone size={14} className="text-slate-400 flex-shrink-0"/> +55 41 99226-1285</p>
                 <p className="flex items-center gap-3 tracking-wide"><Mail size={14} className="text-slate-400 flex-shrink-0"/> rafael.betoni@rbtechbrasil.com</p>
                 <p className="flex items-center gap-3 tracking-wide"><MapPin size={14} className="text-slate-400 flex-shrink-0"/> CURITIBA | BRASIL</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-black/5 dark:border-white/5 pt-8 md:pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-[0.3em] font-black text-slate-400 text-center md:text-left">
            <p>&copy; {new Date().getFullYear()} RBTech do Brasil</p>
            
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
              <a 
                href="https://instagram.com/felipbetoni" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 hover:text-black dark:hover:text-white transition-colors opacity-70 hover:opacity-100"
              >
                <span>Desenvolvido por Felipe Betoni</span>
                <Instagram size={12} />
              </a>

              <div className="flex items-center gap-4">
                {!isAuthenticated && (
                  <Link to="/login" className="opacity-30 hover:opacity-100 transition-opacity p-2">
                    <Lock size={12} />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};