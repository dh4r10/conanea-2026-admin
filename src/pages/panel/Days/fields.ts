import type { Field } from '../components/FormFields/formFields.types';

export const fields: Field[] = [
  {
    kind: 'input' as const,
    id: 'title',
    label: 'Título',
    type: 'text',
    placeholder: 'Título',
    fullWidth: true,
    required: true,
  },
  {
    kind: 'input' as const,
    id: 'date',
    label: 'Fecha',
    type: 'date',
    placeholder: 'Fecha',
    fullWidth: true,
    required: true,
  },
];
