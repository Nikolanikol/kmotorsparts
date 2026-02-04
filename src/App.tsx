import { Toaster } from '@/components/ui/sonner';
import { Header } from './sections/Header';
import { Hero } from './sections/Hero';
import { Catalog } from './sections/Catalog';
import { Products } from './sections/Products';
import { About } from './sections/About';
import { ContactForm } from './sections/ContactForm';
import { Footer } from './sections/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <Catalog />
        <Products />
        <About />
        <ContactForm />
      </main>
      <Footer />
      <Toaster position="top-center" />
    </div>
  );
}

export default App;
