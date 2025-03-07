
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CategoryButtonProps {
  icon: LucideIcon;
  label: string;
  index: number;
  onClick?: () => void;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({ icon: Icon, label, index, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="group relative overflow-hidden w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-5 text-left transition-all duration-300 hover:shadow-md hover:translate-y-[-2px] hover:border-mfc-green/30 animate-scale-in"
      style={{ animationDelay: `${0.1 + (index * 0.1)}s` }}
    >
      <div className="absolute -bottom-1 -right-1 w-24 h-24 bg-gradient-to-tr from-mfc-green/10 to-mfc-green/0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="mb-4 flex items-center justify-center w-14 h-14 bg-mfc-green/10 text-mfc-green rounded-full">
        <Icon className="h-7 w-7" />
      </div>
      
      <h3 className="text-lg font-medium text-mfc-blue mb-1">{label}</h3>
      
      <div className="w-8 h-0.5 bg-mfc-green/50 mt-2 mb-3"></div>
      
      <p className="text-sm text-gray-600">Acessar informações</p>
      
      <div className="absolute right-4 bottom-4 w-7 h-7 flex items-center justify-center rounded-full bg-mfc-green/0 text-mfc-green/0 group-hover:bg-mfc-green group-hover:text-white transition-all duration-300">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </button>
  );
};

export default CategoryButton;
