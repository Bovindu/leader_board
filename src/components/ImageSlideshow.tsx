import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';


// Sample images - can be easily modified
const slideshowImages: SlideshowImage[] = [
  {
    id: 1,
    url: "https://res.cloudinary.com/dhyzmegrh/image/upload/v1749883700/Untitled_333_lp1zf0.png",
    title: "Innovation & Technology",
    description: "Staying ahead with cutting-edge skills and knowledge"
  },
  {
    id: 2,
    url: "https://res.cloudinary.com/dhyzmegrh/image/upload/v1749883084/asdf_d0vez2.png",
    title: "Learn and Lead",
    description: "Learn and Lead"
  },
  {
    id: 3,
    url: "https://res.cloudinary.com/dhyzmegrh/image/upload/v1749884330/Untitled_5555_ci0tir.png",
    title: "POSON CELBRATION | INVITE ALL TO WORK TOGETHER ",
    description: "Staying ahead with cutting-edge skills and knowledge"
  },
];

const ImageSlideshow: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  // Auto-advance slides
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideshowImages.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Preload images
  useEffect(() => {
    const imagePromises = slideshowImages.map((img) => {
      return new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = resolve;
        image.onerror = reject;
        image.src = img.url;
      });
    });

    Promise.all(imagePromises)
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slideshowImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slideshowImages.length) % slideshowImages.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  if (isLoading) {
    return (
      <div className="w-full bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-96 bg-gray-200 animate-pulse flex items-center justify-center">
                <div className="text-gray-400">Loading slideshow...</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
            News And Event Updates
          </h2>
          
          <div className="relative bg-white rounded-lg shadow-lg overflow-hidden group">
            {/* Main Image Container */}
            <div className="relative h-96 md:h-[500px] overflow-hidden">
              {slideshowImages.map((image, index) => (
                <div
                  key={image.id}
                  className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                    index === currentSlide 
                      ? 'opacity-100 transform scale-100' 
                      : 'opacity-0 transform scale-105'
                  }`}
                >
                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
                    <h3 className="text-2xl md:text-3xl font-bold mb-2 transform transition-all duration-700 delay-300">
                      {image.title}
                    </h3>
                    <p className="text-lg md:text-xl text-gray-200 max-w-2xl transform transition-all duration-700 delay-500">
                      {image.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
              aria-label="Previous slide"
            >
              <ChevronLeft size={24} />
            </button>
            
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
              aria-label="Next slide"
            >
              <ChevronRight size={24} />
            </button>

            {/* Play/Pause Button */}
            <button
              onClick={togglePlayPause}
              className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
              aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>

            {/* Slide Indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {slideshowImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-white scale-125' 
                      : 'bg-white/50 hover:bg-white/75'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
              <div 
                className="h-full bg-blue-500 transition-all duration-300 ease-linear"
                style={{ 
                  width: `${((currentSlide + 1) / slideshowImages.length) * 100}%` 
                }}
              />
            </div>
          </div>

          {/* Slide Counter */}
          <div className="text-center mt-4 text-gray-600">
            <span className="text-sm">
              {currentSlide + 1} of {slideshowImages.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageSlideshow;