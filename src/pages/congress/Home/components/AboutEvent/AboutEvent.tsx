import { useEffect, useRef, useState } from 'react';
import type { Pillar } from './aboutEvent.types';

interface AboutEventProps {
  pillars: Pillar[];
}

const AboutEvent = ({ pillars }: AboutEventProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let hasPlayed = false;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasPlayed) {
            hasPlayed = true;
            if (videoRef.current) {
              videoRef.current.currentTime = 0;
              videoRef.current.play();
            }
            setTimeout(() => setVisible(true), 50);
          } else if (!entry.isIntersecting) {
            // Solo pausa, no resetea nada
            videoRef.current?.pause();
          } else {
            // Vuelve a entrar al viewport después de la primera vez — solo reanuda
            videoRef.current?.play();
          }
        });
      },
      { threshold: 0.3 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className='mx-auto'>
      {/* Texto + Video */}
      <div
        ref={sectionRef}
        className='flex flex-col lg:flex-row gap-5 items-stretch mb-6'
      >
        {/* Texto */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p className='text-sm font-bold tracking-[0.2em] uppercase text-green-500 mb-2'>
            XXXII CONAEA · Tarapoto 2026
          </p>
          <h2 className='text-3xl sm:text-4xl font-black text-gray-900 leading-tight mb-4'>
            Sobre el Evento
          </h2>
          <div className='w-12 h-1 bg-[#fbba0e] rounded-full mb-6' />
          <p className='text-gray-600 text-base sm:text-lg leading-relaxed text-justify'>
            El{' '}
            <span className='font-semibold text-gray-900'>
              XXXII CONAEA 2026
            </span>{' '}
            busca posicionarse como el espacio académico más relevante para la
            formación de ingenieros agrónomos en el Perú, reuniendo a
            estudiantes, docentes e investigadores en torno a los grandes
            desafíos de la agricultura amazónica.
          </p>
          <p className='text-gray-600 text-base sm:text-lg leading-relaxed mt-4'>
            A través de la integración del conocimiento científico, tecnologías
            sostenibles y saberes ancestrales, el congreso impulsa soluciones
            innovadoras que responden a la realidad agrícola de nuestra
            Amazonía.
          </p>
        </div>

        {/* Video */}
        <div
          className='w-full lg:w-auto lg:shrink-0 overflow-hidden'
          style={{
            // En mobile: altura fija. En desktop: ancho animado
            height: visible ? undefined : undefined,
            ...(typeof window !== 'undefined' && window.innerWidth >= 1024
              ? {
                  width: visible ? '50%' : '0%',
                  minWidth: visible ? '50%' : '0%',
                  transition:
                    'width 3000ms ease-out, min-width 3000ms ease-out',
                }
              : {}),
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              clipPath: visible ? 'inset(0 0% 0 0)' : 'inset(0 0% 0 100%)',
              transition: 'clip-path 3000ms ease-out',
            }}
          >
            <div className='relative overflow-hidden shadow-lg sm:h-72 lg:h-full min-h-50'>
              <video
                ref={videoRef}
                src='/img/presentacion_2.mp4'
                className='w-full h-full object-cover'
                muted
                loop
                playsInline
              />
            </div>
          </div>
        </div>
      </div>

      {/* Pilares — en mobile 1 columna */}
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-0 mt-2 rounded-2xl overflow-hidden border border-gray-100'>
        {pillars.map((pillar, i) => {
          const Icon = pillar.icon;
          return (
            <div
              key={pillar.title}
              className={[
                'group relative flex flex-col gap-3 p-6 sm:p-7 bg-white transition-all duration-300 cursor-default hover:bg-gray-50',
                i < pillars.length - 1
                  ? 'border-b sm:border-b-0 sm:border-r border-gray-100'
                  : '',
              ].join(' ')}
            >
              <div className='flex items-center gap-3'>
                <div
                  className={`w-1 h-8 rounded-full ${pillar.bg} border-l-4 ${pillar.color ?? ''}`}
                  style={{ borderColor: 'currentColor' }}
                />
                <div
                  className={`w-9 h-9 rounded-lg ${pillar.bg} flex items-center justify-center`}
                >
                  <Icon className={`w-4 h-4 ${pillar.color}`} />
                </div>
                <h3 className='text-sm font-black text-gray-900 leading-snug tracking-tight'>
                  {pillar.title}
                </h3>
              </div>
              <p className='text-sm text-gray-400 leading-relaxed'>
                {pillar.description}
              </p>
              <div
                className={[
                  'absolute bottom-0 left-7 right-7 h-px transition-all duration-500',
                  pillar.bg,
                  'scale-x-0 group-hover:scale-x-100 origin-left',
                ].join(' ')}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AboutEvent;
