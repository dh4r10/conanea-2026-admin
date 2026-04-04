import { useRef } from 'react';

interface FormPhotoProps {
  currentPhoto?: string;
  value: File | null;
  onChange: (file: File | null) => void;
  error?: string;
  id?: string;
}

const FormPhoto = ({
  currentPhoto,
  value,
  onChange,
  error,
  id = 'photo',
}: FormPhotoProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const preview = value ? URL.createObjectURL(value) : currentPhoto;

  return (
    <div className='flex flex-col items-center gap-2 shrink-0'>
      <div className='w-24 h-24 rounded-xl overflow-hidden border border-white/10'>
        {preview ? (
          <img
            src={preview}
            alt='Foto actual'
            className='w-full h-full object-cover object-top'
          />
        ) : (
          <div className='w-full h-full bg-white/5 flex items-center justify-center'>
            <span className='text-slate-500 text-xs'>Sin foto</span>
          </div>
        )}
      </div>

      <label
        htmlFor={id}
        className='text-[10px] font-semibold text-slate-400 hover:text-[#fbba0e] transition-colors cursor-pointer uppercase tracking-wider text-center'
      >
        {value ? 'Cambiar foto' : 'Subir foto'}
      </label>

      <input
        ref={inputRef}
        id={id}
        name={id}
        type='file'
        accept='image/*'
        className='hidden'
        onChange={(e) => onChange(e.target.files?.[0] ?? null)}
      />

      {value && (
        <p className='text-[10px] text-green-400 text-center leading-tight'>
          ✓ {value.name}
        </p>
      )}

      {error && <p className='text-[10px] text-red-400 text-center'>{error}</p>}
    </div>
  );
};

export default FormPhoto;
