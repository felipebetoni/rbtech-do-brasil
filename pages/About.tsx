import React from 'react';
import { History, Globe, Handshake, Mail, Phone, MapPin, Download, Share2, Smartphone } from 'lucide-react';
import { Logo } from '../components/Logo';

export const About: React.FC = () => {
  // Dados do Cartão
  const cardData = {
    fn: "Rafael Betoni",
    role: "CEO",
    org: "RBTech do Brasil",
    tel: "+5541992261285",
    email: "rafael.betoni@rbtechbrasil.com",
    url: "https://rbtechbrasil.com",
    address: "Curitiba, Brasil"
  };

  // Gerar String vCard para Download e QR Code
  const vCardString = `BEGIN:VCARD
VERSION:3.0
N:Betoni;Rafael;;;
FN:${cardData.fn}
ORG:${cardData.org}
TITLE:${cardData.role}
TEL;TYPE=CELL:${cardData.tel}
EMAIL:${cardData.email}
URL:${cardData.url}
ADR;TYPE=WORK:;;${cardData.address};;;;
END:VCARD`;

  // URL para gerar QR Code que contém o vCard completo
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(vCardString)}`;
  
  // URL para download do arquivo .vcf
  const vCardDownloadUrl = `data:text/vcard;charset=utf-8,${encodeURIComponent(vCardString)}`;

  return (
    <div className="animate-fade-in bg-white dark:bg-slate-950 transition-colors">
       {/* Hero for About */}
       <section className="py-20 md:py-32 relative overflow-hidden">
         <div className="max-w-7xl mx-auto px-4 relative z-10 text-center md:text-left">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6 block">Institucional</span>
            <h1 className="text-5xl md:text-8xl font-black text-black dark:text-white tracking-tighter uppercase mb-8 leading-[0.9]">
              Nossa<br/><span className="font-card-serif lowercase tracking-normal">identidade</span>
            </h1>
         </div>
       </section>

       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
         <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
           
           {/* Seção do Cartão Digital Fiel ao Design */}
           <div className="space-y-8 order-2 lg:order-1">
              <div className="relative group perspective-1000">
                {/* Container do Cartão - Fundo Cinza (#E6E6E6 approx) */}
                <div className="w-full max-w-xl mx-auto bg-[#E8E8E8] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)] aspect-[1.75/1] relative overflow-hidden transition-transform duration-500 hover:rotate-1 hover:scale-[1.02]">
                  
                  {/* Layout do Cartão */}
                  <div className="absolute inset-0 p-4 sm:p-6 md:p-10 flex items-center">
                    <div className="flex w-full h-full">
                      
                      {/* Lado Esquerdo: Nome e Cargo */}
                      <div className="flex-1 flex flex-col justify-center pr-2 md:pr-8">
                        <h2 className="text-xl sm:text-2xl md:text-4xl font-black uppercase tracking-tight text-black leading-none mb-2 md:mb-4">
                          Rafael Betoni
                        </h2>
                        <span className="font-card-serif text-sm sm:text-lg md:text-2xl text-black font-light tracking-wide">
                          CEO
                        </span>
                      </div>

                      {/* Divisória Vertical */}
                      <div className="w-[2px] bg-black h-full opacity-90 mx-2 md:mx-4"></div>

                      {/* Lado Direito: Contato e QR */}
                      <div className="flex-1 flex flex-col justify-center pl-2 md:pl-6 space-y-3 md:space-y-6">
                        
                        {/* Infos */}
                        <div className="space-y-1 md:space-y-2 text-right md:text-left">
                          <div className="flex items-center justify-end md:justify-start gap-1 md:gap-2 text-black">
                            <Smartphone size={12} className="md:hidden" />
                            <span className="text-[9px] sm:text-[10px] md:text-xs font-bold tracking-wider whitespace-nowrap">+55 41 99226-1285</span>
                            <Smartphone size={16} className="hidden md:block" strokeWidth={2.5}/> 
                          </div>
                          <div className="flex items-center justify-end md:justify-start gap-1 md:gap-2 text-black">
                            <Mail size={12} className="md:hidden" />
                            <span className="text-[8px] sm:text-[9px] md:text-[11px] font-bold tracking-wider break-all md:whitespace-nowrap">rafael.betoni@rbtechbrasil.com</span>
                            <Mail size={16} className="hidden md:block" strokeWidth={2.5}/> 
                          </div>
                        </div>

                        {/* QR Code */}
                        <div className="flex justify-end md:justify-start">
                          <div className="bg-white p-1 md:p-2 shadow-sm">
                            <img 
                              src={qrCodeUrl} 
                              alt="Scan to Add Contact" 
                              className="w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 mix-blend-multiply"
                            />
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Botões de Ação */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-xl mx-auto">
                <a 
                  href={vCardDownloadUrl} 
                  download="Rafael_Betoni_RBTech.vcf"
                  className="flex-1 bg-black text-white px-6 py-4 text-xs font-black uppercase tracking-[0.2em] hover:bg-slate-800 transition-colors flex items-center justify-center gap-3 shadow-lg rounded-lg md:rounded-none"
                >
                  <Download size={16} /> Salvar (.vcf)
                </a>
                <a 
                  href="https://wa.me/5541992261285"
                  target="_blank"
                  rel="noreferrer" 
                  className="flex-1 border border-black dark:border-white text-black dark:text-white px-6 py-4 text-xs font-black uppercase tracking-[0.2em] hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors flex items-center justify-center gap-3 rounded-lg md:rounded-none"
                >
                  <Share2 size={16} /> Enviar Msg
                </a>
              </div>
              
              <p className="text-center text-[10px] uppercase tracking-widest text-slate-400">
                Aponte a câmera para o QR Code para adicionar à agenda
              </p>
           </div>

           {/* Texto Institucional */}
           <div className="space-y-12 pt-0 lg:pt-8 order-1 lg:order-2">
             <div className="space-y-6">
               <h3 className="text-2xl md:text-3xl font-black tracking-tighter uppercase border-l-4 border-black dark:border-white pl-6">Sobre a RBTech</h3>
               <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-medium pl-6">
                 Nos últimos 5 anos como RBTech do Brasil, consolidamos parcerias que nos permitem oferecer tecnologia de ponta com o melhor custo-benefício do mercado.
               </p>
               <p className="text-sm md:text-base text-slate-500 leading-relaxed font-medium pl-6">
                 Nossa atuação abrange desde consultoria técnica para implementação de novos workflows até a manutenção corretiva emergencial de equipamentos críticos como Basysprint e DOIE.
               </p>
             </div>

             <div className="grid gap-8 pl-6">
               {[
                 { icon: History, title: "Trajetória", text: "15 anos de expertise técnica no mercado gráfico." },
                 { icon: Globe, title: "Alcance", text: "Operação global: Brasil, LatAm, EUA e Europa." },
                 { icon: Handshake, title: "Parcerias", text: "Representantes exclusivos das marcas DOIE e WISDOM." }
               ].map((item, i) => (
                 <div key={i} className="flex gap-6 group">
                    <div className="w-12 h-12 bg-slate-50 dark:bg-slate-900 flex items-center justify-center border border-black/5 dark:border-white/10 flex-shrink-0">
                      <item.icon size={20} className="text-black dark:text-white" />
                    </div>
                    <div>
                      <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-2">{item.title}</h4>
                      <p className="text-sm text-slate-500 font-medium">{item.text}</p>
                    </div>
                 </div>
               ))}
             </div>
           </div>
         </div>
       </div>
    </div>
  );
};