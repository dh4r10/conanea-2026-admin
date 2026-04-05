export const columns = [
  {
    id: 1,
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
    id: 2,
    label: 'Código',
    key: 'code',
    render: (value: unknown) => (
      <span className='text-slate-200 text-sm'>{value as string}</span>
    ),
  },
  {
    id: 3,
    label: 'Nombre',
    key: 'name',
    render: (value: unknown) => (
      <span className='text-slate-200 text-sm'>{value as string}</span>
    ),
  },
  {
    id: 4,
    label: 'Abreviación',
    key: 'abbreviation',
    render: (value: unknown) => (
      <span className='text-slate-200 text-sm'>{value as string}</span>
    ),
  },
  {
    id: 5,
    label: 'País',
    key: 'country',
    render: (value: unknown) => (
      <span className='text-slate-200 text-sm'>{value as string}</span>
    ),
  },
  {
    id: 6,
    label: 'Región',
    key: 'region',
    render: (value: unknown) => (
      <span className='text-slate-200 text-sm'>{value as string}</span>
    ),
  },
  {
    id: 7,
    label: 'Ciudad',
    key: 'place',
    render: (value: unknown) => (
      <span className='text-slate-200 text-sm'>{value as string}</span>
    ),
  },
];
