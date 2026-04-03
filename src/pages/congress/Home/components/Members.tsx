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
    img: '/img/junta/9.webp',
    name: 'Marcelo Abelardo Quiñones',
    role: 'Presidente',
    highlight: true,
  },
  {
    img: '/img/junta/2.webp',
    name: 'Arni Cordova Tananta',
    role: 'Vicepresidente',
    highlight: false,
  },
  {
    img: '/img/junta/7.webp',
    name: 'Euler Padilla Santa Cruz',
    role: 'Secretario General',
    highlight: false,
  },
  {
    img: '/img/junta/12.webp',
    name: 'Saily Paima Cenepo',
    role: 'Secretario de Inscripción y Recepción',
    highlight: false,
  },
  {
    img: '/img/junta/5.webp',
    name: 'Danny Pompa Vásquez',
    role: 'Secretario de Asuntos Académicos',
    highlight: false,
  },
  {
    img: '/img/junta/10.webp',
    name: 'Milagros del Aguila García',
    role: 'Secretario de Economía y Finanzas',
    highlight: false,
  },
  {
    img: '/img/junta/4.webp',
    name: 'Carlos Zumaeta Arévalo',
    role: 'Secretario de Marketing y Difusión',
    highlight: false,
  },
  {
    img: '/img/junta/6.webp',
    name: 'Erik Mena Izquierdo',
    role: 'Secretario de Alimentación',
    highlight: false,
  },
  {
    img: '/img/junta/11.webp',
    name: 'Rony Santamaría Bances',
    role: 'Secretario de Bebidas',
    highlight: false,
  },
  {
    img: '/img/junta/8.webp',
    name: 'Jhonel Campos Mendieta',
    role: 'Secretario de Deportes',
    highlight: false,
  },
  {
    img: '/img/junta/13.webp',
    name: 'Ericka Pinedo Meza',
    role: 'Secretario de Expoferia y Cultura',
    highlight: false,
  },
  {
    img: '/img/junta/3.webp',
    name: 'Armando Tuanama Sangama',
    role: 'Secretario de Edecanes',
    highlight: false,
  },
  {
    img: '/img/junta/1.webp',
    name: 'Anderson Neira Aponte',
    role: 'Secretario de Apoyo y Coordinación',
    highlight: false,
  },
];

const Members = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const VISIBLE_RANGE = 5; // cuántos slides adelante precargar

  // Se llama cuando el carousel se inicializa
  const handleSetApi = useCallback((api: CarouselApi) => {
    if (!api) return;
    api.on('select', () => setCurrentIndex(api.selectedScrollSnap()));
  }, []);

  const shouldLoad = (idx: number) => idx <= currentIndex + VISIBLE_RANGE; // carga los actuales + 3 adelante
  return (
    <div className='mx-auto'>
      {/* Header */}
      <div className='mb-12'>
        <div className='flex items-center gap-3 mb-3'>
          <div className='w-8 h-px bg-[#fbba0e]' />
          <p className='text-xs font-bold tracking-[0.3em] uppercase text-[#fbba0e]'>
            CONAEA 2026 · Grupo Clave
          </p>
        </div>
        <h2 className='text-3xl sm:text-4xl font-black text-gray-900 leading-tight mb-4'>
          Equipo de Trabajo
        </h2>
        <div className='w-12 h-1 bg-[#fbba0e] rounded-full' />
      </div>

      {/* Carousel */}
      <Carousel
        opts={{ align: 'start', loop: true }}
        setApi={handleSetApi} // 👈 conecta la API
        className='w-full'
      >
        <CarouselContent className='-ml-2 my-1'>
          {members.map((member, idx) => (
            <CarouselItem
              key={member.name}
              className='pl-3 basis-full sm:basis-1/3 lg:basis-1/4 xl:basis-1/5'
            >
              <div className='group flex flex-col items-center'>
                <div
                  className={[
                    'relative w-full aspect-square sm:aspect-3/4 rounded-2xl overflow-hidden mb-3',
                    member.highlight
                      ? 'ring-2 ring-[#fbba0e] ring-offset-2'
                      : 'ring-1 ring-gray-100',
                  ].join(' ')}
                >
                  {shouldLoad(idx) ? ( // 👈 solo renderiza la img si está en rango
                    <img
                      src={member.img}
                      alt={member.name}
                      loading='lazy'
                      onLoad={(e) =>
                        e.currentTarget.classList.remove('opacity-0')
                      }
                      className='w-full h-full object-cover object-top transition-all duration-100 group-hover:scale-105 opacity-0'
                    />
                  ) : (
                    // Placeholder mientras no toca cargar
                    <div className='w-full h-full bg-gray-100 animate-pulse rounded-2xl' />
                  )}

                  {/* Overlay hover */}
                  <div className='absolute inset-0 bg-linear-to-t from-green-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400' />

                  {/* Badge presidente */}
                  {member.highlight && (
                    <div className='absolute top-3 left-0 right-0 flex justify-center'>
                      <span className='bg-[#fbba0e] text-black text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-lg'>
                        ★ Presidente
                      </span>
                    </div>
                  )}

                  {/* Cargo on hover */}
                  <div className='absolute bottom-0 left-0 right-0 p-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400'>
                    <p className='text-white text-xs font-bold leading-tight text-center'>
                      {member.role}
                    </p>
                  </div>
                </div>
                {/* Nombre y cargo */}
                <p className='text-gray-900 text-xs sm:text-sm font-black text-center leading-tight'>
                  {member.name}
                </p>
                <p className='text-gray-400 text-[10px] sm:text-xs text-center mt-0.5 leading-snug'>
                  {member.role}
                </p>
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

export default Members;
