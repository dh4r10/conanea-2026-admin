import { Upload } from 'lucide-react';

interface FileUploadProps {
  label: string;
  name: string;
  file: File | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  accept?: string;
  required?: boolean;
}

const FileUpload = ({
  label,
  name,
  file,
  onChange,
  accept,
  required = false,
}: FileUploadProps) => {
  console.log('accept:', accept);
  return (
    <div className='flex flex-col gap-1.5'>
      <label className='text-xs font-bold text-gray-600 uppercase tracking-wider'>
        {label}
        {required && <span className='text-red-400 ml-1'>*</span>}
      </label>
      <label
        className={[
          'flex items-center gap-3 border-2 border-dashed rounded-xl px-4 py-3 cursor-pointer transition-all',
          file
            ? 'border-green-400 bg-green-50'
            : 'border-gray-200 hover:border-green-300 hover:bg-green-50/50',
        ].join(' ')}
      >
        <Upload
          className={`w-4 h-4 shrink-0 ${file ? 'text-green-600' : 'text-gray-400'}`}
        />
        <span
          className={`text-sm truncate ${file ? 'text-green-700 font-medium' : 'text-gray-400'}`}
        >
          {file ? file.name : 'Seleccionar archivo...'}
        </span>
        <input
          type='file'
          name={name}
          accept={accept}
          onChange={onChange}
          className='hidden'
        />
      </label>
    </div>
  );
};

export default FileUpload;
