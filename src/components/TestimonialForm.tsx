import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface TestimonialFormProps {
  onAdd: (testimonial: { name: string; text: string; rating: number }) => void;
}

const TestimonialForm = ({ onAdd }: TestimonialFormProps) => {
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [rating, setRating] = useState(5);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !text.trim()) {
      toast({
        title: 'Ошибка',
        description: 'Заполните все поля',
        variant: 'destructive'
      });
      return;
    }

    onAdd({ name: name.trim(), text: text.trim(), rating });
    setName('');
    setText('');
    setRating(5);

    toast({
      title: 'Успешно!',
      description: 'Отзыв добавлен'
    });
  };

  return (
    <Card className="p-8 bg-card">
      <h3 className="text-2xl font-serif mb-6">Добавить отзыв</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2 text-sm font-medium">Имя клиента</label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Анна Иванова"
            className="bg-background"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium">Текст отзыва</label>
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Отличный фотограф! Все прошло замечательно..."
            rows={4}
            className="bg-background"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium">Рейтинг</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="transition-colors"
              >
                <Icon
                  name="Star"
                  size={28}
                  className={star <= rating ? 'fill-primary text-primary' : 'text-muted-foreground'}
                />
              </button>
            ))}
          </div>
        </div>
        <Button type="submit" className="w-full">
          Добавить отзыв
        </Button>
      </form>
    </Card>
  );
};

export default TestimonialForm;
