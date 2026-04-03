import { useState } from 'react';
import { MapPin, Users, ChevronDown } from 'lucide-react';

import type { Activity } from './activityCard.types';
import { typeConfig } from './activityConfig';

interface ActivityCardProps {
  activity: Activity;
  index: number;
}

const ActivityCard = ({ activity, index }: ActivityCardProps) => {
  const [open, setOpen] = useState(false);
  const cfg = typeConfig[activity.type];
  const Icon = cfg.icon;

  return (
    <div
      className={[
        'border rounded-2xl overflow-hidden transition-all duration-300',
        cfg.border,
        open ? 'shadow-md' : 'shadow-sm hover:shadow-md',
      ].join(' ')}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <button
        onClick={() => setOpen(!open)}
        className='w-full text-left p-4 flex flex-col sm:flex-row items-start gap-3 sm:gap-4'
      >
        {/* Hora */}
        <div className='flex sm:flex-col items-center gap-2 sm:gap-0 shrink-0'>
          <span className='text-sm font-black text-gray-900'>
            {activity.time}
          </span>
          <span className='text-[10px] text-gray-400'>{activity.duration}</span>
        </div>

        {/* Línea */}
        <div
          className={`hidden sm:block shrink-0 w-px self-stretch ${cfg.bg} border-l-2 ${cfg.border}`}
        />

        {/* Contenido */}
        <div className='flex-1 min-w-0'>
          <div className='flex items-start justify-between gap-2'>
            <div className='flex-1'>
              <span
                className={[
                  'inline-flex items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded-full mb-1.5 uppercase',
                  cfg.bg,
                  cfg.color,
                ].join(' ')}
              >
                <Icon className='w-2.5 h-2.5' />
                {cfg.label}
              </span>

              <p className='text-sm font-bold text-gray-900 wrap-break-words'>
                {activity.title}
              </p>

              {activity.speaker && (
                <p className='text-xs text-gray-500 mt-0.5'>
                  {activity.speaker}
                </p>
              )}

              <div className='flex flex-wrap items-center gap-3 mt-1.5'>
                <span className='flex items-center gap-1 text-[11px] text-gray-400'>
                  <MapPin className='w-3 h-3' />
                  {activity.location}
                </span>

                {activity.capacity && (
                  <span className='flex items-center gap-1 text-[11px] text-gray-400'>
                    <Users className='w-3 h-3' />
                    {activity.capacity} cupos
                  </span>
                )}
              </div>
            </div>

            {activity.description && (
              <ChevronDown
                className={`w-4 h-4 text-gray-400 transition-transform ${
                  open ? 'rotate-180' : ''
                }`}
              />
            )}
          </div>
        </div>
      </button>

      {/* Descripción */}
      {activity.description && open && (
        <div
          className={`px-4 pb-4 pt-0 text-xs text-gray-500 border-t ${cfg.border} ${cfg.bg} sm:ml-16`}
        >
          <p className='pt-3'>{activity.description}</p>
        </div>
      )}
    </div>
  );
};

export default ActivityCard;
