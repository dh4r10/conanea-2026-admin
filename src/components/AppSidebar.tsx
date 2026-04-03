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
  User,
  PanelBottomOpen,
  CalendarDays,
  Brackets,
  Mic2,
  ActivityIcon,
} from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Link } from 'react-router-dom';

export function AppSidebar() {
  const user = {
    name: 'Jhosep Gómez',
    email: 'jhosep@gmail.com',
    avatar: '', // URL si tienes
  };

  return (
    <Sidebar>
      {/* HEADER */}
      <SidebarHeader className='flex flex-col items-center  gap-1 py-4 bg-[#111] border-b border-white/10'>
        <img
          src='/img/sigepo_sin_fondo.png'
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
              <Link to='/admin'>
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
              <Link to='/admin/activity'>
                <SidebarMenuButton className='cursor-pointer hover:bg-[#fbba0e]/90 transition'>
                  <ActivityIcon className='w-4 h-4' />
                  <span>Actividades</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <Link to='/admin/activity-type'>
                <SidebarMenuButton className='cursor-pointer hover:bg-[#fbba0e]/90 transition'>
                  <Brackets className='w-4 h-4' />
                  <span>Tipo de Actividad</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <Link to='/admin/days'>
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
              <Link to='/admin/speaker'>
                <SidebarMenuButton className='cursor-pointer hover:bg-[#fbba0e]/90 transition'>
                  <Mic2 className='w-4 h-4' />
                  <span>Speakers</span>
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
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback className='bg-[#fbba0e] text-black'>
                    {user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>

                <div className='flex flex-col text-sm leading-tight'>
                  <span className='font-medium text-[#fbba0e]'>
                    {user.name}
                  </span>
                  <span className='text-xs text-slate-200'>{user.email}</span>
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
            <DropdownMenuItem className='cursor-pointer hover:bg-[#fbba0e]/90 transition hover:text-black'>
              <User className='w-4 h-4 mr-2' />
              Perfil
            </DropdownMenuItem>

            <DropdownMenuItem className='cursor-pointer hover:bg-[#fbba0e]/90 transition hover:text-black'>
              <Settings className='w-4 h-4 mr-2' />
              Configuración
            </DropdownMenuItem>

            <DropdownMenuItem className='text-red-500 cursor-pointer  hover:text-red-400 transition'>
              <LogOut className='w-4 h-4 mr-2' />
              Cerrar sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
