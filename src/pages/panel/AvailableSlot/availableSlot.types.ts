import type { AvailableSlots } from '@/types/availableSlots.types';

export type AvailableSlotForm = {
  pre_sale: string;
  quota_type: string;
  mount: string;
  amount: string;
};

export type FormErrors = Partial<Record<keyof AvailableSlotForm, string>>;

export type AvailableSlotPayload = Omit<AvailableSlots, 'id' | 'is_active'>;

export const emptyForm: AvailableSlotForm = {
  pre_sale: '',
  quota_type: '',
  mount: '',
  amount: '',
};
