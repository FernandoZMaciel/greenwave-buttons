
import React from 'react';
import { User, Users, Baby, Heart } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Dashboard from '@/components/Dashboard';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const doctorName = "Ana Silva";
  const isMobile = useIsMobile();
  
  const categories = [
    { 
      icon: User, 
      label: "Homens" 
    },
    { 
      icon: Users, 
      label: "Mulheres" 
    },
    { 
      icon: User, 
      label: "Idosos" 
    },
    { 
      icon: Users, 
      label: "Gestantes" 
    },
    { 
      icon: Baby, 
      label: "Bebês" 
    },
  ];

  // Define proper ForwardRef components for custom icons
  const PersonStanding = React.forwardRef((props, ref) => (
    <svg
      ref={ref as React.Ref<SVGSVGElement>}
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="5" r="3" />
      <path d="m11 7-1.5 4.5m5-3.5c.5 1 1.5 3 1.5 3m-4-3v10h4" />
      <path d="M11 18v2" />
    </svg>
  ));
  
  PersonStanding.displayName = 'PersonStanding';

  // Update the elderly icon
  categories[2].icon = PersonStanding;

  // Define proper ForwardRef component for Pregnant icon
  const Pregnant = React.forwardRef((props, ref) => (
    <svg
      ref={ref as React.Ref<SVGSVGElement>}
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="5" r="3" />
      <path d="M10.5 14c.83 2 2 3 3.5 3s2.67-1 3.5-3" />
      <path d="M16.5 18c0 1-1.5 2-4.5 2s-4.5-1-4.5-2" />
      <path d="M9.5 14c-.83 2-2 3-3.5 3s-2.67-1-3.5-3" />
      <path d="M7.5 18c0 1 1.5 2 4.5 2" />
    </svg>
  ));
  
  Pregnant.displayName = 'Pregnant';

  // Update the pregnant women icon
  categories[3].icon = Pregnant;

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <Sidebar doctorName={doctorName} />
      <div className={`flex-1 ${isMobile ? 'pt-12' : ''}`}>
        <Dashboard categories={categories} />
      </div>
    </div>
  );
};

export default Index;
