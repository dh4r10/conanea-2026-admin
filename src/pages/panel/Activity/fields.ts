import type { Field } from '../components/FormFields/formFields.types';
import type { Days } from '@/types/days.types';
import type { Speakers } from '@/types/speakers.types';
import type { ActivityTypes } from '@/types/activityTypes.types';

export const getActivityFields = (
  days: Days[],
  speakers: Speakers[],
  activityTypes: ActivityTypes[],
): Field[] => [
  {
    kind: 'input',
    id: 'name',
    label: 'Nombre',
    placeholder: 'Nombre',
    type: 'text',
    fullWidth: true,
    required: true,
  },
  {
    kind: 'select',
    id: 'day',
    label: 'Día',
    fullWidth: false,
    required: true,
    options: days.map((d) => ({ label: d.title, value: d.id.toString() })),
  },
  {
    kind: 'select',
    id: 'speaker',
    label: 'Speaker',
    fullWidth: false,
    required: true,
    options: speakers.map((s) => ({ label: s.name, value: s.id.toString() })),
  },
  {
    kind: 'select',
    id: 'activity_type',
    label: 'Tipo de actividad',
    fullWidth: false,
    required: true,
    options: activityTypes.map((at) => ({
      label: at.name,
      value: at.id.toString(),
    })),
  },
  {
    kind: 'input',
    id: 'start_date',
    label: 'Hora',
    type: 'time',
    fullWidth: false,
    required: true,
  },
  {
    kind: 'input',
    id: 'duration',
    label: 'Duración',
    placeholder: 'Minutos',
    type: 'number',
    min: 1,
    fullWidth: false,
    required: true,
  },
  {
    kind: 'input',
    id: 'capacity',
    label: 'Capacidad',
    type: 'number',
    min: 1,
    fullWidth: false,
    required: true,
  },
  {
    kind: 'input',
    id: 'location',
    label: 'Ubicación',
    placeholder: 'Ubicación',
    type: 'text',
    fullWidth: true,
    required: true,
  },
];
