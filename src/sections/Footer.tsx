import { Phone, Send, Mail, MapPin } from "lucide-react";

export function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-[#1A1A2E] text-white">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-lg bg-[#002C5F] flex items-center justify-center">
                <span className="text-white font-bold text-lg">K</span>
              </div>
              <span className="text-xl font-bold">KMOTORS</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Прямые поставки оригинальных автозапчастей из Южной Кореи.
              Hyundai, Kia, Genesis и другие корейские бренды.
            </p>
            <div className="flex gap-4">
              <a
                href="https://t.me/caparts"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-[#002C5F] flex items-center justify-center hover:bg-[#BB162B] transition-colors"
              >
                <Send className="w-5 h-5" />
              </a>
              <a
                href="tel:+821077324344"
                className="w-10 h-10 rounded-lg bg-[#002C5F] flex items-center justify-center hover:bg-[#BB162B] transition-colors"
              >
                <Phone className="w-5 h-5" />
              </a>
              <a
                href="mailto:info@kmotors.kr"
                className="w-10 h-10 rounded-lg bg-[#002C5F] flex items-center justify-center hover:bg-[#BB162B] transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Навигация</h4>
            <ul className="space-y-3">
              {[
                { label: "Каталог", id: "catalog" },
                { label: "Товары", id: "products" },
                { label: "О компании", id: "about" },
                { label: "Контакты", id: "contacts" },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Контакты</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#BB162B] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm text-gray-400">Телефон</div>
                  <a
                    href="tel:+821077324344"
                    className="hover:text-[#BB162B] transition-colors"
                  >
                    +8210 7732 4344
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Send className="w-5 h-5 text-[#BB162B] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm text-gray-400">Telegram</div>
                  <a
                    href="https://t.me/caparts"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#BB162B] transition-colors"
                  >
                    @caparts
                  </a>
                </div>
              </li>
              {/* <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#BB162B] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm text-gray-400">Email</div>
                  <a href="mailto:info@kmotors.kr" className="hover:text-[#BB162B] transition-colors">
                    info@kmotors.kr
                  </a>
                </div>
              </li> */}
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#BB162B] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm text-gray-400">Адрес</div>
                  <span>Seoul, South Korea</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2025 Kmotors. Все права защищены.
            </p>
            <p className="text-gray-500 text-sm">
              Оригинальные запчасти из Кореи
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
