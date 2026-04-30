
interface MapProps {
  tag: string;
  title: string;
  subtitle: string;
  address: string;
  phone: string;
  email: string;
  embedSrc: string;
}


export default function MapReact({ tag, title, subtitle, address, phone, email, embedSrc }: MapProps) {
  return (
    <section className="map-section" id="ubicacion">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">{tag}</span>
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>
      </div>

      <div className="map-wrapper">
        {/* Transparent overlay — captures clicks to open Maps, blocks scroll/drag */}
        <a
          href="https://maps.app.goo.gl/z2PdT1GQfqDoyKWB6"
          target="_blank"
          rel="noopener noreferrer"
          className="map-overlay"
          aria-label="Abrir en Google Maps"
        >
          <span className="map-overlay-hint">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
            Abrir en Google Maps
          </span>
        </a>

        <iframe
          src={embedSrc}
          width="100%"
          height="450"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Mapa de ubicación"
        />

        {/* Info panel */}
        <div className="map-info-panel">
          <ul>
            <li>
              <span>📍</span>
              <span>{address}</span>
            </li>
            <li>
              <span>📞</span>
              <a href={`tel:${phone.replace(/\s/g, "")}`}>{phone}</a>
            </li>
            <li>
              <span>✉️</span>
              <a href={`mailto:${email}`}>{email}</a>
            </li>
          </ul>
        </div>
      </div>

      <style>{`
        .map-section {
          padding: 6rem 0 0;
          background: #FBFAF2;
        }
        .section-header {
          text-align: center;
          margin-bottom: 3rem;
        }
        .section-tag {
          display: inline-block;
          color: #E86D2D;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin-bottom: 0.75rem;
        }
        .section-header h2 {
          font-size: clamp(1.8rem, 3.5vw, 2.75rem);
          font-weight: 800;
          color: #8B452D;
          margin-bottom: 0.75rem;
        }
        .section-header p {
          color: #4A4A4A;
          font-size: 1.05rem;
          max-width: 500px;
          margin: 0 auto;
        }
        .map-wrapper {
          position: relative;
          overflow: hidden;
          filter: grayscale(20%) contrast(1.05);
          max-width: 900px;
          margin: 0 auto;
          border-radius: 16px;
          cursor: pointer;
        }
        .map-wrapper iframe {
          display: block;
          border: 0;
          pointer-events: none;
        }

        /* ── Transparent overlay ── */
        .map-overlay {
          position: absolute;
          inset: 0;
          z-index: 10;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding-top: 1.5rem;
          text-decoration: none;
        }
        .map-overlay-hint {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: #FBFAF2;
          color: #0B1215;
          font-size: 0.875rem;
          font-weight: 600;
          padding: 0.55rem 1.1rem;
          border-radius: 50px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.15);
          opacity: 0;
          transform: translateY(-6px);
          transition: opacity 0.25s ease, transform 0.25s ease;
          pointer-events: none;
        }
        .map-overlay:hover .map-overlay-hint {
          opacity: 1;
          transform: translateY(0);
        }

        /* ── Static info strip ── */
        .map-info-panel {
          background: #FBFAF2;
          padding: 1.25rem 2rem;
          box-shadow: 0 -4px 20px rgba(0,0,0,0.06);
          border-top: 1px solid rgba(139, 69, 45, 0.1);
        }
        .map-info-panel ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-wrap: wrap;
          gap: 1.25rem;
          justify-content: center;
        }
        .map-info-panel li {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #4A4A4A;
          font-size: 0.9rem;
        }
        .map-info-panel a {
          color: #C2843E;
          text-decoration: none;
          font-weight: 600;
        }
        .map-info-panel a:hover {
          text-decoration: underline;
        }
      `}</style>
    </section>
  );
}
