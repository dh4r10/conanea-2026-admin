// store/useDynamicCodeStore.ts
import { create } from 'zustand';
import { dynamicCodeService } from '@/services/dynamicCodeService';
import type { DynamicCodeDetail } from '@/types/dynamicCodes.types';

type DynamicCodeStore = {
  codes: DynamicCodeDetail[];
  meta: { count: number; next: string | null; previous: string | null } | null;
  page: number;
  loading: boolean;
  generating: boolean;
  error: string | null;

  fetchCodes: (
    page?: number,
    params?: { status?: string; quota_type_id?: number },
  ) => Promise<void>;
  generateCode: () => Promise<DynamicCodeDetail>;
};

export const useDynamicCodeStore = create<DynamicCodeStore>((set, get) => ({
  codes: [],
  meta: null,
  page: 1,
  loading: false,
  generating: false,
  error: null,

  fetchCodes: async (page = 1, params?) => {
    set({ loading: true, error: null });
    try {
      const data = await dynamicCodeService.getAll(page, params);
      set({
        codes: data.results,
        meta: { count: data.count, next: data.next, previous: data.previous },
        page,
      });
    } catch {
      set({ error: 'Error al cargar los códigos' });
    } finally {
      set({ loading: false });
    }
  },

  generateCode: async () => {
    set({ generating: true });
    try {
      const newCode = await dynamicCodeService.generate();
      await get().fetchCodes(1); // 👈 vuelve a página 1 tras generar
      return newCode;
    } catch {
      throw new Error('Error al generar el código');
    } finally {
      set({ generating: false });
    }
  },
}));
