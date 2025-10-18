import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

const portfolioImages: string[] = [];

const services = [
  {
    title: 'Портретная съёмка',
    description: 'Индивидуальные и семейные фотосессии',
    price: 'от 5000 ₽'
  },
  {
    title: 'Свадебная съёмка',
    description: 'Полный день вашего праздника',
    price: 'от 25000 ₽'
  },
  {
    title: 'Репортажная съёмка',
    description: 'События, мероприятия, концерты',
    price: 'от 8000 ₽'
  },
  {
    title: 'Коммерческая съёмка',
    description: 'Для брендов и бизнеса',
    price: 'от 15000 ₽'
  }
];

const testimonials: Array<{name: string; text: string; rating: number}> = [];

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');

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
            <div className="hidden md:flex gap-8">
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
              <img
                src="https://cdn.poehali.dev/files/c04c0ba3-e790-428f-800a-89e1a4d212db.jpg"
                alt="Ульяна Левкович"
                className="rounded-lg w-full object-cover aspect-[3/4]"
              />
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
          {portfolioImages.length > 0 ? (
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
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <p className="text-foreground font-serif text-lg">Портфолио {index + 1}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Icon name="Camera" size={64} className="mx-auto mb-6 text-muted-foreground opacity-50" />
              <p className="text-xl text-muted-foreground">Здесь будут ваши лучшие работы</p>
            </div>
          )}
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
                className="p-8 bg-card hover:bg-card/80 transition-all duration-300 hover:scale-105 animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h3 className="text-3xl font-serif font-medium mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-4">{service.description}</p>
                <p className="text-2xl font-serif text-primary">{service.price}</p>
              </Card>
            ))}
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
          {testimonials.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card
                  key={index}
                  className="p-8 bg-card animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Icon key={i} name="Star" size={20} className="fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-foreground/90 mb-6 italic">"{testimonial.text}"</p>
                  <p className="font-serif text-lg text-primary">{testimonial.name}</p>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Icon name="MessageCircle" size={64} className="mx-auto mb-6 text-muted-foreground opacity-50" />
              <p className="text-xl text-muted-foreground">Отзывы ваших клиентов появятся здесь</p>
            </div>
          )}
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
              <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                <a href="tel:+79999999999" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <Icon name="Phone" size={20} />
                  <span>+7 (999) 999-99-99</span>
                </a>
                <a href="mailto:photo@example.com" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <Icon name="Mail" size={20} />
                  <span>photo@example.com</span>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <Icon name="Instagram" size={20} />
                  <span>@photographer</span>
                </a>
              </div>
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