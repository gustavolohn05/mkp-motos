import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Moto } from '../../data/initialData'

interface MotoCardProps {
  moto: Moto
  onClick: (moto: Moto) => void
  index: number
}

function formatPrice(price: number) {
  return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0 })
}

function formatKm(km?: number) {
  if (!km || km === 0) return '0 KM'
  return km.toLocaleString('pt-BR') + ' KM'
}

export default function MotoCard({ moto, onClick, index }: MotoCardProps) {
  const [photoIdx, setPhotoIdx] = useState(0)

  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation()
    setPhotoIdx(i => (i - 1 + moto.fotos.length) % moto.fotos.length)
  }
  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation()
    setPhotoIdx(i => (i + 1) % moto.fotos.length)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
      whileHover={{ y: -4 }}
      onClick={() => onClick(moto)}
      className="bg-mkp-card border border-mkp-border hover:border-mkp-red/50 rounded-sm overflow-hidden cursor-pointer transition-all duration-300 group glow-red-hover"
    >
      {/* Photo carousel */}
      <div className="relative aspect-[4/3] overflow-hidden bg-black">
        <img
          src={moto.fotos[photoIdx]}
          alt={`${moto.marca} ${moto.modelo}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Status badge */}
        <div className="absolute top-3 left-3 z-10">
          <span
            className={`font-barlow font-700 text-xs uppercase tracking-widest px-2.5 py-1 rounded-sm ${
              moto.status === 'Disponivel'
                ? 'bg-green-500/90 text-white'
                : 'bg-mkp-red/90 text-white'
            }`}
          >
            {moto.status === 'Disponivel' ? 'Disponível' : 'Vendida'}
          </span>
        </div>

        {/* Photo nav arrows */}
        {moto.fotos.length > 1 && (
          <>
            <button
              onClick={prevPhoto}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 bg-black/70 flex items-center justify-center text-white hover:bg-mkp-red transition-colors rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              aria-label="Foto anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextPhoto}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 bg-black/70 flex items-center justify-center text-white hover:bg-mkp-red transition-colors rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              aria-label="Próxima foto"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Photo dots */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
              {moto.fotos.map((_, i) => (
                <button
                  key={i}
                  onClick={e => { e.stopPropagation(); setPhotoIdx(i) }}
                  className={`rounded-full transition-all duration-200 ${
                    i === photoIdx ? 'w-4 h-1.5 bg-mkp-red' : 'w-1.5 h-1.5 bg-white/50'
                  }`}
                  aria-label={`Foto ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
      </div>

      {/* Info */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-1">
          <span className="font-barlow font-500 text-xs uppercase tracking-[0.2em] text-mkp-red">
            {moto.marca}
          </span>
          <span className="font-barlow text-xs text-mkp-muted">{moto.ano}</span>
        </div>
        <h3 className="font-bebas text-2xl text-white tracking-wide leading-tight mb-1">
          {moto.modelo}
        </h3>
        <p className="font-barlow text-xs text-mkp-muted mb-3 truncate">{moto.categoria}</p>

        {/* Specs row */}
        <div className="flex items-center gap-3 mb-2 text-xs font-barlow text-mkp-muted">
          <span>{moto.motor}</span>
          <span className="text-mkp-border">|</span>
          <span>{moto.potencia}</span>
          <span className="text-mkp-border">|</span>
          <span>{moto.zero100} (0-100)</span>
        </div>

        {/* KM row */}
        <div className="mb-4 text-xs font-barlow text-mkp-muted">
          <span className="uppercase tracking-wide">KMs Rodados: </span>
          <span className="text-white font-600">{formatKm(moto.km)}</span>
        </div>

        {/* Price + button */}
        <div className="flex items-center justify-between">
          <span className="font-bebas text-2xl text-mkp-red tracking-wide">
            {formatPrice(moto.preco)}
          </span>
          <span className="font-barlow font-600 text-xs uppercase tracking-widest text-mkp-muted group-hover:text-mkp-red transition-colors">
            Ver Detalhes →
          </span>
        </div>
      </div>
    </motion.div>
  )
}
