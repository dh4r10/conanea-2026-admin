import {
  User,
  CreditCard,
  Phone,
  Mail,
  MapPin,
  BookOpen,
  Calendar,
} from 'lucide-react';

import universitiesData from './universidades.json';

import type { FieldConfig, ParticipantType } from './registration.types';

interface Tarifa {
  monto: number;
  moneda: string;
}

export const TARIFAS: Record<ParticipantType, Tarifa> = {
  nacional: { monto: 480, moneda: 'S/.' },
  local: { monto: 100, moneda: 'S/.' },
  internacional: { monto: 146, moneda: '$' },
};

export const TARIFA_LABELS: Record<ParticipantType, string> = {
  nacional: 'Estudiante Nacional',
  local: 'Estudiante Local',
  internacional: 'Estudiante Internacional',
};

export const UNIVERSIDADES = universitiesData.map((u) => ({
  value: u.id,
  label: u.name,
}));

export const CICLOS = [
  { value: 'I', label: 'I' },
  { value: 'II', label: 'II' },
  { value: 'III', label: 'III' },
  { value: 'IV', label: 'IV' },
  { value: 'V', label: 'V' },
  { value: 'VI', label: 'VI' },
  { value: 'VII', label: 'VII' },
  { value: 'VIII', label: 'VIII' },
  { value: 'IX', label: 'IX' },
  { value: 'X', label: 'X' },
];

export const mainFields: FieldConfig[] = [
  {
    inputType: 'text',
    label: 'Nombres',
    name: 'first_name',
    placeholder: 'Ej. Juan Carlos',
    required: true,
    icon: User,
  },
  {
    inputType: 'text',
    label: 'Apellido Paterno',
    name: 'paternal_surname',
    placeholder: 'Ej. Pérez López',
    required: true,
    icon: User,
  },
  {
    inputType: 'text',
    label: 'Apellido Materno',
    name: 'maternal_surname',
    placeholder: 'Ej. Pérez López',
    required: true,
    icon: User,
  },
  {
    inputType: 'text',
    label: 'DNI / Pasaporte',
    name: 'identity_document',
    placeholder: '12345678',
    required: true,
    icon: CreditCard,
  },
  {
    inputType: 'date',
    label: 'F. Nacimiento',
    name: 'birthdate',
    placeholder: '',
    required: true,
    icon: Calendar,
  },
  {
    inputType: 'text',
    label: 'Teléfono',
    name: 'cellphone',
    placeholder: '+51 999 999 999',
    required: true,
    icon: Phone,
  },
  {
    inputType: 'text',
    label: 'Correo electrónico',
    name: 'email',
    placeholder: 'correo@universidad.edu.pe',
    required: true,
    icon: Mail,
    colSpan: true,
  },
  {
    inputType: 'select-search',
    label: 'Universidad / Institución',
    name: 'cod_university',
    placeholder: 'Buscar universidad…',
    required: true,
    icon: MapPin,
    options: UNIVERSIDADES,
    colSpan: true,
  },
];

export const studentFields: FieldConfig[] = [
  {
    inputType: 'select',
    label: 'Ciclo académico',
    name: 'academic_cycle',
    placeholder: 'Seleccionar ciclo…',
    icon: BookOpen,
    required: true,
    options: CICLOS,
    colSpan: true,
  },
  {
    inputType: 'description-check',
    label: 'Alergias',
    name: 'allergy',
    placeholder: 'Ej. Lactosa, mariscos…',
    checkLabel: 'Tengo alergias',
    required: true,
    colSpan: true,
  },
  {
    inputType: 'description-check',
    label: 'Discapacidad',
    name: 'disability',
    placeholder: 'Describir discapacidad…',
    checkLabel: 'Tengo alguna discapacidad',
    colSpan: true,
    required: true,
  },
];
