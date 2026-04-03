import { create } from 'zustand';

interface ValidationErrors {
  [key: string]: string[] | undefined;
  first_name?: string[];
  paternal_surname?: string[];
  maternal_surname?: string[];
  identity_document?: string[];
  document_type?: string[];
  email?: string[];
  cod_country?: string[];
  cod_university?: string[];
  academic_cycle?: string[];
  birthdate?: string[];
  archive?: string[];
  non_field_errors?: string[];
}

interface ValidationState {
  errors: ValidationErrors;
  isLoading: boolean;
  quotaTypeId: number | null;
  setQuotaTypeId: (id: number) => void;
  validate: (formData: FormData) => Promise<boolean>;
  clearErrors: () => void;
}

export const useValidationStore = create<ValidationState>((set) => ({
  errors: {},
  isLoading: false,
  quotaTypeId: null,
  setQuotaTypeId: (id) => set({ quotaTypeId: id }),

  validate: async (formData: FormData) => {
    set({ isLoading: true, errors: {} });
    try {
      const response = await fetch(
        'http://127.0.0.1:8000/api/participants/validate/',
        { method: 'POST', body: formData },
      );

      if (response.ok) {
        set({ isLoading: false });
        return true;
      }

      const data = await response.json();
      set({ errors: data, isLoading: false });
      return false;
    } catch {
      set({
        errors: { non_field_errors: ['Error de conexión con el servidor'] },
        isLoading: false,
      });
      return false;
    }
  },

  clearErrors: () => set({ errors: {} }),
}));
