import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { useState, useCallback } from 'react';
import { type CarouselApi } from '@/components/ui/carousel';

const members = [
  {
    img: '/img/junta-directiva/brayan.webp',
    name: 'Brayan Laudrup Ruiz Marin',
    role: 'Presidente',
    highlight: true,
  },
  {
    img: '/img/junta-directiva/euler.webp',
    name: 'Euler Padilla Santa Cruz',
    role: 'Secretario Académico',
    highlight: false,
  },
  {
    img: '/img/junta-directiva/anderson.webp',
    name: 'Anderson Neira Aponte',
    role: 'Fiscal Académico',
    highlight: false,
  },
  {
    img: '/img/junta-directiva/saily.webp',
    name: 'Saily Milagros Paima Cenepo',
    role: 'Directora de Investigación',
    highlight: false,
  },
  {
    img: '/img/junta-directiva/paris.webp',
    name: 'Paris Isai Apagüeño Ojanama',
    role: 'Director de Proyectos',
    highlight: false,
  },
  {
    img: '/img/junta-directiva/jose.webp',
    name: 'José David Sangama Ríos',
    role: 'Director de Tesorería y Finanzas',
    highlight: false,
  },
  {
    img: '/img/junta-directiva/carlos.webp',
    name: 'Carlos Alberto Zumaeta Arévalo',
    role: 'Director de Prensa y Comunicación',
    highlight: false,
  },
];

const ClaveDirectory = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const VISIBLE_RANGE = 4;

  const handleSetApi = useCallback((api: CarouselApi) => {
    if (!api) return;
    api.on('select', () => setCurrentIndex(api.selectedScrollSnap()));
  }, []);

  const shouldLoad = (idx: number) => idx <= currentIndex + VISIBLE_RANGE;

  return (
    <div className='mx-auto '>
      {/* Header */}
      <div className='mb-12'>
        <div className='flex items-center gap-3 mb-3'>
          <div className='w-8 h-px bg-[#fbba0e]' />
          <p className='text-xs font-bold tracking-[0.3em] uppercase text-[#fbba0e]'>
            CONAEA 2026 · Grupo Clave
          </p>
        </div>
        <h2 className='text-3xl sm:text-4xl font-black text-gray-900 leading-tight mb-4'>
          Junta Directiva
        </h2>
        <div className='w-12 h-1 bg-[#fbba0e] rounded-full' />
      </div>

      {/* Carousel */}
      <Carousel
        opts={{ align: 'start', loop: true }}
        setApi={handleSetApi}
        className='w-full'
      >
        <CarouselContent className='-ml-2 my-1'>
          {members.map((member, idx) => (
            <CarouselItem
              key={member.name}
              className='pl-3 basis-full sm:basis-1/2 lg:basis-1/4'
            >
              <div
                className={[
                  'group relative flex flex-col rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5',
                  member.highlight
                    ? 'border-[#fbba0e]/40 bg-[#fbba0e]/5'
                    : 'border-gray-100 bg-white hover:border-gray-200',
                ].join(' ')}
              >
                {/* ── Sección superior: foto + nombre ── */}
                <div className='flex flex-col items-center gap-3 p-4'>
                  {/* Foto */}
                  <div
                    className={[
                      'relative shrink-0 w-full aspect-square rounded-xl overflow-hidden',
                      member.highlight
                        ? 'ring-2 ring-[#fbba0e] ring-offset-1'
                        : 'ring-1 ring-gray-100',
                    ].join(' ')}
                  >
                    {shouldLoad(idx) ? (
                      <img
                        src={member.img}
                        alt={member.name}
                        loading='lazy'
                        onLoad={(e) =>
                          e.currentTarget.classList.remove('opacity-0')
                        }
                        className='w-full h-full object-cover object-top transition-all duration-duration-100 group-hover:scale-105 opacity-0'
                      />
                    ) : (
                      <div className='w-full h-full bg-gray-100 animate-pulse' />
                    )}
                  </div>

                  {/* Nombre + cargo */}
                  <div className='flex justify-center items-center flex-col min-w-0 pt-0.5 text-center px-1'>
                    <p className='text-gray-900 text-xs sm:text-sm font-black leading-tight'>
                      {' '}
                      {/* 👈 text-xs en mobile */}
                      {member.name}
                    </p>
                    <p className='text-gray-400 text-[10px] sm:text-xs mt-1 leading-snug'>
                      {' '}
                      {/* 👈 text-[10px] en mobile */}
                      {member.role}
                    </p>
                  </div>
                </div>

                {/* ── Separador ── */}
                <div className='mx-4 h-px bg-gray-100' />

                {/* ── Sección inferior decorativa ── */}
                <div className='relative flex items-center justify-between px-4 py-3 overflow-hidden'>
                  {/* Fondo decorativo sutil */}
                  <div
                    className={[
                      'absolute inset-0 opacity-40',
                      member.highlight ? 'bg-[#fbba0e]/10' : 'bg-gray-50',
                    ].join(' ')}
                  />

                  {/* Línea de puntos decorativa */}
                  <div className='relative flex items-center gap-1'>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div
                        key={i}
                        className={[
                          'rounded-full transition-all duration-300',
                          i === 0 ? 'w-3 h-1.5' : 'w-1.5 h-1.5',
                          member.highlight
                            ? 'bg-[#fbba0e]'
                            : 'bg-green-400 group-hover:bg-green-400',
                        ].join(' ')}
                      />
                    ))}
                  </div>

                  {/* Etiqueta organización */}
                  <span className='relative text-[10px] font-bold tracking-widest uppercase text-gray-300 group-hover:text-gray-400 transition-colors'>
                    Grupo Clave
                  </span>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className='flex justify-end gap-2 mt-8'>
          <CarouselPrevious className='static translate-y-0 border-green-600 text-green-600 hover:bg-green-600 hover:text-white' />
          <CarouselNext className='static translate-y-0 border-green-600 text-green-600 hover:bg-green-600 hover:text-white' />
        </div>
      </Carousel>
    </div>
  );
};

export default ClaveDirectory;
