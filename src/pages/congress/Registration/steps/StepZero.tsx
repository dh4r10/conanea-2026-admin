import { AlertCircle } from 'lucide-react';

import { TARIFA_LABELS, TARIFAS } from '../data';
import type { ParticipantType } from '../registration.types';

import FeeCard from '../components/FeeCard';

interface StepZeroProps {
  selected: ParticipantType;
  onSelect: (type: ParticipantType) => void;
}

const StepZero = ({ selected, onSelect }: StepZeroProps) => {
  return (
    <div>
      <h2 className='text-xl font-black text-gray-900 mb-1'>
        Tipo de participante
      </h2>
      <p className='text-sm text-gray-400 mb-6'>
        Selecciona tu categoría para continuar.
      </p>

      <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
        {(['nacional', 'local', 'internacional'] as ParticipantType[]).map(
          (type) => (
            <FeeCard
              key={type}
              type={type}
              label={TARIFA_LABELS[type]}
              amount={TARIFAS[type].monto}
              currency={TARIFAS[type].moneda}
              selected={selected === type}
              onSelect={onSelect}
            />
          ),
        )}
      </div>

      <div className='mt-6 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex items-start gap-3'>
        <AlertCircle className='w-4 h-4 text-amber-500 shrink-0 mt-0.5' />
        <p className='text-xs text-amber-700 leading-relaxed'>
          El monto varía según el tipo de participante. Todos deben adjuntar su
          comprobante de pago. Los estudiantes también deben subir su ficha de
          matrícula vigente.
        </p>
      </div>
    </div>
  );
};

export default StepZero;
