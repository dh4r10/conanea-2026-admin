import { useState } from 'react';
import { X } from 'lucide-react';

interface YapeInfoProps {
  nombres: string;
  yape: string;
}

const YapeInfo = ({ nombres, yape }: YapeInfoProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='bg-green-50 border border-green-200 rounded-2xl p-4 mb-4'>
      <p className='text-xs font-black text-green-800 mb-3'>Yape</p>
      <div className='flex items-center gap-5'>
        <div
          onClick={() => setIsOpen(true)}
          className='group relative shrink-0 bg-white rounded-xl p-2 shadow-sm border border-green-200 cursor-zoom-in hover:border-green-400 transition-colors'
        >
          <img
            src='/img/yape.jpg'
            alt='QR Yape'
            className='w-24 h-24 object-contain transition-transform group-hover:scale-105'
          />
        </div>
        <div className='text-xs text-green-800 space-y-1'>
          <p>
            <span className='font-bold'>Número:</span> {yape}
          </p>
          <p>
            <span className='font-bold'>Nombre:</span> Andreé Leonardo Tito
            Hinostroza
          </p>
          <p>
            <span className='font-bold'>Concepto:</span> CONAEA2026 —{' '}
            {nombres || 'Tu nombre'}
          </p>
          <p className='text-green-600 text-[10px] mt-2 leading-snug'>
            Escanea el QR desde tu app Yape o Plin para realizar el pago.
          </p>
        </div>
      </div>

      {isOpen && (
        <div className='fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200'>
          <div className='absolute inset-0' onClick={() => setIsOpen(false)} />
          <div className='relative max-w-lg w-full bg-white rounded-3xl p-4 shadow-2xl animate-in zoom-in-95 duration-200'>
            <button
              onClick={() => setIsOpen(false)}
              className='absolute -top-12 right-0 p-2 text-white hover:text-green-300 transition-colors'
            >
              <X className='w-8 h-8' />
            </button>
            <img
              src='/img/yape.jpg'
              alt='QR Yape Full'
              className='w-full h-auto rounded-2xl'
            />
            <div className='mt-4 text-center'>
              <p className='text-green-800 font-bold'>Escanea para pagar</p>
              <p className='text-xs text-green-600'>
                {yape} — Andreé Leonardo Tito Hinostroza
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default YapeInfo;
