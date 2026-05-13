import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Zap, Calendar, Gauge, Activity, MessageCircle, Milestone } from 'lucide-react'
import { Moto } from '../../data/initialData'

interface MotoModalProps {
  moto: Moto
  onClose: () => void
}

function formatPrice(price: number) {
  return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0 })
}

function formatKm(km?: number) {
  if (!km || km === 0) return '0 KM'
  return km.toLocaleString('pt-BR') + ' KM'
}

export default function MotoModal({ moto, onClose }: MotoModalProps) {
  const [photoIdx, setPhotoIdx] = useState(0)

  const prev = () => setPhotoIdx(i => (i - 1 + moto.fotos.length) % moto.fotos.length)
  const next = () => setPhotoIdx(i => (i + 1) % moto.fotos.length)

  const handleWhatsApp = () => {
    const msg = encodeURIComponent(
      `Olá! Tenho interesse na ${moto.marca} ${moto.modelo} ${moto.ano} (${formatPrice(moto.preco)}). Gostaria de mais informações.`
    )
    window.open(`https://wa.me/5548999152309?text=${msg}`, '_blank')
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          onClick={e => e.stopPropagation()}
          className="bg-mkp-card border border-mkp-border rounded-sm w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-mkp-border">
            <div>
              <span className="font-barlow font-500 text-xs uppercase tracking-[0.2em] text-mkp-red">{moto.marca}</span>
              <h2 className="font-bebas text-3xl text-white tracking-wide leading-none">{moto.modelo}</h2>
            </div>
            <button
              onClick={onClose}
              className="text-mkp-muted hover:text-white transition-colors p-1"
              aria-label="Fechar"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Gallery */}
            <div className="relative bg-black">
              <div className="aspect-[4/3] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={photoIdx}
                    src={moto.fotos[photoIdx]}
                    alt={`${moto.marca} ${moto.modelo} - foto ${photoIdx + 1}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>
              </div>

              {moto.fotos.length > 1 && (
                <>
                  <button
                    onClick={prev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/70 border border-white/20 flex items-center justify-center text-white hover:border-mkp-red hover:text-mkp-red transition-all rounded-sm"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={next}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/70 border border-white/20 flex items-center justify-center text-white hover:border-mkp-red hover:text-mkp-red transition-all rounded-sm"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  {/* Thumbnails dots */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                    {moto.fotos.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setPhotoIdx(i)}
                        className={`rounded-full transition-all duration-200 ${
                          i === photoIdx ? 'w-6 h-2 bg-mkp-red' : 'w-2 h-2 bg-white/40 hover:bg-white/70'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}

              {/* Thumbnails strip */}
              {moto.fotos.length > 1 && (
                <div className="flex gap-2 p-3 bg-black/80">
                  {moto.fotos.map((foto, i) => (
                    <button
                      key={i}
                      onClick={() => setPhotoIdx(i)}
                      className={`w-16 h-12 overflow-hidden rounded-sm border-2 transition-all ${
                        i === photoIdx ? 'border-mkp-red' : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={foto} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="p-6 flex flex-col gap-6">
              {/* Status */}
              <div className="flex items-center gap-3">
                <span
                  className={`font-barlow font-700 text-xs uppercase tracking-widest px-3 py-1 rounded-sm ${
                    moto.status === 'Disponivel'
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                      : 'bg-mkp-red/20 text-mkp-red border border-mkp-red/30'
                  }`}
                >
                  {moto.status === 'Disponivel' ? 'Disponível' : 'Vendida'}
                </span>
                <span className="font-barlow text-sm text-mkp-muted">{moto.categoria}</span>
              </div>

              {/* Slogan */}
              <p className="font-barlow text-mkp-muted/80 italic text-sm leading-relaxed border-l-2 border-mkp-red pl-4">
                "{moto.slogan}"
              </p>

              {/* Specs grid */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: Calendar, label: 'Ano', value: moto.ano.toString() },
                  { icon: Gauge, label: 'Motor', value: moto.motor },
                  { icon: Activity, label: '0–100km/h', value: moto.zero100 },
                  { icon: Zap, label: 'Potência', value: moto.potencia },
                  { icon: Milestone, label: 'KMs Rodados', value: formatKm(moto.km) },
                ].map(spec => (
                  <div
                    key={spec.label}
                    className="bg-mkp-black border border-mkp-border rounded-sm p-3 flex items-center gap-3"
                  >
                    <spec.icon className="w-4 h-4 text-mkp-red flex-shrink-0" />
                    <div>
                      <p className="font-barlow text-xs text-mkp-muted uppercase tracking-wide">{spec.label}</p>
                      <p className="font-bebas text-lg text-white leading-none">{spec.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price */}
              <div className="py-4 border-t border-mkp-border">
                <p className="font-barlow text-xs text-mkp-muted uppercase tracking-widest mb-1">Preço</p>
                <p className="font-bebas text-4xl text-mkp-red tracking-wide">{formatPrice(moto.preco)}</p>
              </div>

              {/* CTA */}
              {moto.status === 'Disponivel' && (
                <button
                  onClick={handleWhatsApp}
                  className="flex items-center justify-center gap-3 font-barlow font-700 text-sm uppercase tracking-widest px-6 py-4 rounded-sm text-white transition-all duration-300"
                  style={{ backgroundColor: '#25D366' }}
                >
                  <MessageCircle className="w-5 h-5" />
                  Solicitar via WhatsApp
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
