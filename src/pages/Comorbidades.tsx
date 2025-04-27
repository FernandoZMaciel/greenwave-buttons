
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft } from "lucide-react";

const comorbidadesList = [
  "Diabetes Mellitus",
  "Hipertensão Arterial",
  "Cardiopatias",
  "Doenças Respiratórias",
  "Doenças Renais",
  "Doenças Neurológicas",
  "Doenças Hematológicas",
  "Doenças Autoimunes",
  "HIV/AIDS",
  "Hepatites",
  // ... Additional comorbidities can be added here
];

const Comorbidades = () => {
  const navigate = useNavigate();
  const [selectedComorbidades, setSelectedComorbidades] = React.useState<string[]>([]);

  const handleComorbidadeChange = (comorbidade: string) => {
    setSelectedComorbidades(current => {
      if (current.includes(comorbidade)) {
        return current.filter(item => item !== comorbidade);
      } else {
        return [...current, comorbidade];
      }
    });
  };

  const handleSave = () => {
    // Save logic here
    navigate('/gestantes-cadastro');
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/gestantes-cadastro')}
          className="mr-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
        <h1 className="text-2xl font-bold">Selecionar Comorbidades</h1>
      </div>

      <ScrollArea className="h-[60vh] border rounded-md p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {comorbidadesList.map((comorbidade) => (
            <div key={comorbidade} className="flex items-center space-x-2">
              <Checkbox
                id={comorbidade}
                checked={selectedComorbidades.includes(comorbidade)}
                onCheckedChange={() => handleComorbidadeChange(comorbidade)}
              />
              <label
                htmlFor={comorbidade}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {comorbidade}
              </label>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="mt-6 flex justify-end">
        <Button onClick={handleSave}>
          Salvar Seleção
        </Button>
      </div>
    </div>
  );
};

export default Comorbidades;
