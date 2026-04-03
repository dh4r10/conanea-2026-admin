import { X } from 'lucide-react';
import { useEffect, useState } from 'react';

const Pet = () => {
  const [visible, setVisible] = useState(false);
  const [bubbleVisible, setBubbleVisible] = useState(false);
  const [closedManually, setClosedManually] = useState(false);
  const [scrolledAway, setScrolledAway] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 300);
    const t2 = setTimeout(() => setBubbleVisible(true), 800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const threshold = window.innerHeight * 0.15;
      const currentScrollY = window.scrollY;
      const isAway = currentScrollY > threshold;
      const isScrollingUp = currentScrollY < lastScrollY;

      setScrolledAway(isAway);

      // Solo reaparece si vuelve al hero Y está scrolleando hacia arriba
      // Y si fue cerrado manualmente, solo se resetea si hace scroll hacia arriba
      if (!isAway && isScrollingUp) {
        setClosedManually(false);
        setVisible(true);
        setBubbleVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClose = () => {
    setClosedManually(true);
    setBubbleVisible(false);
    setVisible(false);
  };

  const isShown = visible && !scrolledAway && !closedManually;

  return (
    <div
      className='fixed bottom-0 right-6 z-50 flex flex-col items-end gap-2 lg:flex-col lg:items-end'
      style={{
        transform: isShown ? 'translateY(0)' : 'translateY(120%)',
        transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
        pointerEvents: isShown ? 'auto' : 'none',
      }}
    >
      {/* En mobile: fila con globo izquierda + imagen derecha */}
      {/* En sm+: columna con globo arriba + imagen abajo */}
      <div className='flex flex-row items-start gap-2 lg:flex-col lg:items-end'>
        {/* Globo de diálogo */}
        <div
          className='relative bg-white rounded-2xl shadow-xl px-5 py-4 max-w-48 lg:max-w-65 border border-gray-100'
          style={{
            opacity: bubbleVisible && isShown ? 1 : 0,
            transform: bubbleVisible && isShown ? 'scale(1)' : 'scale(0.8)',
            transformOrigin: 'bottom right',
            transition:
              'opacity 0.4s ease, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        >
          <button
            onClick={handleClose}
            className='absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors'
            aria-label='Cerrar'
          >
            <X className='w-3.5 h-3.5' />
          </button>

          <p className='text-xs lg:text-sm text-gray-700 leading-snug pr-3'>
            👋 ¡Hola! Bienvenido a la página oficial de{' '}
            <span className='font-bold text-green-700'>CONAEA 2026</span> 🌿
          </p>

          {/* Flecha: apunta a la derecha en mobile, abajo en sm+ */}
          <div
            className='absolute lg:hidden -right-2 bottom-4 w-4 h-4 bg-white border-r border-b border-gray-100'
            style={{ transform: 'rotate(-45deg)' }}
          />
          <div
            className='hidden lg:block absolute -bottom-2 right-8 w-4 h-4 bg-white border-r border-b border-gray-100'
            style={{ transform: 'rotate(45deg)' }}
          />
        </div>

        {/* Imagen botarga */}
        <img
          src='/img/botarga.webp'
          alt='Mascota CONAEA'
          className='w-28 md:w-32 lg:w-36 object-contain drop-shadow-xl select-none shrink-0'
          draggable={false}
        />
      </div>
    </div>
  );
};

export default Pet;
