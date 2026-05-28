'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Bell, 
  Sparkles, 
  HelpCircle, 
  LayoutDashboard,
  Coins
} from 'lucide-react';

import Sidebar from '@/components/Sidebar';
import DashboardView from '@/components/DashboardView';
import CRMView from '@/components/CRMView';
import EventsWizardView from '@/components/EventsWizardView';
import InventoryView from '@/components/InventoryView';
import ReportsBillingView from '@/components/ReportsBillingView';

export default function Page() {
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  
  // Custom deep navigational actions inside child components 
  const [initialCrmSubTab, setInitialCrmSubTab] = useState<'crm-list' | 'client-profile' | 'add-client-form'>('crm-list');

  // Unified controller for quick events/crm buttons
  const handleQuickSidebarAction = (action: 'add-client' | 'add-event' | 'add-package') => {
    if (action === 'add-client') {
      setInitialCrmSubTab('add-client-form');
      setCurrentTab('crm');
    } else if (action === 'add-event') {
      setCurrentTab('events');
    } else if (action === 'add-package') {
      setCurrentTab('inventory');
    }
  };

  const handleNavigateDirectlyToClient = (clientName: string) => {
    if (clientName === 'Alexandra Montenaro') {
      setInitialCrmSubTab('client-profile');
    } else {
      setInitialCrmSubTab('crm-list');
    }
    setCurrentTab('crm');
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#0c1420] text-[#041632] dark:text-[#f8f9fa] flex">
      
      {/* Sidebar navigation */}
      <Sidebar 
        currentTab={currentTab} 
        setCurrentTab={(tab) => {
          // If moving between main navigation pages, clear any locked initial CRM sub-tabs to default list view
          if (tab === 'crm') {
            setInitialCrmSubTab('crm-list');
          }
          setCurrentTab(tab);
        }} 
        onQuickAction={handleQuickSidebarAction}
      />

      {/* Main content viewport */}
      <div className="flex-1 pl-64 flex flex-col min-h-screen">
        
        {/* Elite Top Header Bar */}
        <header className="h-20 bg-white border-b border-[#c5c6ce]/30 flex items-center justify-between px-8 shrink-0 z-40 sticky top-0">
          <div className="flex items-center gap-2">
            <Coins className="h-5 w-5 text-[#775a19]" />
            <h2 className="font-serif text-md font-bold text-[#041632] tracking-wide">Elite Events Luxury Planner Suite</h2>
            <span className="bg-[#fed488]/30 border border-[#775a19]/20 text-[#775a19] text-[9.5px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider hidden sm:inline-block">
              Corporate Gold Member
            </span>
          </div>

          {/* Controls & Administrator Profile */}
          <div className="flex items-center gap-6">
            <button 
              onClick={() => alert("Central de Notificações - Sessão de Eventos em Dia.")}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors relative cursor-pointer text-[#041632]"
              title="Notificações"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#775a19] rounded-full border border-white" />
            </button>

            {/* Admin Profile */}
            <div className="flex items-center gap-3">
              <div className="text-right hidden md:block">
                <p className="font-sans font-bold text-xs text-[#041632]">Adriana Silva Rocha</p>
                <p className="text-[10px] text-[#775a19] font-semibold mt-0.5 uppercase tracking-wider">Diretora de Banquetes</p>
              </div>
              <div className="relative w-9 h-9">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzsxU_7KyWV28z02N22lgQRLu7noPsiHu4sQMKmlHmVw2-pOQTHB0yoEXGlPsqGEvrnkAIBK08xaZ_rAalr0s-CRUk2Mwa7u-Vg1oDPPvkABbn58WAqvh92MfGmKiWoXlPx9LNGz3Hb-tNg5FxFUk_xKessgzEV237JysjwNyDtHcISBBTM99778-jlj9wSpUsow_qkyPdCpGWgY4hmvW37cdJOK7GV57iQJHIrLPge4JdvZMWqcQOqc-vqkrhhHPTqzTCgTXfNw0"
                  alt="Administrator Profile Avatar portrait"
                  fill
                  className="rounded-full object-cover border-2 border-[#775a19] fallback-bg"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic viewport renderer block with responsive custom boundaries */}
        <main className="flex-1 p-8 overflow-y-auto max-w-7xl w-full mx-auto">
          {currentTab === 'dashboard' && (
            <DashboardView 
              onNavigateTab={setCurrentTab} 
              onSelectEventClient={handleNavigateDirectlyToClient}
            />
          )}

          {currentTab === 'events' && (
            <EventsWizardView />
          )}

          {currentTab === 'crm' && (
            <CRMView 
              key={initialCrmSubTab} 
              initialSubTab={initialCrmSubTab} 
            />
          )}

          {currentTab === 'inventory' && (
            <InventoryView />
          )}

          {currentTab === 'billing' && (
            <ReportsBillingView />
          )}
        </main>

        {/* Footer info line */}
        <footer className="py-4 border-t border-[#c5c6ce]/20 text-center font-sans text-[10px] text-gray-400 font-medium select-none bg-white">
          <span>&copy; {new Date().getFullYear()} Elite Events Inc. Todos os direitos reservados. Licenciado para Aura Luxury Planner S.A.</span>
        </footer>

      </div>
    </div>
  );
}
