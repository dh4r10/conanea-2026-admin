import { CheckCircle } from 'lucide-react';
import { TARIFA_LABELS, TARIFAS } from '../data';
import type { ParticipantType } from '../registration.types';

type MetodoPago = 'billetera' | 'transferencia' | 'efectivo' | '';

interface ConfirmationProps {
  nombres: string;
  apellidos: string;
  correo: string;
  universidad: string;
  participantType: ParticipantType;
  metodoPago: MetodoPago;
}

const METODO_LABELS: Record<string, string> = {
  billetera: 'Billetera electrónica',
  transferencia: 'Transferencia bancaria',
  efectivo: 'Efectivo',
};

const Confirmation = ({
  nombres,
  apellidos,
  correo,
  universidad,
  participantType,
  metodoPago,
}: ConfirmationProps) => {
  const summary = [
    { label: 'Nombre', value: `${nombres} ${apellidos}` },
    { label: 'Tipo', value: TARIFA_LABELS[participantType] },
    { label: 'Universidad', value: universidad },
    {
      label: 'Monto pagado',
      value: `${TARIFAS[participantType].moneda} ${TARIFAS[participantType].monto}.00`,
    },
    { label: 'Método', value: METODO_LABELS[metodoPago] ?? metodoPago },
  ];

  return (
    <div className='min-h-screen bg-gray-50 flex items-center justify-center px-4 pt-24 pb-8'>
      <div className='bg-white rounded-3xl shadow-xl p-8 sm:p-12 max-w-md w-full text-center'>
        <div className='w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6'>
          <CheckCircle className='w-10 h-10 text-green-600' />
        </div>

        <div className='flex items-center gap-2 justify-center mb-1'>
          <div className='w-6 h-px bg-[#fbba0e]' />
          <p className='text-xs font-bold tracking-[0.2em] uppercase text-[#fbba0e]'>
            Inscripción completada
          </p>
          <div className='w-6 h-px bg-[#fbba0e]' />
        </div>

        <h2 className='text-2xl font-black text-gray-900 mb-2'>
          ¡Bienvenido al CONAEA 2026!
        </h2>
        <p className='text-gray-500 text-sm mb-8'>
          Tu inscripción ha sido recibida. Una vez validado tu pago recibirás tu
          código QR de confirmación en{' '}
          <span className='font-semibold text-gray-700'>{correo}</span>.
        </p>

        {/* Resumen */}
        <div className='text-left space-y-0 mb-8'>
          {summary.map(({ label, value }) => (
            <div
              key={label}
              className='flex justify-between items-center py-2.5 border-b border-gray-100'
            >
              <span className='text-xs text-gray-400 font-medium'>{label}</span>
              <span className='text-xs font-bold text-gray-800'>{value}</span>
            </div>
          ))}
        </div>

        <a
          href='/'
          className='inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold text-sm px-6 py-3 rounded-xl transition-colors w-full justify-center'
        >
          Volver al inicio
        </a>
      </div>
    </div>
  );
};

export default Confirmation;
