import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const scrollToSection = (sectionId: string) => {
    closeMenu();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-6 md:px-12',
        isScrolled 
          ? 'py-4 bg-white bg-opacity-90 backdrop-blur-md shadow-subtle' 
          : 'py-6 bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center">
          <span className="text-2xl font-display font-bold text-estate-dark">
            Estate<span className="text-estate-blue">Hub</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          <NavItem href="#hero" label="Home" onClick={() => scrollToSection('hero')} />
          <NavItem href="#services" label="Services" onClick={() => scrollToSection('services')} />
          <NavItem href="#properties" label="Properties" onClick={() => scrollToSection('properties')} />
          <NavItem href="#localities" label="Localities" onClick={() => scrollToSection('localities')} />
          <NavItem href="#testimonials" label="Testimonials" onClick={() => scrollToSection('testimonials')} />
          <NavItem href="#contact" label="Contact Us" onClick={() => scrollToSection('contact')} />
        </nav>

        {/* Contact Button (Desktop) */}
        <div className="hidden md:block">
          <Button 
            className="bg-estate-blue hover:bg-estate-accent text-white rounded-full px-6 transition-colors duration-300"
            onClick={() => scrollToSection('contact')}
          >
            Get in Touch
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-estate-dark p-2 focus:outline-none" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div 
        className={cn(
          "fixed inset-0 bg-white z-40 flex flex-col pt-20 px-6 transition-transform duration-300 ease-in-out transform md:hidden",
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <button 
          className="absolute top-6 right-6 text-estate-dark p-2 focus:outline-none" 
          onClick={closeMenu}
          aria-label="Close menu"
        >
          <X size={24} />
        </button>
        
        <nav className="flex flex-col space-y-4">
          <MobileNavItem href="#hero" label="Home" onClick={() => scrollToSection('hero')} />
          <MobileNavItem href="#services" label="Services" onClick={() => scrollToSection('services')} />
          <MobileNavItem href="#properties" label="Properties" onClick={() => scrollToSection('properties')} />
          <MobileNavItem href="#localities" label="Localities" onClick={() => scrollToSection('localities')} />
          <MobileNavItem href="#testimonials" label="Testimonials" onClick={() => scrollToSection('testimonials')} />
          <MobileNavItem href="#contact" label="Contact Us" onClick={() => scrollToSection('contact')} />
        </nav>
        <div className="mt-6">
          <Button 
            className="bg-estate-blue hover:bg-estate-accent text-white rounded-full w-full"
            onClick={() => scrollToSection('contact')}
          >
            Get in Touch
          </Button>
        </div>
      </div>
    </header>
  );
};

// Desktop Nav Item
const NavItem = ({ href, label, onClick }: { href: string; label: string; onClick: () => void }) => {
  return (
    <a 
      href={href}
      className="relative px-4 py-2 text-estate-dark hover:text-estate-blue font-medium text-sm transition-colors duration-200"
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      {label}
    </a>
  );
};

// Mobile Nav Item
const MobileNavItem = ({ href, label, onClick }: { href: string; label: string, onClick: () => void }) => {
  return (
    <a 
      href={href}
      className="py-3 text-lg font-medium text-estate-dark border-b border-gray-100"
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      {label}
    </a>
  );
};

export default Header;
