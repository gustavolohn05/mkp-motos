import React, { useState, useRef } from 'react'
import { Save, Upload, Plus, Trash2, ChevronDown, ChevronRight } from 'lucide-react'
import { useSite } from '../../context/SiteContext'
import { SiteData } from '../../data/initialData'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-mkp-border rounded-sm overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-5 py-4 bg-mkp-card hover:bg-mkp-card/80 transition-colors"
      >
        <span className="font-barlow font-600 text-sm uppercase tracking-widest text-white">{title}</span>
        {open ? <ChevronDown className="w-4 h-4 text-mkp-muted" /> : <ChevronRight className="w-4 h-4 text-mkp-muted" />}
      </button>
      {open && <div className="p-5 bg-mkp-black flex flex-col gap-4">{children}</div>}
    </div>
  )
}

function Field({
  label, value, onChange, multiline, type = 'text',
}: {
  label: string
  value: string | number
  onChange: (v: string) => void
  multiline?: boolean
  type?: string
}) {
  const cls = 'w-full bg-mkp-card border border-mkp-border focus:border-mkp-red outline-none px-3 py-2.5 font-barlow text-sm text-white placeholder:text-mkp-muted/50 rounded-sm transition-colors'
  return (
    <div>
      <label className="font-barlow text-xs text-mkp-muted uppercase tracking-wide mb-1 block">{label}</label>
      {multiline ? (
        <textarea rows={3} value={value as string} onChange={e => onChange(e.target.value)} className={cls + ' resize-none'} />
      ) : (
        <input type={type} value={value as string} onChange={e => onChange(e.target.value)} className={cls} />
      )}
    </div>
  )
}

