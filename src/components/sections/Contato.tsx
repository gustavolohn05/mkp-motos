import React from 'react'
import { MapPin, Phone, Instagram, Clock, Calendar, MessageCircle } from 'lucide-react'
import { useSite } from '../../context/SiteContext'
import AnimatedSection from '../ui/AnimatedSection'

export default function Contato() {
  const { data } = useSite()

  const handleWhatsApp = () => {
    const msg = encodeURIComponent('Olá! Gostaria de agendar uma visita presencial à MKP Motos.')
    window.open(`https://wa.me/5548999152309?text=${msg}`, '_blank')
  }

  const handleConsultor = () => {
    const msg = encodeURIComponent('Olá! Gostaria de falar com um consultor da MKP Motos.')
    window.open(`https://wa.me/5548999152309?text=${msg}`, '_blank')
  }

  return (
    <section id="contato" className="py-20 bg-mkp-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimatedSection className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="section-divider" />
            <span className="font-barlow font-600 text-xs uppercase tracking-[0.3em] text-mkp-red">
              Fale Conosco
            </span>
          </div>
          <h2 className="font-bebas text-5xl md:text-7xl text-white tracking-wide leading-none">
            CONTATO
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Map */}
          <AnimatedSection direction="left" className="rounded-sm overflow-hidden border border-mkp-border h-[400px] lg:h-auto min-h-[350px]">
            <iframe
              src={`https://maps.google.com/maps?q=Av.+Elza+Lucchi,+980+Palhoca+SC&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '350px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="MKP Motos - Localização"
              className="grayscale contrast-125 brightness-75 hover:grayscale-0 transition-all duration-500"
            />
          </AnimatedSection>

          {/* Info */}
          <AnimatedSection direction="right" delay={0.15}>
            <div className="flex flex-col gap-8">
              {/* Contact info */}
              <div className="flex flex-col gap-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-mkp-red/10 border border-mkp-red/30 rounded-sm flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-mkp-red" />
                  </div>
                  <div>
                    <p className="font-barlow font-600 text-sm uppercase tracking-widest text-white mb-1">Endereço</p>
                    <p className="font-barlow text-mkp-muted text-sm leading-relaxed">{data.contato.endereco}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-mkp-red/10 border border-mkp-red/30 rounded-sm flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-mkp-red" />
                  </div>
                  <div>
                    <p className="font-barlow font-600 text-sm uppercase tracking-widest text-white mb-1">Telefone</p>
                    <a href={`tel:${data.contato.telefone}`} className="font-barlow text-mkp-red text-sm hover:text-mkp-red-hover transition-colors">
                      {data.contato.telefone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-mkp-red/10 border border-mkp-red/30 rounded-sm flex items-center justify-center flex-shrink-0">
                    <Instagram className="w-5 h-5 text-mkp-red" />
                  </div>
                  <div>
                    <p className="font-barlow font-600 text-sm uppercase tracking-widest text-white mb-1">Instagram</p>
                    <a href={data.contato.instagramUrl} target="_blank" rel="noopener noreferrer"
                      className="font-barlow text-mkp-muted text-sm hover:text-mkp-red transition-colors">
                      @mkp_motos
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-mkp-red/10 border border-mkp-red/30 rounded-sm flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-mkp-red" />
                  </div>
                  <div>
                    <p className="font-barlow font-600 text-sm uppercase tracking-widest text-white mb-1">Horários</p>
                    <p className="font-barlow text-mkp-muted text-sm">{data.contato.horarios}</p>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => {
                    const msg = encodeURIComponent('Olá! Gostaria de agendar uma visita presencial à MKP Motos.')
                    window.open(`https://wa.me/5548999152309?text=${msg}`, '_blank')
                  }}
                  className="flex items-center justify-center gap-3 font-barlow font-700 text-sm uppercase tracking-widest px-6 py-3.5 bg-mkp-red hover:bg-mkp-red-hover text-white transition-all duration-300 rounded-sm glow-red-hover"
                >
                  <Calendar className="w-4 h-4" />
                  Agendar Visita Presencial
                </button>

                <button
                  onClick={handleConsultor}
                  className="flex items-center justify-center gap-3 font-barlow font-700 text-sm uppercase tracking-widest px-6 py-3.5 border-2 border-mkp-red text-white hover:bg-mkp-red/10 transition-all duration-300 rounded-sm"
                >
                  <Phone className="w-4 h-4" />
                  Falar com Consultor
                </button>

                <button
                  onClick={handleWhatsApp}
                  className="flex items-center justify-center gap-3 font-barlow font-700 text-sm uppercase tracking-widest px-6 py-3.5 rounded-sm text-white transition-all duration-300"
                  style={{ backgroundColor: '#25D366' }}
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp MKP Motos
                </button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
