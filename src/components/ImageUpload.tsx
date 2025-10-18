import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface ImageUploadProps {
  onImageAdd: (imageUrl: string) => void;
}

const ImageUpload = ({ onImageAdd }: ImageUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Ошибка',
        description: 'Пожалуйста, выберите изображение',
        variant: 'destructive'
      });
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: 'Ошибка',
        description: 'Размер файла не должен превышать 10 МБ',
        variant: 'destructive'
      });
      return;
    }

    setUploading(true);

    try {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        onImageAdd(imageUrl);
        toast({
          title: 'Успешно!',
          description: 'Фотография добавлена в портфолио'
        });
        setUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось загрузить изображение',
        variant: 'destructive'
      });
      setUploading(false);
    }
  };

  return (
    <Card className="p-8 border-2 border-dashed border-border hover:border-primary transition-colors">
      <div className="text-center">
        <Icon name="Upload" size={48} className="mx-auto mb-4 text-muted-foreground" />
        <h3 className="text-xl font-serif mb-2">Добавить фотографию</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Нажмите для выбора файла (до 10 МБ)
        </p>
        <label htmlFor="image-upload">
          <Button disabled={uploading} asChild>
            <span className="cursor-pointer">
              {uploading ? 'Загрузка...' : 'Выбрать файл'}
            </span>
          </Button>
        </label>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>
    </Card>
  );
};

export default ImageUpload;
