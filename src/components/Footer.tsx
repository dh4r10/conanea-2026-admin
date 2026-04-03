import {
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  // Youtube,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const sponsors = [
  {
    name: 'Universidad Nacional de San Martín',
    abbr: 'UNSM',
    img: '/img/interesados/unsm.webp',
    link: 'https://unsm.edu.pe/',
  },
  {
    name: 'Círculo de Liderazgo Agrícola con Visión para la Excelencia',
    abbr: 'CLAVE',
    img: '/img/interesados/clave.webp',
    link: 'https://www.facebook.com/profile.php?id=61578098331254',
  },
  {
    name: 'Universidad Nacional de San Martín',
    abbr: 'UNSM',
    img: '/img/interesados/unsm.webp',
    link: 'https://unsm.edu.pe/',
  },
  {
    name: 'Círculo de Liderazgo Agrícola con Visión para la Excelencia',
    abbr: 'CLAVE',
    img: '/img/interesados/clave.webp',
    link: 'https://www.facebook.com/profile.php?id=61578098331254',
  },
  {
    name: 'Universidad Nacional de San Martín',
    abbr: 'UNSM',
    img: '/img/interesados/unsm.webp',
    link: 'https://unsm.edu.pe/',
  },
  {
    name: 'Círculo de Liderazgo Agrícola con Visión para la Excelencia',
    abbr: 'CLAVE',
    img: '/img/interesados/clave.webp',
    link: 'https://www.facebook.com/profile.php?id=61578098331254',
  },
  {
    name: 'Universidad Nacional de San Martín',
    abbr: 'UNSM',
    img: '/img/interesados/unsm.webp',
    link: 'https://unsm.edu.pe/',
  },
  {
    name: 'Círculo de Liderazgo Agrícola con Visión para la Excelencia',
    abbr: 'CLAVE',
    img: '/img/interesados/clave.webp',
    link: 'https://www.facebook.com/profile.php?id=61578098331254',
  },
];

// Duplicamos para el loop infinito
const sponsorTrack = [...sponsors, ...sponsors];

