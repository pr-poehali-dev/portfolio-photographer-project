import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import ImageUpload from '@/components/ImageUpload';
import ServiceForm from '@/components/ServiceForm';
import TestimonialForm from '@/components/TestimonialForm';

interface Service {
  title: string;
  description: string;
  price: string;
}

interface Testimonial {
  name: string;
  text: string;
  rating: number;
}

interface ContactInfo {
  phone: string;
  email: string;
  instagram: string;
}

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [portfolioImages, setPortfolioImages] = useState<string[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [aboutPhoto, setAboutPhoto] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    phone: '',
    email: '',
    instagram: ''
  });
  const [tempContact, setTempContact] = useState<ContactInfo>({
    phone: '',
    email: '',
    instagram: ''
  });

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'portfolio', 'services', 'testimonials', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground smooth-scroll">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button onClick={() => scrollToSection('home')} className="text-2xl font-serif font-semibold">
              Ульяна Левкович
            </button>
            <div className="hidden md:flex gap-8 items-center">
              {[
                { id: 'home', label: 'Главная' },
                { id: 'about', label: 'Обо мне' },
                { id: 'portfolio', label: 'Портфолио' },
                { id: 'services', label: 'Услуги' },
                { id: 'testimonials', label: 'Отзывы' },
                { id: 'contact', label: 'Контакты' }
              ].map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`text-sm transition-colors hover:text-primary ${
                    activeSection === id ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  {label}
                </button>
              ))}
              <Button
                size="sm"
                variant={editMode ? 'default' : 'outline'}
                onClick={() => setEditMode(!editMode)}
                className="ml-4"
              >
                <Icon name={editMode ? 'Check' : 'Settings'} size={16} className="mr-2" />
                {editMode ? 'Готово' : 'Редактировать'}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <section id="home" className="min-h-screen flex items-center justify-center pt-20 px-6">
        <div className="container mx-auto text-center animate-fade-in">
          <h1 className="text-7xl md:text-9xl font-serif font-light mb-6">
            Фотограф
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            "Фотография — это способ чувствовать, касаться, любить. То, что вы поймали на плёнку, запечатлено навсегда."
          </p>
          <Button
            size="lg"
            onClick={() => scrollToSection('contact')}
            className="text-lg px-8"
          >
            Связаться со мной
          </Button>
        </div>
      </section>

      <section id="about" className="min-h-screen flex items-center py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-scale-in">
              {aboutPhoto ? (
                <div className="relative group">
                  <img
                    src={aboutPhoto}
                    alt="Ульяна Левкович"
                    className="rounded-lg w-full object-cover aspect-[3/4]"
                  />
                  {editMode && (
                    <Button
                      size="sm"
                      variant="destructive"
                      className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => setAboutPhoto('')}
                    >
                      Удалить
                    </Button>
                  )}
                </div>
              ) : (
                <Card className="p-8 border-2 border-dashed border-border hover:border-primary transition-colors aspect-[3/4] flex items-center justify-center">
                  <div className="text-center">
                    <Icon name="User" size={48} className="mx-auto mb-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-4">Добавьте свое фото</p>
                    <label htmlFor="about-photo-upload">
                      <Button size="sm" asChild>
                        <span className="cursor-pointer">Выбрать файл</span>
                      </Button>
                    </label>
                    <input
                      id="about-photo-upload"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => setAboutPhoto(reader.result as string);
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="hidden"
                    />
                  </div>
                </Card>
              )}
            </div>
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-5xl font-serif font-light">Обо мне</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                "Ты многогранна и красива! Можно я тебе это покажу?"
              </p>
              <p className="text-foreground/90 leading-relaxed">
                Я верю, что каждый человек уникален и прекрасен по-своему. Моя задача — показать вам эту красоту через объектив камеры. 
                За 8 лет работы я научилась видеть то, что скрыто от первого взгляда: искренние эмоции, неповторимые черты, магию момента.
              </p>
              <p className="text-foreground/90 leading-relaxed">
                Каждая фотосессия для меня — это не просто работа, а возможность рассказать вашу историю через образы. 
                Я создаю атмосферу, в которой вы чувствуете себя свободно и естественно.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="portfolio" className="min-h-screen py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-6xl font-serif font-light mb-4">Портфолио</h2>
            <p className="text-xl text-muted-foreground">
              "В каждой фотографии живёт момент, который больше никогда не повторится"
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioImages.map((img, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-lg aspect-[3/4] animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <img
                  src={img}
                  alt={`Работа ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {editMode && (
                  <Button
                    size="sm"
                    variant="destructive"
                    className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => setPortfolioImages(portfolioImages.filter((_, i) => i !== index))}
                  >
                    Удалить
                  </Button>
                )}
              </div>
            ))}
            {editMode && (
              <ImageUpload onImageAdd={(url) => setPortfolioImages([...portfolioImages, url])} />
            )}
          </div>
        </div>
      </section>

      <section id="services" className="min-h-screen py-20 px-6 bg-secondary/20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-6xl font-serif font-light mb-4">Услуги</h2>
            <p className="text-xl text-muted-foreground">
              "Фотография — это искусство наблюдения. Дело в том, чтобы найти что-то интересное в обычном месте"
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="p-8 bg-card hover:bg-card/80 transition-all duration-300 hover:scale-105 animate-scale-in relative group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h3 className="text-3xl font-serif font-medium mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-4">{service.description}</p>
                <p className="text-2xl font-serif text-primary">{service.price}</p>
                {editMode && (
                  <Button
                    size="sm"
                    variant="destructive"
                    className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => setServices(services.filter((_, i) => i !== index))}
                  >
                    Удалить
                  </Button>
                )}
              </Card>
            ))}
            {editMode && (
              <ServiceForm onAdd={(service) => setServices([...services, service])} />
            )}
          </div>
        </div>
      </section>

      <section id="testimonials" className="min-h-screen py-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-6xl font-serif font-light mb-4">Отзывы</h2>
            <p className="text-xl text-muted-foreground">
              "Лучшие фотографии — это те, которые вызывают эмоции"
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="p-8 bg-card animate-scale-in relative group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Icon key={i} name="Star" size={20} className="fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-foreground/90 mb-6 italic">"{testimonial.text}"</p>
                <p className="font-serif text-lg text-primary">{testimonial.name}</p>
                {editMode && (
                  <Button
                    size="sm"
                    variant="destructive"
                    className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => setTestimonials(testimonials.filter((_, i) => i !== index))}
                  >
                    Удалить
                  </Button>
                )}
              </Card>
            ))}
            {editMode && (
              <TestimonialForm onAdd={(testimonial) => setTestimonials([...testimonials, testimonial])} />
            )}
          </div>
        </div>
      </section>

      <section id="contact" className="min-h-screen flex items-center py-20 px-6 bg-secondary/20">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-6xl font-serif font-light mb-4">Контакты</h2>
            <p className="text-xl text-muted-foreground mb-8">
              "Давайте создадим что-то прекрасное вместе"
            </p>
          </div>
          <Card className="p-8 md:p-12 bg-card animate-scale-in">
            <form className="space-y-6">
              <div>
                <label className="block mb-2 text-sm font-medium">Ваше имя</label>
                <Input placeholder="Как вас зовут?" className="bg-background" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">Email</label>
                <Input type="email" placeholder="your@email.com" className="bg-background" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">Сообщение</label>
                <Textarea
                  placeholder="Расскажите о вашей фотосессии..."
                  rows={6}
                  className="bg-background"
                />
              </div>
              <Button size="lg" className="w-full text-lg">
                Отправить сообщение
              </Button>
            </form>
            <div className="mt-10 pt-10 border-t border-border">
              {editMode ? (
                <div className="space-y-4">
                  <h3 className="text-lg font-serif mb-4">Редактировать контакты</h3>
                  <div>
                    <label className="block mb-2 text-sm font-medium">Телефон</label>
                    <Input
                      value={tempContact.phone}
                      onChange={(e) => setTempContact({ ...tempContact, phone: e.target.value })}
                      placeholder="+7 (999) 999-99-99"
                      className="bg-background"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium">Email</label>
                    <Input
                      value={tempContact.email}
                      onChange={(e) => setTempContact({ ...tempContact, email: e.target.value })}
                      placeholder="your@email.com"
                      className="bg-background"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium">Instagram</label>
                    <Input
                      value={tempContact.instagram}
                      onChange={(e) => setTempContact({ ...tempContact, instagram: e.target.value })}
                      placeholder="@username"
                      className="bg-background"
                    />
                  </div>
                  <Button onClick={() => setContactInfo(tempContact)} className="w-full">
                    Сохранить контакты
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                  {contactInfo.phone && (
                    <a href={`tel:${contactInfo.phone}`} className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                      <Icon name="Phone" size={20} />
                      <span>{contactInfo.phone}</span>
                    </a>
                  )}
                  {contactInfo.email && (
                    <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                      <Icon name="Mail" size={20} />
                      <span>{contactInfo.email}</span>
                    </a>
                  )}
                  {contactInfo.instagram && (
                    <a href={`https://instagram.com/${contactInfo.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                      <Icon name="Instagram" size={20} />
                      <span>{contactInfo.instagram}</span>
                    </a>
                  )}
                  {!contactInfo.phone && !contactInfo.email && !contactInfo.instagram && (
                    <p className="text-muted-foreground text-sm">Добавьте контакты в режиме редактирования</p>
                  )}
                </div>
              )}
            </div>
          </Card>
        </div>
      </section>

      <footer className="py-8 px-6 border-t border-border">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>© 2024 Ульяна Левкович. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;