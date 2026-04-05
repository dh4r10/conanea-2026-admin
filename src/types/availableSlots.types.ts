// types/availableSlot.types.ts
import type { PreSales } from './preSales.types';
import type { QuotaTypes } from './quotaTypes.types';

export type AvailableSlots = {
  id: number;
  pre_sale: number;
  quota_type: number;
  mount: number;
  amount: number;
  is_active: boolean;
};

export type AvailableSlotDetail = {
  id: number;
  pre_sale: PreSales;
  quota_type: QuotaTypes;
  pre_sale_id: number;
  quota_type_id: number;
  mount: number;
  amount: number;
  is_active: boolean;
};