const Footer = () => {
  return (
    <footer className='bg-[#0a1a0f] text-white'>
      {/* Cinta de auspiciadores */}
      <div className='border-b border-white/10 py-5 overflow-hidden relative'>
        {/* Gradientes de fade en los bordes */}
        <div
          className='absolute left-0 top-0 bottom-0 w-24 z-10'
          style={{
            background: 'linear-gradient(to right, #0a1a0f, transparent)',
          }}
        />
        <div
          className='absolute right-0 top-0 bottom-0 w-24 z-10'
          style={{
            background: 'linear-gradient(to left, #0a1a0f, transparent)',
          }}
        />

        <div
          className='flex items-center gap-8 w-max'
          style={{
            animation: 'marquee 30s linear infinite',
          }}
        >
          {sponsorTrack.map((sponsor, i) => (
            <a href={sponsor.link} target='_blank' className='cursor-pointer'>
              <div
                key={i}
                className='flex items-center gap-3 shrink-0 group cursor-pointer'
              >
                {/* Logo */}
                <div className='size-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden group-hover:border-green-500/50 group-hover:bg-white/10 transition-all duration-300'>
                  {sponsor.img ? (
                    <img
                      src={sponsor.img}
                      alt={sponsor.name}
                      className='w-full h-full object-contain p-1.5'
                    />
                  ) : (
                    <span className='text-white/40 text-[9px] font-black tracking-tight group-hover:text-green-400 transition-colors duration-300'>
                      {sponsor.abbr.slice(0, 3)}
                    </span>
                  )}
                </div>
                <span className='text-white/30 text-xs font-medium whitespace-nowrap group-hover:text-white/60 transition-colors duration-300'>
                  {sponsor.name}
                </span>

                {/* Separador */}
                <div className='w-px h-5 bg-white/10 ml-4' />
              </div>
            </a>
          ))}
        </div>

        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </div>

      {/* Franja superior */}
      <div className='border-b border-white/10 py-10 px-4 sm:px-6 lg:px-8 xl:px-32'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center sm:text-left'>
          {/* Logo y descripción */}
          <div className='lg:col-span-2 text-center sm:text-left flex flex-col items-center sm:items-start'>
            <div className='flex items-center gap-3 mb-4'>
              <img
                src='/img/logo.webp'
                alt='Logo CONAEA 2026'
                className='w-40 object-contain'
                draggable={false}
              />
            </div>
            <p className='text-white/50 text-sm leading-relaxed max-w-sm'>
              XXXII Congreso Nacional de Estudiantes de Agronomía · San Martín,
              Tarapoto, Perú. Organizado por el Grupo Clave — Facultad de
              Ciencias Agrarias, UNSM.
            </p>

            {/* Redes sociales */}
            <div className='flex items-center gap-3 mt-5'>
              {[
                {
                  icon: Instagram,
                  label: 'Instagram',
                  href: 'https://www.instagram.com/conaea_peru/',
                },
                {
                  icon: Facebook,
                  label: 'Facebook',
                  href: 'https://www.facebook.com/XXXIICONAEASanMartin2026',
                },
                // { icon: Youtube, label: 'YouTube', href: '#' },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className='w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:border-green-500 hover:text-green-400 transition-all duration-300'
                  target='_blank'
                >
                  <Icon className='w-4 h-4' />
                </a>
              ))}
            </div>
          </div>

          {/* Links rápidos */}
          <div className='hidden lg:block'>
            <p className='text-xs font-bold tracking-[0.2em] uppercase text-[#fbba0e] mb-4'>
              Navegación
            </p>
            <ul className='space-y-2'>
              {[
                {
                  label: 'Inicio',
                  href: '/',
                },
                {
                  label: 'Cronograma',
                  href: '/cronograma',
                },
                // 'Participantes',
                // 'Visitante',
                // 'Pasantías',
                {
                  label: 'Organizadores',
                  href: '/organizadores',
                },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    className='text-white/50 text-sm hover:text-green-400 transition-colors duration-200 flex items-center gap-2 group'
                  >
                    <span className='w-0 h-px bg-green-400 group-hover:w-4 transition-all duration-300' />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div className='text-center sm:text-right'>
            <p className='text-xs font-bold tracking-[0.2em] uppercase text-[#fbba0e] mb-4'>
              Contacto
            </p>
            <ul className='space-y-3 '>
              <li className='flex items-center justify-center sm:justify-end gap-2.5 text-white/50 text-sm text-center sm:text-right'>
                <span>Universidad Nacional de San Martín, Tarapoto, Perú</span>
                <MapPin className='w-4 h-4 text-green-500 shrink-0 mt-0.5' />
              </li>
              <li className='flex justify-center sm:justify-end items-center gap-2.5 text-white/50 text-sm '>
                <div className='flex flex-col'>
                  <a
                    href={`https://wa.me/51918689799?text=${encodeURIComponent('[INFORMACIÓN] Hola Grupo Clave, buen día. Necesito información acerca del CONAEA 2026 :)')}`}
                    target='_blank'
                    rel='noreferrer'
                    className='hover:text-green-400 transition-colors '
                  >
                    918 689 799
                  </a>
                </div>

                <Phone className='w-4 h-4 text-green-500 shrink-0' />
              </li>
              <li className='flex justify-center sm:justify-end items-center gap-2.5 text-white/50 text-sm'>
                <a
                  href='mailto:clave.fca.unsm@gmail.com'
                  className='hover:text-green-400 transition-colors'
                >
                  clave.fca.unsm@gmail.com
                </a>
                <Mail className='w-4 h-4 text-green-500 shrink-0' />
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Franja inferior */}
      <div className='py-5 px-4 sm:px-6 lg:px-8 xl:px-32 flex flex-col sm:flex-row items-center justify-between gap-3'>
        <p className='text-white/30 text-xs text-center sm:text-left'>
          © CONAEA 2026 · Todos los derechos reservados
        </p>
        <div className='flex items-center gap-2'>
          <div className='w-8 h-px bg-green-900' />
          <p className='text-white/20 text-xs font-bold tracking-widest uppercase'>
            #Conaea2026
          </p>
          <div className='w-8 h-px bg-green-900' />
        </div>
        <a
          className='text-white/20 text-xs cursor-pointer'
          href='https://www.linkedin.com/in/jhosep-marcelo-g%C3%B3mez-s%C3%A1nchez-533628315/'
          target='_blank'
        >
          Desarrollado por{' '}
          <span className='text-green-700 font-semibold hover:text-green-400'>
            Dh4rio
          </span>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
