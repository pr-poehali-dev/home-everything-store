import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
}

interface CartItem extends Product {
  quantity: number;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Мягкий плед',
    category: 'Текстиль',
    price: 2990,
    image: 'https://cdn.poehali.dev/projects/83b95925-574c-43ba-b994-90613af0ef99/files/d5ad5d3e-bbb5-46c8-a20c-8675a9177a0f.jpg',
    description: 'Уютный плед из натуральных материалов'
  },
  {
    id: 2,
    name: 'Керамическая ваза',
    category: 'Декор',
    price: 1590,
    image: 'https://cdn.poehali.dev/projects/83b95925-574c-43ba-b994-90613af0ef99/files/d5ad5d3e-bbb5-46c8-a20c-8675a9177a0f.jpg',
    description: 'Ручная работа, уникальный дизайн'
  },
  {
    id: 3,
    name: 'Ароматическая свеча',
    category: 'Декор',
    price: 890,
    image: 'https://cdn.poehali.dev/projects/83b95925-574c-43ba-b994-90613af0ef99/files/d5ad5d3e-bbb5-46c8-a20c-8675a9177a0f.jpg',
    description: 'Натуральный воск, 40 часов горения'
  },
  {
    id: 4,
    name: 'Декоративная подушка',
    category: 'Текстиль',
    price: 1290,
    image: 'https://cdn.poehali.dev/projects/83b95925-574c-43ba-b994-90613af0ef99/files/d5ad5d3e-bbb5-46c8-a20c-8675a9177a0f.jpg',
    description: 'Мягкий наполнитель, съемный чехол'
  },
  {
    id: 5,
    name: 'Комнатное растение',
    category: 'Растения',
    price: 790,
    image: 'https://cdn.poehali.dev/projects/83b95925-574c-43ba-b994-90613af0ef99/files/d5ad5d3e-bbb5-46c8-a20c-8675a9177a0f.jpg',
    description: 'Неприхотливое, очищает воздух'
  },
  {
    id: 6,
    name: 'Органайзер для кухни',
    category: 'Хранение',
    price: 1990,
    image: 'https://cdn.poehali.dev/projects/83b95925-574c-43ba-b994-90613af0ef99/files/d5ad5d3e-bbb5-46c8-a20c-8675a9177a0f.jpg',
    description: 'Бамбук, экологичный материал'
  }
];

const reviews = [
  { id: 1, name: 'Анна К.', rating: 5, text: 'Прекрасный магазин! Качественные товары и быстрая доставка.' },
  { id: 2, name: 'Михаил П.', rating: 5, text: 'Заказывал декор для гостиной. Все пришло в отличном состоянии!' },
  { id: 3, name: 'Елена С.', rating: 5, text: 'Очень уютные вещи, создают атмосферу дома. Рекомендую!' }
];

