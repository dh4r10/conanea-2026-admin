import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className='w-full bg-[#111] border-l border-white/10'>
        <SidebarTrigger className='text-slate-200 mx-2 my-2 cursor-pointer border border-white/10 hover:bg-[#fbba0e]' />
        <div className='w-full h-dvh border-t border-white/10'>
          <div
            style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}
            className='bg-[#111] p-8'
          >
            {children}
          </div>
        </div>
      </main>
    </SidebarProvider>
  );
}
