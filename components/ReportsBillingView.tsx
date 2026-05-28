'use client';

import React, { useState } from 'react';
import { 
  FileText, 
  TrendingUp, 
  DollarSign, 
  Clock, 
  AlertTriangle, 
  Plus, 
  Search, 
  CheckCircle, 
  X, 
  Sparkles, 
  Download, 
  ChevronRight,
  Calculator,
  Percent,
  TrendingDown,
  BarChart4
} from 'lucide-react';

interface Invoice {
  id: string;
  client: string;
  item: string;
  issueDate: string;
  dueDate: string;
  amount: number;
  status: 'Paga' | 'Pendente' | 'Vencida';
}

export default function ReportsBillingView() {
  const [toastAlert, setToastAlert] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('Todas');
  const [invoiceSearch, setInvoiceSearch] = useState<string>('');

  // Invoice creation form states
  const [newClientId, setNewClientId] = useState('LVMH Group Brazil');
  const [newEventTitle, setNewEventTitle] = useState('Lançamento Exclusivo Moët & Chandon');
  const [newAmount, setNewAmount] = useState(64000);
  const [newDueDate, setNewDueDate] = useState('2026-08-30');

  // Core Invoice state list
  const [invoices, setInvoices] = useState<Invoice[]>([
    { id: '#FT-2026-0842', client: 'LVMH Group France', item: 'Lançamento Coleção Outono/Inverno', issueDate: '25/05/2026', dueDate: '15/07/2026', amount: 124000, status: 'Paga' },
    { id: '#FT-2026-0915', client: 'Red Bull Racing BR', item: 'Festa de Lançamento de Monoposto', issueDate: '12/05/2026', dueDate: '28/06/2026', amount: 85000, status: 'Pendente' },
    { id: '#FT-2026-1104', client: 'Bentley Motors America', item: 'Coquetel Vip de Test-Drive', issueDate: '01/05/2026', dueDate: '12/06/2026', amount: 92500, status: 'Vencida' },
    { id: '#FT-2026-1402', client: 'Dior Cosméticos', item: 'Jantar Secreto de Perfumaria Fine', issueDate: '15/04/2026', dueDate: '02/05/2026', amount: 112000, status: 'Paga' },
    { id: '#FT-2026-1588', client: 'Montenaro Studios', item: 'Gala Secreta Coleção Primavera', issueDate: '10/05/2026', dueDate: '14/10/2026', amount: 142500, status: 'Pendente' },
  ]);

  const triggerToast = (msg: string) => {
    setToastAlert(msg);
    setTimeout(() => {
      setToastAlert(null);
    }, 4000);
  };

  const handleEmitInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEventTitle.trim()) {
      triggerToast('Insira as especificações da fatura de serviços!');
      return;
    }

    const randomID = `#FT-2026-${Math.floor(Math.random() * 9000 + 1000)}`;
    const now = new Date();
    const formattedIssue = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()}`;
    
    // Formatting due date representation
    const rawDue = new Date(newDueDate);
    const formattedDue = isNaN(rawDue.getTime()) 
      ? '30/08/2026' 
      : `${rawDue.getDate().toString().padStart(2, '0')}/${(rawDue.getMonth() + 1).toString().padStart(2, '0')}/${rawDue.getFullYear()}`;

    const newInvoice: Invoice = {
      id: randomID,
      client: newClientId,
      item: newEventTitle,
      issueDate: formattedIssue,
      dueDate: formattedDue,
      amount: newAmount,
      status: 'Pendente',
    };

    setInvoices([newInvoice, ...invoices]);
    setModalOpen(false);
    triggerToast(`Fatura ${randomID} para "${newClientId}" emitida com sucesso!`);
    
    // reset
    setNewEventTitle('');
  };

  const filteredInvoices = invoices.filter(inv => {
    const matchesStatus = filterStatus === 'Todas' || inv.status === filterStatus;
    const matchesSearch = inv.client.toLowerCase().includes(invoiceSearch.toLowerCase()) || 
                          inv.item.toLowerCase().includes(invoiceSearch.toLowerCase()) ||
                          inv.id.toLowerCase().includes(invoiceSearch.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Toast popup */}
      {toastAlert && (
        <div className="fixed top-6 right-6 bg-[#041632] text-[#fed488] px-6 py-4 rounded-xl shadow-2xl border border-[#fed488]/40 z-50 flex items-center gap-3 animate-bounce font-sans">
          <Sparkles className="h-5 w-5 text-[#fed488]" />
          <div>
            <p className="font-bold text-sm">Atualização Financeira</p>
            <p className="text-xs text-white/95 mt-0.5">{toastAlert}</p>
          </div>
        </div>
      )}

      {/* Reports Header Row */}
      <div className="bg-white p-6 rounded-xl border border-[#c5c6ce]/30 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#041632]">Centro de Faturamento & Relatórios</h2>
          <p className="font-sans text-xs text-[#44474d] mt-1">
            Gere ordens de serviço corporativas, fature prazos de pagadores e monitore rentabilidade mensal.
          </p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-[#041632] text-white hover:opacity-95 font-sans font-semibold text-xs px-4 py-2.5 rounded-lg flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95 transition-all shrink-0"
        >
          <Plus className="h-4 w-4" />
          <span>Emitir Nova Fatura</span>
        </button>
      </div>

      {/* Top Section: double analytical widgets (Captures aesthetics from image 8 and 9) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Rentability KPI stack */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-[#c5c6ce]/30 p-6 md:p-8 shadow-xs space-y-6">
          <div className="flex justify-between items-center pb-4 border-b border-slate-100">
            <div>
              <h3 className="font-serif text-lg font-bold text-[#041632]">Performance de Caixa</h3>
              <p className="font-sans text-xs text-gray-500">Métricas analíticas globais acumuladas no trimestre</p>
            </div>
            <span className="p-2 bg-[#fed488]/20 rounded-md text-[#775a19]">
              <Calculator className="h-5 w-5" />
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-sans text-gray-500 font-semibold">
                <span>Receita Faturada Acumulada</span>
                <span className="text-emerald-600 flex items-center gap-0.5 font-bold"><TrendingUp className="h-3 w-3" /> +8.4%</span>
              </div>
              <p className="font-serif text-2xl font-bold text-[#041632]">R$ 1.284.000,00</p>
              
              <div className="w-full bg-slate-100 rounded-full h-1 mt-1">
                <div className="bg-[#775a19] h-1 rounded-full" style={{ width: '85%' }}></div>
              </div>
              <p className="text-[10px] text-gray-400 font-medium">85% da meta anual de R$ 1.5M contratada</p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-sans text-gray-500 font-semibold">
                <span>Receitas em Cobrança (Pendente)</span>
                <span className="text-amber-600 flex items-center gap-0.5 font-bold">Aguardando</span>
              </div>
              <p className="font-serif text-2xl font-bold text-[#041632]">R$ 227.500,00</p>
              
              <div className="w-full bg-slate-100 rounded-full h-1 mt-1">
                <div className="bg-[#041632] h-1 rounded-full" style={{ width: '18%' }}></div>
              </div>
              <p className="text-[10px] text-gray-400 font-medium">18% das faturas pendentes de liquidação</p>
            </div>

          </div>

          {/* Secondary stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-slate-100">
            <div className="text-center md:text-left">
              <span className="font-sans text-[10px] uppercase font-bold text-gray-400 block">Conversão</span>
              <p className="font-serif text-sm font-bold text-[#041632] mt-0.5">64.2%</p>
            </div>
            <div className="text-center md:text-left">
              <span className="font-sans text-[10px] uppercase font-bold text-gray-400 block">Satisfação</span>
              <p className="font-serif text-sm font-bold text-[#041632] mt-0.5">4.9/5.0</p>
            </div>
            <div className="text-center md:text-left">
              <span className="font-sans text-[10px] uppercase font-bold text-gray-400 block">Eventos Sociais</span>
              <p className="font-serif text-sm font-bold text-[#041632] mt-0.5">42 Fichas</p>
            </div>
            <div className="text-center md:text-left">
              <span className="font-sans text-[10px] uppercase font-bold text-gray-400 block">Eventos Corporat.</span>
              <p className="font-serif text-sm font-bold text-[#041632] mt-0.5">58 Fichas</p>
            </div>
          </div>
        </div>

        {/* Right Side: Operational Split double horizontal progress line */}
        <div className="bg-white rounded-xl border border-[#c5c6ce]/30 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
              <BarChart4 className="h-5 w-5 text-[#041632]" />
              <h3 className="font-serif text-md font-bold text-[#041632]">Distribuição Operacional</h3>
            </div>

            <div className="space-y-6 pt-2 font-sans text-xs">
              {/* Event Type 1 */}
              <div className="space-y-2">
                <div className="flex justify-between font-bold">
                  <span className="text-[#041632]">Corporativo de Luxo (Lançamentos)</span>
                  <span className="text-gray-500">58% do Volume</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-[#041632] h-2 rounded-full" style={{ width: '58%' }}></div>
                </div>
              </div>

              {/* Event Type 2 */}
              <div className="space-y-2">
                <div className="flex justify-between font-bold">
                  <span className="text-[#775a19]">Casamentos & Eventos Sociais</span>
                  <span className="text-gray-500">42% do Volume</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-[#775a19] h-2 rounded-full" style={{ width: '42%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 text-center font-sans text-[11px] text-[#44474d] leading-normal">
            Meta operacional: Alcançar 110 eventos faturados anuais. 
            <strong className="text-[#041632] block mt-1">Concluído: 100 de 110 (90%)</strong>
          </div>
        </div>

      </div>

      {/* Advanced Invoices Table segment */}
      <div className="bg-white rounded-xl border border-[#c5c6ce]/30 overflow-hidden shadow-xs">
        
        {/* Table title block with filters and search input */}
        <div className="p-6 border-b border-slate-200/60 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-serif text-lg font-bold text-[#041632]">Registro de Cobranças</h3>
              <p className="font-sans text-xs text-gray-500 mt-1">Faturamento emitido para corporações parceiras e clientes VIP</p>
            </div>
            
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar fatura ou patrocinador..."
                value={invoiceSearch}
                onChange={(e) => setInvoiceSearch(e.target.value)}
                className="w-full bg-slate-50 border border-gray-300 rounded-lg pl-9 pr-4 py-2 text-xs focus:ring-1 focus:ring-[#041632] outline-hidden placeholder-gray-400 text-[#041632]"
              />
            </div>
          </div>

          <div className="flex gap-1 overflow-x-auto pt-2">
            {['Todas', 'Paga', 'Pendente', 'Vencida'].map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1.5 rounded-md text-xs font-sans font-semibold transition-all cursor-pointer shrink-0 ${
                  filterStatus === st
                    ? 'bg-[#041632] text-white'
                    : 'text-gray-500 hover:bg-slate-100'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Table representation */}
        <div className="overflow-x-auto">
          <table className="w-full text-left font-sans text-xs">
            <thead>
              <tr className="bg-slate-50 text-[#041632] font-semibold uppercase tracking-wider">
                <th className="px-6 py-4">Fatura</th>
                <th className="px-6 py-4">Patronos / Ordem de Serviço</th>
                <th className="px-6 py-4">Data de Emissão</th>
                <th className="px-6 py-4">Vencimento</th>
                <th className="px-6 py-4">Valor Bruto</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Download</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c5c6ce]/20">
              {filteredInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-mono font-bold text-[#041632] bg-slate-100 px-2 py-1 rounded-sm">
                      {inv.id}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-sm text-[#041632]">{inv.client}</p>
                    <p className="text-[10.5px] text-gray-500 mt-0.5">{inv.item}</p>
                  </td>
                  <td className="px-6 py-4 text-[#44474d] font-medium">
                    {inv.issueDate}
                  </td>
                  <td className="px-6 py-4 text-[#44474d] font-medium">
                    {inv.dueDate}
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-bold text-sm text-[#041632]">
                      R$ {inv.amount.toLocaleString('pt-BR')},00
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      inv.status === 'Paga' 
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                        : inv.status === 'Pendente'
                          ? 'bg-amber-50 text-amber-800 border border-amber-200 animate-pulse'
                          : 'bg-red-50 text-red-800 border border-red-200'
                    }`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => triggerToast(`Parabéns: Arquivo ${inv.id} PDF gerado nas transferências!`)}
                      className="p-1.5 hover:bg-slate-100 text-gray-500 hover:text-[#041632] rounded-md cursor-pointer inline-flex"
                      title="Baixar PDF da Fatura"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredInvoices.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-400">
                    Nenhuma fatura localizada sob estes termos.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* EMIT NEW INVOICE DIALOG POPUP MODAL LIGHTBOX */}
      {/* ========================================================================= */}
      {modalOpen && (
        <div className="fixed inset-0 bg-[#041632]/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-100 animate-scale-up">
            
            {/* Modal Header */}
            <div className="p-6 bg-[#041632] text-white flex justify-between items-center">
              <div>
                <h3 className="font-serif text-lg font-bold">Emitir Fatura de Serviço</h3>
                <p className="text-[11px] text-[#fed488] font-sans mt-0.5">Ordens de cobrança oficiais do sistema CRM</p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 hover:bg-white/10 text-white rounded-full cursor-pointer transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Form inputs */}
            <form onSubmit={handleEmitInvoice} className="p-6 space-y-4 font-sans">
              
              <div className="space-y-1">
                <label className="text-[11.5px] font-bold text-[#041632]">Selecione o Cliente Pagador *</label>
                <select
                  value={newClientId}
                  onChange={(e) => setNewClientId(e.target.value)}
                  className="w-full bg-slate-50 border border-gray-300 rounded-lg p-2.5 text-xs text-[#041632] font-semibold cursor-pointer"
                >
                  <option value="LVMH Group Brazil">LVMH Group Brazil</option>
                  <option value="Red Bull Racing BR">Red Bull Racing BR</option>
                  <option value="Bentley Motors America">Bentley Motors America</option>
                  <option value="Montenaro Studios">Montenaro Studios</option>
                  <option value="Helena Silveira Jewels">Helena Silveira Jewels</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[11.5px] font-bold text-[#041632]">Especificação de Evento / Serviços *</label>
                <input
                  type="text"
                  required
                  placeholder="ex: Coquetel de Lançamento e Pratos Quentes"
                  value={newEventTitle}
                  onChange={(e) => setNewEventTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-gray-300 rounded-lg p-2.5 text-xs text-[#041632] font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11.5px] font-bold text-[#041632]">Montante R$ total *</label>
                  <input
                    type="number"
                    required
                    value={newAmount}
                    onChange={(e) => setNewAmount(parseInt(e.target.value) || 0)}
                    className="w-full bg-slate-50 border border-gray-300 rounded-lg p-2.5 text-xs text-[#041632] font-semibold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11.5px] font-bold text-[#041632]">Vencimento *</label>
                  <input
                    type="date"
                    required
                    value={newDueDate}
                    onChange={(e) => setNewDueDate(e.target.value)}
                    className="w-full bg-slate-50 border border-gray-300 rounded-lg p-2 text-xs text-[#041632] font-semibold"
                  />
                </div>
              </div>

              {/* Warn info */}
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex gap-2">
                <Clock className="h-4.5 w-4.5 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-[10px] text-gray-500 leading-normal">
                  A fatura será gerada com status de liquidação <strong>&ldquo;Pendente&rdquo;</strong>. Notificação com boleto digital será enviada de forma autônoma para os e-mails corporativos do patrono.
                </p>
              </div>

              {/* Action modal row */}
              <div className="pt-4 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="bg-white border border-gray-300 font-semibold text-xs px-4 py-2.5 rounded-lg text-gray-700 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-[#041632] hover:opacity-95 text-white font-semibold text-xs px-5 py-2.5 rounded-lg flex items-center gap-1 cursor-pointer shadow-xs"
                >
                  <CheckCircle className="h-4 w-4" />
                  <span>Emitir Fatura</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
