import { Download } from 'lucide-react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

const GREEN_DARK = '#0a1a0f';
const GREEN_MID = '#166534';
const GREEN_MAIN = '#16a34a';
const YELLOW = '#fbba0e';
const GRAY_LIGHT = '#f9fafb';
const GRAY_BORDER = '#e5e7eb';

const TYPE_LABELS: Record<string, string> = {
  ponencia: 'Ponencia',
  laboratorio: 'Laboratorio',
  feria: 'Feria',
  ceremonia: 'Ceremonia',
  cultural: 'Cultural',
};

const TYPE_BG: Record<string, string> = {
  ponencia: '#dbeafe',
  laboratorio: '#d1fae5',
  feria: '#fef9c3',
  ceremonia: '#ede9fe',
  cultural: '#ffe4e6',
};

const TYPE_TEXT: Record<string, string> = {
  ponencia: '#1d4ed8',
  laboratorio: '#065f46',
  feria: '#854d0e',
  ceremonia: '#6b21a8',
  cultural: '#9f1239',
};

function hex(h: string): [number, number, number] {
  const n = parseInt(h.replace('#', ''), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

interface Activity {
  time: string;
  duration: string;
  title: string;
  speaker?: string;
  location: string;
  type: string;
  capacity?: number;
}

interface Day {
  dayName: string;
  dayNum: string;
  month: string;
  theme: string;
  activities: Activity[];
}

const days: Day[] = [
  {
    dayName: 'Martes',
    dayNum: '15',
    month: 'Sep',
    theme: 'Inauguracion y Bienvenida',
    activities: [
      {
        time: '08:00',
        duration: '2h',
        title: 'Registro y acreditacion de participantes',
        location: 'Hall Principal - UNSM',
        type: 'ceremonia',
        capacity: 500,
      },
      {
        time: '10:00',
        duration: '1.5h',
        title: 'Ceremonia de inauguracion oficial',
        location: 'Auditorio Central',
        type: 'ceremonia',
        capacity: 500,
        speaker: 'Rector UNSM',
      },
      {
        time: '11:30',
        duration: '1h',
        title: 'Ponencia magistral: Agronomia y soberania alimentaria',
        location: 'Auditorio Central',
        type: 'ponencia',
        capacity: 400,
        speaker: 'Dr. Julio Rengifo Paredes',
      },
      {
        time: '13:00',
        duration: '1h',
        title: 'Almuerzo y networking',
        location: 'Comedor Universitario',
        type: 'cultural',
        capacity: 300,
      },
      {
        time: '14:30',
        duration: '2h',
        title: 'Visita al laboratorio de suelos y fitopatologia',
        location: 'Laboratorio de Agronomia - Bloque C',
        type: 'laboratorio',
        capacity: 40,
      },
      {
        time: '17:00',
        duration: '1.5h',
        title: 'Apertura de Expoferia Amazonica',
        location: 'Pabellon de Ferias - Campus',
        type: 'feria',
        capacity: 600,
      },
      {
        time: '19:00',
        duration: '2h',
        title: 'Noche cultural de bienvenida',
        location: 'Plaza Central UNSM',
        type: 'cultural',
      },
    ],
  },
  {
    dayName: 'Miercoles',
    dayNum: '16',
    month: 'Sep',
    theme: 'Innovacion y Tecnologia Agricola',
    activities: [
      {
        time: '08:30',
        duration: '1.5h',
        title: 'Ponencia: Agricultura de precision con drones',
        location: 'Auditorio Central',
        type: 'ponencia',
        capacity: 400,
        speaker: 'Ing. Sandra Flores Rios',
      },
      {
        time: '10:00',
        duration: '2h',
        title: 'Taller: Manejo integrado de plagas en cacao',
        location: 'Sala de Talleres 1',
        type: 'ponencia',
        capacity: 80,
        speaker: 'Dr. Carlos Vasquez',
      },
      {
        time: '12:00',
        duration: '1h',
        title: 'Almuerzo',
        location: 'Comedor Universitario',
        type: 'cultural',
      },
      {
        time: '13:30',
        duration: '2.5h',
        title: 'Visita al laboratorio de biotecnologia vegetal',
        location: 'Laboratorio de Biotecnologia - Bloque A',
        type: 'laboratorio',
        capacity: 35,
      },
      {
        time: '16:00',
        duration: '1.5h',
        title: 'Ponencia: Sistemas agroforestales en la Amazonia',
        location: 'Auditorio Central',
        type: 'ponencia',
        capacity: 400,
        speaker: 'Dra. Maria Huaman Solis',
      },
      {
        time: '17:30',
        duration: '2h',
        title: 'Feria de proyectos estudiantiles',
        location: 'Pabellon de Ferias',
        type: 'feria',
        capacity: 500,
      },
    ],
  },
  {
    dayName: 'Jueves',
    dayNum: '17',
    month: 'Sep',
    theme: 'Sostenibilidad y Saberes Ancestrales',
    activities: [
      {
        time: '08:30',
        duration: '1.5h',
        title: 'Ponencia: Etnobotanica amazonica y agricultura tradicional',
        location: 'Auditorio Central',
        type: 'ponencia',
        capacity: 400,
        speaker: 'Dr. Renzo Tapullima',
      },
      {
        time: '10:00',
        duration: '2h',
        title: 'Visita al laboratorio de analisis de agua',
        location: 'Laboratorio de Recursos Hidricos',
        type: 'laboratorio',
        capacity: 30,
      },
      {
        time: '12:00',
        duration: '1h',
        title: 'Almuerzo',
        location: 'Comedor Universitario',
        type: 'cultural',
      },
      {
        time: '13:30',
        duration: '1.5h',
        title: 'Mesa redonda: Cambio climatico y produccion agricola',
        location: 'Sala de Conferencias B',
        type: 'ponencia',
        capacity: 150,
        speaker: 'Panel de expertos',
      },
      {
        time: '15:00',
        duration: '2h',
        title: 'Concurso academico: Mejores proyectos de investigacion',
        location: 'Auditorio Central',
        type: 'ceremonia',
        capacity: 300,
      },
      {
        time: '17:30',
        duration: '2h',
        title: 'Expoferia: Productos organicos amazonicos',
        location: 'Pabellon de Ferias',
        type: 'feria',
        capacity: 500,
      },
      {
        time: '20:00',
        duration: '2h',
        title: 'Noche de confraternidad interuniversitaria',
        location: 'Plaza Central UNSM',
        type: 'cultural',
      },
    ],
  },
  {
    dayName: 'Viernes',
    dayNum: '18',
    month: 'Sep',
    theme: 'Mercados y Emprendimiento',
    activities: [
      {
        time: '08:30',
        duration: '1.5h',
        title: 'Ponencia: Cadenas de valor en productos amazonicos',
        location: 'Auditorio Central',
        type: 'ponencia',
        capacity: 400,
        speaker: 'Econ. Patricia del Aguila',
      },
      {
        time: '10:00',
        duration: '2h',
        title: 'Taller: Elaboracion de productos derivados del cacao',
        location: 'Laboratorio de Poscosecha',
        type: 'laboratorio',
        capacity: 25,
      },
      {
        time: '12:00',
        duration: '1h',
        title: 'Almuerzo',
        location: 'Comedor Universitario',
        type: 'cultural',
      },
      {
        time: '13:30',
        duration: '1.5h',
        title: 'Ponencia: Exportacion de productos no tradicionales',
        location: 'Auditorio Central',
        type: 'ponencia',
        capacity: 400,
        speaker: 'Mg. Luis Saavedra Torres',
      },
      {
        time: '15:00',
        duration: '2h',
        title: 'Visita al laboratorio de control de calidad',
        location: 'Laboratorio Agroindustrial - Bloque D',
        type: 'laboratorio',
        capacity: 35,
      },
      {
        time: '17:30',
        duration: '3h',
        title: 'Gran Feria del Emprendedor Amazonico',
        location: 'Pabellon de Ferias + Exteriores',
        type: 'feria',
        capacity: 800,
      },
    ],
  },
  {
    dayName: 'Sabado',
    dayNum: '19',
    month: 'Sep',
    theme: 'Pasantias y Visitas Tecnicas',
    activities: [
      {
        time: '07:00',
        duration: '4h',
        title: 'Visita tecnica: Finca agroforestal certificada',
        location: 'Fundo Agroforestal - Carretera Tarapoto',
        type: 'laboratorio',
        capacity: 60,
      },
      {
        time: '11:30',
        duration: '1h',
        title: 'Almuerzo en campo',
        location: 'Fundo Agroforestal',
        type: 'cultural',
      },
      {
        time: '13:00',
        duration: '3h',
        title: 'Visita tecnica: Planta procesadora de cafe especial',
        location: 'Cooperativa Cafe Peru - Lamas',
        type: 'laboratorio',
        capacity: 60,
      },
      {
        time: '16:30',
        duration: '1h',
        title: 'Retorno al campus',
        location: 'UNSM',
        type: 'cultural',
      },
      {
        time: '18:00',
        duration: '2h',
        title: 'Feria nocturna y concurso gastronomico amazonico',
        location: 'Pabellon de Ferias',
        type: 'feria',
        capacity: 600,
      },
      {
        time: '20:30',
        duration: '2.5h',
        title: 'Noche folklorica: Danzas tipicas de San Martin',
        location: 'Plaza Central UNSM',
        type: 'cultural',
        capacity: 800,
      },
    ],
  },
  {
    dayName: 'Domingo',
    dayNum: '20',
    month: 'Sep',
    theme: 'Clausura y Premiacion',
    activities: [
      {
        time: '09:00',
        duration: '1.5h',
        title: 'Ponencia de cierre: El futuro del agronomo peruano',
        location: 'Auditorio Central',
        type: 'ponencia',
        capacity: 500,
        speaker: 'Dr. Amadeo Perez Villacorta',
      },
      {
        time: '10:30',
        duration: '1h',
        title: 'Premiacion: Mejores ponencias y proyectos',
        location: 'Auditorio Central',
        type: 'ceremonia',
        capacity: 500,
      },
      {
        time: '11:30',
        duration: '1h',
        title: 'Ceremonia de clausura oficial',
        location: 'Auditorio Central',
        type: 'ceremonia',
        capacity: 500,
      },
      {
        time: '13:00',
        duration: '2h',
        title: 'Almuerzo de clausura y despedida',
        location: 'Comedor Universitario',
        type: 'cultural',
        capacity: 400,
      },
      {
        time: '15:00',
        duration: '2h',
        title: 'Feria de cierre: Ultimas ofertas de emprendedores',
        location: 'Pabellon de Ferias',
        type: 'feria',
        capacity: 500,
      },
    ],
  },
];

function drawPageNumber(doc: jsPDF, pageNum: number, totalPages: number) {
  const W = 210;
  doc.setFillColor(...hex(GREEN_DARK));
  doc.rect(0, 287, W, 10, 'F');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(...hex(YELLOW));
  doc.text('XXXII CONAEA 2026  ·  UNSM Tarapoto  ·  #Conaea2026', 15, 293);
  doc.setTextColor(255, 255, 255);
  doc.text(`${pageNum} / ${totalPages}`, W - 15, 293, { align: 'right' });
}

function useSchedulePDF() {
  const generate = () => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });
    const W = 180;
    const ML = 15;
    const PW = 210;

    // ── PAGE 1: COVER ─────────────────────────────────────────

    // Full dark background top band
    doc.setFillColor(...hex(GREEN_DARK));
    doc.rect(0, 0, PW, 60, 'F');

    // Decorative green accent bar
    doc.setFillColor(...hex(GREEN_MAIN));
    doc.rect(0, 58, PW, 3, 'F');

    // Yellow accent line
    doc.setFillColor(...hex(YELLOW));
    doc.rect(ML, 20, 1.5, 28, 'F');

    // Title block
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(28);
    doc.setTextColor(...hex(YELLOW));
    doc.text('XXXII CONAEA', ML + 6, 32);

    doc.setFontSize(16);
    doc.setTextColor(255, 255, 255);
    doc.text('Cronograma Oficial', ML + 6, 42);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(134, 239, 172);
    doc.text(
      '15 — 20 de Septiembre, 2026  ·  Universidad Nacional de San Martin  ·  Tarapoto, Peru',
      ML + 6,
      51,
    );

    // ── LEGEND ────────────────────────────────────────────────
    const ly = 68;
    const lw = W / 5;
    let lx = ML;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(...hex(GREEN_DARK));
    doc.text('TIPOS DE ACTIVIDAD', ML, ly - 4);

    Object.entries(TYPE_LABELS).forEach(([key, label]) => {
      doc.setFillColor(...hex(TYPE_BG[key]));
      doc.roundedRect(lx, ly, lw - 2, 8, 2, 2, 'F');
      // Left color stripe
      doc.setFillColor(...hex(TYPE_TEXT[key]));
      doc.roundedRect(lx, ly, 2, 8, 1, 1, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7);
      doc.setTextColor(...hex(TYPE_TEXT[key]));
      doc.text(label, lx + (lw - 2) / 2 + 1, ly + 5.2, { align: 'center' });
      lx += lw;
    });

    let y = ly + 14;

    // ── DAYS ──────────────────────────────────────────────────
    let pageNum = 1;
    const estimatedPages = 4;

    for (const day of days) {
      if (y > 258) {
        drawPageNumber(doc, pageNum, estimatedPages);
        doc.addPage();
        pageNum++;
        y = 15;
      }

      // Day header band
      doc.setFillColor(...hex(GREEN_MID));
      doc.roundedRect(ML, y, W, 13, 3, 3, 'F');

      // Day number big
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16);
      doc.setTextColor(255, 255, 255);
      doc.text(day.dayNum, ML + 5, y + 9);

      // Month · DayName
      doc.setFontSize(8);
      doc.setTextColor(134, 239, 172);
      doc.text(`${day.month}  ·  ${day.dayName}`, ML + 16, y + 9);

      // Theme right-aligned
      doc.setFontSize(9);
      doc.setTextColor(...hex(YELLOW));
      doc.text(day.theme, ML + W - 4, y + 9, { align: 'right' });

      y += 14;

      // Activities table
      const rows = day.activities.map((act) => [
        `${act.time}\n${act.duration}`,
        TYPE_LABELS[act.type] ?? act.type,
        act.title +
          (act.speaker ? `\n${act.speaker}` : '') +
          `\n${act.location}` +
          (act.capacity ? `  ·  ${act.capacity} cupos` : ''),
      ]);

      autoTable(doc, {
        startY: y,
        margin: { left: ML, right: ML },
        tableWidth: W,
        head: [],
        body: rows,
        columnStyles: {
          0: {
            cellWidth: 16,
            halign: 'center',
            valign: 'middle',
            fontStyle: 'bold',
            fontSize: 8,
            textColor: hex(GREEN_DARK),
            fillColor: hex(GRAY_LIGHT),
          },
          1: {
            cellWidth: 24,
            halign: 'center',
            valign: 'middle',
            fontStyle: 'bold',
            fontSize: 7,
          },
          2: {
            cellWidth: W - 40,
            fontSize: 8,
            textColor: hex(GREEN_DARK),
            valign: 'middle',
          },
        },
        bodyStyles: {
          lineColor: hex(GRAY_BORDER) as unknown as string,
          lineWidth: 0.25,
          fillColor: [255, 255, 255],
          cellPadding: { top: 3.5, bottom: 3.5, left: 4, right: 4 },
          minCellHeight: 10,
        },
        alternateRowStyles: { fillColor: hex(GRAY_LIGHT) },
        didParseCell(data) {
          if (data.column.index === 1 && data.section === 'body') {
            const type = day.activities[data.row.index]?.type ?? '';
            data.cell.styles.fillColor = hex(
              TYPE_BG[type],
            ) as unknown as string;
            data.cell.styles.textColor = hex(
              TYPE_TEXT[type],
            ) as unknown as string;
          }
          // Time column always same bg
          if (data.column.index === 0 && data.section === 'body') {
            data.cell.styles.fillColor = hex(GRAY_LIGHT) as unknown as string;
            data.cell.styles.textColor = hex(GREEN_DARK) as unknown as string;
          }
        },
        didDrawCell(data) {
          // Left accent stripe on type column
          if (data.column.index === 1 && data.section === 'body') {
            const type = day.activities[data.row.index]?.type ?? '';
            doc.setFillColor(...hex(TYPE_TEXT[type]));
            doc.rect(data.cell.x, data.cell.y, 1.5, data.cell.height, 'F');
          }
        },
      });

      y =
        (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable
          .finalY + 6;
    }

    // ── LAST PAGE FOOTER ──────────────────────────────────────
    drawPageNumber(doc, pageNum, estimatedPages);

    // ── FOOTER LINE on all pages (re-draw) ───────────────────
    // Add contact info above footer band
    if (y < 278) {
      doc.setDrawColor(...hex(GRAY_BORDER));
      doc.setLineWidth(0.3);
      doc.line(ML, y + 2, ML + W, y + 2);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7);
      doc.setTextColor(156, 163, 175);
      doc.text(
        'Organizacion: Grupo Clave — Facultad de Ciencias Agrarias, UNSM  ·  Tel: 918 689 799',
        ML + W / 2,
        y + 7,
        { align: 'center' },
      );
    }

    doc.save('Cronograma_CONAEA_2026.pdf');
  };

  return { generate };
}

const GeneratedPDF = () => {
  const { generate } = useSchedulePDF();

  return (
    <button
      onClick={generate}
      className='inline-flex items-center gap-2  bg-white border hover:bg-slate-50 text-black text-sm font-black px-4 py-2.5 rounded-sm transition-colors shadow-sm cursor-pointer'
    >
      <Download className='size-4' />
    </button>
  );
};

export default GeneratedPDF;
