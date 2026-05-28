'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Check, 
  MapPin, 
  Search, 
  Sparkles, 
  Calendar, 
  Clock, 
  ChevronRight, 
  ArrowLeft, 
  Utensils, 
  Wine, 
  BookOpen, 
  FileText
} from 'lucide-react';

interface ClientLookup {
  name: string;
  company: string;
  avatar: string;
}

export default function EventsWizardView() {
  const [step, setStep] = useState<number>(1);
  const [eventName, setEventName] = useState<string>('Jantar de Gala Primavera 2026');
  const [eventType, setEventType] = useState<string>('Gala');
  const [selectedClient, setSelectedClient] = useState<string>('Alexandra Montenaro');
  const [eventDate, setEventDate] = useState<string>('2026-10-14');
  const [eventTime, setEventTime] = useState<string>('19:00');
  const [venueSearch, setVenueSearch] = useState<string>('The Plaza Hotel, Nova Iorque');
  
  // Logistics step configurations
  const [selectedMenu, setSelectedMenu] = useState<string>('Buffet Premium');
  const [selectedBar, setSelectedBar] = useState<string>('Open Bar Ultra Premium');
  const [seatingType, setSeatingType] = useState<string>('Mesas Redondas Imperial');
  const [attendeeCount, setAttendeeCount] = useState<number>(180);

  // CRM client lookup candidates
  const clientsLookup: ClientLookup[] = [
    { name: 'Alexandra Montenaro', company: 'Montenaro Studios', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjqHkOYUaNEo8gbF42hXLWJbGlhKdiqnIjJFLDKRzPI9u2PH3-2YZcuxgOJMPARrYShEvuS4_UbYOOSNreka4_YkJQelNDHlNi0VIDRxXWe-GN6YOYNcZunbIlgFxpCXUpgwVkRErlD1lWp0BzDKeuRl9ofRWJlimhRWxFq5RQ6pN7K-QZ_W_N90Dz9cduL8laHXF7C-MoTjTwW6u6IVVTMubnzO64x8ObCHXDrcChUdrWZSx4uQ1dP2xFevO45dkWxL8uhzHtGtY' },
    { name: 'Helena Silveira', company: 'Silveira Joalheiros', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAYiPC6IqyPpRcswNXC9z2REdUOUPpNI2H6pxpjOA6gLbNyUNKwH7I9TEL3MtSwNzHUbf2n0Lnn9KF1gJlNXFdFauB9zx3ntzqg3N6j49GsB0r42MjF8LBYYbeSgSCjt2tk2JF2NJDqUMFTWyzA9R1GLgMrJBGVQb93f5P9b4NkG9scl3CRiGmduKyAmcgMZdaPXBJfcmw5sOadLY4ApPtAPmfa3IEwh9ufY7NI0E42_vDdzmXWEbyU0TmPM1XhyBFIE-SzWbtA6-o' },
    { name: 'Ricardo Mendes', company: 'Banco Vanguarda', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjuXtiQvIEjRmbMVZTKhaQRm-OusT7Yhr2SKjzr7_XyLmBF2QHMAW6HL3zl212528e3PGXdJ4OjMpapbnEFPAS2mJ_zkNfL5PmPr0aWLvP22n8nGM07qT_5Kchr3JwNnyYFrJ6xk90ACkrdhTNkF95WpYI-D-yG-piw3-1KLO4CbmfhKkAi5Iyvq0LUNOjQqUFa8yUtwv_s-U781QWDsRRl2w8Ihqgflm6hgOvWj2uaZ5uwe1P3mhJ43jaNEkiy7jzzLbAUDDDByo' },
  ];

  const eventTypesList = [
    { id: 'Gala', desc: 'Gala de Prestígio', label: 'Elegância e trajes formais.' },
    { id: 'Casamento', desc: 'Casamento / Bodas', label: 'Cenário romântico e buffet refinado.' },
    { id: 'Corporativo', desc: 'Retiro Corporativo', label: 'Lançamentos de marcas e palestras.' },
  ];

  const [toastAlert, setToastAlert] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastAlert(msg);
    setTimeout(() => {
      setToastAlert(null);
    }, 4000);
  };

  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      triggerToast('Contrato emitido e evento ativado com sucesso!');
      setStep(1);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="space-y-6 relative animate-fade-in">
      {/* Alert toast info */}
      {toastAlert && (
        <div className="fixed top-6 right-6 bg-[#041632] text-[#fed488] px-6 py-4 rounded-xl shadow-2xl border border-[#fed488]/40 z-50 flex items-center gap-3 animate-bounce">
          <Sparkles className="h-5 w-5" />
          <div>
            <p className="font-sans font-bold text-sm">Contrato Ativado</p>
            <p className="font-sans text-xs text-white/95 mt-0.5">{toastAlert}</p>
          </div>
        </div>
      )}

      {/* Title block */}
      <div className="bg-white p-6 rounded-xl border border-[#c5c6ce]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#041632]">Configuração de Novo Evento</h2>
          <p className="font-sans text-xs text-[#44474d] mt-1">
            Gereie a associação com parceiros, logística alimentar, data de cronograma e contratos.
          </p>
        </div>
        <div className="text-xs text-gray-400 font-mono">
          Operação: Nova Ficha de Banquetes
        </div>
      </div>

      {/* Step Stepper Header (3-step progress setup) */}
      <div className="bg-white px-8 py-4 rounded-xl border border-[#c5c6ce]/30 flex items-center justify-between">
        <div className="flex items-center gap-4 w-full justify-around sm:justify-start">
          
          <button 
            type="button" 
            onClick={() => setStep(1)}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <span className={`w-7 h-7 rounded-full flex items-center justify-center font-sans text-xs font-bold transition-all ${
              step >= 1 ? 'bg-[#041632] text-white ring-4 ring-[#b7c7eb]/30' : 'bg-slate-100 text-slate-500'
            }`}>
              1
            </span>
            <span className={`text-xs font-sans font-bold hidden sm:inline ${step === 1 ? 'text-[#041632]' : 'text-slate-400 group-hover:text-slate-600'}`}>
              Informações Básicas
            </span>
          </button>

          <span className="h-0.5 bg-slate-200 w-16 hidden sm:block" />

          <button 
            type="button" 
            onClick={() => { if (eventName && selectedClient) setStep(2); }}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <span className={`w-7 h-7 rounded-full flex items-center justify-center font-sans text-xs font-bold transition-all ${
              step >= 2 ? 'bg-[#041632] text-white ring-4 ring-[#b7c7eb]/30' : 'bg-slate-100 text-slate-500'
            }`}>
              2
            </span>
            <span className={`text-xs font-sans font-bold hidden sm:inline ${step === 2 ? 'text-[#041632]' : 'text-slate-400 group-hover:text-slate-600'}`}>
              Logística & Banquete
            </span>
          </button>

          <span className="h-0.5 bg-slate-200 w-16 hidden sm:block" />

          <button 
            type="button" 
            onClick={() => { if (eventName && selectedClient) setStep(3); }}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <span className={`w-7 h-7 rounded-full flex items-center justify-center font-sans text-xs font-bold transition-all ${
              step >= 3 ? 'bg-[#041632] text-white ring-4 ring-[#b7c7eb]/30' : 'bg-slate-100 text-slate-500'
            }`}>
              3
            </span>
            <span className={`text-xs font-sans font-bold hidden sm:inline ${step === 3 ? 'text-[#041632]' : 'text-slate-400 group-hover:text-slate-600'}`}>
              Revisão & Contrato
            </span>
          </button>

        </div>
      </div>

      {/* ======================= STEP 1: BASIC INFO ======================= */}
      {step === 1 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main info fields on the left */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-[#c5c6ce]/30 p-6 md:p-8 space-y-6">
            <h3 className="font-serif text-lg font-bold text-[#041632] pb-3 border-b border-slate-100">
              Passo 1: Ficha Identificadora
            </h3>

            {/* Client relation lookup */}
            <div className="space-y-2">
              <label className="text-xs font-sans font-bold text-[#041632] block">Selecione o Cliente Associado *</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {clientsLookup.map((cli) => (
                  <button
                    key={cli.name}
                    type="button"
                    onClick={() => setSelectedClient(cli.name)}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-3 relative ${
                      selectedClient === cli.name 
                        ? 'border-[#775a19] bg-[#fed488]/10' 
                        : 'border-[#c5c6ce]/30 hover:border-slate-400 hover:bg-slate-50'
                    }`}
                  >
                    <Image
                      src={cli.avatar}
                      alt={cli.name}
                      width={32}
                      height={32}
                      className="rounded-full object-cover fallback-bg shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="min-w-0">
                      <p className="font-sans font-bold text-xs text-[#041632] truncate">{cli.name}</p>
                      <p className="text-[10px] text-gray-500 truncate">{cli.company}</p>
                    </div>
                    {selectedClient === cli.name && (
                      <span className="absolute top-2 right-2 bg-[#775a19] text-white rounded-full p-0.5">
                        <Check className="h-2.5 w-2.5" />
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Event title */}
            <div className="space-y-1">
              <label className="text-xs font-sans font-bold text-[#041632] block">Nome Oficial do Evento *</label>
              <input
                type="text"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                placeholder="ex: Lançamento de Fragrância Exclusiva Dior"
                className="w-full bg-slate-50 border border-gray-300 rounded-lg p-3 text-xs font-sans font-medium focus:ring-1 focus:ring-[#041632] outline-hidden placeholder-gray-400 text-[#041632]"
              />
            </div>

            {/* Category selection clicks */}
            <div className="space-y-2">
              <label className="text-xs font-sans font-bold text-[#041632] block">Estilo de Cerimonial & Recepção</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {eventTypesList.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setEventType(type.id)}
                    className={`p-4 rounded-lg border text-left transition-all flex flex-col justify-between h-28 cursor-pointer ${
                      eventType === type.id 
                        ? 'border-[#041632] bg-[#b7c7eb]/15' 
                        : 'border-[#c5c6ce]/30 hover:border-slate-400 hover:bg-slate-50/50'
                    }`}
                  >
                    <span className="font-sans font-bold text-xs text-[#041632] block">{type.desc}</span>
                    <span className="text-[10.5px] text-gray-500 leading-snug font-sans block mt-1">
                      {type.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Date time grids */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-sans font-bold text-[#041632] block">Data Agendada</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full bg-slate-50 border border-gray-300 rounded-lg pl-9 pr-3 py-2.5 text-xs font-sans focus:ring-1 focus:ring-[#041632] text-[#041632]"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-sans font-bold text-[#041632] block">Hora de Entrada/Abertura</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="time"
                    value={eventTime}
                    onChange={(e) => setEventTime(e.target.value)}
                    className="w-full bg-slate-50 border border-gray-300 rounded-lg pl-9 pr-3 py-2.5 text-xs font-sans focus:ring-1 focus:ring-[#041632] text-[#041632]"
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Location & Map box on the right (Captures visual requested) */}
          <div className="bg-white rounded-xl border border-[#c5c6ce]/30 p-6 shadow-xs flex flex-col justify-between">
            <div className="space-y-4">
              <h4 className="text-xs font-sans font-bold text-[#041632] uppercase tracking-wider">Local do Evento</h4>
              
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Pesquisar salão parceiro..."
                  value={venueSearch}
                  onChange={(e) => setVenueSearch(e.target.value)}
                  className="w-full bg-slate-50 border border-gray-300 rounded-lg pl-9 pr-3 py-2 text-xs focus:ring-1 focus:ring-[#041632] outline-hidden text-[#041632]"
                />
              </div>

              {/* Digital Blueprint Map view with descriptive tooltip */}
              <div className="relative w-full h-64 bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjw55LnCjSCgABPQq4mtzpXWTYfcTLduWid564z7nRdxbp4P6xx-z68bxF42u50ptPurFbYS-KvB3zcvLdIUMi7VzZbFnLGUxylX078Hfe1aTuowPl4Rg_gX6Teg-8niWFe93X9335mHjTYMY-pdLHmVTqEsoGKUB6ymgfbpOh2MwzSjZjuV6eXNziHbWHh3AeBRGq_EPYqyo1TCVygn-kzwJ-ldA8hFJv37uDbKC4dadH6W6Rwg7kFl9ef9D5waWWfNwIsvqrfIY"
                  alt="The Plaza New York Blueprint"
                  fill
                  className="object-cover fallback-bg"
                  referrerPolicy="no-referrer"
                />

                {/* Micro-map locator overlay */}
                <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-xs p-3.5 rounded-lg max-w-[210px] shadow-lg border border-slate-200/50">
                  <div className="flex gap-2 items-start">
                    <span className="p-1 rounded-sm bg-red-100 text-red-600 shrink-0">
                      <MapPin className="h-3 w-3" />
                    </span>
                    <div>
                      <h5 className="font-sans font-bold text-[10.5px] text-[#041632]">The Plaza Hotel</h5>
                      <p className="text-[9.5px] text-gray-500 leading-snug mt-0.5">5th Avenue & Central Park South, NY 10019</p>
                      <p className="text-[9px] text-[#775a19] uppercase font-bold mt-1 tracking-wider">Salão VIP Reservado</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-[10px] text-gray-400 font-mono tracking-wider uppercase text-center mt-4 font-semibold">
              The Plaza Ballroom • New York
            </p>
          </div>

        </div>
      )}

      {/* ======================= STEP 2: LOGISTICS & BANQUET ======================= */}
      {step === 2 && (
        <div className="bg-white rounded-xl border border-[#c5c6ce]/30 p-6 md:p-8 space-y-6">
          <h3 className="font-serif text-lg font-bold text-[#041632] pb-3 border-b border-slate-100">
            Passo 2: Banquetes & Layout Logístico
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="text-xs font-sans font-bold text-[#041632] uppercase tracking-wider flex items-center gap-1.5">
                <Utensils className="h-4 w-4 text-[#775a19]" />
                <span>Cardápio & Alimentos</span>
              </h4>

              <div className="space-y-1">
                <label className="text-xs font-sans font-bold text-[#44474d]">Pacote Culinário Selecionado</label>
                <select
                  value={selectedMenu}
                  onChange={(e) => setSelectedMenu(e.target.value)}
                  className="w-full bg-slate-50 border border-gray-300 rounded-lg p-2.5 text-xs font-sans text-[#041632] cursor-pointer"
                >
                  <option value="Buffet Premium">Buffet Premium (R$ 380/pax)</option>
                  <option value="Jantar Degustação">Jantar Degustação Premium (R$ 520/pax)</option>
                  <option value="Coquetel Executivo">Coquetel Corporativo Executivo (R$ 195/pax)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-sans font-bold text-[#44474d]">Serviços de Bebidas</label>
                <select
                  value={selectedBar}
                  onChange={(e) => setSelectedBar(e.target.value)}
                  className="w-full bg-slate-50 border border-gray-300 rounded-lg p-2.5 text-xs font-sans text-[#041632] cursor-pointer"
                >
                  <option value="Open Bar Ultra Premium">Open Bar Ultra Premium (Importados & Vinho Brut)</option>
                  <option value="Bar Executivo">Bar Executivo (Vinhos Clássicos & Chopp Nacional)</option>
                  <option value="Bebidas Sem Álcool de Grife">Recepção de Coquetéis Sem Álcool Artesanais</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-sans font-bold text-[#041632] uppercase tracking-wider flex items-center gap-1.5">
                <Wine className="h-4 w-4 text-[#775a19]" />
                <span>Mobiliário & Convidados</span>
              </h4>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-sans font-bold text-[#44474d]">Estimativa de Pax</label>
                  <input
                    type="number"
                    value={attendeeCount}
                    onChange={(e) => setAttendeeCount(parseInt(e.target.value) || 0)}
                    className="w-full bg-slate-50 border border-gray-300 rounded-lg p-2.5 text-xs text-[#041632] font-semibold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-sans font-bold text-[#44474d]">Estilo de Mesa</label>
                  <select
                    value={seatingType}
                    onChange={(e) => setSeatingType(e.target.value)}
                    className="w-full bg-slate-50 border border-gray-300 rounded-lg p-2.5 text-xs text-[#041632] cursor-pointer"
                  >
                    <option value="Mesas Redondas Imperial">Mesas Redondas Imperial (10 pax/cada)</option>
                    <option value="Mesa em U Executiva">Layout em U Corporativo</option>
                    <option value="Estilo Coquetel Volante">Coquetel em Pé (Bistrôs Altos)</option>
                  </select>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ======================= STEP 3: REVIEW & CONTRACTS ======================= */}
      {step === 3 && (
        <div className="bg-white rounded-xl border border-[#c5c6ce]/30 p-6 md:p-8 space-y-6">
          <h3 className="font-serif text-lg font-bold text-[#041632] pb-3 border-b border-slate-100 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-[#041632]" />
            <span>Passo 3: Revisão das Condições Contratuais</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-sans">
            <div className="bg-slate-50 p-6 rounded-lg space-y-4 relative border border-[#c5c6ce]/25">
              <div className="absolute top-4 right-4 text-gray-300">
                <FileText className="h-12 w-12" />
              </div>
              
              <h4 className="text-xs uppercase font-bold text-[#041632] tracking-wider">Resumo Técnico Operacional</h4>
              
              <div className="space-y-2.5 text-xs text-[#44474d]">
                <p><strong>Evento:</strong> {eventName}</p>
                <p><strong>Patrono Principal:</strong> {selectedClient}</p>
                <p><strong>Tipo:</strong> {eventType}</p>
                <p><strong>Data & Horário:</strong> {eventDate} às {eventTime}</p>
                <p><strong>Local Reservado:</strong> {venueSearch}</p>
              </div>
            </div>

            <div className="bg-slate-50 p-6 rounded-lg space-y-4 border border-[#c5c6ce]/25">
              <h4 className="text-xs uppercase font-bold text-[#775a19] tracking-wider">Catering & Logística de Alimentos</h4>

              <div className="space-y-2.5 text-xs text-[#44474d]">
                <p><strong>Menu:</strong> {selectedMenu}</p>
                <p><strong>Pacote de Bar:</strong> {selectedBar}</p>
                <p><strong>Convidados Estimados:</strong> {attendeeCount} pax</p>
                <p><strong>Disposição de Cadeiras:</strong> {seatingType}</p>
                <p className="border-t border-[#c5c6ce]/30 pt-2.5 text-[#041632] font-bold">
                  Orçamento Estimado: R$ {(attendeeCount * 350).toLocaleString('pt-BR')},00
                </p>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* FOOTER ACTION STICKY BAR */}
      <div className="p-4 bg-white rounded-xl border border-[#c5c6ce]/30 flex justify-between items-center shadow-xs">
        {step > 1 ? (
          <button
            type="button"
            onClick={handlePrevStep}
            className="bg-white border border-gray-300 hover:bg-slate-50 text-gray-700 font-sans font-semibold text-xs px-4 py-2 rounded-lg flex items-center gap-1 cursor-pointer transition-all"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Etapa Anterior</span>
          </button>
        ) : (
          <div className="text-[10px] text-gray-400 font-medium">Ficha Inicial</div>
        )}

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => { alert('Rascunho digital arquivado com sucesso.'); }}
            className="hover:bg-slate-50 text-[#041632] font-sans font-semibold text-xs px-4 py-2 border border-[#c5c6ce]/30 rounded-lg cursor-pointer transition-all"
          >
            Salvar Rascunho
          </button>
          
          <button
            type="button"
            onClick={handleNextStep}
            className="bg-[#041632] text-white hover:opacity-95 font-sans font-semibold text-xs px-5 py-2.5 rounded-lg flex items-center gap-1 cursor-pointer transition-all shadow-xs"
          >
            <span>{step === 3 ? 'Confirmar & Ativar Contrato' : 'Avançar Próxima Etapa'}</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

    </div>
  );
}
