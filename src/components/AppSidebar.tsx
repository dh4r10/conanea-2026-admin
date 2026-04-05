import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';

import {
  LayoutDashboard,
  Settings,
  LogOut,
  // User,
  PanelBottomOpen,
  CalendarDays,
  Brackets,
  Mic2,
  ActivityIcon,
  DollarSign,
  ChartSpline,
  Ticket,
  University,
} from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Link } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';

export function AppSidebar() {
  const { user, logout } = useAuthStore();

  const formatName = (first: string, surname: string) => {
    const firstName = first.trim().split(' ')[0]; // solo el primer nombre
    const capitalize = (s: string) =>
      s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
    return `${capitalize(firstName)} ${capitalize(surname)}`;
  };

  const displayName = user
    ? formatName(user.first_name ?? '', user.paternal_surname ?? '')
    : '';

  const displayUsername = user?.username ?? '';

  const userFormated = {
    name: displayName,
    username: displayUsername,
    avatar: '', // URL si tienes
  };

  return (
    <Sidebar>
      {/* HEADER */}
      <SidebarHeader className='flex flex-col items-center  gap-1 py-4 bg-[#111] border-b border-white/10'>
        <img
          src='/img/logo_sin_fondo.webp'
          alt='SIGEPO'
          className='w-36 px-2'
        />
      </SidebarHeader>

      {/* CONTENT */}
      <SidebarContent className='px-2 bg-[#111] text-slate-200'>
        <SidebarGroup>
          <SidebarGroupLabel className=' text-[#fbba0e]'>
            General
          </SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <Link to='/'>
                <SidebarMenuButton className='cursor-pointer hover:bg-[#fbba0e]/90 transition'>
                  <LayoutDashboard className='w-4 h-4' />
                  <span>Inicio</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className=' text-[#fbba0e]'>
            Cronograma
          </SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <Link to='/activity'>
                <SidebarMenuButton className='cursor-pointer hover:bg-[#fbba0e]/90 transition'>
                  <ActivityIcon className='w-4 h-4' />
                  <span>Actividades</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <Link to='/activity-type'>
                <SidebarMenuButton className='cursor-pointer hover:bg-[#fbba0e]/90 transition'>
                  <Brackets className='w-4 h-4' />
                  <span>Tipo de Actividad</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <Link to='/day'>
                <SidebarMenuButton className='cursor-pointer hover:bg-[#fbba0e]/90 transition'>
                  <CalendarDays className='w-4 h-4' />

                  <span>Días</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className=' text-[#fbba0e]'>
            Participantes
          </SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <Link to='/speaker'>
                <SidebarMenuButton className='cursor-pointer hover:bg-[#fbba0e]/90 transition'>
                  <Mic2 className='w-4 h-4' />
                  <span>Speakers</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className=' text-[#fbba0e]'>
            Registro
          </SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <Link to='/available-slot'>
                <SidebarMenuButton className='cursor-pointer hover:bg-[#fbba0e]/90 transition'>
                  <Ticket className='w-4 h-4' />
                  <span>Cupos</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link to='/pre-sale'>
                <SidebarMenuButton className='cursor-pointer hover:bg-[#fbba0e]/90 transition'>
                  <ChartSpline className='w-4 h-4' />
                  <span>Pre-venta</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <Link to='/quota-type'>
                <SidebarMenuButton className='cursor-pointer hover:bg-[#fbba0e]/90 transition'>
                  <DollarSign className='w-4 h-4' />
                  <span>Tipos de Cuota</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className=' text-[#fbba0e]'>
            Académico
          </SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <Link to='/partner-university'>
                <SidebarMenuButton className='cursor-pointer hover:bg-[#fbba0e]/90 transition'>
                  <University className='w-4 h-4' />
                  <span>Universidades</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* FOOTER PRO */}
      <SidebarFooter className='p-3 border-t border-white/10 bg-[#111]'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className='flex items-center justify-between cursor-pointer rounded-xl p-2 hover:bg-[#111]'>
              <div className='flex items-center gap-3'>
                <Avatar className='w-9 h-9'>
                  <AvatarImage src={userFormated.avatar} />
                  <AvatarFallback className='bg-[#fbba0e] text-black'>
                    {userFormated.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>

                <div className='flex flex-col text-sm leading-tight'>
                  <span className='font-medium text-[#fbba0e]'>
                    {userFormated.name}
                  </span>
                  <span className='text-xs text-slate-200'>
                    {userFormated.username}
                  </span>
                </div>
              </div>

              <div className='flex items-center'>
                <button className='text-white/30 hover:text-white/60 transition-colors'>
                  <PanelBottomOpen className='size-5 cursor-pointer text-slate-200 hover:text-slate-50' />
                </button>
              </div>
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align='end'
            className='w-48 bg-[#111] text-slate-200 border border-white/10 '
          >
            {/* <DropdownMenuItem className='cursor-pointer hover:bg-[#fbba0e]/90 transition hover:text-black'>
              <User className='w-4 h-4 mr-2' />
              Perfil
            </DropdownMenuItem> */}

            <Link to='/change-password'>
              <DropdownMenuItem className='cursor-pointer hover:bg-[#fbba0e]/90 transition hover:text-black'>
                <Settings className='w-4 h-4 mr-2' />
                Configuración
              </DropdownMenuItem>
            </Link>

            <DropdownMenuItem
              className='text-red-500 cursor-pointer  hover:text-red-400 transition'
              onClick={logout}
            >
              <LogOut className='w-4 h-4 mr-2' />
              Cerrar sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
