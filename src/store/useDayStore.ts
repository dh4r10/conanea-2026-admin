import { create } from 'zustand';
import { dayService } from '@/services/dayService';
import type { Day } from '@/types/day.types';
import type { Activity } from '@/types/activity.types';

type DayPayload = Omit<Day, 'id' | 'is_active'>;

type DayStore = {
  days: Day[];
  activities: Activity[];
  loading: boolean;
  error: string | null;

  fetchDays: () => Promise<void>;
  fetchActivities: (dayId: number) => Promise<void>;
  createDay: (payload: DayPayload) => Promise<void>;
  updateDay: (id: number, payload: Partial<DayPayload>) => Promise<void>;
  removeDay: (id: number) => Promise<void>;
};

export const useDayStore = create<DayStore>((set) => ({
  days: [],
  activities: [],
  loading: false,
  error: null,

  fetchDays: async () => {
    set({ loading: true, error: null });
    try {
      const days = await dayService.getAll();
      set({ days });
    } catch {
      set({ error: 'Error al cargar los días' });
    } finally {
      set({ loading: false });
    }
  },

  fetchActivities: async (dayId) => {
    set({ loading: true, error: null });
    try {
      const activities = await dayService.getActivities(dayId);
      set({ activities });
    } catch {
      set({ error: 'Error al cargar actividades' });
    } finally {
      set({ loading: false });
    }
  },

  createDay: async (payload) => {
    try {
      const newDay = await dayService.create(payload);
      set((state) => ({ days: [...state.days, newDay] }));
    } catch {
      throw new Error('Error al crear el día'); // 👈 propaga al componente
    }
  },

  updateDay: async (id, payload) => {
    try {
      const updated = await dayService.update(id, payload);
      set((state) => ({
        days: state.days.map((d) => (d.id === id ? updated : d)),
      }));
    } catch {
      throw new Error('Error al actualizar el día'); // 👈
    }
  },

  removeDay: async (id) => {
    try {
      await dayService.remove(id);
      set((state) => ({
        days: state.days.filter((d) => d.id !== id),
      }));
    } catch {
      throw new Error('Error al eliminar el día'); // 👈
    }
  },
}));