export default function Index() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeSection, setActiveSection] = useState('hero');

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => 
      prev.map(item => 
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = cartTotal > 5000 ? 0 : 300;
  const finalTotal = cartTotal + deliveryFee;

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(sectionId);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Home" className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Уют & Комфорт</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <button onClick={() => scrollToSection('about')} className="text-sm font-medium hover:text-primary transition-colors">О магазине</button>
            <button onClick={() => scrollToSection('catalog')} className="text-sm font-medium hover:text-primary transition-colors">Каталог</button>
            <button onClick={() => scrollToSection('delivery')} className="text-sm font-medium hover:text-primary transition-colors">Доставка</button>
            <button onClick={() => scrollToSection('payment')} className="text-sm font-medium hover:text-primary transition-colors">Оплата</button>
            <button onClick={() => scrollToSection('reviews')} className="text-sm font-medium hover:text-primary transition-colors">Отзывы</button>
            <button onClick={() => scrollToSection('contacts')} className="text-sm font-medium hover:text-primary transition-colors">Контакты</button>
          </nav>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <Icon name="ShoppingCart" className="h-5 w-5" />
                {cart.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-lg">
              <SheetHeader>
                <SheetTitle>Корзина</SheetTitle>
                <SheetDescription>
                  {cart.length === 0 ? 'Ваша корзина пуста' : `Товаров: ${cart.reduce((sum, item) => sum + item.quantity, 0)}`}
                </SheetDescription>
              </SheetHeader>
              
              <div className="mt-8 space-y-4">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                    <Icon name="ShoppingBag" className="h-16 w-16 mb-4 opacity-20" />
                    <p>Добавьте товары из каталога</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4 max-h-[400px] overflow-y-auto">
                      {cart.map(item => (
                        <div key={item.id} className="flex gap-4 p-4 bg-card rounded-lg">
                          <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
                          <div className="flex-1">
                            <h4 className="font-medium">{item.name}</h4>
                            <p className="text-sm text-muted-foreground">{item.price} ₽</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Button 
                                size="icon" 
                                variant="outline" 
                                className="h-7 w-7"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                <Icon name="Minus" className="h-3 w-3" />
                              </Button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <Button 
                                size="icon" 
                                variant="outline" 
                                className="h-7 w-7"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Icon name="Plus" className="h-3 w-3" />
                              </Button>
                              <Button 
                                size="icon" 
                                variant="ghost" 
                                className="h-7 w-7 ml-auto"
                                onClick={() => removeFromCart(item.id)}
                              >
                                <Icon name="Trash2" className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          <div className="font-medium">
                            {item.price * item.quantity} ₽
                          </div>
                        </div>
                      ))}
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Товары:</span>
                        <span>{cartTotal} ₽</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Доставка:</span>
                        <span className={deliveryFee === 0 ? 'text-green-600' : ''}>
                          {deliveryFee === 0 ? 'Бесплатно' : `${deliveryFee} ₽`}
                        </span>
                      </div>
                      {cartTotal < 5000 && cartTotal > 0 && (
                        <p className="text-xs text-muted-foreground">
                          Добавьте товаров на {5000 - cartTotal} ₽ для бесплатной доставки
                        </p>
                      )}
                      <Separator />
                      <div className="flex justify-between font-bold text-lg">
                        <span>Итого:</span>
                        <span>{finalTotal} ₽</span>
                      </div>
                    </div>

                    <Button className="w-full" size="lg">
                      Оформить заказ
                    </Button>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <section id="hero" className="py-20 md:py-32">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Всё для уюта вашего дома
              </h1>
              <p className="text-lg text-muted-foreground">
                Создайте атмосферу тепла и комфорта с нашими тщательно отобранными товарами для дома
              </p>
              <div className="flex gap-4">
                <Button size="lg" onClick={() => scrollToSection('catalog')}>
                  <Icon name="ShoppingBag" className="mr-2 h-5 w-5" />
                  Перейти в каталог
                </Button>
                <Button size="lg" variant="outline" onClick={() => scrollToSection('about')}>
                  Узнать больше
                </Button>
              </div>
            </div>
            <div className="animate-scale-in">
              <img 
                src="https://cdn.poehali.dev/projects/83b95925-574c-43ba-b994-90613af0ef99/files/182e29c5-702e-49a4-a6a8-73f64c072357.jpg" 
                alt="Уютный интерьер" 
                className="rounded-2xl shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-16 bg-secondary/30">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">О магазине</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="animate-fade-in">
              <CardHeader>
                <Icon name="Heart" className="h-12 w-12 text-primary mb-4" />
                <CardTitle>С любовью к деталям</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Каждый товар в нашем магазине подобран с заботой о вашем комфорте и уюте
                </p>
              </CardContent>
            </Card>
            <Card className="animate-fade-in">
              <CardHeader>
                <Icon name="Shield" className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Качество гарантируем</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Работаем только с проверенными производителями и предлагаем гарантию на все товары
                </p>
              </CardContent>
            </Card>
            <Card className="animate-fade-in">
              <CardHeader>
                <Icon name="Sparkles" className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Уникальный стиль</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Находим редкие и оригинальные вещи, которые создадут неповторимую атмосферу в вашем доме
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="catalog" className="py-16">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Каталог товаров</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>{product.name}</CardTitle>
                    <Badge variant="secondary">{product.category}</Badge>
                  </div>
                  <CardDescription>{product.description}</CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-primary">{product.price} ₽</span>
                  <Button onClick={() => addToCart(product)}>
                    <Icon name="Plus" className="mr-2 h-4 w-4" />
                    В корзину
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="delivery" className="py-16 bg-secondary/30">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Доставка</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Truck" className="h-6 w-6 text-primary" />
                  Условия доставки
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b">
                  <span>По Москве (в пределах МКАД)</span>
                  <span className="font-medium">300 ₽</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b">
                  <span>По Москве (за МКАД, до 20 км)</span>
                  <span className="font-medium">500 ₽</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b">
                  <span>Бесплатная доставка</span>
                  <span className="font-medium text-green-600">при заказе от 5000 ₽</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span>Срок доставки</span>
                  <span className="font-medium">1-3 рабочих дня</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="payment" className="py-16">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Оплата</h2>
          <div className="max-w-3xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="CreditCard" className="h-6 w-6 text-primary" />
                  Способы оплаты
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start gap-4">
                  <Icon name="Smartphone" className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-medium mb-1">Онлайн на сайте</h4>
                    <p className="text-sm text-muted-foreground">Банковской картой через защищенное соединение</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Icon name="Wallet" className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-medium mb-1">При получении</h4>
                    <p className="text-sm text-muted-foreground">Наличными или картой курьеру</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Icon name="Building" className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-medium mb-1">Банковский перевод</h4>
                    <p className="text-sm text-muted-foreground">Для юридических лиц, с выставлением счета</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="reviews" className="py-16 bg-secondary/30">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Отзывы покупателей</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {reviews.map((review) => (
              <Card key={review.id}>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    {[...Array(review.rating)].map((_, i) => (
                      <Icon key={i} name="Star" className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <CardTitle className="text-lg">{review.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{review.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contacts" className="py-16">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Контакты</h2>
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardContent className="pt-6 space-y-6">
                <div className="flex items-start gap-4">
                  <Icon name="MapPin" className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-medium mb-1">Адрес</h4>
                    <p className="text-muted-foreground">г. Москва, ул. Примерная, д. 123</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Icon name="Phone" className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-medium mb-1">Телефон</h4>
                    <p className="text-muted-foreground">+7 (495) 123-45-67</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Icon name="Mail" className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-medium mb-1">Email</h4>
                    <p className="text-muted-foreground">info@uyut-comfort.ru</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Icon name="Clock" className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-medium mb-1">Режим работы</h4>
                    <p className="text-muted-foreground">Пн-Вс: 10:00 - 20:00</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="py-8 border-t bg-secondary/30">
        <div className="container text-center text-muted-foreground">
          <p>© 2024 Уют & Комфорт. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
}
