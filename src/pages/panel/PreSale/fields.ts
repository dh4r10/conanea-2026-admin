import type { Field } from '../components/FormFields/formFields.types';

export const fields: Field[] = [
  {
    kind: 'input' as const,
    id: 'name',
    label: 'Nombre',
    type: 'text',
    placeholder: 'Nombre',
    fullWidth: true,
    required: true,
  },
  {
    kind: 'input' as const,
    id: 'start_date',
    label: 'Fecha Inicio',
    type: 'datetime-local',
    placeholder: 'Fecha Inicio',
    required: true,
  },
  {
    kind: 'input' as const,
    id: 'end_date',
    label: 'Fecha Fin',
    type: 'datetime-local',
    placeholder: 'Fecha Fin',
    required: true,
  },
];
