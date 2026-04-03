interface TransferenciaInfoProps {
  nombres: string;
  apellidos: string;
}

const BANCOS = [
  { nombre: 'BCP', cuenta: '55074867398066', cci: '00255017486739806623' },
  {
    nombre: 'Banco de la Nación',
    cuenta: '04581503232',
    cci: '01858100458150323296',
  },
];

const TransferenciaInfo = ({ nombres, apellidos }: TransferenciaInfoProps) => (
  <div className='bg-blue-50 border border-blue-200 rounded-xl px-4 py-4 mb-4 text-xs text-blue-800'>
    <p className='font-black mb-3'>Datos de transferencia</p>
    <div className='flex flex-col gap-3'>
      {BANCOS.map((banco) => (
        <div
          key={banco.nombre}
          className='bg-white rounded-lg px-3 py-2.5 border border-blue-100'
        >
          <p className='font-black text-blue-900 mb-1.5'>🏦 {banco.nombre}</p>
          <div className='space-y-0.5'>
            <p>
              <span className='font-bold'>Cuenta:</span> {banco.cuenta}
            </p>
            <p>
              <span className='font-bold'>CCI:</span> {banco.cci}
            </p>
            <p className='mt-1.5 font-semibold text-blue-700'>
              Concepto: CONAEA2026 — {nombres} {apellidos}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default TransferenciaInfo;
