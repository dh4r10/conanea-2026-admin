import { FlaskConical, Mic, ShoppingBag, Users, Pin } from 'lucide-react';
import type { ActivityType } from './activityCard.types';

export interface ActivityConfig {
  label: string;
  color: string;
  bg: string;
  border: string;
  icon: React.ElementType;
}

export const typeConfig: Record<ActivityType, ActivityConfig> = {
  ponencia: {
    label: 'Ponencia',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    icon: Mic,
  },
  laboratorio: {
    label: 'Laboratorio',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    icon: FlaskConical,
  },
  feria: {
    label: 'Feria',
    color: 'text-yellow-600',
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    icon: ShoppingBag,
  },
  ceremonia: {
    label: 'Ceremonia',
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    icon: Pin,
  },
  cultural: {
    label: 'Cultural',
    color: 'text-rose-600',
    bg: 'bg-rose-50',
    border: 'border-rose-200',
    icon: Users,
  },
};