export default function SiteEditor() {
  const { data, updateData } = useSite()
  const [form, setForm] = useState<SiteData>(JSON.parse(JSON.stringify(data)))
  const [saved, setSaved] = useState(false)
  const logoRef = useRef<HTMLInputElement>(null)

  const set = (path: string, value: unknown) => {
    setForm(prev => {
      const clone = JSON.parse(JSON.stringify(prev)) as Record<string, unknown>
      const parts = path.split('.')
      let cur: Record<string, unknown> = clone
      for (let i = 0; i < parts.length - 1; i++) {
        cur = cur[parts[i]] as Record<string, unknown>
      }
      cur[parts[parts.length - 1]] = value
      return clone as unknown as SiteData
    })
  }

  const handleSave = () => {
    updateData(form)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const handleLogo = async (files: FileList | null) => {
    if (!files?.[0]) return
    const reader = new FileReader()
    reader.onload = () => set('logo', reader.result as string)
    reader.readAsDataURL(files[0])
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="font-bebas text-3xl text-white tracking-wide">EDIÇÃO DO SITE</h2>
          <p className="font-barlow text-sm text-mkp-muted">Alterações refletem em tempo real ao salvar</p>
        </div>
        <button
          onClick={handleSave}
          className={`flex items-center gap-2 font-barlow font-700 text-sm uppercase tracking-widest px-5 py-2.5 rounded-sm transition-all ${
            saved ? 'bg-green-600 text-white' : 'bg-mkp-red hover:bg-mkp-red-hover text-white'
          }`}
        >
          <Save className="w-4 h-4" />
          {saved ? 'Salvo!' : 'Salvar Alterações'}
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {/* Logo */}
        <Section title="Logo">
          <div className="flex items-center gap-4">
            {form.logo && (
              <img src={form.logo} alt="Logo" className="h-12 object-contain bg-mkp-card p-2 rounded-sm border border-mkp-border" />
            )}
            <div>
              <button
                onClick={() => logoRef.current?.click()}
                className="flex items-center gap-2 font-barlow font-600 text-sm uppercase tracking-widest px-4 py-2 border border-mkp-border hover:border-mkp-red text-mkp-muted hover:text-white transition-all rounded-sm"
              >
                <Upload className="w-4 h-4" /> Upload Logo (PNG/JPG)
              </button>
              {form.logo && (
                <button onClick={() => set('logo', '')} className="mt-2 font-barlow text-xs text-mkp-red hover:underline">
                  Remover logo
                </button>
              )}
              <input ref={logoRef} type="file" accept="image/*" className="hidden" onChange={e => handleLogo(e.target.files)} />
            </div>
          </div>
        </Section>

        {/* Hero */}
        <Section title="Hero / Banner">
          <Field label="Subtítulo" value={form.hero.subtitulo} onChange={v => set('hero.subtitulo', v)} multiline />
          <Field label="Botão: Ver Detalhes" value={form.hero.btnVerDetalhes} onChange={v => set('hero.btnVerDetalhes', v)} />
          <Field label="Botão: Solicitar Proposta" value={form.hero.btnSolicitarProposta} onChange={v => set('hero.btnSolicitarProposta', v)} />
        </Section>

        {/* Sobre */}
        <Section title="Sobre a Loja">
          <Field label="História" value={form.sobre.historia} onChange={v => set('sobre.historia', v)} multiline />
          <div>
            <label className="font-barlow text-xs text-mkp-muted uppercase tracking-wide mb-2 block">Diferenciais</label>
            {form.sobre.diferenciais.map((d, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input
                  value={d}
                  onChange={e => {
                    const arr = [...form.sobre.diferenciais]
                    arr[i] = e.target.value
                    set('sobre.diferenciais', arr)
                  }}
                  className="flex-1 bg-mkp-card border border-mkp-border focus:border-mkp-red outline-none px-3 py-2 font-barlow text-sm text-white rounded-sm transition-colors"
                />
                <button
                  onClick={() => set('sobre.diferenciais', form.sobre.diferenciais.filter((_, idx) => idx !== i))}
                  className="text-mkp-muted hover:text-mkp-red p-2"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button
              onClick={() => set('sobre.diferenciais', [...form.sobre.diferenciais, ''])}
              className="flex items-center gap-1 font-barlow text-xs text-mkp-muted hover:text-mkp-red transition-colors mt-1"
            >
              <Plus className="w-3 h-3" /> Adicionar diferencial
            </button>
          </div>
          <div>
            <label className="font-barlow text-xs text-mkp-muted uppercase tracking-wide mb-2 block">Números</label>
            {form.sobre.numeros.map((n, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input
                  value={n.valor}
                  onChange={e => {
                    const arr = [...form.sobre.numeros]
                    arr[i] = { ...arr[i], valor: e.target.value }
                    set('sobre.numeros', arr)
                  }}
                  placeholder="Valor (ex: 12+)"
                  className="w-24 bg-mkp-card border border-mkp-border focus:border-mkp-red outline-none px-3 py-2 font-barlow text-sm text-white rounded-sm"
                />
                <input
                  value={n.label}
                  onChange={e => {
                    const arr = [...form.sobre.numeros]
                    arr[i] = { ...arr[i], label: e.target.value }
                    set('sobre.numeros', arr)
                  }}
                  placeholder="Label"
                  className="flex-1 bg-mkp-card border border-mkp-border focus:border-mkp-red outline-none px-3 py-2 font-barlow text-sm text-white rounded-sm"
                />
              </div>
            ))}
          </div>
        </Section>

        {/* Categorias */}
        <Section title="Categorias">
          {form.categorias.map((cat, i) => (
            <div key={i} className="border border-mkp-border rounded-sm p-4">
              <p className="font-barlow font-600 text-sm text-mkp-red mb-3">{cat.nome}</p>
              <Field
                label="Slogan"
                value={cat.slogan}
                onChange={v => {
                  const arr = [...form.categorias]
                  arr[i] = { ...arr[i], slogan: v }
                  set('categorias', arr)
                }}
              />
              <div className="mt-2">
                <Field
                  label="URL da Imagem"
                  value={cat.imagem}
                  onChange={v => {
                    const arr = [...form.categorias]
                    arr[i] = { ...arr[i], imagem: v }
                    set('categorias', arr)
                  }}
                />
              </div>
            </div>
          ))}
        </Section>

        {/* Depoimentos */}
        <Section title="Depoimentos">
          {form.depoimentos.map((dep, i) => (
            <div key={dep.id} className="border border-mkp-border rounded-sm p-4">
              <div className="flex justify-between items-center mb-3">
                <span className="font-barlow font-600 text-sm text-white">{dep.nome}</span>
                <button
                  onClick={() => set('depoimentos', form.depoimentos.filter((_, idx) => idx !== i))}
                  className="text-mkp-muted hover:text-mkp-red"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <Field label="Nome" value={dep.nome} onChange={v => {
                  const arr = [...form.depoimentos]; arr[i] = { ...arr[i], nome: v }; set('depoimentos', arr)
                }} />
                <Field label="Modelo Comprado" value={dep.modelo} onChange={v => {
                  const arr = [...form.depoimentos]; arr[i] = { ...arr[i], modelo: v }; set('depoimentos', arr)
                }} />
              </div>
              <Field label="Texto do Depoimento" value={dep.texto} onChange={v => {
                const arr = [...form.depoimentos]; arr[i] = { ...arr[i], texto: v }; set('depoimentos', arr)
              }} multiline />
            </div>
          ))}
          <button
            onClick={() => set('depoimentos', [...form.depoimentos, {
              id: Date.now().toString(), nome: '', modelo: '', texto: '', estrelas: 5
            }])}
            className="flex items-center gap-2 font-barlow font-600 text-sm uppercase tracking-widest px-4 py-2 border border-mkp-border hover:border-mkp-red text-mkp-muted hover:text-white transition-all rounded-sm"
          >
            <Plus className="w-4 h-4" /> Adicionar Depoimento
          </button>
        </Section>

        {/* Contato */}
        <Section title="Contato">
          <Field label="Endereço" value={form.contato.endereco} onChange={v => set('contato.endereco', v)} />
          <Field label="Telefone" value={form.contato.telefone} onChange={v => set('contato.telefone', v)} />
          <Field label="Instagram URL" value={form.contato.instagramUrl} onChange={v => set('contato.instagramUrl', v)} />
          <Field label="Horários" value={form.contato.horarios} onChange={v => set('contato.horarios', v)} />
        </Section>

        {/* Footer */}
        <Section title="Footer">
          <Field label="Slogan" value={form.footer.slogan} onChange={v => set('footer.slogan', v)} />
          <Field label="Instagram URL" value={form.footer.instagramUrl} onChange={v => set('footer.instagramUrl', v)} />
          <Field label="YouTube URL" value={form.footer.youtubeUrl} onChange={v => set('footer.youtubeUrl', v)} />
          <Field label="Facebook URL" value={form.footer.facebookUrl} onChange={v => set('footer.facebookUrl', v)} />
        </Section>
      </div>

      {/* Floating save */}
      <div className="sticky bottom-6 flex justify-end mt-6">
        <button
          onClick={handleSave}
          className={`flex items-center gap-2 font-barlow font-700 text-sm uppercase tracking-widest px-6 py-3 rounded-sm shadow-xl transition-all ${
            saved ? 'bg-green-600 text-white' : 'bg-mkp-red hover:bg-mkp-red-hover text-white glow-red'
          }`}
        >
          <Save className="w-4 h-4" />
          {saved ? 'Salvo!' : 'Salvar Todas as Alterações'}
        </button>
      </div>
    </div>
  )
}
