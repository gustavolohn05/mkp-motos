import React from 'react'
import { motion } from 'framer-motion'
import { useSite } from '../../context/SiteContext'
import AnimatedSection from '../ui/AnimatedSection'

export default function Marcas() {
  const { data } = useSite()

  return (
    <section id="marcas" className="py-20 bg-mkp-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="font-bebas text-white whitespace-nowrap select-none"
          style={{ fontSize: '40vw', lineHeight: 1, marginTop: '-5vw' }}>
          MARCAS
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <AnimatedSection className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="section-divider" />
            <span className="font-barlow font-600 text-xs uppercase tracking-[0.3em] text-mkp-red">
              Parceiros
            </span>
          </div>
          <h2 className="font-bebas text-5xl md:text-7xl text-white tracking-wide leading-none">
            MARCAS PARCEIRAS
          </h2>
        </AnimatedSection>

        {/* Brands grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
          {data.marcas.map((marca, i) => (
            <motion.div
              key={marca}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group bg-mkp-card border border-mkp-border hover:border-mkp-red/60 hover:bg-mkp-red/5 rounded-sm flex items-center justify-center py-5 px-3 cursor-default transition-all duration-150"
            >
              <span className="font-barlow font-700 text-xs text-center text-mkp-muted group-hover:text-white uppercase tracking-wide leading-tight transition-colors duration-150">
                {marca}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
