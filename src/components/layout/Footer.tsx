import React from 'react'
import { Instagram, Youtube, Facebook } from 'lucide-react'
import { useSite } from '../../context/SiteContext'

export default function Footer() {
  const { data } = useSite()
  const year = new Date().getFullYear()

  const navLinks = [
    { label: 'Estoque', href: '#estoque' },
    { label: 'Marcas', href: '#marcas' },
    { label: 'Categorias', href: '#categorias' },
    { label: 'Sobre', href: '#sobre' },
    { label: 'Contato', href: '#contato' },
  ]

  const handleClick = (href: string) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="bg-[#050505] border-t border-mkp-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <img
                src={data.logo || '/logo-mkp.png'}
                alt="MKP Motos"
                className="h-10 max-h-12 w-auto max-w-[160px] object-contain bg-transparent"
              />
            </div>
            <p className="font-barlow text-mkp-muted text-sm leading-relaxed italic">
              {data.footer.slogan}
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-4 mt-2">
              <a
                href={data.footer.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-mkp-muted hover:text-mkp-red transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={data.footer.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-mkp-muted hover:text-mkp-red transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href={data.footer.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-mkp-muted hover:text-mkp-red transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-bebas text-xl tracking-widest text-white mb-6">Navegação</h3>
            <nav className="flex flex-col gap-3">
              {navLinks.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={e => { e.preventDefault(); handleClick(link.href) }}
                  className="font-barlow text-sm text-mkp-muted hover:text-mkp-red transition-colors uppercase tracking-wide"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact summary */}
          <div>
            <h3 className="font-bebas text-xl tracking-widest text-white mb-6">Contato</h3>
            <div className="flex flex-col gap-2">
              <p className="font-barlow text-sm text-mkp-muted leading-relaxed">{data.contato.endereco}</p>
              <p className="font-barlow text-sm text-mkp-red font-600">{data.contato.telefone}</p>
              <p className="font-barlow text-sm text-mkp-muted">{data.contato.horarios}</p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-mkp-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-barlow text-xs text-mkp-muted/60">
            © {year} MKP Motos. Todos os direitos reservados.
          </p>
          <p className="font-barlow text-xs text-mkp-muted/40">
            Palhoça, SC — Brasil
          </p>
        </div>
      </div>
    </footer>
  )
}
