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
    id: 'logo',
    label: 'Logo',
    type: 'text',
    placeholder: 'Logo',
    fullWidth: true,
    required: true,
  },
];
