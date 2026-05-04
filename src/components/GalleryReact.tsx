import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
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

export default function GalleryReact({ images, tag, title, subtitle, desc }: GalleryProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo  = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
      setCanPrev(emblaApi.canScrollPrev());
      setCanNext(emblaApi.canScrollNext());
    };
    emblaApi.on("select", onSelect);
    onSelect();
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi]);

  return (
    <section className="gallery" id="galeria">
      <div className="gallery-layout">

        {/* Left — sticky text column */}
        <div className="gallery-left">
          <span className="gallery-tag">{tag}</span>
          <h2 className="gallery-title">{title}</h2>
          <p className="gallery-subtitle">{subtitle}</p>
          <p className="gallery-desc">{desc}</p>

          {/* Controls inside left column */}
          <div className="gallery-controls">
            <button
              className={`gallery-btn${!canPrev ? " disabled" : ""}`}
              onClick={scrollPrev}
              aria-label="Anterior"
            >‹</button>

            <div className="gallery-dots">
              {images.map((_, i) => (
                <button
                  key={i}
                  className={`gallery-dot${i === selectedIndex ? " active" : ""}`}
                  onClick={() => scrollTo(i)}
                  aria-label={`Ir a imagen ${i + 1}`}
                />
              ))}
            </div>

            <button
              className={`gallery-btn${!canNext ? " disabled" : ""}`}
              onClick={scrollNext}
              aria-label="Siguiente"
            >›</button>
          </div>
        </div>

        {/* Right — Embla carousel */}
        <div className="gallery-right">
          <div className="gallery-viewport" ref={emblaRef}>
            <div className="gallery-track">
              {images.map((img, index) => (
                <div className="gallery-slide" key={index}>
                  <img src={img.src} alt={img.alt} loading="lazy" decoding="async" />
                  <div className="gallery-caption-bar">
                    <p className="gallery-caption">{img.caption}</p>
                    <span className="gallery-count">{index + 1} / {images.length}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
