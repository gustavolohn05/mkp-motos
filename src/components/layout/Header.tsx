import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useSite } from '../../context/SiteContext'

const navLinks = [
  { label: 'Estoque', href: '#estoque' },
  { label: 'Marcas', href: '#marcas' },
  { label: 'Categorias', href: '#categorias' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Contato', href: '#contato' },
]

export default function Header() {
  const { data } = useSite()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-mkp-black/95 backdrop-blur-md border-b border-mkp-border shadow-lg shadow-black/50'
            : 'bg-gradient-to-b from-black/80 to-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <a
              href="#"
              onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
              className="flex items-center gap-2 flex-shrink-0"
            >
              <img
                src={data.logo || '/logo-mkp.png'}
                alt="MKP Motos"
                className="h-16 max-h-20 w-auto max-w-[220px] object-contain bg-transparent"
              />
            </a>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={e => { e.preventDefault(); handleNavClick(link.href) }}
                  className="font-barlow font-600 text-sm uppercase tracking-widest text-mkp-muted hover:text-white transition-colors duration-200 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-mkp-red group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center">
              <a
                href="#contato"
                onClick={e => { e.preventDefault(); handleNavClick('#contato') }}
                className="font-barlow font-700 text-sm uppercase tracking-widest px-5 py-2.5 border-2 border-mkp-red text-white hover:bg-mkp-red transition-all duration-300 rounded-sm"
              >
                Agendar Visita
              </a>
            </div>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden text-white p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-40 bg-mkp-black/98 backdrop-blur-xl flex flex-col pt-24 px-8"
          >
            <nav className="flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  onClick={e => { e.preventDefault(); handleNavClick(link.href) }}
                  className="font-bebas text-4xl tracking-widest text-white hover:text-mkp-red transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#contato"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.08 }}
                onClick={e => { e.preventDefault(); handleNavClick('#contato') }}
                className="mt-4 font-barlow font-700 text-sm uppercase tracking-widest px-6 py-3 bg-mkp-red text-white text-center rounded-sm"
              >
                Agendar Visita
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
