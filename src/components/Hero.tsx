
import { useState, useEffect } from 'react';
import { ArrowRight, MapPin, Home, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const heroImages = [
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2075&q=80',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  'https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
];

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Set initial load
    setIsLoaded(true);

    // Set up image carousel rotation
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  // Property search options
  const propertyTypes = ['Residential', 'Commercial', 'Land', 'Luxury'];
  const [selectedType, setSelectedType] = useState('Residential');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would navigate to a search results page
    alert("Search initiated! This would navigate to search results page in a production environment.");
    // Scroll to the properties section as a fallback
    const propertiesSection = document.getElementById('properties');
    if (propertiesSection) {
      propertiesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-20">
      {/* Background Images Carousel */}
      <div className="absolute inset-0 overflow-hidden">
        {heroImages.map((img, index) => (
          <div 
            key={index}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000 ease-in-out",
              activeIndex === index ? "opacity-100" : "opacity-0"
            )}
          >
            <div className="absolute inset-0 bg-black bg-opacity-40" />
            <img 
              src={img} 
              alt="Luxury property" 
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Hero Content */}
      <div className="relative w-full max-w-7xl mx-auto px-6 md:px-12 py-6 md:py-12">
        <div className="max-w-3xl animate-fade-in animation-delay-200">
          <div className="inline-flex items-center rounded-full bg-white bg-opacity-20 backdrop-blur-sm px-4 py-1.5 mb-6">
            <span className="text-white text-sm font-medium">Discover Your Dream Property</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Find Your <span className="text-estate-blue">Perfect Place</span> to Call Home
          </h1>
          
          <p className="text-white text-lg md:text-xl mb-8 max-w-2xl">
            Explore premium properties in top locations with our expert real estate services tailored to your needs.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button 
              className="bg-estate-blue hover:bg-estate-accent text-white rounded-full px-8 py-6 text-base"
              onClick={() => scrollToSection('properties')}
            >
              Explore Properties <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              className="bg-white bg-opacity-10 backdrop-blur-sm hover:bg-opacity-20 text-white border-white border-opacity-20 rounded-full px-8 py-6 text-base"
              onClick={() => scrollToSection('services')}
            >
              Learn More
            </Button>
          </div>
        </div>

        {/* Property Search Panel */}
        <div className={cn(
          "glass-panel rounded-2xl max-w-4xl transition-all duration-700 transform",
          isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        )}>
          <form onSubmit={handleSearch} className="p-6 md:p-8">
            <div className="flex flex-wrap gap-6 mb-6">
              {propertyTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  className={cn(
                    "px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200",
                    selectedType === type 
                      ? "bg-estate-blue text-white" 
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  )}
                  onClick={() => setSelectedType(type)}
                >
                  {type}
                </button>
              ))}
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-500 mb-2">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <select className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-estate-blue appearance-none">
                    <option>Any Location</option>
                    <option>New York</option>
                    <option>Los Angeles</option>
                    <option>Miami</option>
                    <option>Chicago</option>
                  </select>
                </div>
              </div>
              
              {/* <div className="relative">
                <label className="block text-sm font-medium text-gray-500 mb-2">Property Type</label>
                <div className="relative">
                  <Home className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <select className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-estate-blue appearance-none">
                    <option>Any Type</option>
                    <option>House</option>
                    <option>Apartment</option>
                    <option>Villa</option>
                    <option>Land</option>
                  </select>
                </div>
              </div> */}
              
              <div className="relative">
                <label className="block text-sm font-medium text-gray-500 mb-2">Price Range</label>
                <div className="relative">
                  <Building className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <select className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-estate-blue appearance-none">
                    <option>Any Price</option>
                    <option>₹1000 ₹2000</option>
                    <option>₹2000 - ₹5000</option>
                    <option>₹5000 - ₹10000</option>
                    <option>₹10000+</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <Button 
                type="submit" 
                className="w-full bg-estate-blue hover:bg-estate-accent text-white rounded-lg py-6"
              >
                Search Properties
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Hero;
