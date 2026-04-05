import type { Field } from '../components/FormFields/formFields.types';

export const fields: Field[] = [
  {
    kind: 'photo',
    id: 'photo',
    fullWidth: true,
    requiredOnCreate: true,
    condition: (_form, currentPhoto) => !!currentPhoto,
  },
  {
    kind: 'input',
    id: 'name',
    label: 'Nombre',
    type: 'text',
    maxLength: 50,
    fullWidth: true,
    required: true,
  },
  {
    kind: 'input',
    id: 'title',
    label: 'Título',
    type: 'text',
    fullWidth: true,
    required: true,
  },
  {
    kind: 'input',
    id: 'bio',
    label: 'Biografía',
    type: 'text',
    fullWidth: true,
    required: true,
  },
  {
    kind: 'file',
    id: 'photo',
    label: 'Foto',
    fullWidth: true,
    requiredOnCreate: true,
    condition: (_form, currentPhoto) => !currentPhoto, // 👈
  },
];
