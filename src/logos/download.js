/*
 * `<a download>` is silently ignored for cross-origin URLs, so an embedded copy
 * of this widget would open the PNG/PDF in a tab instead of downloading it.
 * GitHub Pages serves the assets with `Access-Control-Allow-Origin: *`, so we
 * can fetch them and hand the browser a same-origin blob instead.
 */

function isCrossOrigin(href) {
  try {
    return new URL(href, document.location.href).origin !== document.location.origin;
  } catch {
    return false;
  }
}

function saveBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.style.display = "none";
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  // Give the browser a moment to start the download before dropping the blob.
  setTimeout(() => URL.revokeObjectURL(url), 10000);
}

/**
 * Click handler for a download link. Same-origin links keep the native
 * behaviour; cross-origin links are fetched and saved as a blob.
 */
export function handleDownloadClick(event) {
  const href = event.currentTarget.getAttribute("href");
  if (!href || !isCrossOrigin(href)) return; // native `download` already works

  event.preventDefault();
  const filename = decodeURIComponent(href.split("/").pop().split("?")[0]);

  fetch(href)
    .then((response) => {
      if (!response.ok) throw new Error(`HTTP ${response.status} from ${href}`);
      return response.blob();
    })
    .then((blob) => saveBlob(blob, filename))
    .catch((error) => {
      console.error("Logo download failed, opening in a new tab instead.", error);
      window.open(href, "_blank", "noopener");
    });
}
