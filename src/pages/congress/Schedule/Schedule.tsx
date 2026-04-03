import { useState } from 'react';
import { Clock } from 'lucide-react';

import GeneratedPDF from './components/GeneratedPDF';
import ActivityCard from './components/ActivityCard';

import { days } from './data';
import { typeConfig } from './components/ActivityCard/activityConfig';

interface ScheduleProps {
  header: React.ReactNode;
  footer: React.ReactNode;
}

const Schedule = ({ header, footer }: ScheduleProps) => {
  const [activeDay, setActiveDay] = useState(0);
  const day = days[activeDay];

  return (
    <>
      {header}

      <div className='min-h-screen bg-gray-50'>
        {/* Hero */}
        <div className='bg-white border-b flex flex-col gap-6 sm:flex-row sm:justify-between sm:items-center border-gray-100 pt-24 pb-10 px-4 sm:px-6 lg:px-8 xl:px-20'>
          <div>
            <div className='flex items-center gap-3 mb-3'>
              <div className='w-8 h-px bg-[#fbba0e]' />
              <p className='text-xs font-bold tracking-[0.3em] uppercase text-[#fbba0e]'>
                15 — 20 de Septiembre, 2026
              </p>
            </div>

            <div className='flex items-center gap-3 mb-2'>
              <h1 className='text-3xl sm:text-4xl font-black text-gray-900'>
                Cronograma
              </h1>
              <GeneratedPDF />
            </div>

            <div className='w-12 h-1 bg-[#fbba0e] rounded-full mb-4' />

            <p className='text-gray-500 text-sm sm:text-base max-w-xl'>
              Programa oficial del XXXII Congreso Nacional de Estudiantes de
              Agronomía · UNSM, Tarapoto.
            </p>

            {/* Leyenda */}
            <div className='flex flex-wrap gap-1.5 sm:gap-2 mt-4 sm:mt-5'>
              {Object.entries(typeConfig).map(([key, cfg]) => {
                const Icon = cfg.icon;
                return (
                  <span
                    key={key}
                    className={[
                      'inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full',
                      cfg.bg,
                      cfg.color,
                    ].join(' ')}
                  >
                    <Icon className='w-3 h-3' />
                    {cfg.label}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Imagen */}
          <div className='hidden md:flex items-end shrink-0 relative'>
            <div className='absolute -top-2 -left-36 bg-white rounded-2xl shadow-lg px-4 py-3 w-36 border border-gray-100'>
              <p className='text-xs font-bold text-gray-800 text-center'>
                ¡Revisa nuestra programación! 🌿
              </p>
              <div
                className='absolute top-1/2 -right-2 w-4 h-4 bg-white border-r border-b border-gray-100'
                style={{ transform: 'translateY(-50%) rotate(-45deg)' }}
              />
            </div>

            <img
              src='/img/botarga_1.webp'
              alt='Mascota CONAEA'
              className='w-36 object-contain object-bottom select-none drop-shadow-2xl'
              draggable={false}
            />
          </div>
        </div>

        <div className='px-4 sm:px-6 lg:px-8 xl:px-20 py-8'>
          <div className='flex flex-col lg:flex-row gap-6 lg:gap-8'>
            {/* Sidebar */}
            <aside className='hidden lg:flex flex-col gap-2 w-44 shrink-0'>
              <p className='text-xs font-bold tracking-[0.2em] uppercase text-gray-400 mb-2 px-2'>
                Días
              </p>
              {days.map((d, i) => (
                <button
                  key={d.date}
                  onClick={() => setActiveDay(i)}
                  className={[
                    'text-left px-4 py-3 rounded-xl transition-all duration-200',
                    activeDay === i
                      ? 'bg-green-600 text-white shadow-md shadow-green-200'
                      : 'bg-white text-gray-600 hover:bg-green-50 hover:text-green-700 border border-gray-100',
                  ].join(' ')}
                >
                  <div className='flex items-baseline gap-2'>
                    <span className='text-2xl font-black'>{d.dayNum}</span>
                    <span className='text-xs font-medium'>{d.month}</span>
                  </div>
                  <p className='text-xs mt-0.5'>{d.dayName}</p>
                </button>
              ))}
            </aside>

            {/* Mobile selector */}
            <div className='lg:hidden w-full mb-6'>
              <div className='flex gap-2 overflow-x-auto pb-2 snap-x'>
                {days.map((d, i) => (
                  <button
                    key={d.date}
                    onClick={() => setActiveDay(i)}
                    className={[
                      'snap-start shrink-0 px-4 py-2 rounded-xl text-sm font-bold',
                      activeDay === i
                        ? 'bg-green-600 text-white'
                        : 'bg-white text-gray-600 border border-gray-200',
                    ].join(' ')}
                  >
                    {d.dayNum} {d.month}
                  </button>
                ))}
              </div>
            </div>

            {/* Contenido */}
            <main className='flex-1 min-w-0 overflow-hidden'>
              <div className='bg-white rounded-2xl border border-gray-100 p-6 mb-5 shadow-sm'>
                <div className='flex flex-col sm:flex-row sm:justify-between gap-3'>
                  <div>
                    <p className='text-xs font-bold uppercase text-green-600 mb-1'>
                      {day.dayName} {day.dayNum} de Septiembre
                    </p>
                    <h2 className='text-xl sm:text-2xl font-black text-gray-900'>
                      {day.theme}
                    </h2>
                  </div>

                  <div className='flex items-center gap-1.5 bg-gray-50 rounded-xl px-3 py-2'>
                    <Clock className='w-3.5 h-3.5 text-gray-400' />
                    <span className='text-xs font-semibold text-gray-500'>
                      {day.activities.length} actividades
                    </span>
                  </div>
                </div>
              </div>

              <div className='flex flex-col gap-3'>
                {day.activities.map((activity, i) => (
                  <ActivityCard key={i} activity={activity} index={i} />
                ))}
              </div>
            </main>
          </div>
        </div>
      </div>

      {footer}
    </>
  );
};

export default Schedule;
