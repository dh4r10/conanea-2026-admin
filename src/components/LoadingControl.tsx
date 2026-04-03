import { Skeleton } from './ui/skeleton';

const Loading = () => (
  <div className='flex flex-col gap-6'>
    {/* Header skeleton */}
    <div className='flex items-center gap-3'>
      <Skeleton className='h-9 w-9 rounded-lg bg-white/5' />
      <div className='flex flex-col gap-2'>
        <Skeleton className='h-4 w-36 bg-white/5' />
        <Skeleton className='h-3 w-24 bg-white/5' />
      </div>
    </div>

    {/* Card skeleton */}
    <div className='rounded-2xl border border-white/10 bg-[#1a1a1a] shadow-xl overflow-hidden'>
      {/* Toolbar */}
      <div className='flex items-center justify-between px-6 py-4 border-b border-white/10'>
        <Skeleton className='h-8 w-20 rounded-md bg-white/5' />
        <Skeleton className='h-8 w-48 rounded-md bg-white/5' />
      </div>

      {/* Table header */}
      <div className='grid grid-cols-3 gap-4 px-6 py-3 border-b border-white/5'>
        <Skeleton className='h-3 w-16 bg-white/5' />
        <Skeleton className='h-3 w-16 bg-white/5' />
        <Skeleton className='h-3 w-16 justify-self-end bg-white/5' />
      </div>

      {/* Table rows */}
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className='grid grid-cols-3 gap-4 px-6 py-4 border-b border-white/5 last:border-0 '
          style={{ opacity: 1 - i * 0.15 }}
        >
          <Skeleton className='h-3.5 w-32 bg-white/5' />
          <Skeleton className='h-3.5 w-24 bg-white/5' />
          <div className='flex gap-2 justify-end'>
            <Skeleton className='h-7 w-7 rounded-md bg-white/5' />
            <Skeleton className='h-7 w-7 rounded-md bg-white/5' />
            <Skeleton className='h-7 w-7 rounded-md bg-white/5' />
          </div>
        </div>
      ))}

      {/* Footer */}
      <div className='px-6 py-3 border-t border-white/10'>
        <Skeleton className='h-3 w-40 bg-white/5' />
      </div>
    </div>
  </div>
);

export default Loading;
