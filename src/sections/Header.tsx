import { useState, useEffect } from 'react';
import { Menu, X, Phone, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const navItems = [
    { label: 'Каталог', id: 'catalog' },
    { label: 'Товары', id: 'products' },
    { label: 'О компании', id: 'about' },
    { label: 'Контакты', id: 'contacts' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-[#002C5F] flex items-center justify-center">
              <span className="text-white font-bold text-lg">K</span>
            </div>
            <span
              className={`text-xl font-bold transition-colors ${
                isScrolled ? 'text-[#002C5F]' : 'text-white'
              }`}
            >
              KMOTORS
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm font-medium transition-colors hover:text-[#BB162B] ${
                  isScrolled ? 'text-gray-700' : 'text-white/90'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Contact Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:+821077324344"
              className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                isScrolled ? 'text-[#002C5F]' : 'text-white'
              }`}
            >
              <Phone className="w-4 h-4" />
              +8210 7732 4344
            </a>
            <a
              href="https://t.me/caparts"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="sm"
                className="bg-[#BB162B] hover:bg-[#9B1220] text-white"
              >
                <Send className="w-4 h-4 mr-2" />
                Telegram
              </Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className={`w-6 h-6 ${isScrolled ? 'text-gray-900' : 'text-white'}`} />
            ) : (
              <Menu className={`w-6 h-6 ${isScrolled ? 'text-gray-900' : 'text-white'}`} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <nav className="flex flex-col p-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="py-3 text-left text-gray-700 hover:text-[#BB162B] font-medium border-b border-gray-100"
              >
                {item.label}
              </button>
            ))}
            <div className="pt-4 flex flex-col gap-3">
              <a
                href="tel:+821077324344"
                className="flex items-center gap-2 text-[#002C5F] font-medium"
              >
                <Phone className="w-4 h-4" />
                +8210 7732 4344
              </a>
              <a
                href="https://t.me/caparts"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="w-full bg-[#BB162B] hover:bg-[#9B1220] text-white">
                  <Send className="w-4 h-4 mr-2" />
                  Telegram
                </Button>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
