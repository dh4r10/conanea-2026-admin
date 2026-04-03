import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

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
  return (
    <div className='flex flex-col gap-1.5'>
      <Label
        htmlFor={id}
        className='text-xs font-semibold uppercase tracking-wider text-slate-400'
      >
        {label}
      </Label>
      <Input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        maxLength={maxLength}
        placeholder={placeholder}
        className='bg-[#111] border-white/10 text-slate-200 focus-visible:ring-[#fbba0e] focus-visible:ring-offset-0 scheme-dark'
      />
      {error && <p className='text-xs text-red-400'>{error}</p>}
    </div>
  );
};

export default FormInput;
