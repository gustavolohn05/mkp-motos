import React from 'react'
import { AnimatePresence } from 'framer-motion'
import { SiteProvider, useSite } from './context/SiteContext'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import Estoque from './components/sections/Estoque'
import Categorias from './components/sections/Categorias'
import Marcas from './components/sections/Marcas'
import Depoimentos from './components/sections/Depoimentos'
import Sobre from './components/sections/Sobre'
import Contato from './components/sections/Contato'
import WhatsAppFAB from './components/ui/WhatsAppFAB'
import AdminLock from './components/admin/AdminLock'
import AdminLogin from './components/admin/AdminLogin'
import AdminPanel from './components/admin/AdminPanel'

function AppContent() {
  const { isAdminOpen, isAdminAuthenticated } = useSite()

  return (
    <div className="min-h-screen bg-mkp-black">
      <Header />
      <main>
        <Hero />
        <Estoque />
        <Categorias />
        <Marcas />
        <Depoimentos />
        <Sobre />
        <Contato />
      </main>
      <Footer />

      <WhatsAppFAB />
      <AdminLock />

      <AnimatePresence>
        {isAdminOpen && !isAdminAuthenticated && <AdminLogin key="login" />}
        {isAdminOpen && isAdminAuthenticated && <AdminPanel key="panel" />}
      </AnimatePresence>
    </div>
  )
}

export default function App() {
  return (
    <SiteProvider>
      <AppContent />
    </SiteProvider>
  )
}
