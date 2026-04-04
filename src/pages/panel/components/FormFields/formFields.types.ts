interface Field {
  kind: 'input' | 'select' | 'file' | 'photo';
  id?: string;
  label?: string;
  type?: string;
  placeholder?: string;
  min?: number;
  max?: number;
  maxLength?: number;
  options?: { label: string; value: string }[];
  fullWidth?: boolean;
  required?: boolean;
  condition?: (form: Record<string, unknown>, currentPhoto?: string) => boolean;
}

export type { Field };
