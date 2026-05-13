import React from 'react'
import { motion } from 'framer-motion'
import { useSite } from '../../context/SiteContext'
import AnimatedSection from '../ui/AnimatedSection'

export default function Categorias() {
  const { data } = useSite()

  return (
    <section id="categorias" className="py-20 bg-mkp-dark relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimatedSection className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="section-divider" />
            <span className="font-barlow font-600 text-xs uppercase tracking-[0.3em] text-mkp-red">
              Explore
            </span>
          </div>
          <h2 className="font-bebas text-5xl md:text-7xl text-white tracking-wide leading-none">
            CATEGORIAS
          </h2>
        </AnimatedSection>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {data.categorias.map((cat, i) => (
            <motion.div
              key={cat.nome}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="relative overflow-hidden rounded-sm cursor-pointer group"
              style={{ minHeight: '320px' }}
              onClick={() => {
                document.getElementById('estoque')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              {/* Background image */}
              <img
                src={cat.imagem}
                alt={cat.nome}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20 transition-opacity duration-300 group-hover:from-black/80 group-hover:via-black/40" />
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-mkp-red/50 transition-all duration-300 rounded-sm" />

              {/* Red line accent */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-mkp-red scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-5">
                <h3 className="font-bebas text-2xl text-white tracking-wide leading-tight mb-1 group-hover:text-mkp-red transition-colors duration-300">
                  {cat.nome}
                </h3>
                <p className="font-barlow text-xs text-white/60 italic group-hover:text-white/80 transition-colors">
                  {cat.slogan}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
