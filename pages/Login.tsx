import React, { useState } from 'react';
import { useNavigate } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { Lock, ArrowRight, ShieldAlert, Loader2 } from 'lucide-react';

export const Login: React.FC = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(false);
    setIsLoading(true);

    try {
      const success = await login(password);
      if (success) {
        navigate('/admin');
      } else {
        setError(true);
        setIsLoading(false);
        setTimeout(() => setError(false), 2000);
      }
    } catch (err) {
      setError(true);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[#f1f1f1] dark:bg-slate-950 px-4 animate-fade-in">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-slate-900 p-10 md:p-14 shadow-2xl border border-black/5 dark:border-white/5 relative overflow-hidden group">
          
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-black/5 dark:bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-black dark:bg-white text-white dark:text-black rounded-full mb-6 shadow-lg">
              <Lock size={20} />
            </div>
            <h1 className="text-2xl font-black uppercase tracking-tighter text-slate-900 dark:text-white mb-2">
              Acesso Restrito
            </h1>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Painel Administrativo RBTech
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative">
              <input
                type="password"
                placeholder="SENHA DE ACESSO"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                className={`w-full bg-transparent border-b-2 py-4 text-center font-bold text-slate-900 dark:text-white outline-none transition-all placeholder:text-slate-300 placeholder:font-normal placeholder:tracking-widest disabled:opacity-50 ${
                  error 
                    ? 'border-red-500 text-red-500' 
                    : 'border-black/10 dark:border-white/10 focus:border-black dark:focus:border-white'
                }`}
              />
              {error && (
                <div className="absolute top-full left-0 w-full text-center mt-2 animate-bounce">
                  <span className="text-[10px] uppercase font-black tracking-widest text-red-500 flex items-center justify-center gap-2">
                    <ShieldAlert size={12} /> Acesso Negado
                  </span>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-black dark:bg-white text-white dark:text-black py-5 text-xs font-black uppercase tracking-[0.2em] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>Verificando <Loader2 size={16} className="animate-spin" /></>
              ) : (
                <>Entrar <ArrowRight size={16} /></>
              )}
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-[10px] text-slate-400 font-medium">
              Área exclusiva para colaboradores autorizados.
              <br />Sessão segura criptografada.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};