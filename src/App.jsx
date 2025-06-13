import ModalImage from "react-modal-image";
import './App.css'


const imageFiles = [
  "Chinese - Black Outline - Transparent Background - Inner TM.png",
  "Chinese - Black Outline - Transparent Background - Outer TM.png",
  "Chinese - Black Outline - White Background - Inner TM.png",
  "Chinese - Black Outline - White Background - Outer TM.png",
  "Chinese - Green Outline - Transparent Background - Inner TM.png",
  "Chinese - Green Outline - Transparent Background - Outer TM.png",
  "Chinese - Green Outline - White Background - Inner TM.png",
  "Chinese - Green Outline - White Background - Outer TM.png",
  "Chinese - White Outline - Green Background - Inner TM.png",
  "Chinese - White Outline - Green Background - Outer TM.png",
  "Chinese - White Outline - Transparent Background - Inner TM.png",
  "Chinese - White Outline - Transparent Background - Outer TM.png",
  "Danish - Black Outline - Transparent Background - Inner TM.png",
  "Danish - Black Outline - Transparent Background - Outer TM.png",
  "Danish - Black Outline - White Background - Inner TM.png",
  "Danish - Black Outline - White Background - Outer TM.png",
  "Danish - Green Outline - Transparent Background - Inner TM.png",
  "Danish - Green Outline - Transparent Background - Outer TM.png",
  "Danish - Green Outline - White Background - Inner TM.png",
  "Danish - Green Outline - White Background - Outer TM.png",
  "Danish - White Outline - Green Background - Inner TM.png",
  "Danish - White Outline - Green Background - Outer TM.png",
  "Danish - White Outline - Transparent Background - Inner TM.png",
  "Danish - White Outline - Transparent Background - Outer TM.png",
  "Dutch - Black Outline - Transparent Background - Inner TM.png",
  "Dutch - Black Outline - Transparent Background - Outer TM.png",
  "Dutch - Black Outline - White Background - Inner TM.png",
  "Dutch - Black Outline - White Background - Outer TM.png",
  "Dutch - Green Outline - Transparent Background - Inner TM.png",
  "Dutch - Green Outline - Transparent Background - Outer TM.png",
  "Dutch - Green Outline - White Background - Inner TM.png",
  "Dutch - Green Outline - White Background - Outer TM.png",
  "Dutch - White Outline - Green Background - Inner TM.png",
  "Dutch - White Outline - Green Background - Outer TM.png",
  "Dutch - White Outline - Transparent Background - Inner TM.png",
  "Dutch - White Outline - Transparent Background - Outer TM.png",
  "English - Black Outline - Transparent Background - Inner R.png",
  "English - Black Outline - White Background - Inner R.png",
  "English - Black Outline - White Background - Outer R.png",
  "English - Green Outline - Transparent Background - Outer R.png",
  "English - Green Outline - White Background - Inner R.png",
  "English - Green Outline - White Background - Outer R.png",
  "English - White Outline - Green Background - Inner R.png",
  "English - White Outline - Green Background - Outer R.png",
  "English - White Outline - Transparent Background - Inner R.png",
  "English - White Outline - Transparent Background - Outer R.png",
  "English - White Outline - Green Background - Inner R.png",
  "English - White Outline - Green Background - Outer R.png",
  "Farsi - Black Outline - Transparent Background - Inner TM.png",
  "Farsi - Black Outline - Transparent Background - Outer TM.png",
  "Farsi - Black Outline - White Background - Inner TM.png",
  "Farsi - Black Outline - White Background - Outer TM.png",
  "Farsi - Green Outline - Transparent Background - Inner TM.png",
  "Farsi - Green Outline - Transparent Background - Outer TM.png",
  "Farsi - Green Outline - White Background - Inner TM.png",
  "Farsi - Green Outline - White Background - Outer TM.png",
  "Farsi - White Outline - Green Background - Inner TM.png",
  "Farsi - White Outline - Green Background - Outer TM.png",
  "Farsi - White Outline - Transparent Background - Inner TM.png",
  "Farsi - White Outline - Transparent Background - Outer TM.png",
  "French - Black Outline - Transparenet Background - Inner TM.png",
  "French - Black Outline - Transparent Background - Outer TM.png",
  "French - Black Outline - White Background - Inner TM.png",
  "French - Black Outline - White Background - Outer TM.png",
  "French - Green Outline - Transparenet Background - Inner TM.png",
  "French - Green Outline - Transparent Background - Outer TM.png",
  "French - Green Outline - White Background - Inner TM.png",
  "French - Green Outline - White Background - Outer TM.png",
  "French - White Outline - Green Background - Inner TM.png",
  "French - White Outline - Green Background - Outer TM.png",
  "French - White Outline - Transparenet Background - Inner TM.png",
  "French - White Outline - Transparent Background - Outer TM.png",
  "French Canadian - Black Outline - Transparenet Background - Outer TM.png",
  "French Canadian - Black Outline - Transparent Background - Inner TM.png",
  "French Canadian - Black Outline - White Background - Inner TM.png",
  "French Canadian - Black Outline - White Background - Outer TM.png",
  "French Canadian - Green Outline - Transparenet Background - Outer TM.png",
  "French Canadian - Green Outline - Transparent Background - Inner TM.png",
  "French Canadian - Green Outline - White Background - Inner TM.png",
  "French Canadian - Green Outline - White Background - Outer TM.png",
  "French Canadian - White Outline - Green Background - Inner TM.png",
  "French Canadian - White Outline - Green Background - Outer TM.png",
  "French Canadian - White Outline - Transparenet Background - Outer TM.png",
  "French Canadian - White Outline - Transparent Background - Inner TM.png",
  "German - Black Outline - Transparent Background - Inner TM.png",
  "German - Black Outline - Tranparent Background - Outer TM.png",
  "German - Black Outline - White Background - Inner TM.png",
  "German - Black Outline - White Background - Outer TM.png",
  "German - Green Outline - Transparent Background - Inner TM.png",
  "German - Green Outline - Tranparent Background - Outer TM.png",
  "German - Green Outline - White Background - Inner TM.png",
  "German - Green Outline - White Background - Outer TM.png",
  "German - White Outline - Green Background - Inner TM.png",
  "German - White Outline - Green Background - Outer TM.png",
  "German - White Outline - Tranparent Background - Outer TM.png",
  "German - White Outline - Transparent Background - Inner TM.png",
  "Italian - Black Outline - Transparent Background - Inner TM.png",
  "Italian - Black Outline - Transparent Background - Outer TM.png",
  "Italian - Black Outline - White Background - Inner TM.png",
  "Italian - Black Outline - White Background - Outer TM.png",
  "Italian - Green Outline - Transparent Background - Inner TM.png",
  "Italian - Green Outline - Transparent Background - Outer TM.png",
  "Italian - Green Outline - White Background - Inner TM.png",
  "Italian - Green Outline - White Background - Outer TM.png",
  "Italian - White Outline - Green Background - Inner TM.png",
  "Italian - White Outline - Green Background - Outer TM.png",
  "Italian - White Outline - Transparent Background - Inner TM.png",
  "Italian - White Outline - Transparent Background - Outer TM.png",
  "Portuguese - Black Outline - Transparent Background - Inner TM.png",
  "Portuguese - Black Outline - Transparent Background - Outer TM.png",
  "Portuguese - Black Outline - White Background - Inner TM.png",
  "Portuguese - Black Outline - White Background - Outer TM.png",
  "Portuguese - Green Outline - Transparent Background - Inner TM.png",
  "Portuguese - Green Outline - Transparent Background - Outer TM.png",
  "Portuguese - Green Outline - White Background - Inner TM.png",
  "Portuguese - Green Outline - White Background - Outer TM.png",
  "Portuguese - White Outline - Green Background - Inner TM.png",
  "Portuguese - White Outline - Green Background - Outer TM.png",
  "Portuguese - White Outline - Transparent Background - Inner TM.png",
  "Portuguese - White Outline - Transparent Background - Outer TM.png",
  "Russian - Black Outline - Transparent Background - Inner TM.png",
  "Russian - Black Outline - Transparent Background - Outer TM.png",
  "Russian - Black Outline - White Background - Inner TM.png",
  "Russian - Black Outline - White Background - Outer TM.png",
  "Russian - Green Outline - Transparent Background - Inner TM.png",
  "Russian - Green Outline - Transparent Background - Outer TM.png",
  "Russian - Green Outline - White Background - Inner TM.png",
  "Russian - Green Outline - White Background - Outer TM.png",
  "Russian - White Outline - Green Background - Inner TM.png",
  "Russian - White Outline - Green Background - Outer TM.png",
  "Russian - White Outline - Transparent Background - Inner TM.png",
  "Russian - White Outline - Transparent Background - Outer TM.png",
  "Swedish - Black Outline - Transparent Background - Inner TM.png",
  "Swedish - Black Outline - Transparent Background - Outer TM.png",
  "Swedish - Black Outline - White Background - Inner TM.png",
  "Swedish - Black Outline - White Background - Outer TM.png",
  "Swedish - Green Outline - Transparent Background - Inner TM.png",
  "Swedish - Green Outline - Transparent Background - Outer TM.png",
  "Swedish - Green Outline - White Background - Inner TM.png",
  "Swedish - Green Outline - White Background - Outer TM.png",
  "Swedish - White Outline - Green Background - Inner TM.png",
  "Swedish - White Outline - Green Background - Outer TM.png",
  "Swedish - White Outline - Transparent Background - Inner TM.png",
  "Swedish - White Outline - Transparent Background - Outer TM.png",
  "Thai - Black Outline - Transparent Background - Inner TM.png",
  "Thai - Black Outline - Transparent Background - Outer TM.png",
  "Thai - Black Outline - White Background - Inner TM.png",
  "Thai - Black Outline - White Background - Outer TM.png",
  "Thai - Green Outline - Transparent Background - Inner TM.png",
  "Thai - Green Outline - Transparent Background - Outer TM.png",
  "Thai - Green Outline - White Background - Inner TM.png",
  "Thai - Green Outline - White Background - Outer TM.pdf.png",
  "Thai - White Outline - Green Background - Inner TM.png",
  "Thai - White Outline - Green Background - Outer TM.png",
  "Thai - White Outline - Transparent Background - Inner TM.png",
  "Thai - White Outline - Transparent Background - Outer TM.png",
  "Welsh - Black Outline - Transparent Background - Outer TM.png",
  "Welsh - Black Outline - White Background - Inner TM.png",
  "Welsh - Black Outline - White Background - Outer TM.png",
  "Welsh - Green Outline - Transparent Background - Inner TM.png",
  "Welsh - Green Outline - Transparent Background - Outer TM.png",
  "Welsh - Green Outline - White Background - Inner TM.png",
  "Welsh - Green Outline - White Background - Outer TM.png",
  "Welsh - White Outline - Green Background - Inner TM.png",
  "Welsh - White Outline - Green Background - Outer TM.png",
  "Welsh - White Outline - Transparent Background - Inner TM.png",
  "Welsh - White Outline - Transparent Background - Outer TM.png"
];

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

