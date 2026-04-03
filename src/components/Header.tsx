import {
  NavigationMenu,
  // NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  // NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { useState } from 'react';
import { Link } from 'react-router-dom';

// const menuItems = [
// {
//   label: 'Cronograma',
//   items: [
//     {
//       title: 'Agenda',
//       description: 'Programa completo del congreso',
//       to: '/schedule',
//     },
//     {
//       title: 'Sedes',
//       description: 'Ubicaciones y espacios del evento',
//       to: '/schedule/venues',
//     },
//   ],
// },
// {
//   label: 'Participantes',
//   items: [
//     {
//       title: 'Emprendedores',
//       description: 'Stands y catálogo',
//       to: '/participants/entrepreneurs',
//     },
//     {
//       title: 'Ponentes',
//       description: 'Galería',
//       to: '/participants/speakers',
//     },
//   ],
// },
// {
//   label: 'Visitante',
//   items: [
//     {
//       title: 'Turismo',
//       description: 'Lugares de interés en la región',
//       to: '/visitor/tourism',
//     },
//     {
//       title: 'Hoteles',
//       description: 'Guía de alojamiento',
//       to: '/visitor/hotels',
//     },
//     {
//       title: 'Restaurantes',
//       description: 'Opciones gastronómicas',
//       to: '/visitor/restaurants',
//     },
//   ],
// },
// ];

// const linkClass = [
//   'block select-none rounded-md p-3 leading-none no-underline',
//   'outline-none transition-colors hover:bg-green-50 hover:text-green-700',
//   'focus:bg-green-50 focus:text-green-700 group',
// ].join(' ');

// const linkTitleClass = [
//   'text-sm font-semibold text-gray-900 mb-0.5',
//   'group-hover:text-green-700',
// ].join(' ');

// const linkDescClass = [
//   'text-xs leading-snug text-gray-500',
//   'group-hover:text-green-600',
// ].join(' ');

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className='fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm'>
      <div className='mx-auto px-4 sm:px-6 lg:px-8 xl:px-32'>
        <div className='flex items-center justify-between h-16'>
          {/* Logo */}
          <Link to='/' className='flex items-center gap-3 shrink-0'>
            <img
              src='/img/logo.webp'
              alt='Logo CONAEA 2026'
              className='h-9 w-auto object-contain'
              draggable={false}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className='hidden lg:flex items-center'>
            <NavigationMenu>
              <NavigationMenuList className='gap-0'>
                {/* Inicio */}
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      to='/'
                      className='text-sm font-medium text-gray-700 hover:text-green-700 hover:bg-green-50 transition-colors px-3 py-2 rounded-md inline-block'
                    >
                      Inicio
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      to='/cronograma'
                      className='text-sm font-medium text-gray-700 hover:text-green-700 hover:bg-green-50 transition-colors px-3 py-2 rounded-md inline-block'
                    >
                      Cronograma
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                {/* Menús con dropdown */}
                {/* {menuItems.map((menu) => (
                  <NavigationMenuItem key={menu.label}>
                    <NavigationMenuTrigger className='text-sm font-medium text-gray-700 hover:text-green-700 bg-transparent hover:bg-green-50 data-[state=open]:bg-green-50 data-[state=open]:text-green-700 transition-colors px-3 py-2 rounded-md'>
                      {menu.label}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className='grid w-[420px] gap-1 p-3 grid-cols-2'>
                        {menu.items.map((item) => (
                          <li key={item.title}>
                            <NavigationMenuLink asChild>
                              <Link to={item.to} className={linkClass}>
                                <div className={linkTitleClass}>
                                  {item.title}
                                </div>
                                <p className={linkDescClass}>
                                  {item.description}
                                </p>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ))} */}

                {/* Pasantias */}
                {/* <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      to='/pasantias'
                      className='text-sm font-medium text-gray-700 hover:text-green-700 hover:bg-green-50 transition-colors px-3 py-2 rounded-md inline-block'
                    >
                      Pasantías
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem> */}

                {/* Organizadores */}
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      to='/organizadores'
                      className='text-sm font-medium text-gray-700 hover:text-green-700 hover:bg-green-50 transition-colors px-3 py-2 rounded-md inline-block'
                    >
                      Organizadores
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {/* Actions */}
          <div className='flex items-center gap-2'>
            <a
              onClick={() =>
                window.scrollTo({
                  top: document.body.scrollHeight,
                  behavior: 'smooth',
                })
              }
              className='hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-[#fbba0e] hover:text-[#edb210] transition-colors px-3 py-1.5 cursor-pointer'
            >
              Contacto
            </a>
            <Link
              to='/participantes/inscripcion'
              className='inline-flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors shadow-sm cursor-pointer'
            >
              Inscribirme
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className='lg:hidden ml-1 p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors'
              aria-label='Abrir menú'
            >
              <svg
                className='w-5 h-5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                {mobileOpen ? (
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                ) : (
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M4 6h16M4 12h16M4 18h16'
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className='lg:hidden border-t border-gray-100 bg-white max-h-[70vh] overflow-y-auto'>
          <div className='px-4 py-3 space-y-1'>
            <Link
              to='/'
              className='block px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors'
              onClick={() => setMobileOpen(false)}
            >
              Inicio
            </Link>

            {/* {menuItems.map((menu) => (
              <div key={menu.label}>
                <p className='text-xs font-bold text-green-700 uppercase tracking-wider px-2 pt-3 pb-1'>
                  {menu.label}
                </p>
                {menu.items.map((item) => (
                  <Link
                    key={item.title}
                    to={item.to}
                    className='block px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors'
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            ))} */}

            <Link
              to='/cronograma'
              className='block px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors'
              onClick={() => setMobileOpen(false)}
            >
              Cronograma
            </Link>

            <Link
              to='/organizadores'
              className='block px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors'
              onClick={() => setMobileOpen(false)}
            >
              Organizadores
            </Link>

            <div className='pt-3 pb-2 border-t border-gray-100 mt-2'>
              <a
                onClick={() => {
                  window.scrollTo({
                    top: document.body.scrollHeight,
                    behavior: 'smooth',
                  });
                  setMobileOpen(false);
                }}
                className='block px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-green-50'
              >
                Contacto
              </a>
              <Link
                to='/participantes/inscripcion'
                className='block px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-green-50'
                onClick={() => setMobileOpen(false)}
              >
                Inscribirme
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
