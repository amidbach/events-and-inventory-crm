'use client';

import React, { useState } from 'react';
import { 
  Calendar, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Percent, 
  AlertTriangle, 
  UserCheck, 
  Wine, 
  ChevronRight, 
  Check, 
  Clock,
  MoreVertical
} from 'lucide-react';

interface EventItem {
  date: string;
  weekday: string;
  clientName: string;
  clientInitials: string;
  avatarBg: string;
  type: string;
  location: string;
  status: 'Confirmado' | 'Em Planejamento';
}

interface DashboardViewProps {
  onNavigateTab: (tab: string) => void;
  onSelectEventClient?: (clientName: string) => void;
}

export default function DashboardView({ onNavigateTab, onSelectEventClient }: DashboardViewProps) {
  // Urgent checklist state for dynamic user interaction
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Confirmar cardápio', desc: 'Evento: Casamento Miller - Em 2 dias', type: 'error', checked: false },
    { id: 2, title: 'Contratar staff extra', desc: 'Corporativo Tech - Prazo: Hoje', type: 'warning', checked: false },
    { id: 3, title: 'Revisar estoque de vinhos', desc: 'Jantar de Gala - Amanhã', type: 'normal', checked: false },
  ]);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, checked: !t.checked } : t));
  };

  const kpis = [
    { title: 'Eventos do Mês', val: '24', hint: '+12% vs mês anterior', trend: true, icon: Calendar, iconBg: 'bg-[#b7c7eb] text-[#041632]' },
    { title: 'Receita Prevista', val: 'R$ 142.5k', hint: 'Metas em dia', trend: true, icon: DollarSign, iconBg: 'bg-[#fed488] text-[#775a19]' },
    { title: 'Clientes Ativos', val: '86', hint: '4 novos esta semana', trend: false, icon: Users, iconBg: 'bg-[#bcc7dd] text-[#0c1728]' },
    { title: 'Taxa de Ocupação', val: '92%', hint: 'Meta de 90% superada', trend: true, isPercent: true, icon: Percent, iconBg: 'bg-[#d8e3fa] text-[#041632]' },
  ];

  const chartData = [
    { month: 'Jan', val: 'R$ 45k', height: '24%', active: false },
    { month: 'Fev', val: 'R$ 68k', height: '32%', active: false },
    { month: 'Mar', val: 'R$ 112k', height: '48%', active: false },
    { month: 'Abr', val: 'R$ 95k', height: '40%', active: false },
    { month: 'Mai', val: 'R$ 138k', height: '56%', active: false },
    { month: 'Jun', val: 'R$ 142.5k', height: '60%', active: true },
  ];

  const upcomingEvents: EventItem[] = [
    { date: '15 Jun', weekday: 'Sábado, 19:00', clientName: 'Rosa Maria Miller', clientInitials: 'RM', avatarBg: 'bg-[#ffdea5] text-[#261900]', type: 'Casamento', location: 'Palácio das Artes', status: 'Confirmado' },
    { date: '18 Jun', weekday: 'Terça, 09:00', clientName: 'Nexus Tech Solutions', clientInitials: 'NT', avatarBg: 'bg-[#d8e3fa] text-[#111c2c]', type: 'Corporativo', location: 'Centro de Convenções', status: 'Em Planejamento' },
    { date: '22 Jun', weekday: 'Sábado, 21:00', clientName: 'Ana Beatriz & Carlos', clientInitials: 'AB', avatarBg: 'bg-[#e7e8e9] text-[#041632]', type: 'Aniversário', location: 'Residência Privada', status: 'Confirmado' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header section with top branding banner and search placeholder */}
      <div className="flex justify-between items-center bg-[#ffffff] p-6 rounded-xl border border-[#c5c6ce]/30 shadow-xs">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#041632]">Performance & Operações</h2>
          <p className="font-sans text-sm text-[#44474d] mt-1">
            Gereie a saúde operacional, tarefas pendentes urgentes e faturamento de caterings.
          </p>
        </div>
        <button 
          onClick={() => onNavigateTab('events')}
          className="bg-[#041632] hover:opacity-90 active:scale-95 text-white font-sans font-semibold text-sm px-5 py-2.5 rounded-lg transition-all cursor-pointer shadow-xs"
        >
          Agendar Novo Evento
        </button>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div 
              key={idx} 
              className="bg-white p-6 rounded-xl border border-[#c5c6ce]/30 shadow-xs hover:border-[#041632]/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="flex justify-between items-start">
                <span className="font-sans text-xs font-semibold tracking-wider text-[#44474d] uppercase opacity-75">
                  {kpi.title}
                </span>
                <span className={`p-2.5 rounded-lg ${kpi.iconBg}`}>
                  <Icon className="h-5 w-5" />
                </span>
              </div>
              <div className="mt-4">
                <h3 className="font-serif text-3xl font-bold text-[#041632] tracking-tight">{kpi.val}</h3>
                
                {kpi.isPercent ? (
                  <div className="w-full bg-[#f3f4f5] rounded-full h-1.5 mt-2">
                    <div className="bg-[#775a19] h-1.5 rounded-full transition-all duration-1000" style={{ width: '92%' }}></div>
                  </div>
                ) : (
                  <p className="text-[#775a19] text-xs font-semibold mt-1.5 flex items-center gap-1">
                    {kpi.trend && <TrendingUp className="h-3.5 w-3.5" />}
                    <span>{kpi.hint}</span>
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Main double column: Chart + Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Bar Chart section */}
        <div className="lg:col-span-2 bg-white p-8 rounded-xl border border-[#c5c6ce]/30 shadow-xs flex flex-col justify-between">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-serif text-lg font-bold text-[#041632]">Desempenho Financeiro</h3>
              <p className="font-sans text-xs text-[#44474d]">Fluxo de receita por faturamentos finalizados</p>
            </div>
            <select className="bg-[#f3f4f5] border-none text-xs rounded-lg py-2 px-3 font-semibold focus:ring-1 focus:ring-[#041632] text-[#041632] cursor-pointer">
              <option>Janeiro - Junho 2024</option>
              <option>Julho - Dezembro 2024</option>
            </select>
          </div>

          <div className="h-64 w-full flex items-end justify-between gap-4 px-4 pt-8">
            {chartData.map((bar, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                <div className="w-full relative flex justify-center">
                  {/* Tooltip on hover */}
                  <div className={`absolute -top-10 bg-[#041632] text-white text-[11px] px-2 py-1 rounded-md transition-opacity duration-200 shadow-xs ${bar.active ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                    {bar.val}
                  </div>
                  {/* Chart Bar */}
                  <div 
                    style={{ height: bar.height }} 
                    className={`w-full max-w-[48px] rounded-t-lg transition-all duration-500 ${
                      bar.active 
                        ? 'bg-[#775a19]' 
                        : 'bg-[#041632]/20 group-hover:bg-[#041632]/45'
                    }`} 
                  />
                </div>
                <span className={`text-[11.5px] font-sans font-medium ${bar.active ? 'text-[#041632] font-bold' : 'text-[#44474d]'}`}>
                  {bar.month}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Task panel section */}
        <div className="bg-white p-6 rounded-xl border border-[#c5c6ce]/30 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Clock className="h-5 w-5 text-[#041632]" />
              <h3 className="font-serif text-lg font-bold text-[#041632]">Tarefas Urgentes</h3>
            </div>
            
            <div className="space-y-3">
              {tasks.map((task) => (
                <div 
                  key={task.id} 
                  onClick={() => toggleTask(task.id)}
                  className={`flex items-start gap-4 p-4 rounded-lg border-l-4 transition-all duration-200 cursor-pointer ${
                    task.checked 
                      ? 'bg-gray-50/50 border-gray-300 opacity-60' 
                      : task.type === 'error'
                        ? 'bg-red-50/50 border-red-500 hover:bg-red-50' 
                        : task.type === 'warning'
                          ? 'bg-amber-50/50 border-amber-500 hover:bg-[#fed488]/10'
                          : 'bg-slate-50 border-slate-400 hover:bg-slate-100'
                  }`}
                >
                  <button 
                    className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                      task.checked 
                        ? 'bg-gray-400 border-gray-400 text-white' 
                        : 'bg-white border-gray-300 text-transparent'
                    }`}
                  >
                    <Check className="h-3 w-3" />
                  </button>
                  <div className="flex-1 min-w-0">
                    <h4 className={`text-sm font-sans font-semibold text-[#041632] ${task.checked ? 'line-through text-gray-400' : ''}`}>
                      {task.title}
                    </h4>
                    <p className="text-xs text-[#44474d] mt-1 truncate">{task.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <button 
            onClick={() => alert("Exibindo todas as pendências da equipe...")}
            className="w-full mt-6 py-2.5 text-[#041632] hover:underline font-sans font-semibold text-sm cursor-pointer border border-[#c5c6ce]/40 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Ver todas as pendências
          </button>
        </div>
      </div>

      {/* Próximos Eventos Table Section */}
      <div className="bg-white rounded-xl border border-[#c5c6ce]/30 shadow-xs overflow-hidden">
        <div className="p-6 flex justify-between items-center bg-white border-b border-[#c5c6ce]/30">
          <div>
            <h3 className="font-serif text-lg font-bold text-[#041632]">Próximos Eventos</h3>
            <p className="font-sans text-xs text-[#44474d]">Agenda de prestígio confirmada para as próximas semanas</p>
          </div>
          <button 
            onClick={() => onNavigateTab('events')}
            className="bg-[#041632]/5 hover:bg-[#041632]/10 text-[#041632] px-4 py-2 rounded-lg font-sans font-semibold text-xs cursor-pointer transition-colors"
          >
            Ver Agenda Completa
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-sans">
            <thead>
              <tr className="bg-[#f3f4f5]/55 text-[#041632] text-xs font-semibold uppercase tracking-wider">
                <th className="px-6 py-4">Data</th>
                <th className="px-6 py-4">Cliente</th>
                <th className="px-6 py-4">Tipo</th>
                <th className="px-6 py-4">Local</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c5c6ce]/20">
              {upcomingEvents.map((event, idx) => (
                <tr 
                  key={idx} 
                  onClick={() => {
                    if (onSelectEventClient) {
                      onSelectEventClient(event.clientName);
                    }
                  }}
                  className="hover:bg-slate-50/50 cursor-pointer group transition-colors"
                >
                  <td className="px-6 py-4 font-sans text-xs">
                    <p className="text-[#041632] font-semibold text-sm">{event.date}</p>
                    <p className="text-[#44474d] mt-0.5 text-[11px]">{event.weekday}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${event.avatarBg}`}>
                        {event.clientInitials}
                      </div>
                      <span className="font-medium text-sm text-[#041632]">{event.clientName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-[#041632]/10 text-[#041632] px-2.5 py-1 rounded-full text-xs font-semibold font-sans">
                      {event.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs font-medium text-[#44474d]">
                    {event.location}
                  </td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1.5 font-sans font-bold text-xs text-[#775a19]">
                      <span className="w-2 h-2 rounded-full bg-[#775a19]" />
                      <span>{event.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={(e) => { e.stopPropagation(); alert(`Opções rápidas para: ${event.clientName}`); }}
                      className="p-1.5 rounded-full hover:bg-slate-200 text-gray-500 opacity-60 group-hover:opacity-100 transition-opacity cursor-pointer inline-flex"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
