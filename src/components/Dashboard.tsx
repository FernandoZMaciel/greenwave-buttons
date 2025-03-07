
import React from 'react';
import CategoryButton from './CategoryButton';

interface DashboardProps {
  categories: {
    icon: any;
    label: string;
  }[];
}

const Dashboard: React.FC<DashboardProps> = ({ categories }) => {
  return (
    <div className="flex-1 p-4 md:p-8 overflow-y-auto">
      <div className="mb-6 md:mb-8 animate-fade-in">
        <span className="inline-block px-3 py-1 rounded-full bg-mfc-green/10 text-mfc-green text-xs font-medium mb-2">
          Dashboard
        </span>
        <h1 className="text-2xl md:text-3xl font-medium text-mfc-blue">Categorias de Atendimento</h1>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {categories.map((category, index) => (
          <CategoryButton
            key={category.label}
            icon={category.icon}
            label={category.label}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
