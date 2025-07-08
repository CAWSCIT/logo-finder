import ModalImage from "react-modal-image";
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline'
import imageList from '../image_list.js';

// Helper: Group filenames by language (assumes language is first word(s) before ' - ')
function groupByLanguage(filenames) {
  const groups = {};
  filenames.forEach((file) => {
    // Get language (can be more than one word, e.g., 'French Canadian')
    const language = file.split(" - ")[0].trim();
    if (!groups[language]) groups[language] = [];
    groups[language].push(file);
  });
  return groups;
}

const grouped = groupByLanguage(imageList);

// For consistent language ordering:
export const languages = [
  "English",
  "French",
  "French Canadian",
  "Spanish",
  "Danish",
  "Dutch",
  "Chinese",
  "Portuguese",
  "Swedish",
  "Welsh",
  "Italian",
  "Farsi",
  "German",
  "Thai",
  "Russian",
  "Polish",
  "Gaelic",
  "Norwegian",
];


// Create the Logos component
export default function Logos() {
  return (
    <div className="logos">
      {languages.map((lang) =>
        grouped[lang] ? (

          <div key={lang} style={{ marginBottom: 40 }}>
            <h2 style={{ marginBottom: 16 }}>{lang} Logos</h2>
            <div key={lang} className="image-row">
              <div
                style={{
                  display: "flex",
                  overflowX: "auto",
                  gap: 12,
                  paddingBottom: 8,
                }}
              >
                {grouped[lang].map((file) => (
                  <div
                    key={file}
                    className="image-container"
                  >
                    <ModalImage
                      small={`${import.meta.env.BASE_URL}img/thumbnail/${file}`}
                      large={`${import.meta.env.BASE_URL}img/${file}`}
                      alt={file}
                      className="transparent-bg"
                      imageBackgroundColor="transparent"
                      loading="lazy"
                    />
                    {/* <div
                      className="image-caption"
                    >
                      {file
                        .replace(`${lang} - `, "")
                        .replace(".png", "")
                        .replace(/-/g, "–")}
                    </div> */}
                    <div className="download-buttons">
                      <a href={`${import.meta.env.BASE_URL}img/${file}`} download>
                        Image <ArrowDownTrayIcon className="icon" />
                      </a>
                      <a href={`${import.meta.env.BASE_URL}pdf/${file.replace(".png", ".pdf")}`} download>
                        PDF <ArrowDownTrayIcon className="icon" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null
      )}
    </div>
  )
};
