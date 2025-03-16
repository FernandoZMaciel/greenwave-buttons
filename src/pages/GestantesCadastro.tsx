import React, { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import Sidebar from '@/components/Sidebar';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon, CheckIcon } from 'lucide-react';
import { ptBR } from 'date-fns/locale';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const formSchema = z.object({
  nomeCompleto: z.string().min(3, { message: 'O nome completo é obrigatório' }),
  dataNascimento: z.date({ required_error: 'A data de nascimento é obrigatória' }),
  cns: z.string().min(15, { message: 'O CNS deve ter 15 dígitos' }).max(15),
  dum: z.date({ required_error: 'A Data da Última Menstruação é obrigatória' }),
  dataUsg: z.date({ required_error: 'A data da 1ª USG é obrigatória' }),
  idadeGestacionalSemanas: z.number().min(1).max(42),
  idadeGestacionalDias: z.number().min(0).max(6),
  gravidezDesejada: z.enum(['sim', 'nao']),
  ocupacao: z.string().min(2, { message: 'A ocupação é obrigatória' }),
  avaliacaoDentaria: z.enum(['sim', 'nao']),
  nomeBebe: z.string().optional(),
  sexoBebe: z.enum(['masculino', 'feminino', 'nao_definido']).optional(),
});

type FormValues = z.infer<typeof formSchema>;

const GestantesCadastro: React.FC = () => {
  const isMobile = useIsMobile();
  const doctorName = "Ana Silva";
  const { toast } = useToast();
  const [showConsultaModal, setShowConsultaModal] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nomeCompleto: '',
      cns: '',
      idadeGestacionalSemanas: 0,
      idadeGestacionalDias: 0,
      gravidezDesejada: 'sim',
      ocupacao: '',
      avaliacaoDentaria: 'nao',
      nomeBebe: '',
      sexoBebe: 'nao_definido',
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
    toast({
      title: "Cadastro realizado com sucesso",
      description: `Gestante ${data.nomeCompleto} foi cadastrada`,
    });
    setShowConsultaModal(true);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <Sidebar doctorName={doctorName} />
      <div className={`flex-1 p-4 md:p-8 overflow-y-auto ${isMobile ? 'pt-16' : ''}`}>
        <div className="mb-6">
          <span className="inline-block px-3 py-1 rounded-full bg-mfc-green/10 text-mfc-green text-xs font-medium mb-2">
            Cadastro
          </span>
          <h1 className="text-2xl md:text-3xl font-medium text-mfc-blue">Cadastro de Gestantes</h1>
        </div>

        <Card className="max-w-5xl mx-auto">
          <CardHeader>
            <CardTitle className="text-xl text-mfc-blue">Informações da Gestante</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:items-start">
                  <FormField
                    control={form.control}
                    name="nomeCompleto"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome Completo</FormLabel>
                        <FormControl>
                          <Input placeholder="Nome completo da gestante" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dataNascimento"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Data de Nascimento</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "dd/MM/yyyy")
                                ) : (
                                  <span>Selecione uma data</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date() || date < new Date("1940-01-01")
                              }
                              initialFocus
                              locale={ptBR}
                              className="p-3 pointer-events-auto"
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="cns"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CNS (Cartão Nacional de Saúde)</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Número do CNS" 
                          {...field} 
                          maxLength={15}
                          onChange={(e) => {
                            e.target.value = e.target.value.replace(/\D/g, '');
                            if (e.target.value.length <= 15) {
                              field.onChange(e);
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="dum"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>DUM (Data da Última Menstruação)</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "dd/MM/yyyy")
                                ) : (
                                  <span>Selecione uma data</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date() || 
                                date < new Date(new Date().setMonth(new Date().getMonth() - 9))
                              }
                              initialFocus
                              locale={ptBR}
                              className="p-3 pointer-events-auto"
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dataUsg"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>1º USG (Data)</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "dd/MM/yyyy")
                                ) : (
                                  <span>Selecione uma data</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date > new Date()}
                              initialFocus
                              locale={ptBR}
                              className="p-3 pointer-events-auto"
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex gap-2 items-end">
                    <FormField
                      control={form.control}
                      name="idadeGestacionalSemanas"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Idade Gestacional</FormLabel>
                          <div className="flex flex-col">
                            <FormControl>
                              <Input 
                                type="number" 
                                placeholder="Semanas" 
                                min={1}
                                max={42}
                                {...field}
                                onChange={(e) => field.onChange(Number(e.target.value))}
                              />
                            </FormControl>
                            <span className="text-xs text-gray-500 mt-1">Semanas</span>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="idadeGestacionalDias"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel className="opacity-0">Dias</FormLabel>
                          <div className="flex flex-col">
                            <FormControl>
                              <Input 
                                type="number" 
                                placeholder="Dias" 
                                min={0}
                                max={6}
                                {...field}
                                onChange={(e) => field.onChange(Number(e.target.value))}
                              />
                            </FormControl>
                            <span className="text-xs text-gray-500 mt-1">Dias</span>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="ocupacao"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ocupação</FormLabel>
                        <FormControl>
                          <Input placeholder="Ocupação" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="gravidezDesejada"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Gravidez desejada?</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-row space-x-4"
                          >
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="sim" />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">
                                Sim
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="nao" />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">
                                Não
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="avaliacaoDentaria"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Avaliação dentária?</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-row space-x-4"
                          >
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="sim" />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">
                                Sim
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="nao" />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">
                                Não
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="nomeBebe"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome do Bebê (se já definido)</FormLabel>
                        <FormControl>
                          <Input placeholder="Nome do bebê (opcional)" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="sexoBebe"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sexo do Bebê</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o sexo do bebê" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="masculino">Masculino</SelectItem>
                            <SelectItem value="feminino">Feminino</SelectItem>
                            <SelectItem value="nao_definido">Não definido</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  <Button type="submit" className="bg-mfc-green hover:bg-mfc-green/90">
                    <CheckIcon className="mr-2 h-4 w-4" /> Salvar Cadastro
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Dialog open={showConsultaModal} onOpenChange={setShowConsultaModal}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-center text-lg font-medium text-mfc-blue">Cadastro Realizado</DialogTitle>
              <DialogDescription className="text-center pt-2">
                Realizar a consulta desta paciente?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex flex-row justify-center gap-4 sm:justify-center">
              <Button 
                variant="outline" 
                onClick={() => setShowConsultaModal(false)}
                className="min-w-20"
              >
                Não
              </Button>
              <Button 
                className="min-w-20 bg-mfc-green hover:bg-mfc-green/90" 
                onClick={() => setShowConsultaModal(false)}
              >
                Sim
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default GestantesCadastro;
