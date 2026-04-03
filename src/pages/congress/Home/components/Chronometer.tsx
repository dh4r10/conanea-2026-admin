const Chronometer = ({ value, label }: { value: number; label: string }) => {
  return (
    <div className='flex flex-col items-center'>
      <span className='text-lg font-black tabular-nums drop-shadow-lg'>
        {String(value).padStart(2, '0')}
      </span>
      <span className='text-[10px] text-white/70 uppercase tracking-widest mt-0.5'>
        {label}
      </span>
    </div>
  );
};

export default Chronometer;
