import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, ArrowRight } from 'lucide-react';

export const Contact: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Obrigado, ${formState.name}! Sua mensagem foi enviada. Entraremos em contato em breve.`);
    setFormState({ name: '', phone: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  // Minimalist Input Style with larger tap target for mobile
  const inputClasses = "w-full bg-transparent border-b border-black/20 dark:border-white/20 py-4 text-sm font-bold text-slate-900 dark:text-white focus:border-black dark:focus:border-white outline-none transition-all placeholder:text-slate-400 placeholder:font-normal placeholder:uppercase placeholder:tracking-widest appearance-none rounded-none";

  return (
    <div className="animate-fade-in bg-[#f1f1f1] dark:bg-slate-950 min-h-screen transition-colors">
      
      <section className="bg-black text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-4">Fale Conosco</h1>
          <p className="text-slate-400 font-card-serif text-xl md:text-2xl lowercase">inicie o seu projeto</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Info Side */}
          <div className="space-y-12 order-2 lg:order-1">
            <div>
              <h2 className="text-sm font-black uppercase tracking-[0.3em] text-slate-400 mb-8">Canais Diretos</h2>
              <div className="space-y-8 md:space-y-10">
                <div className="group">
                  <div className="flex items-center gap-4 mb-2">
                    <Phone size={24} className="text-black dark:text-white" />
                    <h3 className="text-xl font-black uppercase tracking-tighter">Telefone</h3>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 font-medium pl-10 text-lg">+55 41 99226-1285</p>
                </div>

                <div className="group">
                  <div className="flex items-center gap-4 mb-2">
                    <Mail size={24} className="text-black dark:text-white" />
                    <h3 className="text-xl font-black uppercase tracking-tighter">E-mail</h3>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 font-medium pl-10 text-lg break-all">contato@rbtechbrasil.com</p>
                </div>

                <div className="group">
                  <div className="flex items-center gap-4 mb-2">
                    <MapPin size={24} className="text-black dark:text-white" />
                    <h3 className="text-xl font-black uppercase tracking-tighter">Localização</h3>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 font-medium pl-10 text-lg">Curitiba | Brasil</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-8 md:p-10 border border-black/5 shadow-2xl relative overflow-hidden rounded-xl md:rounded-none">
              <div className="relative z-10">
                <h3 className="font-black uppercase tracking-tighter text-2xl mb-4">Urgência?</h3>
                <p className="text-slate-500 text-sm mb-8 leading-relaxed font-medium">
                  Para peças críticas ou paradas de máquina, utilize nosso canal prioritário no WhatsApp.
                </p>
                <a 
                  href="https://wa.me/5541992261285" 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 bg-green-600 text-white px-6 md:px-8 py-4 text-xs font-black uppercase tracking-[0.2em] hover:bg-green-700 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 w-full md:w-auto justify-center md:justify-start rounded-lg md:rounded-none"
                >
                  WhatsApp <ArrowRight size={16}/>
                </a>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="bg-white dark:bg-slate-900 p-8 md:p-12 shadow-2xl border-t-4 border-black dark:border-white rounded-xl md:rounded-none order-1 lg:order-2">
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter mb-8 md:mb-10">Enviar Mensagem</h2>
            <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
              <div className="group">
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="Nome Completo"
                  className={inputClasses}
                  value={formState.name}
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    placeholder="Telefone"
                    className={inputClasses}
                    value={formState.phone}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="E-mail"
                    className={inputClasses}
                    value={formState.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <select
                  id="subject"
                  name="subject"
                  className={`${inputClasses} cursor-pointer`}
                  value={formState.subject}
                  onChange={handleChange}
                >
                  <option value="">SELECIONE O ASSUNTO</option>
                  <option value="Orcamento">ORÇAMENTO</option>
                  <option value="Pecas">PEÇAS</option>
                  <option value="Servicos">SERVIÇOS</option>
                  <option value="Outros">OUTROS</option>
                </select>
              </div>

              <div>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  placeholder="SUA MENSAGEM"
                  className={`${inputClasses} resize-none`}
                  value={formState.message}
                  onChange={handleChange}
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-black dark:bg-white text-white dark:text-black py-5 text-xs font-black uppercase tracking-[0.2em] hover:scale-[1.02] transition-all flex items-center justify-center gap-3 shadow-lg hover:shadow-xl rounded-lg md:rounded-none"
              >
                Enviar <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};