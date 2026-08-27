import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { handleDownloadClick } from "./download.js";
import {
  CloseIcon,
  DownloadIcon,
  SpinnerIcon,
  ZoomInIcon,
  ZoomOutIcon,
} from "./icons.jsx";

/*
 * A drop-in replacement for `react-modal-image`, matching its behaviour:
 * click outside the image or press ESC/ENTER to close, double-click (or the
 * magnifier) to zoom, drag to pan while zoomed, and a download button that
 * copes with cross-origin files.
 *
 * We render our own instead of using the library because `react-modal-image`
 * appends its stylesheet to `document.head`, which never applies inside the
 * Shadow DOM the embeddable build mounts into.
 */
export default function Lightbox({ src, alt, onClose, container }) {
  const [loading, setLoading] = useState(true);
  const [zoomed, setZoomed] = useState(false);
  const [move, setMove] = useState({ x: 0, y: 0 });
  const moveStart = useRef(null);
  const contentRef = useRef(null);

  // ESC / ENTER closes, matching the previous lightbox.
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape" || event.key === "Enter") onClose();
    };
    document.addEventListener("keydown", onKeyDown, false);
    return () => document.removeEventListener("keydown", onKeyDown, false);
  }, [onClose]);

  // Lock page scrolling while the lightbox is open, then restore it. The
  // library did this with a `body { overflow: hidden }` rule, which a
  // shadow-scoped stylesheet cannot express.
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  const coordinatesOverImage = useCallback((event) => {
    const point = event.changedTouches ? event.changedTouches[0] : event;
    if (!point.target.classList?.contains("ca-lightbox__img")) return null;
    const rect = contentRef.current.getBoundingClientRect();
    return { x: point.clientX - rect.left, y: point.clientY - rect.top };
  }, []);

  const handleDown = (event) => {
    if (event.touches && event.touches.length > 1) return; // pinch, ignore
    const coords = coordinatesOverImage(event);
    if (!coords) {
      onClose(); // clicked the backdrop
      return;
    }
    if (!zoomed) return; // panning is only possible while zoomed
    event.preventDefault();
    moveStart.current = { x: coords.x - move.x, y: coords.y - move.y };
  };

  const handleMove = (event) => {
    if (!zoomed || !moveStart.current) return;
    if (event.touches && event.touches.length > 1) return;
    const coords = coordinatesOverImage(event);
    if (!coords) return;
    event.preventDefault();
    setMove({ x: coords.x - moveStart.current.x, y: coords.y - moveStart.current.y });
  };

  const handleUp = () => {
    moveStart.current = null;
  };

  const toggleZoom = (event) => {
    event.preventDefault();
    setZoomed((wasZoomed) => {
      if (wasZoomed) setMove({ x: 0, y: 0 });
      return !wasZoomed;
    });
  };

  const transform = zoomed
    ? `translate3d(-50%, -50%, 0) translate3d(${move.x}px, ${move.y}px, 0)`
    : "translate3d(-50%, -50%, 0)";

  const modal = (
    <div className="ca-lightbox">
      <div
        className="ca-lightbox__content"
        ref={contentRef}
        onMouseDown={handleDown}
        onMouseUp={handleUp}
        onMouseMove={handleMove}
        onTouchStart={handleDown}
        onTouchEnd={handleUp}
        onTouchMove={handleMove}
      >
        {loading && (
          <div className="ca-lightbox__spinner">
            <SpinnerIcon />
          </div>
        )}
        <img
          className={`ca-lightbox__img ${
            zoomed ? "ca-lightbox__img--zoomed" : "ca-lightbox__img--fit"
          }`}
          src={src}
          alt={alt}
          style={{ transform, WebkitTransform: transform }}
          onLoad={() => setLoading(false)}
          onDoubleClick={toggleZoom}
        />
      </div>
      <div className="ca-lightbox__header">
        <span className="ca-lightbox__menu">
          <a href={src} download onClick={handleDownloadClick} aria-label="Download image">
            <DownloadIcon />
          </a>
          <a
            href="#"
            onClick={toggleZoom}
            aria-label={zoomed ? "Zoom out" : "Zoom in"}
          >
            {zoomed ? <ZoomOutIcon /> : <ZoomInIcon />}
          </a>
          <a
            href="#"
            onClick={(event) => {
              event.preventDefault();
              onClose();
            }}
            aria-label="Close"
          >
            <CloseIcon />
          </a>
        </span>
        {alt && <span className="ca-lightbox__caption">{alt}</span>}
      </div>
    </div>
  );

  return container ? createPortal(modal, container) : modal;
}
