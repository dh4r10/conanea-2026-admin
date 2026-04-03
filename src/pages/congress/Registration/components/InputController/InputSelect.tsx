import React from 'react';
import Label from './Label';

const baseInput = [
  'w-full border border-gray-200 rounded-xl py-2.5 text-sm text-gray-900',
  'focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent',
  'placeholder:text-gray-300 bg-white transition-all',
].join(' ');

interface SelectOption {
  value: string | number;
  label: string;
}

interface InputSelectProps {
  label: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  placeholder?: string;
  required?: boolean;
  error?: string;
}

const InputSelect = ({
  label,
  name,
  value,
  onChange,
  options,
  placeholder = 'Seleccionar…',
  required = false,
  error,
}: InputSelectProps) => (
  <div className='flex flex-col gap-1.5'>
    <Label label={label} required={required} />
    <div className='relative'>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={[
          baseInput,
          'px-4 pr-9 appearance-none cursor-pointer',
          !value ? 'text-gray-300' : '',
          error ? 'border-red-400 focus:ring-red-400' : '',
        ].join(' ')}
      >
        <option value='' disabled hidden>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className='text-gray-900'>
            {opt.label}
          </option>
        ))}
      </select>
      {/* chevron */}
      <svg
        className='pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
        strokeWidth={2}
      >
        <path strokeLinecap='round' strokeLinejoin='round' d='M19 9l-7 7-7-7' />
      </svg>
    </div>
    {error && <p className='text-xs text-red-400'>{error}</p>}
  </div>
);

export default InputSelect;
