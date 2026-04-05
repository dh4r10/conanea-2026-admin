export const columns = [
  {
    id: 1,
    label: 'Preventa',
    key: 'pre_sale',
    render: (value: unknown) => {
      const preSale = value as { name: string };
      return (
        <span className='text-slate-200 text-sm'>{preSale?.name ?? '—'}</span>
      );
    },
  },
  {
    id: 2,
    label: 'Tipo de Cuota',
    key: 'quota_type',
    render: (value: unknown) => {
      const quotaType = value as { name: string; currency: string };
      return (
        <span className='text-slate-200 text-sm'>
          {quotaType?.name ?? '—'}{' '}
          {quotaType?.currency ? `(${quotaType.currency})` : ''}
        </span>
      );
    },
  },
  {
    id: 3,
    label: 'Monto',
    key: 'mount',
    render: (value: unknown, row: unknown) => {
      const r = row as { quota_type: { currency: string } };
      const currency = r?.quota_type?.currency ?? 'S/';
      return value !== null && value !== undefined ? (
        <span className='text-slate-200 text-sm'>
          {currency} {Number(value).toFixed(2)}
        </span>
      ) : (
        <span className='text-slate-500 text-xs'>—</span>
      );
    },
  },
  {
    id: 4,
    label: 'Cantidad',
    key: 'amount',
    render: (value: unknown) => (
      <span className='text-slate-200 text-sm'>{value as number}</span>
    ),
  },
];
