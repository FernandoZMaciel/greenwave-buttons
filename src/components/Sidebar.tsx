
import React, { useState } from 'react';
import { User, Menu, X, LogOut } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface SidebarProps {
  doctorName: string;
}

const Sidebar: React.FC<SidebarProps> = ({ doctorName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile menu toggle */}
      {isMobile && (
        <button 
          onClick={toggleSidebar} 
          className="fixed top-4 left-4 z-50 p-2 rounded-full bg-mfc-blue text-white shadow-md"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      )}

      {/* Sidebar */}
      <aside 
        className={`bg-mfc-blue ${isMobile ? 'fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 ease-in-out' : 'w-64 min-h-screen'} ${isMobile && !isOpen ? '-translate-x-full' : 'translate-x-0'} p-6 flex flex-col gap-6`}
      >
        <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <h2 className="text-white text-xl font-medium tracking-tight mb-1">MFC Help</h2>
          <div className="h-1 w-12 bg-mfc-green rounded-full"></div>
        </div>
        
        <div className="flex items-center gap-3 p-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/5 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="bg-mfc-green h-10 w-10 rounded-full flex items-center justify-center">
            <User className="text-white h-5 w-5" />
          </div>
          <div>
            <p className="text-white text-sm font-medium">Dr.</p>
            <p className="text-white/90 font-medium tracking-tight">{doctorName}</p>
          </div>
        </div>
        
        <nav className="mt-6 flex-1 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <ul className="space-y-1.5">
            <li>
              <a href="#" className="flex items-center gap-2 text-white/80 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-200">
                Dashboard
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-2 text-white/80 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-200">
                Pacientes
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-2 text-white/80 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-200">
                Histórico
              </a>
            </li>
          </ul>
        </nav>
        
        <div className="mt-auto pt-6 border-t border-white/10 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <button 
            className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white rounded-lg px-4 py-2.5 transition-all duration-200 animate-fade-in"
            style={{ animationDelay: '0.5s' }}
          >
            <LogOut size={18} />
            <span>Sair</span>
          </button>
          <p className="text-white/60 text-xs text-center mt-4">MFC Help © 2023</p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
