import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import "../styles/IntroGallery.css";

interface Image {
  src: string;
  alt: string;
}

interface IntroGalleryProps {
  images: Image[];
}

export default function IntroGallery({ images }: IntroGalleryProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

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
    emblaApi.scrollTo(index);
  }, [emblaApi]);

  return (
    <div className="intro-gallery">
      <div className="intro-gallery-viewport" ref={emblaRef}>
        <div className="intro-gallery-container">
          {images.map((img, index) => (
            <div key={index} className="intro-gallery-slide">
              <img src={img.src} alt={img.alt} loading="lazy" />
            </div>
          ))}
        </div>
      </div>

      <div className="intro-gallery-dots">
        {images.map((_, index) => (
          <button
            key={index}
            className={`intro-gallery-dot ${index === selectedIndex ? "is-active" : ""}`}
            onClick={() => scrollToIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
