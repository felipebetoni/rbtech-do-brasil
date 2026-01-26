import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from '../context/ThemeContext';
import { Lock, Shield, AlertCircle, CheckCircle2, Eye, EyeOff } from 'lucide-react';

export const Setup: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setupPassword } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validações
    if (password.length < 4) {
      setError('Senha deve ter no mínimo 4 caracteres');
      return;
    }

    if (password !== confirmPassword) {
      setError('As senhas não correspondem');
      return;
    }

    setIsLoading(true);
    try {
      const result = await setupPassword(password);
      if (result) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setError('Erro ao configurar senha. Tente novamente.');
      }
    } catch (err) {
      setError('Erro ao configurar senha. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-50 dark:from-slate-950 dark:to-slate-900 px-4">
        <div className="w-full max-w-md text-center">
          <div className="bg-white dark:bg-slate-900 p-12 rounded-2xl shadow-2xl border border-green-100 dark:border-green-900/30">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full mb-6">
              <CheckCircle2 size={32} className="text-green-600" />
            </div>
            <h1 className="text-2xl font-black uppercase tracking-tighter text-green-600 mb-3">
              Senha Configurada!
            </h1>
            <p className="text-slate-600 dark:text-slate-300 font-medium mb-2">
              Sua senha de administrador foi salva com segurança.
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
              Redirecionando para login em 2 segundos...
            </p>
            <div className="h-1 bg-gradient-to-r from-green-400 to-emerald-600 rounded-full w-32 mx-auto animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-950 dark:to-slate-900 px-4 animate-fade-in">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-slate-900 p-10 md:p-14 shadow-2xl rounded-2xl border border-black/5 dark:border-white/5 relative overflow-hidden group">
          
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          
          <div className="text-center mb-10 relative z-10">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full mb-6 shadow-lg">
              <Shield size={24} />
            </div>
            <h1 className="text-2xl font-black uppercase tracking-tighter text-slate-900 dark:text-white mb-2">
              Configuração Inicial
            </h1>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Defina sua Senha de Acesso
            </p>
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-8 text-sm text-blue-900 dark:text-blue-200 flex gap-3">
            <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold mb-1">Primeira visita!</p>
              <p className="text-xs opacity-80">Defina uma senha segura para proteger seu painel administrativo. Mínimo 4 caracteres.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            {/* Senha */}
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">
                Senha
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 px-4 py-3 rounded-lg font-medium focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {password && (
                <p className={`text-xs mt-2 font-medium ${password.length >= 4 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {password.length >= 4 ? '✓ Força adequada' : '✗ Muito curta (mín. 4 caracteres)'}
                </p>
              )}
            </div>

            {/* Confirmar Senha */}
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">
                Confirmar Senha
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirme sua senha"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={isLoading}
                  className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 px-4 py-3 rounded-lg font-medium focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {confirmPassword && (
                <p className={`text-xs mt-2 font-medium ${password === confirmPassword ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {password === confirmPassword ? '✓ Senhas correspondem' : '✗ Senhas não correspondem'}
                </p>
              )}
            </div>

            {/* Erro */}
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg text-sm font-medium">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || password.length < 4 || password !== confirmPassword}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-lg text-xs font-black uppercase tracking-widest hover:from-blue-700 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Configurando...
                </>
              ) : (
                <>
                  <Lock size={16} />
                  Configurar Senha
                </>
              )}
            </button>
          </form>

          {/* Info Footer */}
          <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800 text-center">
            <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">
              Armazenado localmente • Nenhuma exposição de dados • Você controla a senha
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
