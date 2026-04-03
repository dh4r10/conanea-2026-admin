import { CalendarDays, Mic2, ChevronRight, Brackets } from 'lucide-react';
import { Link } from 'react-router-dom';

const modules = [
  {
    icon: CalendarDays,
    label: 'Días',
    description: 'Gestiona los días del congreso.',
    href: '/admin/days',
    color: 'text-[#fbba0e]',
    bg: 'bg-[#fbba0e]/10',
    border: 'border-[#fbba0e]/20',
  },
  {
    icon: Mic2,
    label: 'Speakers',
    description: 'Administra los speakers y sus datos.',
    href: '/admin/speaker',
    color: 'text-green-400',
    bg: 'bg-green-400/10',
    border: 'border-green-400/20',
  },
  {
    icon: Brackets,
    label: 'Tipos de Actividad',
    description: 'Configura las categorías de actividades.',
    href: '/admin/activity-type',
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
    border: 'border-blue-400/20',
  },
];

const AdminHome = () => {
  return (
    <div className='bg-[#111] px-4 sm:px-8 py-10'>
      {/* Bienvenida */}
      <div className='mb-10'>
        <p className='text-xs font-bold tracking-[0.3em] uppercase text-[#fbba0e] mb-2'>
          CONAEA 2026 · Panel de Administración
        </p>
        <h1 className='text-3xl sm:text-4xl font-black text-slate-100 leading-tight mb-2'>
          Bienvenido al sistema
        </h1>
        <p className='text-slate-500 text-sm max-w-lg'>
          Desde aquí puedes gestionar todo el contenido del XXXII Congreso
          Nacional de Estudiantes de Agronomía.
        </p>
        <div className='w-12 h-0.5 bg-[#fbba0e] rounded-full mt-4' />
      </div>

      {/* Módulos */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
        {modules.map((mod) => {
          const Icon = mod.icon;
          return (
            <Link
              key={mod.label}
              to={mod.href}
              className={[
                'group flex flex-col gap-4 p-5 rounded-2xl border bg-[#1a1a1a] transition-all duration-200',
                'hover:bg-[#222] hover:-translate-y-0.5 hover:shadow-lg',
                mod.border,
              ].join(' ')}
            >
              {/* Ícono */}
              <div
                className={[
                  'w-10 h-10 rounded-xl flex items-center justify-center border',
                  mod.bg,
                  mod.border,
                ].join(' ')}
              >
                <Icon className={`w-5 h-5 ${mod.color}`} />
              </div>

              {/* Texto */}
              <div className='flex-1'>
                <p className='text-slate-100 font-bold text-sm mb-1'>
                  {mod.label}
                </p>
                <p className='text-slate-500 text-xs leading-relaxed'>
                  {mod.description}
                </p>
              </div>

              {/* Flecha */}
              <div className='flex items-center justify-end'>
                <ChevronRight
                  className={[
                    'w-4 h-4 transition-all duration-200 text-slate-600',
                    'group-hover:translate-x-1',
                    `group-hover:${mod.color}`,
                  ].join(' ')}
                />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Footer decorativo */}
      <div className='mt-16 flex items-center gap-2'>
        <div className='w-8 h-px bg-white/10' />
        <p className='text-white/20 text-xs tracking-widest uppercase'>
          CONAEA 2026 · Sistema de Gestión
        </p>
        <div className='w-8 h-px bg-white/10' />
      </div>
    </div>
  );
};

export default AdminHome;
