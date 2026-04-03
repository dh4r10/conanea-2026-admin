import {
  Instagram,
  Facebook,
  Globe,
  Twitter,
  Youtube,
  Mail,
  Phone,
} from 'lucide-react';

interface SocialLink {
  type:
    | 'instagram'
    | 'facebook'
    | 'web'
    | 'twitter'
    | 'youtube'
    | 'email'
    | 'cellphone';
  url: string;
}

interface Organizer {
  logo: string;
  name: string;
  description: string;
  socials: SocialLink[];
}

const organizador: Organizer = {
  logo: '/img/clave.webp',
  name: 'Grupo Clave',
  description:
    'Organización estudiantil de la Facultad de Ciencias Agrarias de la Universidad Nacional de San Martín, comprometida con el desarrollo académico, científico y cultural de los estudiantes de agronomía del Perú.',
  socials: [
    {
      type: 'facebook',
      url: 'https://www.facebook.com/profile.php?id=61578098331254',
    },
    { type: 'email', url: 'clave.fca.unsm@gmail.com' },
    { type: 'cellphone', url: '+51 918 689 799' },
  ],
};

const coOrganizador: Organizer = {
  logo: '/img/unsm.webp',
  name: 'Universidad Nacional de San Martín',
  description:
    'La Universidad Nacional de San Martín (UNSM), con sede principal en Tarapoto, es la institución pública de educación superior líder en la región. Destaca por su compromiso con la excelencia académica, la investigación científica y el desarrollo sostenible de la Amazonía peruana. Su misión fundamental es formar profesionales éticos y competitivos que impulsen el progreso socioeconómico del país.',
  socials: [
    { type: 'web', url: 'https://unsm.edu.pe' },
    { type: 'facebook', url: 'https://www.facebook.com/unsmperu' },
    { type: 'instagram', url: 'https://www.instagram.com/unsmperu/' },
  ],
};

const socialIcon = (type: SocialLink['type']) => {
  const cls = 'w-5 h-5';
  switch (type) {
    case 'instagram':
      return <Instagram className={cls} />;
    case 'facebook':
      return <Facebook className={cls} />;
    case 'web':
      return <Globe className={cls} />;
    case 'twitter':
      return <Twitter className={cls} />;
    case 'youtube':
      return <Youtube className={cls} />;
    case 'email':
      return <Mail className={cls} />;
    case 'cellphone':
      return <Phone className={cls} />;
  }
};

const socialLabel = (type: SocialLink['type'], url: string) => {
  switch (type) {
    case 'instagram':
      return 'Instagram';
    case 'facebook':
      return 'Facebook';
    case 'web':
      return 'Sitio web';
    case 'twitter':
      return 'Twitter / X';
    case 'youtube':
      return 'YouTube';
    case 'email':
      return url; // 👈 muestra el email directamente
    case 'cellphone':
      return url; // 👈 muestra el número directamente
  }
};

const socialHref = (type: SocialLink['type'], url: string) => {
  if (type === 'email') return `mailto:${url}`;
  if (type === 'cellphone') return `tel:${url.replace(/\s/g, '')}`;
  return url;
};

// --- Card grande reutilizable ---
interface OrgCardProps {
  org: Organizer;
  badge: string;
  accent: string; // color del badge
  flip?: boolean; // logo a la derecha en desktop
}

const OrgCard = ({ org, badge, accent, flip = false }: OrgCardProps) => (
  <div
    className={[
      'flex flex-col gap-8 sm:gap-10 items-center',
      flip ? 'lg:flex-row-reverse' : 'lg:flex-row',
    ].join(' ')}
  >
    {/* Logo */}
    <div className='shrink-0 flex flex-col items-center gap-4'>
      <div className='w-40 h-40 sm:w-52 sm:h-52 lg:w-64 lg:h-64 rounded-3xl bg-white shadow-2xl shadow-black/10 flex items-center justify-center p-4 sm:p-6 border border-gray-100'>
        <img
          src={org.logo}
          alt={org.name}
          className='w-full h-full object-contain'
        />
      </div>

      <span
        className={[
          'text-[10px] sm:text-xs font-black px-3 sm:px-4 py-1.5 rounded-full uppercase tracking-widest text-center',
          accent,
        ].join(' ')}
      >
        {badge}
      </span>
    </div>

    {/* Contenido */}
    <div className='flex flex-col gap-5 sm:gap-6 max-w-xl text-center lg:text-left'>
      <div>
        <div className='w-10 h-1 bg-[#fbba0e] rounded-full mb-4 mx-auto lg:mx-0' />
        <h2 className='text-2xl sm:text-3xl lg:text-5xl font-black text-gray-900 leading-tight'>
          {org.name}
        </h2>
      </div>

      <p className='text-gray-500 text-sm sm:text-base lg:text-lg leading-relaxed'>
        {org.description}
      </p>

      <div className='flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-3'>
        {org.socials.map((social) => (
          <a
            key={social.type}
            href={socialHref(social.type, social.url)}
            target={
              social.type === 'email' || social.type === 'cellphone'
                ? '_self'
                : '_blank'
            }
            rel='noopener noreferrer'
            className='inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl border border-gray-200 text-gray-500 text-xs sm:text-sm font-medium hover:border-green-500 hover:text-green-700 hover:bg-green-50 transition-all duration-200'
          >
            {socialIcon(social.type)}
            <span className='truncate max-w-[120px] sm:max-w-none'>
              {socialLabel(social.type, social.url)}
            </span>
          </a>
        ))}
      </div>
    </div>
  </div>
);

