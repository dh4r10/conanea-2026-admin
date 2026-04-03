const authorities = [
  {
    img: '/img/autoridades/1.webp',
    name: 'Dr. Ricardo Raúl Layza Castañeda',
    role: 'Rector',
    period: '2025 — 2030',
    highlight: true,
  },
  {
    img: '/img/autoridades/2.webp',
    name: 'Dr. Marco Armando Gálvez Díaz',
    role: 'Vicerrector Académico',
    period: '2025 — 2030',
    highlight: false,
  },
  {
    img: '/img/autoridades/3.webp',
    name: 'Dra. Dahpne Viena Oliveira',
    role: 'Vicerrectora de Investigación',
    period: '2025 — 2030',
    highlight: false,
  },
];

const Authorities = () => {
  return (
    <>
      {/* ── Fondo decorativo (igual que Identity) ── */}
      <div
        className='absolute inset-0 opacity-10'
        style={{
          backgroundImage: `radial-gradient(circle at 15% 50%, #4ade80 0%, transparent 50%),
                            radial-gradient(circle at 85% 20%, #fbba0e 0%, transparent 40%),
                            radial-gradient(circle at 55% 85%, #166534 0%, transparent 50%)`,
        }}
      />
      <div
        className='absolute inset-0 opacity-5'
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234ade80' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className='relative mx-auto'>
        {/* ── Header ── */}
        <div className='mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4'>
          <div>
            <div className='flex items-center gap-3 mb-3'>
              <div className='w-8 h-px bg-[#fbba0e]' />
              <p className='text-xs font-bold tracking-[0.3em] uppercase text-[#fbba0e]'>
                UNSM · Tarapoto
              </p>
            </div>
            <h2 className='text-4xl sm:text-5xl font-black text-white leading-tight'>
              Autoridades
              <br />
              <span
                className='text-transparent'
                style={{ WebkitTextStroke: '1.5px #4ade80' }}
              >
                Universitarias
              </span>
            </h2>
          </div>
          <p className='text-green-300/70 text-sm sm:text-base leading-relaxed max-w-sm sm:text-right'>
            Gestión 2025 — 2030 de la Universidad Nacional de San Martín.
          </p>
        </div>

        {/* ── Cards ── */}
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-5'>
          {authorities.map((auth) => (
            <div
              key={auth.name}
              className='group relative rounded-2xl overflow-hidden cursor-pointer'
              style={{ isolation: 'isolate' }}
            >
              {/* Foto */}
              <div className='relative aspect-3/4 sm:aspect-3/4 w-full overflow-hidden max-h-96 sm:max-h-none'>
                <img
                  src={auth.img}
                  alt={auth.name}
                  loading='lazy'
                  onLoad={(e) => e.currentTarget.classList.remove('opacity-0')}
                  className='w-full h-full object-cover object-top transition-all duration-700 group-hover:scale-105 opacity-0'
                />

                {/* Overlay base */}
                <div className='absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent' />
                {/* Overlay hover */}
                <div className='absolute inset-0 bg-green-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500' />

                {/* Líneas decorativas animadas — esquina superior izquierda */}
                <div className='absolute top-4 left-4 w-0 h-0.5 bg-[#fbba0e] group-hover:w-12 transition-all duration-500 delay-100' />
                <div className='absolute top-4 left-4 w-0.5 h-0 bg-[#fbba0e] group-hover:h-12 transition-all duration-500 delay-100' />
                {/* Líneas decorativas animadas — esquina inferior derecha */}
                <div
                  className='absolute bottom-4 right-4 w-0 h-0.5 bg-[#fbba0e] group-hover:w-12 transition-all duration-500 delay-100'
                  style={{ transformOrigin: 'right' }}
                />
                <div
                  className='absolute bottom-4 right-4 w-0.5 h-0 bg-[#fbba0e] group-hover:h-12 transition-all duration-500 delay-100'
                  style={{ transformOrigin: 'bottom' }}
                />

                {/* Número decorativo */}
                <div className='absolute top-3 right-4 text-white/10 font-black text-6xl select-none group-hover:text-white/20 transition-colors duration-500'>
                  {String(authorities.indexOf(auth) + 1).padStart(2, '0')}
                </div>

                {/* Info en la parte inferior */}
                <div className='absolute bottom-0 left-0 right-0 p-5 translate-y-1 group-hover:translate-y-0 transition-transform duration-500'>
                  {/* Cargo */}
                  <span
                    className={[
                      'inline-flex items-center gap-1.5 text-xs font-black px-3 py-1 rounded-full mb-2 uppercase tracking-wider',
                      auth.highlight
                        ? 'bg-[#fbba0e] text-black'
                        : 'bg-green-500/90 text-white',
                    ].join(' ')}
                  >
                    <span
                      className={[
                        'w-1.5 h-1.5 rounded-full',
                        auth.highlight ? 'bg-black' : 'bg-white',
                      ].join(' ')}
                    />
                    {auth.role}
                  </span>

                  {/* Nombre */}
                  <p className='text-white text-base font-black leading-tight'>
                    {auth.name}
                  </p>

                  {/* Periodo — aparece en hover */}
                  <p className='text-white/50 text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150 flex items-center gap-1.5'>
                    <span className='w-4 h-px bg-[#fbba0e] inline-block' />
                    Período {auth.period}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Footer decorativo ── */}
        <div className='mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 w-full'>
          <div className='flex flex-wrap items-center gap-4 sm:gap-6 justify-center md:justify-start'>
            {['Rectorado', 'Académico', 'Investigación', 'UNSM'].map((tag) => (
              <span
                key={tag}
                className='text-green-400/50 text-xs font-medium tracking-widest uppercase hover:text-green-400 transition-colors cursor-default'
              >
                {tag}
              </span>
            ))}
          </div>
          <div className='flex justify-center md:justify-end w-full sm:w-auto'>
            <div className='flex items-center gap-2'>
              <div className='w-16 h-px bg-green-800' />
              <span className=' text-green-600 text-xs font-bold tracking-widest'>
                2025 — 2030
              </span>
              <div className='w-16 h-px bg-green-800' />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Authorities;
