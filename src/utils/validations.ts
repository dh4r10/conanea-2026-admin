import type { Field } from '@/pages/panel/components/FormFields/formFields.types';

export const validate = <T extends Record<string, unknown>>(
  form: T,
  fields: Field[],
  setErrors: (errors: Partial<Record<keyof T, string>>) => void,
  mode: 'create' | 'edit' = 'create', // 👈
): boolean => {
  const errors: Partial<Record<keyof T, string>> = {};

  fields.forEach((field) => {
    if (!field.id) return;

    const isRequired =
      field.required || (mode === 'create' && field.requiredOnCreate); // 👈

    if (!isRequired) return;

    const value = form[field.id];

    if (typeof value === 'string' && !value.trim()) {
      errors[field.id as keyof T] = `${field.label ?? field.id} es requerido.`;
    }

    if (value === null || value === undefined) {
      errors[field.id as keyof T] = `${field.label ?? field.id} es requerido.`;
    }
  });

  setErrors(errors);
  return Object.keys(errors).length === 0;
};
