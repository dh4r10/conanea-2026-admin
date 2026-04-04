import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Camera } from 'lucide-react';
import { Label } from '@/components/ui/label';

interface FormFileProps {
  value: File | null;
  onChange: (file: File | null) => void;
  error?: string;
  label?: string;
}

const FormFile = ({
  value,
  onChange,
  error,
  label = 'Foto',
}: FormFileProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const preview = useMemo(() => {
    if (!value) return null;
    return URL.createObjectURL(value);
  }, [value]);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleFile = (file: File | null) => {
    onChange(file);

    if (!file && fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0] ?? null;

    if (file && file.type.startsWith('image/')) {
      handleFile(file);
    }
  };

  return (
    <div className='flex flex-col gap-2'>
      <Label className='text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5'>
        <Camera className='h-3 w-3' />
        {label}
      </Label>

      {/* Dropzone */}
      {!preview && (
        <label
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          className={`group flex flex-col items-center justify-center gap-2 w-full h-32 rounded-xl border border-dashed transition cursor-pointer
            ${
              dragActive
                ? 'border-[#fbba0e] bg-[#fbba0e]/10'
                : 'border-white/15 bg-[#111] hover:border-[#fbba0e]/60 hover:bg-[#111]/80'
            }`}
        >
          <Camera className='h-6 w-6 text-slate-500 group-hover:text-[#fbba0e]' />

          <p className='text-xs text-slate-500 group-hover:text-slate-300'>
            {dragActive
              ? 'Suelta la imagen aquí'
              : 'Haz click o arrastra una imagen'}
          </p>

          <input
            ref={fileInputRef}
            type='file'
            accept='image/*'
            className='hidden'
            onChange={(e) => {
              const file = e.target.files?.[0] ?? null;
              handleFile(file);
            }}
          />
        </label>
      )}

      {/* Preview */}
      {preview && (
        <div className='flex items-center gap-3 mt-2'>
          <div className='w-20 h-20 rounded-xl overflow-hidden border border-white/10'>
            <img
              src={preview}
              alt='preview'
              className='w-full h-full object-cover object-top'
            />
          </div>

          <div className='flex flex-col text-xs'>
            <span className='text-slate-400'>
              {value?.name || 'Imagen seleccionada'}
            </span>

            <button
              type='button'
              onClick={() => handleFile(null)}
              className='text-red-400 hover:text-red-300 text-left cursor-pointer'
            >
              Quitar imagen
            </button>
          </div>
        </div>
      )}

      {error && <p className='text-xs text-red-400'>{error}</p>}
    </div>
  );
};

export default FormFile;
