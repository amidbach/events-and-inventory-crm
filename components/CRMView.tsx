'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Plus, 
  Search, 
  ChevronRight, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  DollarSign, 
  FileText, 
  User, 
  ShieldAlert, 
  Tag, 
  X, 
  Check, 
  Trash2, 
  MessageSquare,
  ArrowLeft,
  Sparkles
} from 'lucide-react';

interface Client {
  id: string;
  name: string;
  avatar: string;
  company: string;
  title: string;
  type: 'Premium' | 'Corporativo' | 'Pessoais';
  tier: string;
  phone: string;
  email: string;
  address: string;
  tags: string[];
}

interface CRMViewProps {
  initialSubTab?: 'crm-list' | 'client-profile' | 'add-client-form';
}

export default function CRMView({ initialSubTab = 'crm-list' }: CRMViewProps) {
  // Navigation active view states
  const [currentSubTab, setCurrentSubTab] = useState<'crm-list' | 'client-profile' | 'add-client-form'>(initialSubTab);
  
  // Quick list selection drawer state
  const [selectedDrawerClient, setSelectedDrawerClient] = useState<Client | null>(null);
  const [filterType, setFilterType] = useState<string>('Todos');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Toast warning trigger
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Alexandra Notes internal dynamic memo timeline state
  const [alexandraNotes, setAlexandraNotes] = useState([
    { id: 1, date: '25/05/2026', time: '11:42', text: 'Prefere serviço empratado clássico em vez de buffet para o jantar de final de ano.' },
    { id: 2, date: '12/04/2026', time: '09:15', text: 'Solicitou champanhe Dom Pérignon na recepção técnica para os diretores.' },
  ]);
  const [newNoteText, setNewNoteText] = useState('');

  // Main client list database state
  const [clients, setClients] = useState<Client[]>([
    {
      id: 'cli-001',
      name: 'Alexandra Montenaro',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjqHkOYUaNEo8gbF42hXLWJbGlhKdiqnIjJFLDKRzPI9u2PH3-2YZcuxgOJMPARrYShEvuS4_UbYOOSNreka4_YkJQelNDHlNi0VIDRxXWe-GN6YOYNcZunbIlgFxpCXUpgwVkRErlD1lWp0BzDKeuRl9ofRWJlimhRWxFq5RQ6pN7K-QZ_W_N90Dz9cduL8laHXF7C-MoTjTwW6u6IVVTMubnzO64x8ObCHXDrcChUdrWZSx4uQ1dP2xFevO45dkWxL8uhzHtGtY',
      company: 'Montenaro Studios',
      title: 'Diretora Criativa',
      type: 'Premium',
      tier: 'Gold Executive VIP',
      phone: '+33 6 12 34 56 78',
      email: 'a.montenaro@studios.fr',
      address: 'Avenue Foch, 75116 Paris, França',
      tags: ['Socio-Premium', 'VinhoPremium', 'Internacional'],
    },
    {
      id: 'cli-002',
      name: 'Helena Silveira',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAYiPC6IqyPpRcswNXC9z2REdUOUPpNI2H6pxpjOA6gLbNyUNKwH7I9TEL3MtSwNzHUbf2n0Lnn9KF1gJlNXFdFauB9zx3ntzqg3N6j49GsB0r42MjF8LBYYbeSgSCjt2tk2JF2NJDqUMFTWyzA9R1GLgMrJBGVQb93f5P9b4NkG9scl3CRiGmduKyAmcgMZdaPXBJfcmw5sOadLY4ApPtAPmfa3IEwh9ufY7NI0E42_vDdzmXWEbyU0TmPM1XhyBFIE-SzWbtA6-o',
      company: 'Silveira Joalheiros',
      title: 'Fundadora & CEO',
      type: 'Premium',
      tier: 'Diamond High Patron',
      phone: '+55 (11) 98877-6655',
      email: 'helena@silveirajewels.com.br',
      address: 'Alameda Lorena, Jardins, São Paulo',
      tags: ['AltaGastronomia', 'SemAçúcar', 'VinhoPremium'],
    },
    {
      id: 'cli-003',
      name: 'Ricardo Mendes',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjuXtiQvIEjRmbMVZTKhaQRm-OusT7Yhr2SKjzr7_XyLmBF2QHMAW6HL3zl212528e3PGXdJ4OjMpapbnEFPAS2mJ_zkNfL5PmPr0aWLvP22n8nGM07qT_5Kchr3JwNnyYFrJ6xk90ACkrdhTNkF95WpYI-D-yG-piw3-1KLO4CbmfhKkAi5Iyvq0LUNOjQqUFa8yUtwv_s-U781QWDsRRl2w8Ihqgflm6hgOvWj2uaZ5uwe1P3mhJ43jaNEkiy7jzzLbAUDDDByo',
      company: 'Banco Vanguarda',
      title: 'VP de Operações',
      type: 'Corporativo',
      tier: 'Gold Executive VIP',
      phone: '+55 (21) 97766-5544',
      email: 'r.mendes@vanguardabank.com',
      address: 'Avenida Atlântica, Copacabana, Rio de Janeiro',
      tags: ['CorporativoGold', 'BuffetRápido', 'SemGlúten'],
    },
    {
      id: 'cli-004',
      name: 'Beatriz Soares',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBC3kT3DomVhLPLKLooeEBHSlt3k05HJwYIgg2N7u4XuH0FVZc24e-3dDNMY-NpDqAOD2EZVz2YsSBmmR2oKorKWcV_9grJ6MtcZAhIrrIF2fTEcIuzW-VLaJFJ4s4Gq8N_jYTEI3LFVRXZCiCAnT1QHdgwc9_O98R66zjeNI0s3rdSYvkhTFSfz2BYN6N593SRY_bYSaaSnfmvZ599Zhmuw7_m-dhPOB85pT9-JcSk4r0d7tmSz6dK65FzaRMuYb-dNzOsgfFgGE4',
      company: 'Eventos Privados RJ',
      title: 'Cliente Associada',
      type: 'Pessoais',
      tier: 'Standard Member',
      phone: '+55 (11) 96655-4433',
      email: 'beatriz.soares@me.com',
      address: 'Rua Bela Cintra, Consolação, São Paulo',
      tags: ['Vegetariano', 'OrganizaçãoAtiva'],
    }
  ]);

  // Client creation input form states
  const [formName, setFormName] = useState('');
  const [formCompany, setFormCompany] = useState('');
  const [formTitle, setFormTitle] = useState('');
  const [formType, setFormType] = useState<'Premium' | 'Corporativo' | 'Pessoais'>('Premium');
  const [formTier, setFormTier] = useState('Gold Executive VIP');
  const [formPhone, setFormPhone] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formAddress, setFormAddress] = useState('');
  const [formTags, setFormTags] = useState<string[]>(['Socio-Premium', 'MembroAtivo']);
  const [newTagInput, setNewTagInput] = useState('');
  const [selectedPresetAvatar, setSelectedPresetAvatar] = useState(
    'https://lh3.googleusercontent.com/aida-public/AB6AXuB3vh6oaKuCXwvfftfeMQWFMBVRNjaA-rUHay2nIzUzX04J46pHjL94WyqAp5ZrEl34q1BDxz0MQZCXH-QrpKr-Wx1db0ypkxrV8iqVHjwhXeBHTfAI2j2CBP4LKNbwQCt9BLeqgpgfiW0Og-UjsxFWqO8gMghGYSnP2Lss22Phk3j19CpuAKGu7cQMgK015QEDipjjxMkjlFZg3-zbCBzDQJMdK7KpvJkZk4GDbCgQhyb0s--GlFTdROEfrHGOWtvTKAwAoAd3iOs'
  );

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleAddTag = () => {
    if (newTagInput.trim()) {
      const formatted = newTagInput.startsWith('#') ? newTagInput.slice(1) : newTagInput;
      if (!formTags.includes(formatted)) {
        setFormTags([...formTags, formatted]);
      }
      setNewTagInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormTags(formTags.filter(t => t !== tag));
  };

  const handleSaveClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formEmail.trim()) {
      triggerToast('Por favor preencha o nome e o email corporativo do cliente!');
      return;
    }

    const newClient: Client = {
      id: `cli-${Math.floor(Math.random() * 1000 + 100)}`,
      name: formName,
      avatar: selectedPresetAvatar,
      company: formCompany || 'Autônomo',
      title: formTitle || 'Diretoria',
      type: formType,
      tier: formTier,
      phone: formPhone || '+55 (11) ---- ----',
      email: formEmail,
      address: formAddress || 'Sem endereço cadastrado',
      tags: formTags,
    };

    setClients([newClient, ...clients]);
    triggerToast(`Sucesso: "${formName}" foi adicionado à base CRM Elite!`);
    
    // Clear form inputs
    setFormName('');
    setFormCompany('');
    setFormTitle('');
    setFormPhone('');
    setFormEmail('');
    setFormAddress('');
    setFormTags(['Socio-Premium', 'MembroAtivo']);
    
    // Return to list
    setCurrentSubTab('crm-list');
  };

  const handleAddAlexandraNote = () => {
    if (newNoteText.trim()) {
      const now = new Date();
      const dateStr = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()}`;
      const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      setAlexandraNotes([
        {
          id: Math.floor(Math.random() * 10000),
          date: dateStr,
          time: timeStr,
          text: newNoteText.trim(),
        },
        ...alexandraNotes,
      ]);
      setNewNoteText('');
      triggerToast('Nota confidencial anexada com sucesso.');
    }
  };

  const handleRemoveAlexandraNote = (id: number) => {
    setAlexandraNotes(alexandraNotes.filter(n => n.id !== id));
    triggerToast('Nota confidencial removida.');
  };

  const filteredClients = clients.filter(c => {
    const matchesTab = filterType === 'Todos' || c.type === filterType;
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          c.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-6 relative animate-fade-in">
      {/* Dynamic Tiny Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 bg-[#041632] text-[#fed488] px-6 py-4 rounded-xl shadow-2xl border border-[#fed488]/40 z-50 animate-bounce flex items-center gap-3 font-sans">
          <Sparkles className="h-5 w-5 text-[#fed488]" />
          <div>
            <p className="font-bold text-sm">Atualização do CRM</p>
            <p className="text-xs text-white/90 mt-0.5">{toastMessage}</p>
          </div>
        </div>
      )}

      {/* ======================= SUB TAB 1: CRM LIST & QUICK DRAWER ======================= */}
      {currentSubTab === 'crm-list' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main client directory card */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-[#c5c6ce]/30 overflow-hidden shadow-xs">
            <div className="p-6 border-b border-[#c5c6ce]/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#041632]">Base de Dados de Clientes</h3>
                <p className="font-sans text-xs text-[#44474d] mt-1">
                  Diretório premium de patrocinadores e relacionamentos corporativos
                </p>
              </div>
              <button
                onClick={() => setCurrentSubTab('add-client-form')}
                className="bg-[#041632] text-white hover:opacity-95 font-sans font-semibold text-xs px-4 py-2.5 rounded-lg shrink-0 flex items-center gap-2 cursor-pointer transition-all active:scale-95"
              >
                <Plus className="h-4 w-4" />
                <span>Novo Cliente</span>
              </button>
            </div>

            {/* Filter and search bar controls */}
            <div className="p-4 bg-slate-50/50 border-b border-[#c5c6ce]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex gap-1 overflow-x-auto w-full sm:w-auto">
                {['Todos', 'Premium', 'Corporativo', 'Pessoais'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setFilterType(type)}
                    className={`px-3 py-1.5 rounded-md text-xs font-sans font-semibold transition-all cursor-pointer shrink-0 ${
                      filterType === type
                        ? 'bg-[#041632] text-white'
                        : 'text-[#44474d] hover:bg-slate-100'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
              
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar patrono..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-lg pl-9 pr-4 py-2 text-xs font-medium focus:ring-1 focus:ring-[#041632] outline-hidden placeholder-gray-400 text-[#041632]"
                />
              </div>
            </div>

            {/* Table layout */}
            <div className="overflow-x-auto">
              <table className="w-full text-left font-sans text-xs">
                <thead>
                  <tr className="bg-slate-50 text-[#041632] font-semibold uppercase tracking-wider">
                    <th className="px-6 py-4">Patrono</th>
                    <th className="px-6 py-4">Empresa / Cargo</th>
                    <th className="px-6 py-4">Categoria</th>
                    <th className="px-6 py-4">Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#c5c6ce]/20">
                  {filteredClients.map((client) => (
                    <tr 
                      key={client.id}
                      onClick={() => setSelectedDrawerClient(client)}
                      className={`hover:bg-[#fed488]/10 cursor-pointer transition-colors ${selectedDrawerClient?.id === client.id ? 'bg-[#fed488]/15 font-semibold' : ''}`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <Image
                            src={client.avatar}
                            alt={client.name}
                            width={32}
                            height={32}
                            className="rounded-full object-cover shrink-0 fallback-bg"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <p className="font-bold text-sm text-[#041632]">{client.name}</p>
                            <p className="text-[10.5px] text-gray-500">{client.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-[#041632] font-medium">{client.company}</p>
                        <p className="text-gray-500 mt-0.5">{client.title}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          client.type === 'Premium' 
                            ? 'bg-amber-100 text-amber-800 border border-amber-200' 
                            : client.type === 'Corporativo'
                              ? 'bg-[#d8e3fa] text-[#041632]'
                              : 'bg-slate-100 text-slate-800'
                        }`}>
                          {client.type}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (client.name === 'Alexandra Montenaro') {
                              setCurrentSubTab('client-profile');
                            } else {
                              triggerToast(`Exibindo perfil detalhado de ${client.name}...`);
                              alert(`Perfil completo de ${client.name} está em processamento de sincronização.`);
                            }
                          }}
                          className="text-[#775a19] font-bold hover:underline flex items-center gap-0.5 cursor-pointer"
                        >
                          <span>Ver Perfil</span>
                          <ChevronRight className="h-3 w-3" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredClients.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center text-gray-400">
                        Nenhum patrono localizado com esses filtros.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Info Drawer Segment (Matches first image on the right) */}
          <div className="bg-white rounded-xl border border-[#c5c6ce]/30 p-6 shadow-xs flex flex-col justify-between">
            {selectedDrawerClient ? (
              <div className="space-y-6">
                <div className="text-center pb-6 border-b border-[#c5c6ce]/30">
                  <Image
                    src={selectedDrawerClient.avatar}
                    alt={selectedDrawerClient.name}
                    width={72}
                    height={72}
                    className="rounded-full mx-auto object-cover border-2 border-[#775a19] shadow-xs fallback-bg"
                    referrerPolicy="no-referrer"
                  />
                  <h4 className="font-serif text-lg font-bold text-[#041632] mt-3">{selectedDrawerClient.name}</h4>
                  <p className="text-xs text-gray-500 font-sans mt-0.5 font-medium">{selectedDrawerClient.title} @ <strong>{selectedDrawerClient.company}</strong></p>
                  
                  <div className="inline-flex items-center gap-1.5 mt-2.5 bg-[#fed488]/30 px-3 py-1 rounded-full text-[11px] font-bold text-[#775a19]">
                    <Sparkles className="h-3 w-3" />
                    <span>{selectedDrawerClient.tier}</span>
                  </div>
                </div>

                {/* Information lines */}
                <div className="space-y-4 font-sans text-xs">
                  <div className="flex items-center gap-3 text-[#44474d]">
                    <Mail className="h-4 w-4 shrink-0 text-[#041632]" />
                    <span className="truncate">{selectedDrawerClient.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[#44474d]">
                    <Phone className="h-4 w-4 shrink-0 text-[#041632]" />
                    <span>{selectedDrawerClient.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[#44474d]">
                    <MapPin className="h-4 w-4 shrink-0 text-[#041632]" />
                    <span className="line-clamp-2">{selectedDrawerClient.address}</span>
                  </div>
                </div>

                {/* Pre-recorded attributes tags */}
                <div className="space-y-2 pt-4 border-t border-[#c5c6ce]/20">
                  <h5 className="text-[11px] font-bold text-[#041632] uppercase tracking-wider">Anotações / Dieta</h5>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedDrawerClient.tags.map((tg, key) => (
                      <span key={key} className="bg-slate-100 text-slate-700 font-semibold px-2.5 py-1 rounded-sm text-[10px]">
                        #{tg}
                      </span>
                    ))}
                  </div>
                </div>

                {selectedDrawerClient.name === 'Alexandra Montenaro' && (
                  <button
                    onClick={() => setCurrentSubTab('client-profile')}
                    className="w-full bg-[#041632] hover:opacity-90 text-white font-sans font-semibold text-xs py-3 rounded-lg mt-6 shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <FolderOpenIcon className="h-4 w-4" />
                    <span>Painel Avançado de Alexandra</span>
                  </button>
                )}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center py-20 text-gray-400">
                <User className="h-12 w-12 text-gray-300 mb-3" />
                <h4 className="font-serif font-bold text-gray-600">Nenhum Selecionado</h4>
                <p className="text-xs font-sans mt-1 px-4 max-w-xs">
                  Clique sobre qualquer linha da tabela para verificar as coordenadas rápidas do patrono.
                </p>

                {/* Force instant selection of Alexandra for easy walkthrough */}
                <button
                  onClick={() => {
                    const alex = clients.find(c => c.name === 'Alexandra Montenaro');
                    if (alex) {
                      setSelectedDrawerClient(alex);
                    }
                  }}
                  className="mt-6 border border-[#041632]/20 hover:bg-slate-50 text-[#041632] font-semibold text-xs px-4 py-2 rounded-lg cursor-pointer"
                >
                  Selecionar Alexandra Montenaro
                </button>
              </div>
            )}
            
            {selectedDrawerClient && (
              <p className="text-[10px] text-gray-400 text-center mt-6 uppercase tracking-wider font-semibold font-mono">
                Elite CRM - ID: {selectedDrawerClient.id}
              </p>
            )}
          </div>

        </div>
      )}

      {/* ======================= SUB TAB 2: DETAILED CLIENT PROFILE (ALEXANDRA) ======================= */}
      {currentSubTab === 'client-profile' && (
        <div className="space-y-6">
          {/* Breadcrumb row & Back button */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setCurrentSubTab('crm-list')}
              className="flex items-center gap-2 text-xs font-sans font-bold text-[#041632] hover:underline cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Voltar ao Diretório</span>
            </button>
            <div className="text-xs text-gray-400 font-mono">
              CRM / Clientes / Alexandra Montenaro
            </div>
          </div>

          {/* Core Profile Header Cards */}
          <div className="bg-white rounded-xl border border-[#c5c6ce]/30 p-6 md:p-8 shadow-xs">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="relative w-24 h-24 shrink-0">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBjqHkOYUaNEo8gbF42hXLWJbGlhKdiqnIjJFLDKRzPI9u2PH3-2YZcuxgOJMPARrYShEvuS4_UbYOOSNreka4_YkJQelNDHlNi0VIDRxXWe-GN6YOYNcZunbIlgFxpCXUpgwVkRErlD1lWp0BzDKeuRl9ofRWJlimhRWxFq5RQ6pN7K-QZ_W_N90Dz9cduL8laHXF7C-MoTjTwW6u6IVVTMubnzO64x8ObCHXDrcChUdrWZSx4uQ1dP2xFevO45dkWxL8uhzHtGtY"
                  alt="Alexandra Montenaro"
                  fill
                  className="rounded-full object-cover border-4 border-[#fed488] shadow-sm fallback-bg"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="text-center md:text-left flex-1 space-y-2">
                <div className="flex flex-col md:flex-row md:items-center gap-2 justify-center md:justify-start">
                  <h3 className="font-serif text-2xl font-bold text-[#041632]">Alexandra Montenaro</h3>
                  <span className="bg-[#fed488]/40 border border-[#775a19]/25 text-[#775a19] text-[10.5px] font-bold px-3 py-0.5 rounded-full mx-auto md:mx-0">
                    Sócio Premium VIP
                  </span>
                </div>
                <p className="font-sans text-sm text-[#44474d] font-semibold">
                  Diretora Criativa @ <span className="text-[#041632] font-bold">Montenaro Studios</span>
                </p>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-2 text-[#44474d] text-xs font-sans mt-3">
                  <span className="flex items-center gap-1"><Mail className="h-3.5 w-3.5 text-[#041632]" /> a.montenaro@studios.fr</span>
                  <span className="flex items-center gap-1"><Phone className="h-3.5 w-3.5 text-[#041632]" /> +33 6 12 34 56 78</span>
                  <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5 text-[#041632]" /> Paris, França</span>
                  <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5 text-[#041632]" /> Membro desde Jan/2021</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick numbers Bento grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white p-5 rounded-xl border border-[#c5c6ce]/30 flex items-center gap-4 shadow-3xs">
              <span className="p-3 rounded-lg bg-[#fed488]/30 text-[#775a19] shrink-0">
                <DollarSign className="h-6 w-6" />
              </span>
              <div>
                <span className="font-sans text-[10px] uppercase font-bold text-gray-400">Total Investido</span>
                <p className="font-serif text-xl font-bold text-[#041632]">€142.500</p>
              </div>
            </div>
            
            <div className="bg-white p-5 rounded-xl border border-[#c5c6ce]/30 flex items-center gap-4 shadow-3xs">
              <span className="p-3 rounded-lg bg-orange-50 text-orange-700 shrink-0">
                <Calendar className="h-6 w-6" />
              </span>
              <div>
                <span className="font-sans text-[10px] uppercase font-bold text-gray-400">Total de Eventos</span>
                <p className="font-serif text-xl font-bold text-[#041632]">12 Realizados</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-[#c5c6ce]/30 flex items-center gap-4 shadow-3xs">
              <span className="p-3 rounded-lg bg-emerald-50 text-emerald-700 shrink-0">
                <Sparkles className="h-6 w-6" />
              </span>
              <div>
                <span className="font-sans text-[10px] uppercase font-bold text-gray-400">Ticket Médio</span>
                <p className="font-serif text-xl font-bold text-[#041632]">€11.875</p>
              </div>
            </div>
          </div>

          {/* Event timeline & Note section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Timeline Segment */}
            <div className="lg:col-span-2 bg-white rounded-xl border border-[#c5c6ce]/30 p-6 shadow-xs">
              <h4 className="font-serif text-lg font-bold text-[#041632] mb-6 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-[#041632]" />
                <span>Histórico de Eventos Premium</span>
              </h4>

              {/* Step list with embedded pictures */}
              <div className="space-y-8 relative before:absolute before:left-6 before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-200">
                
                {/* Event 1 */}
                <div className="relative pl-12">
                  <div className="absolute left-4 top-1.5 w-4 h-4 rounded-full bg-[#775a19] ring-4 ring-[#fed488]/30 shrink-0" />
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 mb-2">
                    <h5 className="font-sans font-bold text-sm text-[#041632]">Lançamento Coleção Primavera 2024</h5>
                    <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2.5 py-0.5 rounded-sm">Finalizado</span>
                  </div>
                  <p className="text-xs text-slate-500 font-sans">Meta de faturamento alta, serviço de prataria fina.</p>
                  
                  {/* Photo container styled beautifully of luxury desk dinner setup */}
                  <div className="mt-3 relative w-full h-36 rounded-lg overflow-hidden border border-slate-200">
                    <Image
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrM4-nvQ9KJi1ZZGJO52KVWpOPslDcciuVr3nNSHinGlfrS8ETiW3IIIIPQmRHOUk61yCrGSoMK1Psfa7Kn_ujvSQW6-lbXsKgQ_zBJr7N2PiJsA-NMnMdOtcxQbHzKZv0rs-VSyhQUwa-69-7Cms3YbDNBG5ns7FlrL0tykRg-6BsAzIB3WOKDG_xIr5AqjJu3Z8WDYdxgwasqCNNBT-mKUe8Hxlcr7GMyZnmZJlVu9tDhFz8qw4c2WPLib3mTqCNrudA-VzY7uA"
                      alt="Primavera dinner"
                      fill
                      className="object-cover fallback-bg"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>

                {/* Event 2 */}
                <div className="relative pl-12">
                  <div className="absolute left-4 top-1.5 w-4 h-4 rounded-full bg-[#041632] ring-4 ring-slate-100 shrink-0" />
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 mb-2">
                    <h5 className="font-sans font-bold text-sm text-[#041632]">Retiro Estratégico Executivo</h5>
                    <span className="bg-[#d8e3fa] text-[#041632] text-[10px] font-bold px-2.5 py-0.5 rounded-sm">Finalizado</span>
                  </div>
                  <p className="text-xs text-slate-500 font-sans">Retiro alpino/rural de alto padrão com serviços integrados.</p>
                  
                  {/* Landscape setup photo */}
                  <div className="mt-3 relative w-full h-36 rounded-lg overflow-hidden border border-slate-200">
                    <Image
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwvHj_IG7A45en9jHbOClItNB0Fpr6BoeRkJM6LJf-jr1uQya0HS-eelJLYe8x1CyO_skkEei5Bo_Nt1UoSfVvGfJM7Y3C2kRpsm39Q2NXfkIBEx3hbQc9xZms1Wsv9ff_Zgc-DH1giMyI_Krt8sU-TyrIgwP9mXG_JKPQ6kM4BFWICRZi-_eJXn5YwuMFS-RY2nQpydZxGsrG4lEBu2nYxgx8NhatIl-8bFBLXKz4O3Eqvifg6xd4RowZx-s5Iy96pcOyMaXH3R0"
                      alt="Retiro landscape"
                      fill
                      className="object-cover fallback-bg"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>

                {/* Event 3 */}
                <div className="relative pl-12">
                  <div className="absolute left-5 top-2 w-2 h-2 rounded-full bg-orange-400 shrink-0" />
                  <div className="flex justify-between items-center">
                    <h5 className="font-sans font-semibold text-xs text-[#44474d] italic">Coquetel de Vernissage (Sessão de Planejamento)</h5>
                    <span className="bg-orange-50 text-orange-850 text-[10px] font-bold px-2 py-0.5 rounded-sm">Agendado</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Editable notepad (Confidential corporate memos) */}
            <div className="bg-white rounded-xl border border-[#c5c6ce]/30 p-6 shadow-xs flex flex-col justify-between">
              <div>
                <h4 className="font-serif text-lg font-bold text-[#041632] mb-4 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-[#041632]" />
                  <span>Notas Confidenciais</span>
                </h4>
                
                <p className="text-xs text-[#44474d] font-sans mb-4">
                  Registre preferências particulares, restrições e diretrizes de assessores correspondentes.
                </p>

                {/* Typable feedback block */}
                <div className="space-y-3 mb-6">
                  {alexandraNotes.map((note) => (
                    <div key={note.id} className="bg-slate-50 p-3.5 rounded-lg border border-[#c5c6ce]/25 relative group">
                      <button 
                        onClick={() => handleRemoveAlexandraNote(note.id)}
                        className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-600 rounded-md hover:bg-red-50 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                      <div className="flex items-center gap-2 text-[10px] font-sans text-gray-400 font-semibold">
                        <span>{note.date}</span>
                        <span>•</span>
                        <span>{note.time}</span>
                      </div>
                      <p className="text-xs font-sans text-[#041632] mt-1.5 leading-relaxed">
                        {note.text}
                      </p>
                    </div>
                  ))}
                  {alexandraNotes.length === 0 && (
                    <div className="text-center py-8 text-gray-400 text-xs italic">
                      Nenhuma anotação privada inserida ainda.
                    </div>
                  )}
                </div>
              </div>

              {/* TextInput tool */}
              <div className="border-t border-[#c5c6ce]/20 pt-4 space-y-2">
                <textarea
                  placeholder="Escreva algo relevante sobre o patrono..."
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  className="w-full bg-slate-50 border border-gray-300 rounded-lg p-3 text-xs focus:ring-1 focus:ring-[#041632] outline-hidden placeholder-gray-400 text-[#041632] h-20 resize-none font-sans"
                />
                <button
                  onClick={handleAddAlexandraNote}
                  className="w-full bg-[#041632] text-white hover:opacity-95 font-sans font-semibold text-xs py-2.5 rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <MessageSquare className="h-3.5 w-3.5" />
                  <span>Gravar Nota Privada</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ======================= SUB TAB 3: ADD NEW CLIENT SETUP FORM ======================= */}
      {currentSubTab === 'add-client-form' && (
        <form onSubmit={handleSaveClient} className="bg-white rounded-xl border border-[#c5c6ce]/30 overflow-hidden shadow-xs">
          
          {/* Breadcrumb Header */}
          <div className="p-6 border-b border-[#c5c6ce]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-sans font-bold text-[#041632] mb-1">
                <button type="button" onClick={() => setCurrentSubTab('crm-list')} className="hover:underline">CRM</button>
                <span>/</span>
                <span className="text-gray-400">Adicionar Novo Cliente</span>
              </div>
              <h3 className="font-serif text-xl font-bold text-[#041632]">Inscrição de Patrono</h3>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setCurrentSubTab('crm-list')}
                className="bg-white border border-gray-300 text-gray-700 hover:bg-slate-50 font-sans font-semibold text-xs px-4 py-2.5 rounded-lg cursor-pointer transition-all active:scale-95"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-[#041632] text-white hover:opacity-95 font-sans font-semibold text-xs px-5 py-2.5 rounded-lg cursor-pointer transition-all active:scale-95 flex items-center gap-1.5"
              >
                <Check className="h-4 w-4" />
                <span>Salvar & Ativar</span>
              </button>
            </div>
          </div>

          <div className="p-6 md:p-8 space-y-8">
            
            {/* Visual Header Grid: Avatar selection */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div className="md:col-span-1 flex flex-col items-center justify-center border-r border-[#c5c6ce]/20 pr-6">
                <div className="relative w-24 h-24 mb-4">
                  <Image
                    src={selectedPresetAvatar}
                    alt="Current avatar selected"
                    fill
                    className="rounded-full object-cover border-4 border-[#041632]/20 fallback-bg"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute right-0 bottom-0 bg-[#041632] text-white p-1.5 rounded-full">
                    <ShieldAlert className="h-3 w-3" />
                  </div>
                </div>
                <p className="text-[11px] font-sans font-semibold text-gray-500 text-center">Identidade Visual do Patrono</p>
              </div>

              {/* Instant Clicking Presets Choice */}
              <div className="md:col-span-2">
                <h4 className="text-xs font-sans font-bold text-[#041632] uppercase tracking-wider mb-3">Selecione uma Imagem de Identificação</h4>
                <div className="flex flex-wrap gap-3">
                  {[
                    'https://lh3.googleusercontent.com/aida-public/AB6AXuAYiPC6IqyPpRcswNXC9z2REdUOUPpNI2H6pxpjOA6gLbNyUNKwH7I9TEL3MtSwNzHUbf2n0Lnn9KF1gJlNXFdFauB9zx3ntzqg3N6j49GsB0r42MjF8LBYYbeSgSCjt2tk2JF2NJDqUMFTWyzA9R1GLgMrJBGVQb93f5P9b4NkG9scl3CRiGmduKyAmcgMZdaPXBJfcmw5sOadLY4ApPtAPmfa3IEwh9ufY7NI0E42_vDdzmXWEbyU0TmPM1XhyBFIE-SzWbtA6-o',
                    'https://lh3.googleusercontent.com/aida-public/AB6AXuBjuXtiQvIEjRmbMVZTKhaQRm-OusT7Yhr2SKjzr7_XyLmBF2QHMAW6HL3zl212528e3PGXdJ4OjMpapbnEFPAS2mJ_zkNfL5PmPr0aWLvP22n8nGM07qT_5Kchr3JwNnyYFrJ6xk90ACkrdhTNkF95WpYI-D-yG-piw3-1KLO4CbmfhKkAi5Iyvq0LUNOjQqUFa8yUtwv_s-U781QWDsRRl2w8Ihqgflm6hgOvWj2uaZ5uwe1P3mhJ43jaNEkiy7jzzLbAUDDDByo',
                    'https://lh3.googleusercontent.com/aida-public/AB6AXuBC3kT3DomVhLPLKLooeEBHSlt3k05HJwYIgg2N7u4XuH0FVZc24e-3dDNMY-NpDqAOD2EZVz2YsSBmmR2oKorKWcV_9grJ6MtcZAhIrrIF2fTEcIuzW-VLaJFJ4s4Gq8N_jYTEI3LFVRXZCiCAnT1QHdgwc9_O98R66zjeNI0s3rdSYvkhTFSfz2BYN6N593SRY_bYSaaSnfmvZ599Zhmuw7_m-dhPOB85pT9-JcSk4r0d7tmSz6dK65FzaRMuYb-dNzOsgfFgGE4',
                    'https://lh3.googleusercontent.com/aida-public/AB6AXuB3vh6oaKuCXwvfftfeMQWFMBVRNjaA-rUHay2nIzUzX04J46pHjL94WyqAp5ZrEl34q1BDxz0MQZCXH-QrpKr-Wx1db0ypkxrV8iqVHjwhXeBHTfAI2j2CBP4LKNbwQCt9BLeqgpgfiW0Og-UjsxFWqO8gMghGYSnP2Lss22Phk3j19CpuAKGu7cQMgK015QEDipjjxMkjlFZg3-zbCBzDQJMdK7KpvJkZk4GDbCgQhyb0s--GlFTdROEfrHGOWtvTKAwAoAd3iOs'
                  ].map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedPresetAvatar(preset)}
                      className={`relative w-12 h-12 rounded-full overflow-hidden border-2 cursor-pointer transition-all ${
                        selectedPresetAvatar === preset ? 'border-[#775a19] scale-110 shadow-sm' : 'border-slate-200 hover:border-slate-400'
                      }`}
                    >
                      <Image
                        src={preset}
                        alt={`Preset ${idx + 1}`}
                        fill
                        className="object-cover fallback-bg"
                        referrerPolicy="no-referrer"
                      />
                    </button>
                  ))}
                  <div className="flex items-center text-gray-400 italic text-[11px] font-medium ml-2">
                    Clique nas fotos para selecionar instantaneamente
                  </div>
                </div>
              </div>
            </div>

            {/* Inputs Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-[#c5c6ce]/20">
              
              {/* Left Column: Coordinates */}
              <div className="space-y-4">
                <h4 className="text-xs font-sans font-bold text-[#041632] uppercase tracking-wider">Identificação do Patrono</h4>
                
                <div className="space-y-1">
                  <label className="text-[11px] font-sans font-bold text-[#041632]">Nome Completo *</label>
                  <input
                    type="text"
                    required
                    placeholder="ex: Helena Silveira"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full bg-slate-50 border border-gray-300 rounded-lg p-2.5 text-xs focus:ring-1 focus:ring-[#041632] outline-hidden placeholder-gray-400 text-[#041632] font-sans font-medium"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-sans font-bold text-[#041632]">Empresa</label>
                    <input
                      type="text"
                      placeholder="ex: Silveira Jewels"
                      value={formCompany}
                      onChange={(e) => setFormCompany(e.target.value)}
                      className="w-full bg-slate-50 border border-gray-300 rounded-lg p-2.5 text-xs focus:ring-1 focus:ring-[#041632] outline-hidden placeholder-gray-400 text-[#041632] font-sans font-medium"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-sans font-bold text-[#041632]">Cargo</label>
                    <input
                      type="text"
                      placeholder="ex: CEO & Fundadora"
                      value={formTitle}
                      onChange={(e) => setFormTitle(e.target.value)}
                      className="w-full bg-slate-50 border border-gray-300 rounded-lg p-2.5 text-xs focus:ring-1 focus:ring-[#041632] outline-hidden placeholder-gray-400 text-[#041632] font-sans font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-sans font-bold text-[#041632]">Classificação</label>
                    <select
                      value={formType}
                      onChange={(e) => setFormType(e.target.value as 'Premium' | 'Corporativo' | 'Pessoais')}
                      className="w-full bg-slate-50 border border-gray-300 rounded-lg p-2.5 text-xs focus:ring-1 focus:ring-[#041632] text-[#041632] font-sans font-medium cursor-pointer"
                    >
                      <option value="Premium">Premium VIP</option>
                      <option value="Corporativo">Corporativo Gold</option>
                      <option value="Pessoais">Pessoal / Individual</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-sans font-bold text-[#041632]">Nível de Fidelidade</label>
                    <input
                      type="text"
                      placeholder="ex: Diamond Patron"
                      value={formTier}
                      onChange={(e) => setFormTier(e.target.value)}
                      className="w-full bg-slate-50 border border-gray-300 rounded-lg p-2.5 text-xs focus:ring-1 focus:ring-[#041632] outline-hidden text-[#041632] font-sans font-medium"
                    />
                  </div>
                </div>

              </div>

              {/* Right Column: Contact & Address Info */}
              <div className="space-y-4">
                <h4 className="text-xs font-sans font-bold text-[#041632] uppercase tracking-wider">Contactos & Endereço</h4>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-sans font-bold text-[#041632]">Email Corporativo *</label>
                    <input
                      type="email"
                      required
                      placeholder="ex: helena@jewels.com"
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-gray-300 rounded-lg p-2.5 text-xs focus:ring-1 focus:ring-[#041632] outline-hidden placeholder-gray-400 text-[#041632] font-sans font-medium"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-sans font-bold text-[#041632]">Telefone Móvel</label>
                    <input
                      type="tel"
                      placeholder="ex: +55 (11) 98877-6655"
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                      className="w-full bg-slate-50 border border-gray-300 rounded-lg p-2.5 text-xs focus:ring-1 focus:ring-[#041632] outline-hidden placeholder-gray-400 text-[#041632] font-sans font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-sans font-bold text-[#041632]">Morada Completa</label>
                  <input
                    type="text"
                    placeholder="Alameda Lorena, Jardins, São Paulo"
                    value={formAddress}
                    onChange={(e) => setFormAddress(e.target.value)}
                    className="w-full bg-slate-50 border border-gray-300 rounded-lg p-2.5 text-xs focus:ring-1 focus:ring-[#041632] outline-hidden placeholder-gray-400 text-[#041632] font-sans font-medium"
                  />
                </div>

                {/* Tags manager (with clickable hashtags deletion) */}
                <div className="space-y-2 pt-2">
                  <label className="text-[11px] font-sans font-bold text-[#041632]">Palavras-Chave de Dieta ou Negócio</label>
                  <div className="flex flex-wrap gap-1.5 p-2 bg-slate-50 border border-gray-300 rounded-lg min-h-[38px] items-center">
                    {formTags.map((tag) => (
                      <span 
                        key={tag} 
                        className="bg-white text-[#775a19] border border-[#775a19]/20 font-semibold px-2 py-0.5 rounded-sm text-[10.5px] inline-flex items-center gap-1 shadow-3xs"
                      >
                        <span>#{tag}</span>
                        <button 
                          type="button" 
                          onClick={() => handleRemoveTag(tag)}
                          className="hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-sm p-0.5 cursor-pointer"
                        >
                          <X className="h-2.5 w-2.5" />
                        </button>
                      </span>
                    ))}
                    {formTags.length === 0 && (
                      <span className="text-gray-400 text-[10px] italic">Nenhuma hashtag adicionada</span>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Nova tag (ex: Vegano, Organicos)"
                      value={newTagInput}
                      onChange={(e) => setNewTagInput(e.target.value)}
                      className="flex-1 bg-white border border-gray-300 rounded-lg p-2 text-xs focus:ring-1 focus:ring-[#041632] outline-hidden text-[#041632]"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddTag();
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={handleAddTag}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 rounded-lg text-xs font-semibold cursor-pointer border border-gray-200"
                    >
                      Anexar
                    </button>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </form>
      )}

    </div>
  );
}

// Inline FolderOpenIcon fallback to prevent dependency missing errors
function FolderOpenIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={props.className}
      width="1em"
      height="1em"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 12h8.953m-8.953 0V4.5A2.25 2.25 0 0 1 4.5 2.25h3.375c.9 0 1.766.353 2.41 1.012l1.503 1.503A2.25 2.25 0 0 0 13.5 5.25h5.625A2.25 2.25 0 0 1 21.375 7.5V12m-19.125 0H21m-19.125 0v3.75A2.25 2.25 0 0 0 4.5 18h15c1.243 0 2.25-1.007 2.25-2.25V12"
      />
    </svg>
  );
}
