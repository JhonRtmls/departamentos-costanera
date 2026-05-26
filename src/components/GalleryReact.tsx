import { useState, useEffect, useRef } from "react";
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

export default function GalleryReact({ images, tag, title, desc }: GalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [carouselTranslate, setCarouselTranslate] = useState(0);

  useEffect(() => {
    if (!carouselRef.current) return;
    const containerWidth = carouselRef.current.offsetWidth;
    const isMobile = window.innerWidth <= 768;
    const cardWidthPercent = isMobile ? 0.85 : 0.5;
    const initialTranslateVal = (containerWidth / 2) - (containerWidth * cardWidthPercent / 2);
    const diffAmount = containerWidth * cardWidthPercent;
    const translate = initialTranslateVal - (activeIndex * diffAmount);
    setCarouselTranslate(translate);
  }, [activeIndex]);

  // Autoplay logic
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(timer);
  }, [images.length, activeIndex]); // Reset timer on manual change if we want, or just let it run


  return (
    <section className="gallery" id="galeria">
      <div className="gallery-header container">
        <span className="gallery-tag">{tag}</span>
        <h2 className="gallery-title">{title}</h2>
        <p className="gallery-desc">{desc}</p>
      </div>

      <div className="carousel-wrapper">
        <div
          className="carousel-main"
          ref={carouselRef}
          style={{ transform: `translateX(${carouselTranslate}px)` }}
        >
          {images.map((img, i) => (
            <div key={i} className={`carousel-card ${activeIndex === i ? 'active' : ''}`}>
              <div className="carousel-card-content">
                <img src={img.src} alt={img.alt} className="carousel-card-image" />
                <div className="carousel-card-overlay">
                  <div className="carousel-card-title">
                    <span className="card-index">0{i + 1}</span>
                    {img.caption}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="carousel-controls container">
        <div className="dots">
          {images.map((_, i) => (
            <button
              key={i}
              className={`dot ${activeIndex === i ? 'active' : ''}`} 
              onClick={() => setActiveIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        <div className="button-group">
          <button
            type="button"
            className="nav-btn prev"
            disabled={activeIndex === 0}
            onClick={() => setActiveIndex(activeIndex - 1)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <button
            type="button"
            className="nav-btn next"
            disabled={activeIndex === images.length - 1}
            onClick={() => setActiveIndex(activeIndex + 1)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>
      </div>
    </section>
  );
}
