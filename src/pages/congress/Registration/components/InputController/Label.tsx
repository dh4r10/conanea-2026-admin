const Label = ({ label, required }: { label: string; required?: boolean }) => (
  <label className='text-xs font-bold text-gray-600 uppercase tracking-wider'>
    {label}
    {required && <span className='text-red-400 ml-1'>*</span>}
  </label>
);

export default Label;
