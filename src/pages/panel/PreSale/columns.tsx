const formatDateTime = (value: unknown) => {
  if (!value) {
    return <span className='text-slate-500 text-xs'>Sin fecha</span>;
  }

  // Quita la Z para tratar como hora local, no UTC
  const normalized = (value as string).replace('Z', '');
  const date = new Date(normalized);

  return date.toLocaleString('es-PE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
};

export const getPreSaleColumns = () => [
  { id: 1, label: 'Nombre', key: 'name' },
  {
    id: 2,
    label: 'Fecha Inicio',
    key: 'start_date',
    render: (value: unknown) => formatDateTime(value),
  },
  {
    id: 3,
    label: 'Fecha Fin',
    key: 'end_date',
    render: (value: unknown) => formatDateTime(value),
  },
];
