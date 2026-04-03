import type { StepOneData } from './steps/steps.types';

export type ParticipantType = 'nacional' | 'local' | 'internacional';

export interface FormData {
  participantType: ParticipantType;
  first_name: string;
  paternal_surname: string;
  maternal_surname: string;
  birthdate: string;
  identity_document: string;
  cellphone: string;
  email: string;
  cod_university: string;
  academic_cycle: string;
  allergy: string;
  disability: string;
  archive: File | null;
  payment_method: 'billetera' | 'transferencia' | 'efectivo' | '';
  vaucher: File | null;
}

type InputType =
  | 'text'
  | 'date'
  | 'select'
  | 'select-search'
  | 'description-check';

export interface FieldConfig {
  inputType: InputType;
  label: string;
  name: keyof StepOneData;
  placeholder?: string;
  required?: boolean;
  icon?: React.ElementType;
  colSpan?: boolean;
  options?: { value: string | number; label: string }[];
  checkLabel?: string;
}
