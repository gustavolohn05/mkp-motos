import React from 'react'
import { motion } from 'framer-motion'
import { X, LogOut, Settings, Package } from 'lucide-react'
import { useSite } from '../../context/SiteContext'
import SiteEditor from './SiteEditor'
import StockManager from './StockManager'

export default function AdminPanel() {
  const { setIsAdminOpen, setIsAdminAuthenticated } = useSite()
  const [activeTab, setActiveTab] = React.useState<'site' | 'estoque'>('estoque')

  const handleLogout = () => {
    setIsAdminAuthenticated(false)
    setIsAdminOpen(false)
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-mkp-border bg-mkp-card flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 bg-mkp-red rounded-sm flex items-center justify-center">
            <Settings className="w-4 h-4 text-white" />
          </div>
          <span className="font-bebas text-xl text-white tracking-widest">PAINEL ADMINISTRATIVO — MKP MOTOS</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 font-barlow text-xs text-mkp-muted hover:text-mkp-red transition-colors uppercase tracking-wide"
          >
            <LogOut className="w-4 h-4" />
            Sair
          </button>
          <button
            onClick={() => setIsAdminOpen(false)}
            className="text-mkp-muted hover:text-white transition-colors p-1"
            aria-label="Fechar painel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-mkp-border bg-mkp-card flex-shrink-0">
        <button
          onClick={() => setActiveTab('estoque')}
          className={`flex items-center gap-2 px-6 py-3.5 font-barlow font-600 text-sm uppercase tracking-widest border-b-2 transition-all ${
            activeTab === 'estoque'
              ? 'border-mkp-red text-white'
              : 'border-transparent text-mkp-muted hover:text-white'
          }`}
        >
          <Package className="w-4 h-4" />
          Gestão de Estoque
        </button>
        <button
          onClick={() => setActiveTab('site')}
          className={`flex items-center gap-2 px-6 py-3.5 font-barlow font-600 text-sm uppercase tracking-widest border-b-2 transition-all ${
            activeTab === 'site'
              ? 'border-mkp-red text-white'
              : 'border-transparent text-mkp-muted hover:text-white'
          }`}
        >
          <Settings className="w-4 h-4" />
          Edição do Site
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'estoque' ? <StockManager /> : <SiteEditor />}
      </div>
    </div>
  )
}
