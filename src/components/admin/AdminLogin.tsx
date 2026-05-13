import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Lock, Eye, EyeOff, X } from 'lucide-react'
import { useSite } from '../../context/SiteContext'

const ADMIN_PASSWORD = 'mkpmotos2020'

export default function AdminLogin() {
  const { setIsAdminAuthenticated, setIsAdminOpen } = useSite()
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [shake, setShake] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setIsAdminAuthenticated(true)
      setError('')
    } else {
      setError('Senha incorreta. Tente novamente.')
      setShake(true)
      setTimeout(() => setShake(false), 600)
      setPassword('')
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={() => setIsAdminOpen(false)}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: shake ? [1, 1.02, 0.98, 1.02, 0.98, 1] : 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        onClick={e => e.stopPropagation()}
        className="bg-mkp-card border border-mkp-border rounded-sm p-8 w-full max-w-sm relative"
      >
        <button
          onClick={() => setIsAdminOpen(false)}
          className="absolute top-4 right-4 text-mkp-muted hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center gap-6">
          <div className="w-14 h-14 bg-mkp-red/10 border border-mkp-red/30 rounded-sm flex items-center justify-center">
            <Lock className="w-7 h-7 text-mkp-red" />
          </div>
          <div className="text-center">
            <h2 className="font-bebas text-3xl text-white tracking-wide">PAINEL ADM</h2>
            <p className="font-barlow text-sm text-mkp-muted mt-1">MKP Motos — Acesso restrito</p>
          </div>

          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={e => { setPassword(e.target.value); setError('') }}
                placeholder="Senha de acesso"
                autoFocus
                className="w-full bg-mkp-black border border-mkp-border focus:border-mkp-red outline-none px-4 py-3 pr-12 font-barlow text-sm text-white placeholder:text-mkp-muted/50 rounded-sm transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-mkp-muted hover:text-white transition-colors"
              >
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {error && (
              <p className="font-barlow text-xs text-mkp-red text-center">{error}</p>
            )}

            <button
              type="submit"
              className="font-barlow font-700 text-sm uppercase tracking-widest py-3 bg-mkp-red hover:bg-mkp-red-hover text-white transition-all duration-300 rounded-sm"
            >
              Entrar
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  )
}
