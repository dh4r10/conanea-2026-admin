import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import React from 'react';

interface ModalHeaderProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const ModalHeader = ({ title, description, icon }: ModalHeaderProps) => {
  return (
    <DialogHeader>
      <div className='flex items-center gap-3 mb-1'>
        <div className='flex h-9 w-9 items-center justify-center rounded-lg bg-[#fbba0e] shadow shadow-[#fbba0e]/20'>
          {icon}
        </div>
        <DialogTitle className='text-slate-100 text-lg font-semibold'>
          {title}
        </DialogTitle>
      </div>
      <p className='text-sm text-slate-500 pl-12'>{description}</p>
    </DialogHeader>
  );
};

export default ModalHeader;
