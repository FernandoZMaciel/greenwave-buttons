
import React from 'react';
import { User, Users, Baby, Heart } from 'lucide-react';
import CategoryButton from './CategoryButton';

interface DashboardProps {
  categories: {
    icon: any;
    label: string;
  }[];
}

const Dashboard: React.FC<DashboardProps> = ({ categories }) => {
  return (
    <div className="flex-1 p-8">
      <div className="mb-8 animate-fade-in">
        <span className="inline-block px-3 py-1 rounded-full bg-mfc-green/10 text-mfc-green text-xs font-medium mb-2">
          Dashboard
        </span>
        <h1 className="text-3xl font-medium text-mfc-blue">Categorias de Atendimento</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
