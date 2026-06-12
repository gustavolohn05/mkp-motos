import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { SiteData, Moto, initialData } from '../data/initialData'
import { supabase } from '../lib/supabase'

interface SiteContextType {
  data: SiteData
  updateData: (newData: SiteData) => void
  addMoto: (moto: Omit<Moto, 'id'>) => Promise<{ error: string | null }>
  updateMoto: (moto: Moto) => Promise<{ error: string | null }>
  removeMoto: (id: string) => Promise<{ error: string | null }>
  isAdminOpen: boolean
  setIsAdminOpen: (v: boolean) => void
  isAdminAuthenticated: boolean
  setIsAdminAuthenticated: (v: boolean) => void
  loading: boolean
}

const SiteContext = createContext<SiteContextType | null>(null)

export function SiteProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<SiteData>({ ...initialData, motos: [] })
  const [loading, setLoading] = useState(true)
  const [isAdminOpen, setIsAdminOpen] = useState(false)
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return sessionStorage.getItem('mkp_admin') === '1'
  })

  useEffect(() => {
    async function fetchMotos(tentativa = 1) {
      try {
        console.log(`Buscando motos do Supabase... (tentativa ${tentativa})`)
        const { data: motos, error } = await supabase
          .from('motos')
          .select('*')
          .order('id')

        if (error) {
          console.error('Erro ao buscar motos:', error.message, error.details, error.hint)

          if (tentativa < 3) {
            console.warn(`Tentando novamente em 2s... (${tentativa}/3)`)
            setTimeout(() => fetchMotos(tentativa + 1), 2000)
            return
          }

          setLoading(false)
          return
        }

        setData(prev => ({ ...prev, motos: motos ?? [] }))
        setLoading(false)
      } catch (err) {
        console.error('Erro de conexão:', err)

        if (tentativa < 3) {
          console.warn(`Erro de conexão. Tentando novamente em 2s... (${tentativa}/3)`)
          setTimeout(() => fetchMotos(tentativa + 1), 2000)
          return
        }

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

  const addMoto = async (moto: Omit<Moto, 'id'>): Promise<{ error: string | null }> => {
    const newMoto: Moto = { ...moto, id: Date.now().toString() }

    const fotosParaSalvar = newMoto.fotos.map(f => {
      if (f.startsWith('data:image')) {
        console.warn('Foto em base64 detectada. Use URLs externas ou Supabase Storage.')
        return f
      }
      return f
    })

    const motoParaSalvar = { ...newMoto, fotos: fotosParaSalvar }

    const { error } = await supabase.from('motos').insert(motoParaSalvar)

    if (error) {
      console.error('Erro ao adicionar moto:', error.message, error.details, error.hint)
      if (error.message.includes('row-level security') || error.code === '42501') {
        return { error: 'Permissão negada pelo banco de dados. Verifique as políticas RLS no Supabase.' }
      }
      if (error.message.includes('too large') || error.code === '54000') {
        return { error: 'Foto muito grande. Use uma URL de imagem externa ao invés de fazer upload direto.' }
      }
      return { error: error.message }
    }

    setData(prev => ({ ...prev, motos: [...prev.motos, newMoto] }))
    return { error: null }
  }

  const updateMoto = async (moto: Moto): Promise<{ error: string | null }> => {
    const { error } = await supabase
      .from('motos')
      .update(moto)
      .eq('id', moto.id)

    if (error) {
      console.error('Erro ao atualizar moto:', error.message, error.details, error.hint)
      if (error.message.includes('row-level security') || error.code === '42501') {
        return { error: 'Permissão negada. Verifique as políticas RLS no Supabase.' }
      }
      return { error: error.message }
    }

    setData(prev => ({
      ...prev,
      motos: prev.motos.map(m => (m.id === moto.id ? moto : m)),
    }))
    return { error: null }
  }

  const removeMoto = async (id: string): Promise<{ error: string | null }> => {
    console.log('Tentando deletar moto com id:', id, 'tipo:', typeof id)

    const { error, count } = await supabase
      .from('motos')
      .delete({ count: 'exact' })
      .eq('id', id)

    console.log('Resultado do delete - erro:', error, 'linhas deletadas:', count)

    if (error) {
      console.error('Erro ao remover moto:', error.message, error.details, error.hint)
      if (error.message.includes('row-level security') || error.code === '42501') {
        return { error: 'Permissão negada. Vá ao Supabase > Authentication > Policies e adicione política DELETE para a tabela motos.' }
      }
      return { error: error.message }
    }

    if (count === 0) {
      console.warn('Delete executou sem erro mas nenhuma linha foi removida.')
      return { error: 'Nenhuma moto encontrada com esse ID. Verifique as políticas RLS no Supabase.' }
    }

    setData(prev => ({ ...prev, motos: prev.motos.filter(m => m.id !== id) }))
    return { error: null }
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