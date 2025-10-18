import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface ServiceFormProps {
  onAdd: (service: { title: string; description: string; price: string }) => void;
}

const ServiceForm = ({ onAdd }: ServiceFormProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim() || !price.trim()) {
      toast({
        title: 'Ошибка',
        description: 'Заполните все поля',
        variant: 'destructive'
      });
      return;
    }

    onAdd({ title: title.trim(), description: description.trim(), price: price.trim() });
    setTitle('');
    setDescription('');
    setPrice('');

    toast({
      title: 'Успешно!',
      description: 'Услуга добавлена'
    });
  };

  return (
    <Card className="p-8 bg-card">
      <h3 className="text-2xl font-serif mb-6">Добавить услугу</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2 text-sm font-medium">Название услуги</label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Портретная съёмка"
            className="bg-background"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium">Описание</label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Индивидуальные и семейные фотосессии"
            rows={3}
            className="bg-background"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium">Цена</label>
          <Input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="от 5000 ₽"
            className="bg-background"
          />
        </div>
        <Button type="submit" className="w-full">
          Добавить услугу
        </Button>
      </form>
    </Card>
  );
};

export default ServiceForm;
