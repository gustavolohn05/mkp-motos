import React from 'react'
import { motion } from 'framer-motion'
import { Lock } from 'lucide-react'
import { useSite } from '../../context/SiteContext'

export default function AdminLock() {
  const { setIsAdminOpen, isAdminAuthenticated } = useSite()

  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2 }}
      onClick={() => setIsAdminOpen(true)}
      className="fixed bottom-6 left-6 z-50 w-10 h-10 bg-mkp-card/80 backdrop-blur border border-mkp-border hover:border-mkp-red/50 flex items-center justify-center text-mkp-muted/50 hover:text-mkp-muted transition-all duration-300 rounded-sm"
      title="Painel ADM"
      aria-label="Abrir painel administrativo"
    >
      <Lock className={`w-4 h-4 ${isAdminAuthenticated ? 'text-mkp-red' : ''}`} />
    </motion.button>
  )
}
