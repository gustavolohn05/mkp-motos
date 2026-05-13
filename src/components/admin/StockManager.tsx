import React, { useState, useMemo, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Edit2, Trash2, Filter, X, Star, Upload } from 'lucide-react'
import { useSite } from '../../context/SiteContext'
import { Moto } from '../../data/initialData'

const CATEGORIAS: Moto['categoria'][] = [
  'Sport/Superbike', 'Street Naked', 'Trail/Adventure', 'Scooter', 'Crossover',
]

const emptyMoto: Omit<Moto, 'id'> = {
  marca: '', modelo: '', ano: new Date().getFullYear(), motor: '', potencia: '',
  zero100: '', categoria: 'Street Naked', preco: 0, slogan: '',
  fotos: [], status: 'Disponivel', destaque: false, km: 0,
}

function formatPrice(p: number) {
  return p.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0 })
}

function formatKm(km?: number) {
  if (!km || km === 0) return '0 KM'
  return km.toLocaleString('pt-BR') + ' KM'
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

interface MotoFormProps {
  initial: Omit<Moto, 'id'> | Moto
  onSave: (m: Omit<Moto, 'id'> | Moto) => void
  onCancel: () => void
  title: string
}

function MotoForm({ initial, onSave, onCancel, title }: MotoFormProps) {
  const [form, setForm] = useState({ ...initial, km: initial.km ?? 0 })
  const fileRef = useRef<HTMLInputElement>(null)

  const set = (field: string, value: unknown) =>
    setForm(prev => ({ ...prev, [field]: value }))

  const handleFiles = async (files: FileList | null) => {
    if (!files) return
    const b64s = await Promise.all(Array.from(files).map(fileToBase64))
    setForm(prev => ({ ...prev, fotos: [...prev.fotos, ...b64s] }))
  }

  const removePhoto = (i: number) =>
    setForm(prev => ({ ...prev, fotos: prev.fotos.filter((_, idx) => idx !== i) }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({ ...form, km: form.km || 0 })
  }

  const inputCls = 'w-full bg-mkp-black border border-mkp-border focus:border-mkp-red outline-none px-3 py-2.5 font-barlow text-sm text-white placeholder:text-mkp-muted/50 rounded-sm transition-colors'
  const labelCls = 'font-barlow text-xs text-mkp-muted uppercase tracking-wide mb-1 block'

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      onClick={onCancel}
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        onClick={e => e.stopPropagation()}
        className="bg-mkp-card border border-mkp-border rounded-sm w-full max-w-2xl my-4"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-mkp-border">
          <h3 className="font-bebas text-2xl text-white tracking-wide">{title}</h3>
          <button onClick={onCancel} className="text-mkp-muted hover:text-white"><X className="w-5 h-5" /></button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5 overflow-y-auto max-h-[75vh]">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Marca *</label>
              <input required value={form.marca} onChange={e => set('marca', e.target.value)} placeholder="ex: Honda" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Modelo *</label>
              <input required value={form.modelo} onChange={e => set('modelo', e.target.value)} placeholder="ex: CB 1000R" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Ano *</label>
              <input required type="number" value={form.ano} onChange={e => set('ano', parseInt(e.target.value))} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Motor</label>
              <input value={form.motor} onChange={e => set('motor', e.target.value)} placeholder="ex: 999cc" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Potência</label>
              <input value={form.potencia} onChange={e => set('potencia', e.target.value)} placeholder="ex: 145cv" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>0–100km/h</label>
              <input value={form.zero100} onChange={e => set('zero100', e.target.value)} placeholder="ex: 3.2s" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Categoria *</label>
              <select required value={form.categoria} onChange={e => set('categoria', e.target.value as Moto['categoria'])} className={inputCls}>
                {CATEGORIAS.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>Preço (R$) *</label>
              <input required type="number" value={form.preco} onChange={e => set('preco', parseFloat(e.target.value))} placeholder="ex: 89900" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>KMs Rodados</label>
              <input
                type="number"
                min="0"
                value={form.km ?? 0}
                onChange={e => set('km', parseInt(e.target.value) || 0)}
                placeholder="0"
                className={inputCls}
              />
              <p className="font-barlow text-xs text-mkp-muted/50 mt-1">Deixe 0 para exibir "0 KM"</p>
            </div>
          </div>

          <div>
            <label className={labelCls}>Slogan / Frase</label>
            <input value={form.slogan} onChange={e => set('slogan', e.target.value)} placeholder="Frase de impacto da moto" className={inputCls} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Status</label>
              <select value={form.status} onChange={e => set('status', e.target.value as Moto['status'])} className={inputCls}>
                <option value="Disponivel">Disponível</option>
                <option value="Vendida">Vendida</option>
              </select>
            </div>
            <div className="flex items-end">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.destaque}
                  onChange={e => set('destaque', e.target.checked)}
                  className="w-4 h-4 accent-red-600"
                />
                <span className="font-barlow text-sm text-white flex items-center gap-1">
                  <Star className="w-4 h-4 text-mkp-red" /> Destaque no Hero
                </span>
              </label>
            </div>
          </div>

          {/* Photos */}
          <div>
            <label className={labelCls}>Fotos</label>
            <div
              className="border-2 border-dashed border-mkp-border hover:border-mkp-red/50 rounded-sm p-6 text-center cursor-pointer transition-colors"
              onClick={() => fileRef.current?.click()}
            >
              <Upload className="w-8 h-8 text-mkp-muted mx-auto mb-2" />
              <p className="font-barlow text-sm text-mkp-muted">Clique para adicionar fotos (PNG, JPG)</p>
              <p className="font-barlow text-xs text-mkp-muted/50 mt-1">Múltiplas fotos permitidas</p>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={e => handleFiles(e.target.files)}
              />
            </div>
            {form.fotos.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {form.fotos.map((foto, i) => (
                  <div key={i} className="relative group">
                    <img src={foto} alt="" className="w-20 h-14 object-cover rounded-sm border border-mkp-border" />
                    <button
                      type="button"
                      onClick={() => removePhoto(i)}
                      className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-mkp-red rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-2 border-t border-mkp-border">
            <button type="button" onClick={onCancel} className="flex-1 font-barlow font-600 text-sm uppercase tracking-widest py-3 border border-mkp-border text-mkp-muted hover:text-white transition-all rounded-sm">
              Cancelar
            </button>
            <button type="submit" className="flex-1 font-barlow font-700 text-sm uppercase tracking-widest py-3 bg-mkp-red hover:bg-mkp-red-hover text-white transition-all rounded-sm">
              Salvar
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}

export default function StockManager() {
  const { data, addMoto, updateMoto, removeMoto } = useSite()
  const [showForm, setShowForm] = useState(false)
  const [editMoto, setEditMoto] = useState<Moto | null>(null)
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)
  const [filtroMarca, setFiltroMarca] = useState('Todas')
  const [filtroCategoria, setFiltroCategoria] = useState('Todas')
  const [filtroStatus, setFiltroStatus] = useState('Todas')

  const marcas = useMemo(() => ['Todas', ...Array.from(new Set(data.motos.map(m => m.marca)))], [data.motos])

  const filtered = useMemo(() => data.motos.filter(m => {
    if (filtroMarca !== 'Todas' && m.marca !== filtroMarca) return false
    if (filtroCategoria !== 'Todas' && m.categoria !== filtroCategoria) return false
    if (filtroStatus !== 'Todas' && m.status !== filtroStatus) return false
    return true
  }), [data.motos, filtroMarca, filtroCategoria, filtroStatus])

  const handleSaveNew = (m: Omit<Moto, 'id'> | Moto) => {
    addMoto(m as Omit<Moto, 'id'>)
    setShowForm(false)
  }

  const handleSaveEdit = (m: Omit<Moto, 'id'> | Moto) => {
    updateMoto(m as Moto)
    setEditMoto(null)
  }

  const filterBtnCls = (active: boolean) =>
    `font-barlow text-xs px-3 py-1 rounded-sm border transition-all ${
      active
        ? 'bg-mkp-red border-mkp-red text-white'
        : 'border-mkp-border text-mkp-muted hover:border-mkp-red/50 hover:text-white'
    }`

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-bebas text-3xl text-white tracking-wide">Gerenciar Estoque</h2>
          <p className="font-barlow text-sm text-mkp-muted">{data.motos.length} motos cadastradas</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 font-barlow font-700 text-sm uppercase tracking-widest px-5 py-2.5 bg-mkp-red hover:bg-mkp-red-hover text-white transition-all rounded-sm"
        >
          <Plus className="w-4 h-4" /> Adicionar Moto
        </button>
      </div>

      {/* Filters */}
      <div className="bg-mkp-card border border-mkp-border rounded-sm p-4 mb-6">
        <div className="flex items-center gap-2 text-mkp-muted mb-3">
          <Filter className="w-4 h-4" />
          <span className="font-barlow text-xs uppercase tracking-widest">Filtros</span>
        </div>
        <div className="flex flex-wrap gap-2 mb-2">
          {marcas.map(m => (
            <button key={m} onClick={() => setFiltroMarca(m)} className={filterBtnCls(filtroMarca === m)}>{m}</button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 mb-2">
          {['Todas', ...CATEGORIAS].map(c => (
            <button key={c} onClick={() => setFiltroCategoria(c)} className={filterBtnCls(filtroCategoria === c)}>{c}</button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {['Todas', 'Disponivel', 'Vendida'].map(s => (
            <button key={s} onClick={() => setFiltroStatus(s)} className={filterBtnCls(filtroStatus === s)}>
              {s === 'Disponivel' ? 'Disponível' : s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-mkp-card border border-mkp-border rounded-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-mkp-border">
                <th className="text-left px-4 py-3 font-barlow text-xs text-mkp-muted uppercase tracking-widest">Foto</th>
                <th className="text-left px-4 py-3 font-barlow text-xs text-mkp-muted uppercase tracking-widest">Moto</th>
                <th className="text-left px-4 py-3 font-barlow text-xs text-mkp-muted uppercase tracking-widest hidden md:table-cell">Categoria</th>
                <th className="text-left px-4 py-3 font-barlow text-xs text-mkp-muted uppercase tracking-widest hidden sm:table-cell">Preço</th>
                <th className="text-left px-4 py-3 font-barlow text-xs text-mkp-muted uppercase tracking-widest hidden lg:table-cell">KMs</th>
                <th className="text-left px-4 py-3 font-barlow text-xs text-mkp-muted uppercase tracking-widest">Status</th>
                <th className="text-right px-4 py-3 font-barlow text-xs text-mkp-muted uppercase tracking-widest">Ações</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {filtered.map((moto, i) => (
                  <motion.tr
                    key={moto.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ delay: i * 0.03 }}
                    className="border-b border-mkp-border/50 hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-4 py-3">
                      {moto.fotos[0] ? (
                        <img src={moto.fotos[0]} alt="" className="w-14 h-10 object-cover rounded-sm" />
                      ) : (
                        <div className="w-14 h-10 bg-mkp-border rounded-sm flex items-center justify-center">
                          <span className="text-mkp-muted/30 text-xs">—</span>
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-barlow font-600 text-sm text-white">{moto.marca} {moto.modelo}</p>
                      <p className="font-barlow text-xs text-mkp-muted">{moto.ano} · {moto.motor}</p>
                      {moto.destaque && <span className="font-barlow text-xs text-yellow-500 flex items-center gap-1 mt-0.5"><Star className="w-3 h-3 fill-yellow-500" /> Destaque</span>}
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <span className="font-barlow text-xs text-mkp-muted">{moto.categoria}</span>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <span className="font-barlow font-600 text-sm text-mkp-red">{formatPrice(moto.preco)}</span>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <span className="font-barlow text-xs text-mkp-muted">{formatKm(moto.km)}</span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => updateMoto({ ...moto, status: moto.status === 'Disponivel' ? 'Vendida' : 'Disponivel' })}
                        title={moto.status === 'Disponivel' ? 'Clique para marcar como Vendida' : 'Clique para marcar como Disponível'}
                        className={`font-barlow font-600 text-xs uppercase tracking-widest px-2 py-0.5 rounded-sm border transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95 ${
                          moto.status === 'Disponivel'
                            ? 'bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30'
                            : 'bg-mkp-red/20 text-mkp-red border-mkp-red/30 hover:bg-mkp-red/30'
                        }`}
                      >
                        {moto.status === 'Disponivel' ? 'Disponível' : 'Vendida'}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setEditMoto(moto)}
                          className="w-8 h-8 flex items-center justify-center text-mkp-muted hover:text-white border border-mkp-border hover:border-white rounded-sm transition-all"
                          title="Editar"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setConfirmDelete(moto.id)}
                          className="w-8 h-8 flex items-center justify-center text-mkp-muted hover:text-mkp-red border border-mkp-border hover:border-mkp-red rounded-sm transition-all"
                          title="Remover"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="text-center py-12">
              <p className="font-bebas text-2xl text-mkp-muted/40 tracking-wide">Nenhuma moto encontrada</p>
            </div>
          )}
        </div>
      </div>

      {/* Forms */}
      {showForm && (
        <MotoForm title="ADICIONAR MOTO" initial={emptyMoto} onSave={handleSaveNew} onCancel={() => setShowForm(false)} />
      )}
      {editMoto && (
        <MotoForm title="EDITAR MOTO" initial={editMoto} onSave={handleSaveEdit} onCancel={() => setEditMoto(null)} />
      )}

      {/* Confirm Delete */}
      {confirmDelete && (
        <div className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4" onClick={() => setConfirmDelete(null)}>
          <motion.div
            initial={{ scale: 0.9 }} animate={{ scale: 1 }}
            onClick={e => e.stopPropagation()}
            className="bg-mkp-card border border-mkp-border rounded-sm p-8 max-w-sm w-full text-center"
          >
            <Trash2 className="w-10 h-10 text-mkp-red mx-auto mb-4" />
            <h3 className="font-bebas text-2xl text-white tracking-wide mb-2">REMOVER MOTO?</h3>
            <p className="font-barlow text-sm text-mkp-muted mb-6">Esta ação não pode ser desfeita.</p>
            <div className="flex gap-3">
              <button onClick={() => setConfirmDelete(null)} className="flex-1 font-barlow font-600 text-sm uppercase tracking-widest py-3 border border-mkp-border text-mkp-muted hover:text-white transition-all rounded-sm">Cancelar</button>
              <button onClick={() => { removeMoto(confirmDelete); setConfirmDelete(null) }} className="flex-1 font-barlow font-700 text-sm uppercase tracking-widest py-3 bg-mkp-red hover:bg-mkp-red-hover text-white transition-all rounded-sm">Remover</button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
