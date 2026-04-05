import { create } from 'zustand';
import { partnerUniversityService } from '@/services/partnerUniversityService';
import type {
  PartnerUniversities,
  PartnerUniversityDetail,
} from '@/types/partnerUniversties.types';

type PartnerUniversityPayload = Omit<
  PartnerUniversities,
  'id' | 'is_active' | 'code'
>;

type PartnerUniversityStore = {
  universities: PartnerUniversityDetail[];
  meta: { count: number; next: string | null; previous: string | null } | null;
  page: number;
  loading: boolean;
  error: string | null;

  fetchUniversities: (
    page?: number,
    params?: { search?: string; quota_type_id?: number },
  ) => Promise<void>;
  createUniversity: (payload: PartnerUniversityPayload) => Promise<void>;
  updateUniversity: (
    id: number,
    payload: Partial<PartnerUniversityPayload>,
  ) => Promise<void>;
  removeUniversity: (id: number) => Promise<void>;
  invalidateUniversities: () => Promise<void>;
};

export const usePartnerUniversityStore = create<PartnerUniversityStore>(
  (set, get) => ({
    universities: [],
    meta: null,
    page: 1,
    loading: false,
    error: null,

    fetchUniversities: async (
      page = 1,
      params?: { search?: string; quota_type_id?: number },
    ) => {
      set({ loading: true, error: null });
      try {
        const data = await partnerUniversityService.getAll(page, params);
        set({
          universities: data.results,
          meta: { count: data.count, next: data.next, previous: data.previous },
          page,
        });
      } catch {
        set({ error: 'Error al cargar las universidades' });
      } finally {
        set({ loading: false });
      }
    },

    createUniversity: async (payload) => {
      try {
        await partnerUniversityService.create(payload); // 👈 sin guardar el resultado
        get().invalidateUniversities();
      } catch {
        throw new Error('Error al crear la universidad');
      }
    },

    updateUniversity: async (id, payload) => {
      try {
        await partnerUniversityService.update(id, payload); // 👈 sin guardar el resultado
        get().invalidateUniversities();
      } catch {
        throw new Error('Error al actualizar la universidad');
      }
    },

    removeUniversity: async (id) => {
      try {
        await partnerUniversityService.remove(id);
        set((state) => ({
          universities: state.universities.filter((u) => u.id !== id),
        }));
        get().invalidateUniversities();
      } catch {
        throw new Error('Error al eliminar la universidad');
      }
    },

    invalidateUniversities: async () => {
      await get().fetchUniversities(get().page);
    },
  }),
);
