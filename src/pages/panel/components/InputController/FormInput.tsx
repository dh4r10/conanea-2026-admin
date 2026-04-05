import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Type, Mail, Lock, Hash, Calendar } from 'lucide-react';

interface FormInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  type?: string;
  min?: number;
  max?: number;
  maxLength?: number;
  placeholder?: string;
}

const iconMap: Record<string, React.ElementType> = {
  text: Type,
  email: Mail,
  password: Lock,
  number: Hash,
  date: Calendar,
  'datetime-local': Calendar,
};

const toLocalDateValue = (value: string, type: string): string => {
  if (!value) return '';

  if (type === 'date') {
    return value.split('T')[0];
  }

  if (type === 'datetime-local') {
    const normalized = value.replace('Z', '');
    const date = new Date(normalized);
    if (isNaN(date.getTime())) return value;
    // Formatea manualmente sin conversión de zona horaria
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
  }

  return value;
};

const FormInput = ({
  id,
  label,
  value,
  onChange,
  error,
  type = 'text',
  min,
  max,
  maxLength,
  placeholder,
}: FormInputProps) => {
  const Icon = iconMap[type] || Type;
  const displayValue = toLocalDateValue(value, type);

  return (
    <div className='flex flex-col gap-1.5'>
      <Label
        htmlFor={id}
        className='text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5'
      >
        <Icon className='text-[#fbba0e] size-3 mb-px' />
        {label}
      </Label>

      <Input
        key={
          type === 'date' || type === 'datetime-local'
            ? displayValue
            : undefined
        }
        id={id}
        name={id}
        type={type}
        defaultValue={
          type === 'date' || type === 'datetime-local'
            ? displayValue
            : undefined
        }
        value={type === 'date' || type === 'datetime-local' ? undefined : value}
        onChange={onChange}
        min={min}
        max={max}
        maxLength={maxLength}
        placeholder={placeholder}
        className='bg-[#111] border border-white/10 text-slate-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#fbba0e] rounded-md px-3 py-2 text-sm scheme-dark'
      />

      {error && <p className='text-xs text-red-400'>{error}</p>}
    </div>
  );
};

export default FormInput;