// --- Divisor decorativo ---
const Divider = () => (
  <div className='flex items-center gap-4 my-4'>
    <div className='flex-1 h-px bg-gray-100' />
    <div className='flex items-center gap-1.5'>
      <div className='w-1.5 h-1.5 rounded-full bg-[#fbba0e]' />
      <div className='w-1.5 h-1.5 rounded-full bg-green-400' />
      <div className='w-1.5 h-1.5 rounded-full bg-[#fbba0e]' />
    </div>
    <div className='flex-1 h-px bg-gray-100' />
  </div>
);

// --- Página ---
interface HomeProps {
  header: React.ReactNode;
  footer: React.ReactNode;
}

const Organizers = ({ header, footer }: HomeProps) => {
  return (
    <>
      {header}

      <main className='min-h-screen bg-white pt-10'>
        {/* Hero banner */}
        <div className='bg-[#0a1a0f] relative overflow-hidden'>
          {/* Fondo decorativo */}
          <div
            className='absolute inset-0 opacity-10'
            style={{
              backgroundImage: `radial-gradient(circle at 20% 60%, #4ade80 0%, transparent 50%),
                        radial-gradient(circle at 80% 30%, #fbba0e 0%, transparent 40%)`,
            }}
          />

          <div className='relative px-4 sm:px-6 lg:px-8 xl:px-32 py-20 sm:py-28 flex items-center justify-between gap-12'>
            {/* Texto — izquierda */}
            <div className='flex-1'>
              <div className='flex items-center gap-3 mb-4'>
                <div className='w-8 h-px bg-[#fbba0e]' />
                <p className='text-xs font-bold tracking-[0.3em] uppercase text-[#fbba0e]'>
                  CONAEA 2026 · San Martín
                </p>
              </div>
              <h1 className='text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-tight'>
                Quiénes nos
                <br />
                <span
                  className='text-transparent'
                  style={{ WebkitTextStroke: '2px #4ade80' }}
                >
                  organizan
                </span>
              </h1>
              <p className='mt-5 text-white text-base sm:text-lg max-w-xl leading-relaxed'>
                Conoce a las instituciones que hacen posible el XXXII Congreso
                Nacional de Estudiantes de Agronomía.
              </p>
            </div>

            {/* Elemento decorativo — derecha, solo en sm+ */}
            <div className='hidden lg:flex shrink-0 items-center justify-center relative w-72 h-72'>
              {/* Anillos concéntricos */}
              <div className='absolute w-72 h-72 rounded-full border border-white/5' />
              <div className='absolute w-56 h-56 rounded-full border border-white/10' />
              <div className='absolute w-40 h-40 rounded-full border border-[#fbba0e]/20' />

              {/* Logo central */}
              <div className='relative w-28 h-28 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center p-4 backdrop-blur-sm'>
                <img
                  src='/img/clave.webp'
                  alt='Grupo Clave'
                  className='w-full h-full object-contain opacity-80'
                />
              </div>

              {/* Satélite — UNSM */}
              <div className='absolute top-4 right-4 w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center p-2 backdrop-blur-sm'>
                <img
                  src='/img/unsm.webp'
                  alt='UNSM'
                  className='w-full h-full object-contain opacity-70'
                />
              </div>

              {/* Puntos orbitales decorativos */}
              <div className='absolute top-1/2 left-0 w-2 h-2 rounded-full bg-[#fbba0e]/60 -translate-y-1/2' />
              <div className='absolute bottom-8 left-8 w-1.5 h-1.5 rounded-full bg-green-400/60' />
              <div className='absolute top-8 left-12 w-1 h-1 rounded-full bg-white/30' />
            </div>
          </div>
        </div>

        {/* Contenido */}
        <div className='px-4 sm:px-6 lg:px-8 xl:px-32 py-20 flex flex-col gap-20'>
          {/* Organizador */}
          <OrgCard
            org={organizador}
            badge='Organizador principal'
            accent='bg-[#fbba0e] text-black'
          />

          <Divider />

          {/* Co-organizador */}
          <OrgCard
            org={coOrganizador}
            badge='Co-organizador'
            accent='bg-green-100 text-green-800'
            flip
          />
        </div>
      </main>

      {footer}
    </>
  );
};

export default Organizers;
