'use client';

import React from 'react';
import { 
  LayoutDashboard, 
  CalendarRange, 
  Users, 
  Boxes, 
  FileSpreadsheet, 
  Plus, 
  UserPlus, 
  HelpCircle, 
  LogOut, 
  Sparkles
} from 'lucide-react';

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onQuickAction: (action: 'add-client' | 'add-event' | 'add-package') => void;
}

export default function Sidebar({ currentTab, setCurrentTab, onQuickAction }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'events', name: 'Eventos', icon: CalendarRange },
    { id: 'crm', name: 'CRM', icon: Users },
    { id: 'inventory', name: 'Inventário', icon: Boxes },
    { id: 'billing', name: 'Relatórios & Faturamento', icon: FileSpreadsheet },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[#f3f4f5] dark:bg-[#111c2c] flex flex-col py-8 border-r border-[#c5c6ce]/30 z-45">
      {/* Brand Header */}
      <div className="px-6 mb-10">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-[#041632] dark:text-[#bcc7dd]" />
          <h1 className="font-serif text-xl font-bold text-[#041632] dark:text-[#ffffff] leading-none">Elite Events</h1>
        </div>
        <p className="font-sans text-xs tracking-wider text-[#44474d] dark:text-[#8893a8] mt-1 uppercase opacity-75">
          Management Suite
        </p>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 space-y-1 px-3">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left font-sans font-medium text-sm transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-[#041632] text-white dark:bg-[#b7c7eb] dark:text-[#091b37] shadow-sm font-semibold'
                  : 'text-[#44474d] dark:text-[#8893a8] hover:bg-[#edeeef] dark:hover:bg-[#212c3d]'
              }`}
            >
              <Icon className={`h-5 w-5 shrink-0 ${isActive ? 'text-white dark:text-[#091b37]' : 'text-[#44474d]/80 dark:text-[#8893a8]/80'}`} />
              <span>{item.name}</span>
            </button>
          );
        })}
      </nav>

      {/* Quick Action & Support Utilities */}
      <div className="px-4 mt-auto space-y-4">
        {currentTab === 'crm' ? (
          <button
            onClick={() => onQuickAction('add-client')}
            className="w-full bg-[#041632] text-white hover:opacity-90 active:scale-[0.98] rounded-lg py-3 px-4 flex items-center justify-center gap-2 transition-all font-sans font-semibold text-sm cursor-pointer shadow-sm"
          >
            <UserPlus className="h-4 w-4" />
            <span>Adicionar Cliente</span>
          </button>
        ) : (
          <button
            onClick={() => onQuickAction('add-event')}
            className="w-full bg-[#041632] text-white hover:opacity-90 active:scale-[0.98] rounded-lg py-3 px-4 flex items-center justify-center gap-2 transition-all font-sans font-semibold text-sm cursor-pointer shadow-sm"
          >
            <Plus className="h-4 w-4" />
            <span>Criar Novo Evento</span>
          </button>
        )}

        <div className="border-t border-[#c5c6ce]/30 pt-4 space-y-1">
          <a
            href="#support"
            onClick={(e) => { e.preventDefault(); alert("Central de Ajuda Premium: Suporte exclusivo Elite Suite."); }}
            className="flex items-center gap-3 text-[#44474d] dark:text-[#8893a8] hover:bg-[#edeeef] dark:hover:bg-[#212c3d] px-4 py-2 rounded-lg text-sm transition-all font-sans font-medium"
          >
            <HelpCircle className="h-4 w-4 text-[#44474d]/75" />
            <span>Support</span>
          </a>
          <a
            href="#signout"
            onClick={(e) => { e.preventDefault(); alert("Sessão finalizada com sucesso."); }}
            className="flex items-center gap-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 px-4 py-2 rounded-lg text-sm transition-all font-sans font-medium"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </a>
        </div>
      </div>
    </aside>
  );
}
