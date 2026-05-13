import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { SiteData, Moto, initialData } from '../data/initialData'
import { supabase } from '../lib/supabase'

interface SiteContextType {
  data: SiteData
  updateData: (newData: SiteData) => void
  addMoto: (moto: Omit<Moto, 'id'>) => void
  updateMoto: (moto: Moto) => void
  removeMoto: (id: string) => void
  isAdminOpen: boolean
  setIsAdminOpen: (v: boolean) => void
  isAdminAuthenticated: boolean
  setIsAdminAuthenticated: (v: boolean) => void
  loading: boolean
}

const SiteContext = createContext<SiteContextType | null>(null)

export function SiteProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<SiteData>(initialData)
  const [loading, setLoading] = useState(true)
  const [isAdminOpen, setIsAdminOpen] = useState(false)
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return sessionStorage.getItem('mkp_admin') === '1'
  })

  // Busca motos do Supabase ao carregar
  useEffect(() => {
    async function fetchMotos() {
      try {
        const { data: motos, error } = await supabase
          .from('motos')
          .select('*')
          .order('id')

        if (error) {
          console.error('Erro ao buscar motos:', error)
          setLoading(false)
          return
        }

        if (motos && motos.length > 0) {
          setData(prev => ({ ...prev, motos }))
        } else {
          // Se banco vazio, insere as motos iniciais
          const { error: insertError } = await supabase
            .from('motos')
            .insert(initialData.motos)

          if (!insertError) {
            setData(prev => ({ ...prev, motos: initialData.motos }))
          }
        }
      } catch (err) {
        console.error('Erro de conexão:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchMotos()
  }, [])

  useEffect(() => {
    if (isAdminAuthenticated) {
      sessionStorage.setItem('mkp_admin', '1')
    } else {
      sessionStorage.removeItem('mkp_admin')
    }
  }, [isAdminAuthenticated])

  const updateData = (newData: SiteData) => setData(newData)

  const addMoto = async (moto: Omit<Moto, 'id'>) => {
    const newMoto: Moto = { ...moto, id: Date.now().toString() }

    const { error } = await supabase.from('motos').insert(newMoto)

    if (error) {
      console.error('Erro ao adicionar moto:', error)
      return
    }

    setData(prev => ({ ...prev, motos: [...prev.motos, newMoto] }))
  }

  const updateMoto = async (moto: Moto) => {
    const { error } = await supabase
      .from('motos')
      .update(moto)
      .eq('id', moto.id)

    if (error) {
      console.error('Erro ao atualizar moto:', error)
      return
    }

    setData(prev => ({
      ...prev,
      motos: prev.motos.map(m => (m.id === moto.id ? moto : m)),
    }))
  }

  const removeMoto = async (id: string) => {
    const { error } = await supabase
      .from('motos')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Erro ao remover moto:', error)
      return
    }

    setData(prev => ({ ...prev, motos: prev.motos.filter(m => m.id !== id) }))
  }

  return (
    <SiteContext.Provider
      value={{
        data,
        updateData,
        addMoto,
        updateMoto,
        removeMoto,
        isAdminOpen,
        setIsAdminOpen,
        isAdminAuthenticated,
        setIsAdminAuthenticated,
        loading,
      }}
    >
      {children}
    </SiteContext.Provider>
  )
}

export function useSite() {
  const ctx = useContext(SiteContext)
  if (!ctx) throw new Error('useSite must be used within SiteProvider')
  return ctx
}
