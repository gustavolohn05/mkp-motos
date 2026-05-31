import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Filter } from 'lucide-react'
import { useSite } from '../../context/SiteContext'
import { Moto } from '../../data/initialData'
import MotoCard from '../ui/MotoCard'
import MotoModal from '../ui/MotoModal'
import AnimatedSection from '../ui/AnimatedSection'

const CATEGORIAS = ['Todas', 'Sport/Superbike', 'Street Naked', 'Trail/Adventure', 'Scooter', 'Crossover']

export default function Estoque() {
  const { data, loading } = useSite()
  const [selectedMoto, setSelectedMoto] = useState<Moto | null>(null)
  const [filtroMarca, setFiltroMarca] = useState('Todas')
  const [filtroCategoria, setFiltroCategoria] = useState('Todas')

  const marcas = useMemo(() => {
    const set = new Set(data.motos.map(m => m.marca))
    return ['Todas', ...Array.from(set)]
  }, [data.motos])

  const motosFiltradas = useMemo(() => {
    return data.motos.filter(m => {
      const okMarca = filtroMarca === 'Todas' || m.marca === filtroMarca
      const okCat = filtroCategoria === 'Todas' || m.categoria === filtroCategoria
      return okMarca && okCat
    })
  }, [data.motos, filtroMarca, filtroCategoria])

  return (
    <section id="estoque" className="py-20 bg-mkp-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <AnimatedSection className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="section-divider" />
            <span className="font-barlow font-600 text-xs uppercase tracking-[0.3em] text-mkp-red">
              Estoque
            </span>
          </div>
          <h2 className="font-bebas text-5xl md:text-7xl text-white tracking-wide leading-none mb-4">
            NOSSO ESTOQUE
          </h2>
          <p className="font-barlow text-mkp-muted max-w-xl">
            Encontre a moto dos seus sonhos entre as melhores marcas do mercado. Estoque sempre atualizado.
          </p>
        </AnimatedSection>

        {/* Filters */}
        <AnimatedSection delay={0.1} className="mb-10">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="flex items-center gap-2 text-mkp-muted">
              <Filter className="w-4 h-4" />
              <span className="font-barlow text-sm uppercase tracking-widest">Filtrar:</span>
            </div>

            {/* Marca filter */}
            <div className="flex flex-wrap gap-2">
              {marcas.map(marca => (
                <button
                  key={marca}
                  onClick={() => setFiltroMarca(marca)}
                  className={`font-barlow font-500 text-xs uppercase tracking-widest px-3 py-1.5 rounded-sm border transition-all duration-200 ${
                    filtroMarca === marca
                      ? 'bg-mkp-red border-mkp-red text-white'
                      : 'border-mkp-border text-mkp-muted hover:border-mkp-red/50 hover:text-white'
                  }`}
                >
                  {marca}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-3 ml-0 sm:ml-[90px]">
            {CATEGORIAS.map(cat => (
              <button
                key={cat}
                onClick={() => setFiltroCategoria(cat)}
                className={`font-barlow font-500 text-xs uppercase tracking-widest px-3 py-1.5 rounded-sm border transition-all duration-200 ${
                  filtroCategoria === cat
                    ? 'bg-mkp-red/10 border-mkp-red text-mkp-red'
                    : 'border-mkp-border text-mkp-muted hover:border-mkp-red/50 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </AnimatedSection>

        {/* Count */}
        <div className="mb-6">
          <span className="font-barlow text-sm text-mkp-muted">
            {motosFiltradas.length} moto{motosFiltradas.length !== 1 ? 's' : ''} encontrada{motosFiltradas.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="bg-mkp-card border border-mkp-border rounded-sm overflow-hidden animate-pulse">
                <div className="w-full h-48 bg-mkp-border/40" />
                <div className="p-4 flex flex-col gap-3">
                  <div className="h-4 bg-mkp-border/40 rounded w-2/3" />
                  <div className="h-3 bg-mkp-border/30 rounded w-1/2" />
                  <div className="h-5 bg-mkp-border/40 rounded w-1/3 mt-2" />
                </div>
              </div>
            ))}
          </div>
        ) : motosFiltradas.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {motosFiltradas.map((moto, i) => (
              <MotoCard
                key={moto.id}
                moto={moto}
                onClick={setSelectedMoto}
                index={i}
              />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="font-bebas text-3xl text-mkp-muted/50 tracking-wide">Nenhuma moto encontrada</p>
            <p className="font-barlow text-sm text-mkp-muted/40 mt-2">Tente alterar os filtros</p>
          </motion.div>
        )}
      </div>

      {/* Modal */}
      {selectedMoto && (
        <MotoModal moto={selectedMoto} onClose={() => setSelectedMoto(null)} />
      )}
    </section>
  )
}
