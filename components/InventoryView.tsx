'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Plus, 
  Trash2, 
  Sparkles, 
  Check, 
  DollarSign, 
  FileText, 
  Image as ImageIcon,
  ShieldCheck, 
  Filter, 
  ChevronRight,
  Utensils,
  Maximize2,
  X
} from 'lucide-react';

interface FoodPackage {
  id: string;
  name: string;
  price: number;
  minPax: number;
  description: string;
  image: string;
  tags: string[];
  features: string[];
}

interface TechnicalItem {
  name: string;
  category: string;
  description: string;
  rentalPrice: number;
  stock: number;
  unit: string;
}

export default function InventoryView() {
  const [activeSegment, setActiveSegment] = useState<'catering' | 'equipment'>('catering');
  const [toastAlert, setToastAlert] = useState<string | null>(null);

  // Dynamic Catering list state
  const [foodPackages, setFoodPackages] = useState<FoodPackage[]>([
    {
      id: 'pkg-1',
      name: 'Buffet Premium Imperial',
      price: 380,
      minPax: 100,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAOsh3EE5_pHM9JvgUHhano1IfH49mjEkxbNkpWVRnKopiNhkAqKJyqoElSJfv8s6bcQUSOrxAQzq0lNMj37ingH0jDcrHwgteoSSIKM-7Nv1kTyePMkItmZPux3d2YHSGQ2R0ysa1RTHEQBPtEMhnsaJh1e_JgA7fF7jDQGykLYgW-T1ySArMeyJCx_XAG2H45lBKvgsRI3HA8V6FEblT9eEcBCH1yEHeA3WXVOhJkfRanc915MYny5o26nuDluyZ44WJO0GvuTBs',
      description: '5 pratos quentes, ilha de frios nobres artesanais, bar premium local de espumantes brut e doces clássicos.',
      tags: ['SemGlúten', 'LactoseFree', 'OpçõesVeganas'],
      features: ['Serviço Volante Rápido', 'Ilha Clássica', 'Maître Dedicado exclusividade'],
    },
    {
      id: 'pkg-2',
      name: 'Coquetel Executivo Rústico',
      price: 195,
      minPax: 50,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDHy3zskaAQo9VX9771BBEWAIWPUk_uRxm6Wdtm6Q01KIkodQipFwO-jSz3eRbc5fltFasuBlB2LmHVDibGQjTRYMl0VJECtqtfaceV2Eaat40vE8P0YuVw-sRfmx0Q2r7PlGLMH0rsFBAqRyILIQ4Rnx6mJURvF_j6SjzFjXLMOnJ_ybaptdC5bo_m1SEgZxGxoDa2Rb30MHrtOzN_b6LyoI_3xJAb9bRODgI5uy-uOYwLrrp2neVM5QOzW8ycPy9BF8r9QFZNc1A',
      description: 'Seleção gourmet de finger foods contemporâneas, bebidas artesanais saudáveis e chopps da casa.',
      tags: ['FingerFood', 'CervejaArtesanal'],
      features: ['Atendimento Rápido 3 Horas', 'Garçons de terno fino', 'Copos de Cristal lapidado'],
    },
    {
      id: 'pkg-3',
      name: 'Jantar Degustação Confiance',
      price: 520,
      minPax: 20,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3hWCS-AGvECkF2p2TjHUD-uZfhTQnCY0xHNVq5nnF1bciW2sj_owsyCk32VAqLO9t1qp-23N-ilpp_-f0xE9egekCbE65Ll5S9yB2a8j59Go5cdjxNmajsxz38ZzSI1WPQ7jueEOuPzd2iOPxXkmZPU_DzXg1TLELs_HX9HT5WzIev64yZqqv9RokAeyA3nf6YHtz5ygv8bpMh1EGdjGHmR1KorRFihzhMWG946pWKzNKsyYxJ8wkXzyJcZY3NiwgDF3xgjncZTE',
      description: 'Criação assinada por Chef Estrelado. Menu confiance composto por 7 tempos harmonizados.',
      tags: ['ChefSignature', 'VinhosAdega', 'EmpratadoSoberano'],
      features: ['Chef presencial de bancada', 'Harmonização de Sommelier', 'Cardápio personalizado algodão'],
    }
  ]);

  // Culinary additions Modal States
  const [modalOpen, setModalOpen] = useState(false);
  const [mName, setMName] = useState('');
  const [mPrice, setMPrice] = useState(250);
  const [mMinPax, setMMinPax] = useState(30);
  const [mDesc, setMDesc] = useState('');
  const [mTagsInput, setMTagsInput] = useState<string[]>(['SemGlúten', 'Gourmet']);
  const [mFeaturesInput, setMFeaturesInput] = useState<string>('Serviço de Prataria, Adega Clássica');
  const [mCoverPhoto, setMCoverPhoto] = useState(
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAOsh3EE5_pHM9JvgUHhano1IfH49mjEkxbNkpWVRnKopiNhkAqKJyqoElSJfv8s6bcQUSOrxAQzq0lNMj37ingH0jDcrHwgteoSSIKM-7Nv1kTyePMkItmZPux3d2YHSGQ2R0ysa1RTHEQBPtEMhnsaJh1e_JgA7fF7jDQGykLYgW-T1ySArMeyJCx_XAG2H45lBKvgsRI3HA8V6FEblT9eEcBCH1yEHeA3WXVOhJkfRanc915MYny5o26nuDluyZ44WJO0GvuTBs'
  );

  // Technical Equipment Form States
  const [eqName, setEqName] = useState('Painel de Led Modular Ultra-P 4K');
  const [eqCategory, setEqCategory] = useState('Iluminação & Som');
  const [eqDescription, setEqDescription] = useState('Painel técnico de altíssima pixelização de brilho para transmissão corporativa e casamentos finos em áreas cobertas.');
  const [eqPrice, setEqPrice] = useState(4800);
  const [eqStock, setEqStock] = useState(12);
  const [eqUnit, setEqUnit] = useState('m²');

  const triggerToast = (msg: string) => {
    setToastAlert(msg);
    setTimeout(() => {
      setToastAlert(null);
    }, 4500);
  };

  const handleCreateFoodPackage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mName.trim() || !mDesc.trim()) {
      triggerToast('Por favor preencha os dados básicos do cardápio alimentício!');
      return;
    }

    const newPackage: FoodPackage = {
      id: `pkg-${Date.now()}`,
      name: mName,
      price: mPrice,
      minPax: mMinPax,
      description: mDesc,
      image: mCoverPhoto,
      tags: mTagsInput,
      features: mFeaturesInput.split(',').map(f => f.trim()).filter(Boolean),
    };

    setFoodPackages([...foodPackages, newPackage]);
    setModalOpen(false);
    triggerToast(`Cardápio de Catering "${mName}" finalizado e publicado!`);

    // Reset fields
    setMName('');
    setMDesc('');
  };

  const handleSaveEquipment = (e: React.FormEvent) => {
    e.preventDefault();
    triggerToast(`Sinalizado: Equipamento "${eqName}" editado e catalogado no estoque!`);
    alert(`O item técnico "${eqName}" foi sincronizado com sucesso no armazém central Elite Suite.`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Alert toast info */}
      {toastAlert && (
        <div className="fixed top-6 right-6 bg-[#041632] text-[#fed488] px-6 py-4 rounded-xl shadow-2xl border border-[#fed488]/40 z-50 flex items-center gap-3 animate-bounce">
          <Sparkles className="h-5 w-5 text-[#fed488]" />
          <div>
            <p className="font-sans font-bold text-sm">Atualização do Catálogo</p>
            <p className="font-sans text-xs text-white/95 mt-0.5">{toastAlert}</p>
          </div>
        </div>
      )}

      {/* Header section with segments switcher */}
      <div className="bg-white p-6 rounded-xl border border-[#c5c6ce]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#041632]">Gestão de Recursos & Cardápios</h2>
          <p className="font-sans text-xs text-[#44474d] mt-1">
            Configure pratos gourmet finos ou certifique o estoque de equipamentos de infraestrutura física.
          </p>
        </div>

        {/* Master segments selector tabs */}
        <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200 shrink-0">
          <button
            onClick={() => setActiveSegment('catering')}
            className={`px-4 py-2 rounded-md font-sans font-bold text-xs transition-all cursor-pointer ${
              activeSegment === 'catering'
                ? 'bg-white text-[#041632] shadow-xs'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            Pacotes de Catering
          </button>
          <button
            onClick={() => setActiveSegment('equipment')}
            className={`px-4 py-2 rounded-md font-sans font-bold text-xs transition-all cursor-pointer ${
              activeSegment === 'equipment'
                ? 'bg-white text-[#041632] shadow-xs'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            Equipamentos Físicos
          </button>
        </div>
      </div>

      {/* ======================= SEGMENT 1: CATERING PACKAGES ======================= */}
      {activeSegment === 'catering' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-serif text-lg font-bold text-[#041632]">Insumos Culinários e Buffet</h3>
            <button
              onClick={() => setModalOpen(true)}
              className="bg-[#041632] text-white hover:opacity-95 font-sans font-semibold text-xs px-4 py-2 rounded-lg flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95 transition-all"
            >
              <Plus className="h-4 w-4" />
              <span>Novo Cardápio Gastronômico</span>
            </button>
          </div>

          {/* Cards Grid list (Captures aesthetics of image 5 and 6) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {foodPackages.map((pkg) => (
              <div 
                key={pkg.id} 
                className="bg-white rounded-xl border border-[#c5c6ce]/30 overflow-hidden shadow-xs flex flex-col justify-between group hover:border-[#775a19]/55 transition-all"
              >
                {/* Image container absolute heights */}
                <div className="relative w-full h-44 border-b border-slate-100">
                  <Image
                    src={pkg.image}
                    alt={pkg.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 fallback-bg"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-[#041632] text-white font-sans font-bold text-[10.5px] px-3 py-1 rounded-sm shadow-md">
                    R$ {pkg.price.toLocaleString('pt-BR')},00 / Pax
                  </div>
                </div>

                {/* Info Text */}
                <div className="p-5 flex-1 space-y-4">
                  <div>
                    <h4 className="font-serif text-lg font-bold text-[#041632]">{pkg.name}</h4>
                    <p className="font-sans text-xs text-slate-500 mt-2 leading-relaxed min-h-[48px] line-clamp-3">
                      {pkg.description}
                    </p>
                  </div>

                  {/* Dietary constraints hash badges */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {pkg.tags.map((tag, key) => (
                      <span key={key} className="bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded-sm text-[9.5px]">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Feature bullets */}
                  <div className="border-t border-slate-100 pt-3 space-y-1.5">
                    {pkg.features.map((feat, key) => (
                      <p key={key} className="text-[10.5px] font-sans text-slate-600 flex items-center gap-1.5 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#775a19]" />
                        <span>{feat}</span>
                      </p>
                    ))}
                  </div>
                </div>

                {/* Action button */}
                <div className="p-4 bg-slate-50 border-t border-[#c5c6ce]/20 flex justify-between items-center">
                  <span className="text-[10.5px] font-sans text-gray-500 font-semibold">Min. de Pax: <strong>{pkg.minPax}</strong></span>
                  <button
                    onClick={() => {
                      triggerToast(`Atribuído: "${pkg.name}" carregado como seleção de banquetes padrão.`);
                    }}
                    className="text-[#775a19] text-xs font-bold hover:underline cursor-pointer"
                  >
                    Carregar no Stepper →
                  </button>
                </div>
              </div>
            ))}

            {/* Dash placeholder to add new culinary menu */}
            <div 
              onClick={() => setModalOpen(true)}
              className="border-2 border-dashed border-[#c5c6ce] hover:border-[#775a19] bg-white rounded-xl flex flex-col items-center justify-center p-8 text-center cursor-pointer transition-colors min-h-[380px]"
            >
              <Utensils className="h-10 w-10 text-gray-400 mb-3" />
              <h4 className="font-serif font-bold text-gray-750">Montar Nova Experiência Culinária</h4>
              <p className="text-xs text-gray-500 mt-1.5 max-w-xs font-sans">
                Trabalhe gastronomia personalizada, pratos quentes finos e adequação para celíacos.
              </p>
              <span className="mt-4 inline-flex items-center gap-1 bg-amber-50 rounded-full px-3 py-1.5 text-xs text-[#775a19] font-bold border border-[#fed488]/35">
                <Plus className="h-3 w-3" /> Expandir Portfólio
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ======================= SEGMENT 2: TECHNICAL EQUIPMENT FORM ======================= */}
      {activeSegment === 'equipment' && (
        <form onSubmit={handleSaveEquipment} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main workspace physical configurator form */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-[#c5c6ce]/30 p-6 md:p-8 space-y-6 shadow-xs">
            <h3 className="font-serif text-lg font-bold text-[#041632] pb-3 border-b border-slate-100">
              Configurar Equipamento de Infraestrutura Física
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-sans font-bold text-[#041632]">Nome do Equipamento *</label>
                <input
                  type="text"
                  required
                  value={eqName}
                  onChange={(e) => setEqName(e.target.value)}
                  className="w-full bg-slate-50 border border-gray-300 rounded-lg p-2.5 text-xs font-sans font-medium focus:ring-1 focus:ring-[#041632]"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-sans font-bold text-[#041632]">Categoria Central</label>
                <select
                  value={eqCategory}
                  onChange={(e) => setEqCategory(e.target.value)}
                  className="w-full bg-slate-50 border border-gray-300 rounded-lg p-2.5 text-xs font-medium cursor-pointer"
                >
                  <option>Mobiliário</option>
                  <option>Têxteis Finos</option>
                  <option>Iluminação & Som</option>
                  <option>Louças Clássicas</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-sans font-bold text-[#041632]">Descrição Técnica do Dispositivo</label>
              <textarea
                value={eqDescription}
                onChange={(e) => setEqDescription(e.target.value)}
                rows={3}
                placeholder="ex: Altíssima sonorização ou decibéis controlados..."
                className="w-full bg-slate-50 border border-gray-300 rounded-lg p-3 text-xs focus:ring-1 focus:ring-[#041632] h-24 text-[#041632]"
              />
            </div>

            {/* Custom file upload / preview interface (Dashed design requested) */}
            <div className="space-y-2">
              <label className="text-xs font-sans font-bold text-[#041632] block">Imagem de Registro</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-1 border-2 border-dashed border-gray-300 hover:border-gray-400 rounded-lg p-4 text-center cursor-pointer flex flex-col items-center justify-center h-36">
                  <ImageIcon className="h-6 w-6 text-gray-400 mb-2" />
                  <span className="text-[10.5px] font-sans font-semibold text-gray-600 block">Fazer Upload</span>
                  <span className="text-[9px] text-gray-400 font-sans block mt-1">PNG, JPG até 5MB</span>
                </div>

                {/* Predefined visual item container representing upscale event technology card */}
                <div className="sm:col-span-2 relative h-36 border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                  <Image
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuATkDvQqykMNhobCCofJ258JMJxg8Up2xKwcc8NXeQCXwBbL1Dx3HFmPmAfKU-oeyWI1Nm_p7ratCHuhDzcu2kr9ZNjkAhhXKpqpZuCcoc1cDXw88eynHv19KeqBjAkmiE2pt5H7kbW8NWlvEmsrD7leZykuss9uCH8h5ItZ4erkzwT7GX8jAOpnHnWjS9KlWZync3pSR25Ue9sJXCBvzXBknaGY9TmJ9PXH9FXU66hTgTmVA3yiSc5F_xReWZV4MAXHd3Th8tIZgk"
                    alt="Equipment hightexture"
                    fill
                    className="object-cover fallback-bg"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-2 left-2 bg-black/75 backdrop-blur-xs text-white text-[9.5px] font-sans px-2.5 py-1 rounded-sm">
                    Painel de LED Ativo (Mural de Amostra)
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Pricing & Stock billing side-panel */}
          <div className="bg-white rounded-xl border border-[#c5c6ce]/30 p-6 shadow-xs flex flex-col justify-between">
            <div className="space-y-6">
              <h4 className="text-xs font-sans font-bold text-[#041632] uppercase tracking-wider">Atribuições Financeiras & Unidades</h4>
              
              <div className="space-y-4 font-sans">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-500">Valor Unitário de Aluguel</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-xs text-gray-500 font-bold">R$</span>
                    <input
                      type="number"
                      value={eqPrice}
                      onChange={(e) => setEqPrice(parseInt(e.target.value) || 0)}
                      className="w-full bg-slate-50 border border-gray-300 rounded-lg pl-9 pr-3 py-2 text-xs text-[#041632] font-semibold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-gray-500">Estoque Inicial</label>
                    <input
                      type="number"
                      value={eqStock}
                      onChange={(e) => setEqStock(parseInt(e.target.value) || 0)}
                      className="w-full bg-slate-50 border border-gray-300 rounded-lg p-2 text-xs text-[#041632] font-semibold"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-gray-500">Métrica</label>
                    <input
                      type="text"
                      value={eqUnit}
                      onChange={(e) => setEqUnit(e.target.value)}
                      className="w-full bg-slate-50 border border-gray-300 rounded-lg p-2 text-xs text-[#041632] font-semibold"
                    />
                  </div>
                </div>
              </div>

              <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-100 flex gap-2">
                <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0" />
                <p className="font-sans text-[11px] text-emerald-800 leading-normal">
                  Este recurso de estoque estará imediatamente reservado para faturamento em novas ordens de serviço.
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-[#c5c6ce]/20 space-y-2.5 mt-6">
              <button
                type="submit"
                className="w-full bg-[#041632] hover:opacity-95 text-white font-sans font-semibold text-xs py-3 rounded-lg flex items-center justify-center gap-1.5 cursor-pointer shadow-xs active:scale-95 transition-all"
              >
                <Check className="h-4 w-4" />
                <span>Salvar Configuração Técnico</span>
              </button>
              <button
                type="button"
                onClick={() => { alert('Estoque regularizado para standby.'); }}
                className="w-full border border-gray-200 text-gray-500 hover:text-gray-800 font-sans font-semibold text-xs py-2.5 rounded-lg text-center cursor-pointer transition-colors"
              >
                Arquivar Item
              </button>
            </div>
          </div>

        </form>
      )}

      {/* ========================================================================= */}
      {/* FULLY OPERATIONAL CATERING PACKAGES SUBMISSION DIALOG MODAL / LIGHTBOX  */}
      {/* ========================================================================= */}
      {modalOpen && (
        <div className="fixed inset-0 bg-[#041632]/65 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-100 animate-scale-up">
            
            {/* Modal Header */}
            <div className="p-6 bg-[#041632] text-white flex justify-between items-center">
              <div>
                <h3 className="font-serif text-lg font-bold">Criar Experiência Gastronômica</h3>
                <p className="text-[11px] text-[#fed488] font-sans mt-0.5">Cadastre um novo pacote de catering finos do portfólio</p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 hover:bg-white/10 text-white rounded-full transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Form inputs */}
            <form onSubmit={handleCreateFoodPackage} className="p-6 space-y-4">
              
              <div className="space-y-1">
                <label className="text-[11.5px] font-sans font-bold text-[#041632] block">Título do Pacote Culinário *</label>
                <input
                  type="text"
                  required
                  placeholder="ex: Coquetel Diamond Lounge"
                  value={mName}
                  onChange={(e) => setMName(e.target.value)}
                  className="w-full bg-slate-50 border border-gray-300 rounded-lg p-2.5 text-xs text-[#041632] font-semibold focus:ring-1 focus:ring-[#041632]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11.5px] font-sans font-bold text-[#041632] block">Valor R$ por pessoa *</label>
                  <input
                    type="number"
                    required
                    value={mPrice}
                    onChange={(e) => setMPrice(parseInt(e.target.value) || 0)}
                    className="w-full bg-slate-50 border border-gray-300 rounded-lg p-2.5 text-xs text-[#041632] font-semibold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11.5px] font-sans font-bold text-[#041632] block">Mínimo de Pax *</label>
                  <input
                    type="number"
                    required
                    value={mMinPax}
                    onChange={(e) => setMMinPax(parseInt(e.target.value) || 0)}
                    className="w-full bg-slate-50 border border-gray-300 rounded-lg p-2.5 text-xs text-[#041632] font-semibold"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11.5px] font-sans font-bold text-[#041632] block">Descrição Geral do Menu</label>
                <textarea
                  required
                  rows={2}
                  placeholder="Insira detalhes chaves culinários, carnes preparadas ou guarnições..."
                  value={mDesc}
                  onChange={(e) => setMDesc(e.target.value)}
                  className="w-full bg-slate-50 border border-gray-300 rounded-lg p-2 text-xs focus:ring-1 focus:ring-[#041632] text-[#041632] h-16 resize-none"
                />
              </div>

              {/* Cover presets selector inline to modal */}
              <div className="space-y-1">
                <label className="text-[11.5px] font-sans font-bold text-[#041632] block">Selecione uma Imagem do Banco</label>
                <div className="flex gap-3 justify-start">
                  {[
                    'https://lh3.googleusercontent.com/aida-public/AB6AXuAOsh3EE5_pHM9JvgUHhano1IfH49mjEkxbNkpWVRnKopiNhkAqKJyqoElSJfv8s6bcQUSOrxAQzq0lNMj37ingH0jDcrHwgteoSSIKM-7Nv1kTyePMkItmZPux3d2YHSGQ2R0ysa1RTHEQBPtEMhnsaJh1e_JgA7fF7jDQGykLYgW-T1ySArMeyJCx_XAG2H45lBKvgsRI3HA8V6FEblT9eEcBCH1yEHeA3WXVOhJkfRanc915MYny5o26nuDluyZ44WJO0GvuTBs',
                    'https://lh3.googleusercontent.com/aida-public/AB6AXuDHy3zskaAQo9VX9771BBEWAIWPUk_uRxm6Wdtm6Q01KIkodQipFwO-jSz3eRbc5fltFasuBlB2LmHVDibGQjTRYMl0VJECtqtfaceV2Eaat40vE8P0YuVw-sRfmx0Q2r7PlGLMH0rsFBAqRyILIQ4Rnx6mJURvF_j6SjzFjXLMOnJ_ybaptdC5bo_m1SEgZxGxoDa2Rb30MHrtOzN_b6LyoI_3xJAb9bRODgI5uy-uOYwLrrp2neVM5QOzW8ycPy9BF8r9QFZNc1A',
                    'https://lh3.googleusercontent.com/aida-public/AB6AXuB3hWCS-AGvECkF2p2TjHUD-uZfhTQnCY0xHNVq5nnF1bciW2sj_owsyCk32VAqLO9t1qp-23N-ilpp_-f0xE9egekCbE65Ll5S9yB2a8j59Go5cdjxNmajsxz38ZzSI1WPQ7jueEOuPzd2iOPxXkmZPU_DzXg1TLELs_HX9HT5WzIev64yZqqv9RokAeyA3nf6YHtz5ygv8bpMh1EGdjGHmR1KorRFihzhMWG946pWKzNKsyYxJ8wkXzyJcZY3NiwgDF3xgjncZTE'
                  ].map((preset, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setMCoverPhoto(preset)}
                      className={`relative w-20 h-12 rounded-md overflow-hidden border-2 shrink-0 ${
                        mCoverPhoto === preset ? 'border-[#775a19] scale-105' : 'border-slate-200'
                      }`}
                    >
                      <Image
                        src={preset}
                        alt={`Preset ${i}`}
                        fill
                        className="object-cover fallback-bg"
                        referrerPolicy="no-referrer"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Preconfigured bullets text inputs */}
              <div className="space-y-1">
                <label className="text-[11.5px] font-sans font-bold text-[#041632] block">Vantagens e Especificações (Separadas por vírgulas)</label>
                <input
                  type="text"
                  placeholder="ex: Adega de Bebores Importados, Garçom Bilíngue"
                  value={mFeaturesInput}
                  onChange={(e) => setMFeaturesInput(e.target.value)}
                  className="w-full bg-slate-50 border border-gray-300 rounded-lg p-2.5 text-xs text-[#041632]"
                />
              </div>

              {/* Action modal row */}
              <div className="pt-4 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="bg-white border border-gray-300 font-sans font-semibold text-xs px-4 py-2.5 rounded-lg text-gray-700 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-[#041632] hover:opacity-95 text-white font-sans font-semibold text-xs px-5 py-2.5 rounded-lg flex items-center gap-1 cursor-pointer"
                >
                  <Check className="h-4 w-4" />
                  <span>Publicar no Catálogo</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
