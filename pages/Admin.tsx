import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useContent } from '../context/ContentContext';
import { useNavigate } from '../context/ThemeContext';
import { 
  LogOut, LayoutDashboard, Globe, PenTool, Image, Save, Trash2, Plus, X, Type, Lock, Eye, EyeOff
} from 'lucide-react';

export const Admin: React.FC = () => {
  const { logout, changePassword } = useAuth();
  const { config, updateConfig, news, addNews, removeNews, services, updateService, removeService, addService } = useContent();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'geral' | 'noticias' | 'servicos' | 'seguranca'>('geral');

  // Estados locais para formulários de adição
  const [newNews, setNewNews] = useState({ title: '', excerpt: '', image: '' });
  const [newService, setNewService] = useState({ title: '', description: '', icon: 'Settings' });
  
  // Estados para alteração de senha
  const [passwordForm, setPasswordForm] = useState({ old: '', new: '', confirm: '' });
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [showPasswords, setShowPasswords] = useState({ old: false, new: false, confirm: false });
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleAddNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (newNews.title && newNews.excerpt) {
      addNews(newNews);
      setNewNews({ title: '', excerpt: '', image: '' });
    }
  };

  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    if (newService.title) {
      addService(newService);
      setNewService({ title: '', description: '', icon: 'Settings' });
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    if (passwordForm.new.length < 4) {
      setPasswordError('Nova senha deve ter no mínimo 4 caracteres');
      return;
    }

    if (passwordForm.new !== passwordForm.confirm) {
      setPasswordError('As senhas não correspondem');
      return;
    }

    setIsChangingPassword(true);
    try {
      const success = await changePassword(passwordForm.old, passwordForm.new);
      if (success) {
        setPasswordSuccess('✓ Senha alterada com sucesso!');
        setPasswordForm({ old: '', new: '', confirm: '' });
        setTimeout(() => setPasswordSuccess(''), 3000);
      } else {
        setPasswordError('Senha atual incorreta');
      }
    } catch (err) {
      setPasswordError('Erro ao alterar senha');
    } finally {
      setIsChangingPassword(false);
    }
  };

  const iconOptions = ["Shield", "PenTool", "GraduationCap", "Repeat", "Truck", "Headset", "Settings", "Zap", "Cpu"];

  return (
    <div className="min-h-screen bg-[#f1f1f1] dark:bg-slate-950 animate-fade-in transition-colors pb-20 lg:pb-0">
      
      {/* Admin Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-black/5 dark:border-white/5 px-4 sm:px-8 py-6 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-center sm:text-left">
            <h1 className="text-xl font-black uppercase tracking-tighter text-slate-900 dark:text-white">CMS / Gestão</h1>
            <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Controle Total do Site</p>
          </div>
          <button onClick={handleLogout} className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 rounded-lg text-xs font-black uppercase tracking-wider hover:bg-red-100 transition-colors">
            <LogOut size={14} /> Sair
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Navigation - Responsive: Stacked on Mobile, Sidebar on Desktop */}
          <div className="w-full lg:w-64 flex-shrink-0 grid grid-cols-3 lg:grid-cols-1 gap-2">
            {[
              { id: 'geral', icon: Globe, label: 'Home' },
              { id: 'noticias', icon: LayoutDashboard, label: 'Notícias' },
              { id: 'servicos', icon: PenTool, label: 'Serviços' },
              { id: 'seguranca', icon: Lock, label: 'Segurança' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`flex flex-col lg:flex-row items-center justify-center lg:justify-start gap-2 lg:gap-4 px-2 lg:px-6 py-3 lg:py-4 rounded-xl transition-all duration-300 ${
                  activeTab === item.id
                    ? 'bg-black dark:bg-white text-white dark:text-black shadow-lg'
                    : 'bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800'
                }`}
              >
                <item.icon size={18} />
                <span className="text-[10px] lg:text-xs font-black uppercase tracking-widest">{item.label}</span>
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="flex-grow space-y-8">
            
            {/* --- ABA GERAL --- */}
            {activeTab === 'geral' && (
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 border border-black/5 dark:border-white/5 animate-fade-in shadow-xl">
                <h2 className="text-xl font-black uppercase tracking-tighter mb-8 flex items-center gap-2">
                  <Globe size={20} /> Conteúdo Home
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Título Principal (Hero)</label>
                    <input 
                      type="text" 
                      value={config.heroTitle}
                      onChange={(e) => updateConfig({ heroTitle: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 rounded-lg font-black text-lg focus:ring-2 ring-black dark:ring-white outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Subtítulo</label>
                    <textarea 
                      value={config.heroSubtitle}
                      onChange={(e) => updateConfig({ heroSubtitle: e.target.value })}
                      rows={3}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 rounded-lg font-medium focus:ring-2 ring-black dark:ring-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">URL da Imagem de Destaque</label>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-grow relative">
                        <Image size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"/>
                        <input 
                          type="text" 
                          value={config.heroImage}
                          onChange={(e) => updateConfig({ heroImage: e.target.value })}
                          className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 pl-12 pr-4 py-3 rounded-lg font-mono text-xs focus:ring-2 ring-black dark:ring-white outline-none"
                        />
                      </div>
                      <div className="w-full sm:w-12 h-32 sm:h-12 rounded-lg bg-slate-100 overflow-hidden flex items-center justify-center border border-slate-200">
                        {config.heroImage ? <img src={config.heroImage} className="w-full h-full object-cover" /> : <Image size={20}/>}
                      </div>
                    </div>
                  </div>

                  <div className="pt-8 border-t border-slate-100 dark:border-slate-800">
                     <h3 className="text-sm font-black uppercase tracking-widest mb-4">Dados de Contato</h3>
                     <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Telefone</label>
                          <input 
                            type="text" 
                            value={config.contactPhone}
                            onChange={(e) => updateConfig({ contactPhone: e.target.value })}
                            className="w-full bg-slate-50 dark:bg-slate-800 p-3 rounded-lg font-mono text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Email</label>
                          <input 
                            type="text" 
                            value={config.contactEmail}
                            onChange={(e) => updateConfig({ contactEmail: e.target.value })}
                            className="w-full bg-slate-50 dark:bg-slate-800 p-3 rounded-lg font-mono text-xs"
                          />
                        </div>
                     </div>
                  </div>
                </div>
              </div>
            )}

            {/* --- ABA NOTÍCIAS --- */}
            {activeTab === 'noticias' && (
              <div className="space-y-8 animate-fade-in">
                {/* Add News Form */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 border border-black/5 dark:border-white/5 shadow-xl">
                  <h2 className="text-xl font-black uppercase tracking-tighter mb-6">Adicionar Notícia</h2>
                  <form onSubmit={handleAddNews} className="space-y-4">
                    <input 
                      type="text" 
                      placeholder="Título da Manchete" 
                      value={newNews.title}
                      onChange={(e) => setNewNews({...newNews, title: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-slate-800 p-4 rounded-lg font-bold border-none outline-none focus:ring-2 ring-black dark:ring-white"
                    />
                    <div className="flex gap-4">
                       <input 
                        type="text" 
                        placeholder="URL da Imagem (Opcional)" 
                        value={newNews.image}
                        onChange={(e) => setNewNews({...newNews, image: e.target.value})}
                        className="flex-grow bg-slate-50 dark:bg-slate-800 p-4 rounded-lg text-sm font-mono"
                      />
                    </div>
                    <textarea 
                      placeholder="Resumo da notícia..." 
                      rows={3}
                      value={newNews.excerpt}
                      onChange={(e) => setNewNews({...newNews, excerpt: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-slate-800 p-4 rounded-lg text-sm border-none outline-none focus:ring-2 ring-black dark:ring-white"
                    />
                    <button type="submit" className="w-full md:w-auto bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-lg text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:scale-105 transition-transform">
                      <Plus size={16} /> Publicar
                    </button>
                  </form>
                </div>

                {/* News List */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-black/5 dark:border-white/5 shadow-lg">
                   <div className="p-6 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                     <h3 className="text-sm font-black uppercase tracking-widest">Notícias Ativas ({news.length})</h3>
                   </div>
                   <div className="divide-y divide-slate-100 dark:divide-slate-800">
                     {news.length === 0 && <div className="p-8 text-center text-slate-400 text-sm">Nenhuma notícia publicada.</div>}
                     {news.map(item => (
                       <div key={item.id} className="p-6 flex flex-col sm:flex-row items-start justify-between group gap-4">
                         <div className="flex gap-4 w-full">
                           <div className="w-16 h-16 bg-slate-200 rounded-lg overflow-hidden flex-shrink-0">
                             {item.image ? <img src={item.image} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-slate-400"><Image size={20}/></div>}
                           </div>
                           <div className="min-w-0">
                             <h4 className="font-bold text-slate-900 dark:text-white truncate">{item.title}</h4>
                             <p className="text-xs text-slate-500 mb-1">{item.date}</p>
                             <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-1">{item.excerpt}</p>
                           </div>
                         </div>
                         <button onClick={() => removeNews(item.id)} className="self-end sm:self-center p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors">
                           <Trash2 size={18} />
                         </button>
                       </div>
                     ))}
                   </div>
                </div>
              </div>
            )}

            {/* --- ABA SERVIÇOS --- */}
            {activeTab === 'servicos' && (
              <div className="space-y-8 animate-fade-in">
                {/* Services List */}
                <div className="grid md:grid-cols-2 gap-4">
                  {services.map(service => (
                    <div key={service.id} className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-black/5 dark:border-white/5 relative group hover:shadow-lg transition-shadow">
                      <button 
                        onClick={() => removeService(service.id)}
                        className="absolute top-2 right-2 p-2 text-slate-300 hover:text-red-500 transition-colors"
                      >
                        <X size={16} />
                      </button>
                      <div className="mb-4 text-slate-400">
                         <span className="text-[10px] uppercase font-mono border border-slate-200 dark:border-slate-700 px-2 py-1 rounded">Icon: {service.icon}</span>
                      </div>
                      <input 
                        type="text" 
                        value={service.title}
                        onChange={(e) => updateService(service.id, { title: e.target.value })}
                        className="w-full bg-transparent font-black uppercase text-lg mb-2 border-b border-transparent focus:border-black dark:focus:border-white outline-none"
                      />
                      <textarea 
                        value={service.description}
                        onChange={(e) => updateService(service.id, { description: e.target.value })}
                        rows={2}
                        className="w-full bg-transparent text-sm text-slate-500 resize-none border-b border-transparent focus:border-black dark:focus:border-white outline-none"
                      />
                    </div>
                  ))}

                  {/* Add New Service Card */}
                  <div className="bg-slate-50 dark:bg-slate-900/50 border-2 border-dashed border-slate-200 dark:border-slate-800 p-6 rounded-xl flex flex-col justify-center transition-colors hover:bg-slate-100 dark:hover:bg-slate-900">
                    <h3 className="text-sm font-black uppercase tracking-widest mb-4 text-slate-400">Novo Serviço</h3>
                    <form onSubmit={handleAddService} className="space-y-3">
                      <input 
                        type="text" 
                        placeholder="Nome do Serviço"
                        value={newService.title}
                        onChange={(e) => setNewService({...newService, title: e.target.value})}
                        className="w-full bg-white dark:bg-slate-900 p-3 rounded text-sm font-bold"
                      />
                      <input 
                        type="text" 
                        placeholder="Descrição curta"
                        value={newService.description}
                        onChange={(e) => setNewService({...newService, description: e.target.value})}
                        className="w-full bg-white dark:bg-slate-900 p-3 rounded text-sm"
                      />
                      <select 
                        value={newService.icon}
                        onChange={(e) => setNewService({...newService, icon: e.target.value})}
                        className="w-full bg-white dark:bg-slate-900 p-3 rounded text-xs font-mono uppercase"
                      >
                        {iconOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                      <button type="submit" className="w-full bg-black dark:bg-white text-white dark:text-black py-3 rounded text-xs font-black uppercase tracking-widest mt-2 hover:opacity-80 transition-opacity">
                        Adicionar
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            )}

            {/* --- ABA SEGURANÇA --- */}
            {activeTab === 'seguranca' && (
              <div className="space-y-8 animate-fade-in">
                <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 border border-black/5 dark:border-white/5 shadow-xl">
                  <h2 className="text-xl font-black uppercase tracking-tighter mb-8 flex items-center gap-2">
                    <Lock size={20} /> Configurações de Segurança
                  </h2>
                  
                  {/* Alterar Senha */}
                  <div className="space-y-6 max-w-md">
                    <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-4">Alterar Senha</h3>
                    
                    {passwordError && (
                      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg text-sm font-medium">
                        {passwordError}
                      </div>
                    )}

                    {passwordSuccess && (
                      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 px-4 py-3 rounded-lg text-sm font-medium">
                        {passwordSuccess}
                      </div>
                    )}

                    <form onSubmit={handleChangePassword} className="space-y-4">
                      {/* Senha Atual */}
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Senha Atual</label>
                        <div className="relative">
                          <input
                            type={showPasswords.old ? "text" : "password"}
                            value={passwordForm.old}
                            onChange={(e) => setPasswordForm({...passwordForm, old: e.target.value})}
                            disabled={isChangingPassword}
                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-lg text-sm font-medium focus:ring-2 ring-blue-500 outline-none transition-all disabled:opacity-50"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPasswords({...showPasswords, old: !showPasswords.old})}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                          >
                            {showPasswords.old ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </div>

                      {/* Nova Senha */}
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Nova Senha</label>
                        <div className="relative">
                          <input
                            type={showPasswords.new ? "text" : "password"}
                            value={passwordForm.new}
                            onChange={(e) => setPasswordForm({...passwordForm, new: e.target.value})}
                            disabled={isChangingPassword}
                            placeholder="Mínimo 4 caracteres"
                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-lg text-sm font-medium focus:ring-2 ring-blue-500 outline-none transition-all disabled:opacity-50"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPasswords({...showPasswords, new: !showPasswords.new})}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                          >
                            {showPasswords.new ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                        {passwordForm.new && (
                          <p className={`text-xs mt-1 font-medium ${passwordForm.new.length >= 4 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                            {passwordForm.new.length >= 4 ? '✓ Força adequada' : '✗ Muito curta (mín. 4)'}
                          </p>
                        )}
                      </div>

                      {/* Confirmar Nova Senha */}
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Confirmar Nova Senha</label>
                        <div className="relative">
                          <input
                            type={showPasswords.confirm ? "text" : "password"}
                            value={passwordForm.confirm}
                            onChange={(e) => setPasswordForm({...passwordForm, confirm: e.target.value})}
                            disabled={isChangingPassword}
                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-lg text-sm font-medium focus:ring-2 ring-blue-500 outline-none transition-all disabled:opacity-50"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPasswords({...showPasswords, confirm: !showPasswords.confirm})}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                          >
                            {showPasswords.confirm ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                        {passwordForm.confirm && (
                          <p className={`text-xs mt-1 font-medium ${passwordForm.new === passwordForm.confirm ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                            {passwordForm.new === passwordForm.confirm ? '✓ Senhas correspondem' : '✗ Senhas não correspondem'}
                          </p>
                        )}
                      </div>

                      <button
                        type="submit"
                        disabled={isChangingPassword || passwordForm.new.length < 4 || passwordForm.new !== passwordForm.confirm || !passwordForm.old}
                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-lg text-xs font-black uppercase tracking-widest transition-all mt-2"
                      >
                        {isChangingPassword ? 'Alterando...' : 'Alterar Senha'}
                      </button>
                    </form>
                  </div>

                  {/* Info */}
                  <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800">
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 text-sm text-blue-900 dark:text-blue-200">
                      <p className="font-bold mb-2">ℹ️ Informações de Segurança:</p>
                      <ul className="text-xs space-y-1 opacity-80">
                        <li>✓ Senhas são armazenadas com hash SHA-256</li>
                        <li>✓ Sessões expiram após 24 horas</li>
                        <li>✓ Dados nunca saem do seu navegador</li>
                        <li>✓ Você é o único proprietário das suas credenciais</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};