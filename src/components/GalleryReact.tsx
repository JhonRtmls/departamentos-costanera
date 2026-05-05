import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import "../styles/Gallery.css";

interface Image {
  src: string;
  alt: string;
  caption: string;
}

interface GalleryProps {
  images: Image[];
  tag: string;
  title: string;
  subtitle: string;
  desc: string;
}

export default function GalleryReact({ images: originalImages, tag, title, desc }: GalleryProps) {
  // Triplicamos las imágenes para que el loop de Embla sea perfecto sin saltos visuales
  const images = [...originalImages, ...originalImages, ...originalImages];
  const originalLength = originalImages.length;
  
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true, 
      align: 'center',
      skipSnaps: false,
      startIndex: originalLength // Empezamos en el set del medio
    }, 
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );
  
  const [selectedIndex, setSelectedIndex] = useState(originalLength);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  const scrollToIndex = useCallback((index: number) => {
    if (!emblaApi) return;
    
    const currentSnap = emblaApi.selectedScrollSnap();
    const originalCount = originalImages.length;
    
    // Posibles destinos en los 3 sets
    const targets = [index, index + originalCount, index + originalCount * 2];
    
    // Encontramos el más cercano al snap actual
    const closest = targets.reduce((prev, curr) => 
      Math.abs(curr - currentSnap) < Math.abs(prev - currentSnap) ? curr : prev
    );
    
    emblaApi.scrollTo(closest);
  }, [emblaApi, originalImages.length]);

  return (
    <section className="gallery" id="galeria">
      <div className="gallery-header container">
        <span className="gallery-tag">{tag}</span>
        <h2 className="gallery-title">{title}</h2>
        <p className="gallery-desc">{desc}</p>
      </div>

      <div className="gallery-viewport" ref={emblaRef}>
        <div className="gallery-container">
          {images.map((img, index) => (
            <div 
              key={index} 
              className={`gallery-slide ${index === selectedIndex ? "is-selected" : ""}`}
            >
              <div className="gallery-slide-inner">
                <img src={img.src} alt={img.alt} loading="lazy" />
                <div className="gallery-slide-overlay">
                  <div className="gallery-slide-content">
                    <h3>{img.caption}</h3>
                    <span className="gallery-slide-count">
                      {(index % originalLength) + 1} / {originalLength}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="gallery-dots">
        {originalImages.map((_, index) => (
          <button
            key={index}
            className={`gallery-dot ${index === (selectedIndex % originalLength) ? "is-active" : ""}`}
            onClick={() => scrollToIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}




