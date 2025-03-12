
import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "First-time Home Buyer",
    content: "EstateHub made finding my first home so easy. Their expert team guided me through every step of the process with patience and professionalism.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Property Investor",
    content: "I've worked with many real estate agencies, but EstateHub stands out for their market knowledge and attention to detail. My investment portfolio has grown significantly thanks to their guidance.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Luxury Home Seller",
    content: "The marketing strategy EstateHub developed for my luxury property was exceptional. They found the perfect buyer in just three weeks, exceeding my asking price expectations.",
    image: "https://images.unsplash.com/photo-1664575602554-2087b04935a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Auto-rotate testimonials every 5 seconds
    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000);

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      clearInterval(interval);
    };
  }, []);

  return (
    <section 
      id="testimonials" 
      className="py-20 bg-estate-blue/5"
      ref={sectionRef}
    >
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="bg-estate-blue/10 text-estate-blue hover:bg-estate-blue/20 mb-4">
            Client Testimonials
          </Badge>
          <h2 className={cn(
            "text-3xl md:text-4xl font-bold mb-4 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}>
            What Our Clients Say
          </h2>
          <p className={cn(
            "text-gray-600 transition-all duration-700 delay-100",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}>
            Hear from our satisfied clients about their experience working with us to find their dream properties.
          </p>
        </div>

        <div className={cn(
          "relative max-w-4xl mx-auto transition-all duration-700 delay-200",
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        )}>
          {/* Testimonial Carousel */}
          <div className="glass-panel rounded-2xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-8 right-8 md:top-12 md:right-12 text-estate-blue/20">
              <Quote size={70} />
            </div>
            
            <div className="relative z-10">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={testimonial.id}
                  className={cn(
                    "transition-opacity duration-500 absolute inset-0",
                    activeIndex === index ? "opacity-100 z-10" : "opacity-0 z-0"
                  )}
                >
                  <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden flex-shrink-0 border-4 border-white shadow-md">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <p className="text-lg md:text-xl italic text-gray-700 mb-6">
                        "{testimonial.content}"
                      </p>
                      <div>
                        <h4 className="text-xl font-bold">{testimonial.name}</h4>
                        <p className="text-gray-500">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={cn(
                    "w-3 h-3 rounded-full transition-all",
                    activeIndex === index 
                      ? "bg-estate-blue scale-100" 
                      : "bg-gray-300 scale-75 hover:scale-90"
                  )}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            {/* Navigation Arrows */}
            <button 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors"
              onClick={prevTestimonial}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            
            <button 
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors"
              onClick={nextTestimonial}
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
