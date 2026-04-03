import React, { useState, useEffect } from 'react';
import Label from './Label';

interface InputDescriptionCheckProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  checkLabel?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
}

const InputDescriptionCheck = ({
  label,
  name,
  value,
  onChange,
  checkLabel = 'Agregar descripción',
  placeholder = 'Escribe una descripción…',
  required = false,
  error,
}: InputDescriptionCheckProps) => {
  const [checked, setChecked] = useState(value !== '' && value !== '-');

  useEffect(() => {
    if (value === '' || value === undefined) {
      onChange('-');
    }
  }, []);

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setChecked(isChecked);
    if (!isChecked) {
      onChange('-'); // desactivado → '-'
    } else {
      onChange(''); // activado → vacío para que el usuario escriba
    }
  };

  const handleText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className='flex flex-col gap-1.5'>
      <Label label={label} required={required} />

      {/* Checkbox */}
      <label className='flex items-center gap-2 cursor-pointer w-fit'>
        <div className='relative'>
          <input
            type='checkbox'
            checked={checked}
            onChange={handleCheck}
            className='sr-only peer'
          />
          <div className='w-9 h-5 bg-gray-200 rounded-full peer peer-checked:bg-green-500 transition-colors' />
          <div className='absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform peer-checked:translate-x-4' />
        </div>
        <span className='text-xs text-gray-500'>{checkLabel}</span>
      </label>

      {/* Textarea */}
      <textarea
        name={name}
        value={checked ? value : ''}
        onChange={handleText}
        disabled={!checked}
        placeholder={checked ? placeholder : 'Sin descripción'}
        rows={3}
        className={[
          'w-full border rounded-xl px-4 py-2.5 text-sm transition-all resize-none',
          'focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent',
          'placeholder:text-gray-300',
          checked
            ? 'border-gray-200 bg-white text-gray-900'
            : 'border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed',
          error ? 'border-red-400 focus:ring-red-400' : '',
        ].join(' ')}
      />
      {error && <p className='text-xs text-red-400'>{error}</p>}
    </div>
  );
};

export default InputDescriptionCheck;
