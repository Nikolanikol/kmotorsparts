import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Send,
  Phone,
  Mail,
  User,
  Car,
  Hash,
  MessageSquare,
} from "lucide-react";
import { toast } from "sonner";

export function ContactForm() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    carModel: "",
    vinNumber: "",
    message: "",
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.phone) {
      toast.error("Пожалуйста, заполните обязательные поля (Имя и Телефон)");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Ошибка отправки');
      }

      toast.success("Заявка отправлена! Мы свяжемся с вами в течение часа");

      setFormData({
        name: "",
        phone: "",
        email: "",
        carModel: "",
        vinNumber: "",
        message: "",
      });
    } catch {
      toast.error("Не удалось отправить заявку. Попробуйте позже или позвоните нам");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contacts"
      ref={sectionRef}
      className="py-24 bg-gradient-to-br from-[#002C5F] to-[#001f45] relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#BB162B]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-12 bg-[#BB162B]" />
            <span className="text-[#BB162B] text-sm font-medium tracking-wider uppercase">
              Связаться с нами
            </span>
            <div className="h-px w-12 bg-[#BB162B]" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Оставить заявку
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Заполните форму, и мы свяжемся с вами в течение часа. Укажите
            VIN-номер для точного подбора запчастей.
          </p>
        </div>

        {/* Form Card */}
        <div
          className={`max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="grid md:grid-cols-5">
            {/* Left side - Contact info */}
            <div className="md:col-span-2 bg-[#002C5F] p-8 text-white">
              <h3 className="text-xl font-semibold mb-6">Контакты</h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm text-white/60 mb-1">Телефон</div>
                    <a
                      href="tel:+821077324344"
                      className="font-medium hover:text-[#BB162B] transition-colors"
                    >
                      +8210 7732 4344
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Send className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm text-white/60 mb-1">Telegram</div>
                    <a
                      href="https://t.me/caparts"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium hover:text-[#BB162B] transition-colors"
                    >
                      @caparts
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  {/* <div>
                    <div className="text-sm text-white/60 mb-1">Email</div>
                    <a href="mailto:info@kmotors.kr" className="font-medium hover:text-[#BB162B] transition-colors">
                      info@kmotors.kr
                    </a>
                  </div> */}
                </div>
              </div>

              <div className="mt-10 pt-6 border-t border-white/20">
                <div className="text-sm text-white/60 mb-2">Режим работы</div>
                <div className="font-medium">Пн-Пт: 9:00 - 18:00</div>
                <div className="text-white/60">Сб-Вс: выходной</div>
              </div>
            </div>

            {/* Right side - Form */}
            <div className="md:col-span-3 p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-700">
                      Имя <span className="text-[#BB162B]">*</span>
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Ваше имя"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-gray-700">
                      Телефон <span className="text-[#BB162B]">*</span>
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+7 (999) 999-99-99"
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="carModel" className="text-gray-700">
                      Марка и модель авто
                    </Label>
                    <div className="relative">
                      <Car className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="carModel"
                        name="carModel"
                        value={formData.carModel}
                        onChange={handleChange}
                        placeholder="Hyundai Solaris"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="vinNumber" className="text-gray-700">
                      VIN-номер
                    </Label>
                    <div className="relative">
                      <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="vinNumber"
                        name="vinNumber"
                        value={formData.vinNumber}
                        onChange={handleChange}
                        placeholder="KMHEC41CBBA000000"
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-gray-700">
                    Сообщение / Нужная запчасть
                  </Label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Опишите нужную запчасть или задайте вопрос..."
                      className="pl-10 min-h-[100px]"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#BB162B] hover:bg-[#9B1220] text-white py-6 text-base font-semibold"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Отправка...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="w-5 h-5" />
                      Отправить заявку
                    </span>
                  )}
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  Нажимая кнопку, вы соглашаетесь с обработкой персональных
                  данных
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
