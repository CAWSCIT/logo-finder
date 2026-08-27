import { useState } from "react";

import imageList from "../image_list.js";
import { languages } from "./languages.js";
import Lightbox from "./Lightbox.jsx";
import { handleDownloadClick } from "./download.js";
import { DownloadArrowIcon } from "./icons.jsx";

// Group filenames by language (the language is everything before the first
// ' - ', so multi-word names such as 'French Canadian' stay intact).
function groupByLanguage(filenames) {
  const groups = {};
  filenames.forEach((file) => {
    const language = file.split(" - ")[0].trim();
    if (!groups[language]) groups[language] = [];
    groups[language].push(file);
  });
  return groups;
}

const grouped = groupByLanguage(imageList);

// Preferred order first, then anything new that isn't listed yet.
const orderedLanguages = [
  ...languages.filter((lang) => grouped[lang]),
  ...Object.keys(grouped)
    .filter((lang) => !languages.includes(lang))
    .sort(),
];

/**
 * The logo browser itself: one horizontally scrolling row per language, each
 * card linking to the PNG and the matching PDF.
 *
 * @param {string} baseUrl            Where `img/`, `img/thumbnail/` and `pdf/` live.
 *                                    Must end with a slash.
 * @param {Element} [lightboxContainer] Node to portal the lightbox into. The
 *                                    embeddable build passes a shadow root so
 *                                    the overlay escapes any transformed
 *                                    ancestor on the host page.
 */
export default function LogoGrid({ baseUrl = "/", lightboxContainer }) {
  const [openImage, setOpenImage] = useState(null);

  return (
    <div className="ca-logos">
      {orderedLanguages.map((lang) => (
        <section key={lang} className="ca-logos__group">
          <h2 className="ca-logos__heading">{lang} Logos</h2>
          <div className="ca-logos__row">
            {grouped[lang].map((file) => (
              <div key={file} className="ca-logos__card">
                <img
                  className="ca-logos__thumb"
                  src={`${baseUrl}img/thumbnail/${encodeURIComponent(file)}`}
                  alt={file}
                  loading="lazy"
                  onClick={() => setOpenImage(file)}
                />
                <div className="ca-logos__downloads">
                  <a
                    href={`${baseUrl}img/${encodeURIComponent(file)}`}
                    download
                    onClick={handleDownloadClick}
                  >
                    Image <DownloadArrowIcon className="ca-logos__icon" />
                  </a>
                  <a
                    href={`${baseUrl}pdf/${encodeURIComponent(
                      file.replace(".png", ".pdf")
                    )}`}
                    download
                    onClick={handleDownloadClick}
                  >
                    PDF <DownloadArrowIcon className="ca-logos__icon" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      {openImage && (
        <Lightbox
          src={`${baseUrl}img/${encodeURIComponent(openImage)}`}
          alt={openImage}
          onClose={() => setOpenImage(null)}
          container={lightboxContainer}
        />
      )}
    </div>
  );
}