const grouped = groupByLanguage(imageFiles);

// For consistent language ordering:
const languages = [
  "English",
  "French",
  "Spanish",
  "Danish",
  "Dutch",
  "Chinese",
  "Portuguese",
  "Swedish",
  "Welsh",
  "French Canadian",
  "Italian",
  "Farsi",
  "German",
  "Thai",
  "Russian",
];

export default function App() {
  return (
    <div style={{ padding: 32, fontFamily: "sans-serif", maxWidth: "100vw" }}>
      <h1 class="title">Cocaine Anonymous Logo Finder</h1>
      <h4 class="subtitle">Click an image to view it, then download it.</h4>

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
                    style={{
                      minWidth: 200,
                      maxWidth: 200,
                      borderRadius: 10,
                      boxShadow: "0 2px 6px rgba(0,0,0,0.07)",
                      background: "#fff",
                      overflow: "hidden",
                      textAlign: "center",
                    }}
                  >
                    <ModalImage
                      small={`/img/${file}`}
                      large={`/img/${file}`}
                      alt={file}
                      className="transparent-bg"
                      imageBackgroundColor="transparent"
                      loading="lazy"
                      style={{
                        width: "100%",
                        height: 120,
                        objectFit: "contain",
                        background: "#eee",
                        display: "block",
                      }}
                    />
                    <div
                      style={{
                        fontSize: 12,
                        padding: 6,
                        whiteSpace: "normal",
                      }}
                    >
                      {file
                        .replace(`${lang} - `, "")
                        .replace(".png", "")
                        .replace(/-/g, "–")}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null
      )}
    </div>
  );
}
