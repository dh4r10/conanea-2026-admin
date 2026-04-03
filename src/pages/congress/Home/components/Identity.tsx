const Identity = () => {
  return (
    <>
      {/* Fondo decorativo */}
      <div
        className='absolute inset-0 opacity-10'
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, #4ade80 0%, transparent 50%),
                        radial-gradient(circle at 80% 20%, #fbba0e 0%, transparent 40%),
                        radial-gradient(circle at 60% 80%, #166534 0%, transparent 50%)`,
        }}
      />
      <div
        className='absolute inset-0 opacity-5'
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234ade80' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className='relative mx-auto'>
        {/* Header */}
        <div className='mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4'>
          <div>
            <div className='flex items-center gap-3 mb-3'>
              <div className='w-8 h-px bg-[#fbba0e]' />
              <p className='text-xs font-bold tracking-[0.3em] uppercase text-[#fbba0e]'>
                San Martín · Amazonía Peruana
              </p>
            </div>
            <h2 className='text-4xl sm:text-5xl font-black text-white leading-tight'>
              Identidad
              <br />
              <span
                className='text-transparent'
                style={{ WebkitTextStroke: '1.5px #4ade80' }}
              >
                Amazónica
              </span>
            </h2>
          </div>
          <p className='text-green-300/70 text-sm sm:text-base leading-relaxed max-w-sm sm:text-right'>
            Ciencia, territorio y juventud amazónica unidos por un mismo
            propósito.
          </p>
        </div>

        {/* Collage grid */}
        <div className='flex flex-col sm:grid sm:grid-cols-12 sm:grid-rows-2 gap-3 sm:h-150'>
          {/* Foto 3 — hero grande izquierda */}
          <div
            className='h-72 sm:h-auto sm:col-span-5 sm:row-span-2 relative rounded-2xl overflow-hidden group cursor-pointer'
            style={{ isolation: 'isolate' }}
          >
            <img
              src='/img/identidad/3.webp'
              alt='Expo Amazónica'
              className='w-full h-full object-cover transition-all duration-700 group-hover:scale-105'
              loading='lazy'
              onLoad={(e) => e.currentTarget.classList.remove('opacity-0')}
            />
            {/* Overlay base */}
            <div className='absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent' />
            {/* Overlay hover */}
            <div className='absolute inset-0 bg-green-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500' />

            {/* Línea decorativa animada */}
            <div className='absolute top-4 left-4 w-0 h-0.5 bg-[#fbba0e] group-hover:w-16 transition-all duration-500 delay-100' />
            <div className='absolute top-4 left-4 w-0.5 h-0 bg-[#fbba0e] group-hover:h-16 transition-all duration-500 delay-100' />
            <div
              className='absolute bottom-4 right-4 w-0 h-0.5 bg-[#fbba0e] group-hover:w-16 transition-all duration-500 delay-100'
              style={{ transformOrigin: 'right' }}
            />
            <div
              className='absolute bottom-4 right-4 w-0.5 h-0 bg-[#fbba0e] group-hover:h-16 transition-all duration-500 delay-100'
              style={{ transformOrigin: 'bottom' }}
            />

            <div className='absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500'>
              <span className='inline-flex items-center gap-1.5 bg-[#fbba0e] text-black text-xs font-black px-3 py-1 rounded-full mb-3 uppercase tracking-wider'>
                <span className='w-1.5 h-1.5 bg-black rounded-full' />
                Territorio
              </span>
              <p className='text-white text-lg font-black leading-tight'>
                Vivencias amazónicas
              </p>
              <p className='text-white/60 text-sm mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150'>
                Trabajo en zonas rurales
              </p>
            </div>

            {/* Número decorativo */}
            <div className='absolute top-3 right-4 text-white/10 font-black text-6xl select-none group-hover:text-white/20 transition-colors duration-500'>
              01
            </div>
          </div>

          {/* Foto 2 — panel académico top derecha */}
          <div
            className='h-52 sm:h-auto sm:col-span-7 sm:row-span-1 relative rounded-2xl overflow-hidden group cursor-pointer'
            style={{ isolation: 'isolate' }}
          >
            <img
              src='/img/identidad/2.webp'
              alt='Panel académico'
              className='w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-105'
              loading='lazy'
              onLoad={(e) => e.currentTarget.classList.remove('opacity-0')}
            />
            <div className='absolute inset-0 bg-linear-to-r from-black/70 via-black/30 to-transparent' />
            <div className='absolute inset-0 bg-emerald-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500' />

            <div className='absolute inset-0 flex items-start p-6'>
              <div className='translate-x-0 group-hover:translate-x-1 transition-transform duration-500'>
                <span className='inline-flex items-center gap-1.5 bg-green-500/90 text-white text-xs font-black px-3 py-1 rounded-full mb-2 uppercase tracking-wider text-[10px]'>
                  <span className='w-1 h-1 bg-white rounded-full ' />
                  Ciencia
                </span>
                <p className='text-white text-xs font-black leading-tight max-w-50'>
                  Investigación en campo
                </p>
                <p className='text-white/50 text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100'>
                  Grupo Clave · UNSM
                </p>
              </div>
            </div>

            {/* Número decorativo */}
            <div className='absolute top-3 right-4 text-white/10 font-black text-6xl select-none group-hover:text-white/20 transition-colors duration-500'>
              02
            </div>
          </div>

          {/* Fila inferior derecha — dos fotos */}
          <div className='sm:col-span-7 sm:row-span-1 grid grid-cols-2 gap-3 h-44 sm:h-auto'>
            {/* Foto 4 — microscopio */}
            <div
              className='relative rounded-2xl overflow-hidden group cursor-pointer'
              style={{ isolation: 'isolate' }}
            >
              <img
                src='/img/identidad/4.webp'
                alt='Ciencia aplicada'
                className='w-full h-full object-cover transition-all duration-700 group-hover:scale-105'
                loading='lazy'
                onLoad={(e) => e.currentTarget.classList.remove('opacity-0')}
              />
              <div className='absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent' />
              <div className='absolute inset-0 bg-emerald-800/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500' />

              <div className='absolute bottom-0 left-0 right-0 p-4'>
                <span className='inline-flex items-center gap-1 bg-emerald-500/90 text-white text-[10px] font-black px-2 py-0.5 rounded-full mb-1.5 uppercase tracking-wider'>
                  Académico
                </span>
                <p className='text-white text-xs font-bold leading-snug'>
                  Debate y liderazgo estudiantil
                </p>
              </div>

              <div className='absolute top-3 right-3 text-white/10 font-black text-4xl select-none group-hover:text-white/20 transition-colors duration-500'>
                03
              </div>
            </div>

            {/* Foto 1 — campo */}
            <div
              className='relative rounded-2xl overflow-hidden group cursor-pointer'
              style={{ isolation: 'isolate' }}
            >
              <img
                src='/img/identidad/1.webp'
                alt='Trabajo de campo'
                className='w-full h-full object-cover object-top transition-all duration-700 group-hover:scale-105'
                loading='lazy'
                onLoad={(e) => e.currentTarget.classList.remove('opacity-0')}
              />
              <div className='absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent' />
              <div className='absolute inset-0 bg-yellow-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500' />

              <div className='absolute bottom-0 left-0 right-0 p-4'>
                <span className='inline-flex items-center gap-1 bg-[#fbba0e]/90 text-black text-[10px] font-black px-2 py-0.5 rounded-full mb-1.5 uppercase tracking-wider'>
                  Participación
                </span>
                <p className='text-white text-xs font-bold leading-snug'>
                  Expo amazónica
                </p>
              </div>

              <div className='absolute top-3 right-3 text-white/10 font-black text-4xl select-none group-hover:text-white/20 transition-colors duration-500'>
                04
              </div>
            </div>
          </div>
        </div>

        {/* Footer decorativo */}
        <div className='mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 w-full'>
          <div className='flex flex-wrap items-center gap-4 sm:gap-6 justify-center md:justify-start'>
            {['Participación', 'Ciencia', 'Territorio', 'Liderazgo'].map(
              (tag) => (
                <span
                  key={tag}
                  className='text-green-400/50 text-xs font-medium tracking-widest uppercase hover:text-green-400 transition-colors cursor-default'
                >
                  {tag}
                </span>
              ),
            )}
          </div>
          <div className='flex justify-center md:justify-end w-full sm:w-auto'>
            <div className='flex items-center gap-2'>
              <div className='w-16 h-px bg-green-800' />
              <span className=' text-green-600 text-xs font-bold tracking-widest'>
                2025 — 2026
              </span>
              <div className='w-16 h-px bg-green-800' />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Identity;
