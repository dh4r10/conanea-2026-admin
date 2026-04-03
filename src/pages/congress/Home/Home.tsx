import { useEffect, useState } from 'react';
import { MapPin, Calendar, Leaf, FlaskConical, Globe } from 'lucide-react';

import Pet from './components/Pet';
import Chronometer from './components/Chronometer';
import AboutEvent from './components/AboutEvent';
import Identity from './components/Identity';
import Members from './components/Members';
import ClaveDirectory from './components/ClaveDirectory';
import Authorities from './components/Authorities';

const TARGET_DATE = new Date('2026-08-31T00:00:00');

function useCountdown(target: Date) {
  const calc = () => {
    const diff = target.getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  const [time, setTime] = useState(calc);

  useEffect(() => {
    const interval = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(interval);
  }, []);

  return time;
}

const pillars = [
  {
    icon: FlaskConical,
    title: 'Conocimiento Científico',
    description:
      'Ponencias y talleres con los últimos avances en ingeniería agronómica y ciencias agrícolas.',
    color: 'text-gray-600',
    bg: 'bg-gray-100',
  },
  {
    icon: Leaf,
    title: 'Tecnologías Sostenibles',
    description:
      'Soluciones innovadoras y sostenibles para los desafíos agrícolas de la Amazonía peruana.',
    color: 'text-emerald-600',
    bg: 'bg-green-50',
  },
  {
    icon: Globe,
    title: 'Saberes Ancestrales',
    description:
      'Integración del conocimiento tradicional amazónico como base para el desarrollo agrícola.',
    color: 'text-yellow-600',
    bg: 'bg-yellow-50',
  },
];

interface HomeProps {
  header: React.ReactNode;
  footer: React.ReactNode;
}

const Home = ({ header, footer }: HomeProps) => {
  const { days, hours, minutes, seconds } = useCountdown(TARGET_DATE);
  const [pageReady, setPageReady] = useState(false);

  useEffect(() => {
    const markReady = () => setTimeout(() => setPageReady(true), 0);

    if (document.readyState === 'complete') {
      markReady();
    } else {
      window.addEventListener('load', markReady);
      return () => window.removeEventListener('load', markReady);
    }
  }, []);

  if (!pageReady) {
    return (
      <div className='fixed inset-0 bg-[#0a1a0f] flex flex-col items-center justify-center z-50 gap-6'>
        <div
          className='absolute inset-0 opacity-10'
          style={{
            backgroundImage: `radial-gradient(circle at 30% 50%, #4ade80 0%, transparent 50%),
                              radial-gradient(circle at 70% 30%, #fbba0e 0%, transparent 40%)`,
          }}
        />
        <img
          src='/img/logo.webp'
          alt='CONAEA 2026'
          className='w-40 object-contain relative animate-pulse'
        />
        <div className='relative w-48 h-0.5 bg-white/10 rounded-full overflow-hidden'>
          <div
            className='absolute inset-y-0 left-0 bg-[#fbba0e] rounded-full'
            style={{ animation: 'loading-bar 1.5s ease-in-out infinite' }}
          />
        </div>
        <p className='relative text-white/40 text-xs tracking-widest uppercase'>
          Cargando...
        </p>
        <style>{`
          @keyframes loading-bar {
            0%   { width: 0%;  left: 0; }
            50%  { width: 60%; left: 20%; }
            100% { width: 0%;  left: 100%; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <>
      {header}

      {/* Hero */}
      <div className='relative h-screen left-0 right-0 bg-[#1d3324]'>
        <img
          src='/img/portada.webp'
          alt='Frontis de la universidad'
          onLoad={(e) => e.currentTarget.classList.remove('opacity-0')}
          className='absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-700'
        />
        <div className='absolute inset-0 bg-black/50' />

        <div className='absolute inset-0 flex flex-col items-center lg:items-start justify-center text-white text-left px-4 sm:px-6 lg:px-32 gap-3 md:gap-2 pt-0 md:pt-12'>
          <div>
            <p className='text-xs sm:text-sm md:text-base font-bold tracking-[0.2em] uppercase text-[#fbba0e] text-center lg:text-left'>
              CONAEA San Martín 2026
            </p>
            <h1 className='text-4xl md:text-5xl lg:text-6xl text-center lg:text-left font-black drop-shadow-lg leading-tight'>
              XXXII Congreso <br />
              Nacional de
              <br />
              Estudiantes
              <br />
              de Agronomía
            </h1>
          </div>

          <div className='flex items-center gap-1.5 text-white/80 text-xs sm:text-sm md:text-base font-medium'>
            <Calendar className='w-4 h-4 text-[#fbba0e]' />
            <span>31 de Agosto — 04 de Septiembre, 2026</span>
          </div>

          <div className='flex items-center gap-1.5 text-white/90 text-xs sm:text-sm md:text-base font-medium'>
            <MapPin className='w-4 h-4 text-green-400' />
            <span>UNSM — Tarapoto, San Martín</span>
          </div>

          <div className='mt-2 flex items-center gap-4 border border-white/60 rounded-xl px-5 py-3'>
            <Chronometer value={days} label='Días' />
            <span className='text-base font-black text-white/40 mb-3'>:</span>
            <Chronometer value={hours} label='Horas' />
            <span className='text-base font-black text-white/40 mb-3'>:</span>
            <Chronometer value={minutes} label='Min' />
            <span className='text-base font-black text-white/40 mb-3'>:</span>
            <Chronometer value={seconds} label='Seg' />
          </div>
        </div>
      </div>

      {/* Sobre el evento */}
      <section className='py-20 px-4 sm:px-6 lg:px-8 xl:px-32 w-full'>
        <AboutEvent pillars={pillars} />
      </section>

      {/* Identidad amazónica */}
      <section className='relative bg-[#0a1a0f] py-20 px-4 sm:px-6 lg:px-8 xl:px-32 w-full overflow-hidden'>
        <Identity />
      </section>

      {/* Directorio de clave */}
      <section className='py-20 px-4 sm:px-6 lg:px-8 xl:px-32 w-full'>
        <ClaveDirectory />
      </section>

      {/* Autoridades */}
      <section className='relative bg-[#0a1a0f] py-20 px-4 sm:px-6 lg:px-8 xl:px-32 w-full overflow-hidden'>
        <Authorities />
      </section>

      {/* Equipo organizador */}
      <section className='py-20 px-4 sm:px-6 lg:px-8 xl:px-32 w-full'>
        <Members />
      </section>

      {/* Botarga */}
      <Pet />
      <div>{footer}</div>
    </>
  );
};

export default Home;
