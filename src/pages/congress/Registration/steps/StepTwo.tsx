import { AlertCircle, CheckCircle, X } from 'lucide-react';

import { TARIFA_LABELS, TARIFAS } from '../data';
import type { ParticipantType } from '../registration.types';

import FileUpload from '../components/FileUpload';
import YapeInfo from '../components/YapeInfo';
import TransferenciaInfo from '../components/TransferenciaInfo';
import EfectivoInfo from '../components/EfectivoInfo';

type MetodoPago = 'billetera' | 'transferencia' | 'efectivo' | '';

interface StepTwoProps {
  participantType: ParticipantType;
  metodoPago: MetodoPago;
  comprobante: File | null;
  nombres: string;
  apellidos: string;
  correo: string;
  universidad: string;
  showModal: boolean;
  onMetodoPago: (m: MetodoPago) => void;
  onFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCloseModal: () => void;
  onConfirm: () => void;
}

const YAPE_NUMBER = '913237821';

const METODOS = [
  { id: 'billetera' as const, label: 'Billetera electrónica', icon: '📱' },
  { id: 'transferencia' as const, label: 'Transferencia bancaria', icon: '🏦' },
  { id: 'efectivo' as const, label: 'Efectivo', icon: '💵' },
];

// ── Modal ──────────────────────────────────────────────────────
interface ConfirmModalProps {
  participantType: ParticipantType;
  nombres: string;
  apellidos: string;
  correo: string;
  universidad: string;
  metodoPago: MetodoPago;
  onClose: () => void;
  onConfirm: () => void;
}

const METODO_LABELS: Record<string, string> = {
  billetera: 'Billetera electrónica',
  transferencia: 'Transferencia bancaria',
  efectivo: 'Efectivo',
};

const ConfirmModal = ({
  participantType,
  nombres,
  apellidos,
  correo,
  universidad,
  metodoPago,
  onClose,
  onConfirm,
}: ConfirmModalProps) => (
  <div className='fixed inset-0 z-50 flex items-center justify-center px-4'>
    <div
      className='absolute inset-0 bg-black/50 backdrop-blur-sm'
      onClick={onClose}
    />

    <div className='relative bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full z-10'>
      <button
        onClick={onClose}
        className='absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors'
      >
        <X className='w-5 h-5' />
      </button>

      <div className='w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5'>
        <CheckCircle className='w-7 h-7 text-green-600' />
      </div>

      <h3 className='text-xl font-black text-gray-900 text-center mb-1'>
        Confirmar inscripción
      </h3>
      <p className='text-sm text-gray-400 text-center mb-6'>
        Revisa tus datos antes de enviar.
      </p>

      <div className='space-y-0 mb-6'>
        {[
          { label: 'Nombre', value: `${nombres} ${apellidos}` },
          { label: 'Correo', value: correo },
          { label: 'Universidad', value: universidad },
          { label: 'Tipo', value: TARIFA_LABELS[participantType] },
          {
            label: 'Monto',
            value: `${TARIFAS[participantType].moneda} ${TARIFAS[participantType].monto}.00`,
          },
          { label: 'Método', value: METODO_LABELS[metodoPago] ?? metodoPago },
        ].map(({ label, value }) => (
          <div
            key={label}
            className='flex justify-between items-center py-2.5 border-b border-gray-100'
          >
            <span className='text-xs text-gray-400 font-medium'>{label}</span>
            <span className='text-xs font-bold text-gray-800 text-right max-w-[60%] truncate'>
              {value}
            </span>
          </div>
        ))}
      </div>

      <p className='text-[10px] text-gray-400 text-center mb-5 leading-snug'>
        Al confirmar aceptas que tus datos serán procesados por el equipo
        organizador del CONAEA 2026.
      </p>

      <div className='flex gap-3'>
        <button
          onClick={onClose}
          className='flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-bold text-gray-500 hover:bg-gray-50 transition-colors'
        >
          Revisar
        </button>
        <button
          onClick={onConfirm}
          className='flex-1 py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white text-sm font-bold transition-colors'
        >
          Confirmar
        </button>
      </div>
    </div>
  </div>
);

// ── Main Component ─────────────────────────────────────────────
const StepTwo = ({
  participantType,
  metodoPago,
  comprobante,
  nombres,
  apellidos,
  correo,
  universidad,
  showModal,
  onMetodoPago,
  onFile,
  onCloseModal,
  onConfirm,
}: StepTwoProps) => {
  return (
    <>
      <div>
        <h2 className='text-xl font-black text-gray-900 mb-1'>Pago</h2>
        <p className='text-sm text-gray-400 mb-6'>
          Selecciona tu método de pago y adjunta el comprobante.
        </p>

        {/* Resumen */}
        <div className='bg-[#0a1a0f] rounded-2xl p-5 mb-6'>
          <p className='text-xs text-green-400 font-bold uppercase tracking-wider mb-3'>
            Resumen
          </p>
          <div className='flex justify-between items-center'>
            <div>
              <p className='text-white font-black'>
                {TARIFA_LABELS[participantType]}
              </p>
              <p className='text-green-400/60 text-xs'>
                XXXII CONAEA 2026 · Tarapoto
              </p>
            </div>
            <p className='text-[#fbba0e] text-2xl font-black'>
              {TARIFAS[participantType].moneda} {TARIFAS[participantType].monto}
              <span className='text-sm'>.00</span>
            </p>
          </div>
        </div>

        {/* Métodos */}
        <p className='text-xs font-bold text-gray-600 uppercase tracking-wider mb-3'>
          Método de pago <span className='text-red-400'>*</span>
        </p>
        <div className='grid grid-cols-3 gap-3 mb-5'>
          {METODOS.map((m) => (
            <button
              key={m.id}
              onClick={() => onMetodoPago(m.id)}
              className={[
                'flex flex-col items-center gap-2 p-4 rounded-2xl border-2 text-center transition-all',
                metodoPago === m.id
                  ? 'border-green-600 bg-green-50'
                  : 'border-gray-200 hover:border-green-300',
              ].join(' ')}
            >
              <span className='text-2xl'>{m.icon}</span>
              <span className='text-[11px] font-bold text-gray-700 leading-tight'>
                {m.label}
              </span>
            </button>
          ))}
        </div>

        {metodoPago === 'billetera' && (
          <YapeInfo nombres={nombres} yape={YAPE_NUMBER} />
        )}
        {metodoPago === 'transferencia' && (
          <TransferenciaInfo nombres={nombres} apellidos={apellidos} />
        )}
        {metodoPago === 'efectivo' && <EfectivoInfo />}

        <FileUpload
          label='Comprobante de pago'
          name='comprobante'
          file={comprobante}
          onChange={onFile}
          accept='.jpg,.png,.jpeg'
          required
        />
        <p className='text-[10px] text-gray-400 mt-2 flex items-center gap-1'>
          <AlertCircle className='w-3 h-3 shrink-0' />
          Tu inscripción será confirmada tras la validación del comprobante por
          el administrador.
        </p>
      </div>

      {/* Modal controlado desde el padre */}
      {showModal && (
        <ConfirmModal
          participantType={participantType}
          nombres={nombres}
          apellidos={apellidos}
          correo={correo}
          universidad={universidad}
          metodoPago={metodoPago}
          onClose={onCloseModal}
          onConfirm={onConfirm}
        />
      )}
    </>
  );
};

export default StepTwo;
