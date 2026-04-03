import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

// --- Tipos ---
type Column = {
  id: number;
  label: string;
  key: string;
  render?: (value: unknown) => React.ReactNode; // 👈 renderer opcional
};

type Row = Record<string, unknown>;

interface TablePanelProps {
  columns: Column[];
  data: Row[];
  children: (row: Row) => React.ReactNode;
}

// --- Componente ---
const TablePanel = ({ columns, data, children }: TablePanelProps) => {
  return (
    <div className='px-6 py-2'>
      <div className='mb-2 flex items-center justify-between py-2'>
        <span className='text-xs font-semibold uppercase tracking-widest text-[#fbba0e]'>
          Días
        </span>
        <Badge className='bg-[#fbba0e]/10 text-[#fbba0e] border border-[#fbba0e]/20 text-xs'>
          {data.length} registro{data.length !== 1 ? 's' : ''}
        </Badge>
      </div>

      <Table>
        <TableHeader>
          <TableRow className='border-white/10 hover:bg-transparent'>
            <TableHead className='text-xs font-semibold uppercase tracking-wider text-slate-500 w-8'>
              #
            </TableHead>

            {/* Columnas dinámicas */}
            {columns.map((col) => (
              <TableHead
                key={col.id}
                className='text-xs font-semibold uppercase tracking-wider text-slate-500'
              >
                {col.label}
              </TableHead>
            ))}

            <TableHead className='text-xs font-semibold uppercase tracking-wider text-slate-500 text-right'>
              Acciones
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.length === 0 ? (
            <TableRow className='hover:bg-transparent'>
              <TableCell
                colSpan={columns.length + 2}
                className='py-12 text-center text-sm text-slate-500'
              >
                No se encontraron resultados.
              </TableCell>
            </TableRow>
          ) : (
            data.map((row, idx) => (
              <TableRow
                key={idx}
                className='border-white/10 hover:bg-white/5 transition-colors'
              >
                <TableCell className='text-xs text-slate-500 font-mono'>
                  {String(idx + 1).padStart(2, '0')}
                </TableCell>

                {/* Celdas dinámicas haciendo match por key */}
                {columns.map((col) => (
                  <TableCell key={col.id} className='text-sm text-slate-200'>
                    {col.render
                      ? col.render(row[col.key])
                      : String(row[col.key] ?? '—')}
                  </TableCell>
                ))}

                <TableCell className='text-right'>{children(row)}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TablePanel;
