import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import LogoGrid from "../logos/LogoGrid.jsx";
import css from "../logos/logos.css?inline";

/*
 * Embeddable build. Drop this on any page:
 *
 *   <div id="ca-logo-app"></div>
 *   <script src="https://cawscit.github.io/logo-finder/build.js"></script>
 *
 * It renders only the logo browser -- no header, tabs or brand guidelines --
 * inside a Shadow DOM, so the host page's CSS cannot reach in and this
 * widget's CSS cannot leak out.
 */

// Must be read while the script is still executing.
const CURRENT_SCRIPT = document.currentScript;

// Where the logo files live if we can't work it out from the script URL.
const FALLBACK_BASE = "https://cawscit.github.io/logo-finder/";

const DEFAULT_SELECTOR = "#ca-logo-app, [data-ca-logo-app]";
const MOUNTED = "caLogoAppMounted";

/** Directory the script was served from, which is also where img/ and pdf/ live. */
function baseFromScript() {
  const src = CURRENT_SCRIPT?.src;
  if (!src) return null;
  try {
    return new URL(".", src).href;
  } catch {
    return null;
  }
}

function withTrailingSlash(url) {
  return url.endsWith("/") ? url : `${url}/`;
}

/**
 * Asset base, most specific source first:
 *   1. data-base on the mount element
 *   2. data-base on the <script> tag
 *   3. window.CA_LOGO_APP_BASE
 *   4. the directory the script was loaded from
 *   5. the hardcoded GitHub Pages URL
 */
function resolveBaseUrl(element) {
  const candidate =
    element?.getAttribute("data-base") ||
    CURRENT_SCRIPT?.getAttribute("data-base") ||
    window.CA_LOGO_APP_BASE ||
    baseFromScript() ||
    FALLBACK_BASE;
  return withTrailingSlash(new URL(candidate, document.location.href).href);
}

/*
 * Embedded, the grid should sit flush inside whatever content column the host
 * page gives it rather than carrying the standalone site's 32px gutter. The
 * host page can still override it:
 *   #ca-logo-app { --ca-logos-padding: 24px; }
 */
const HOST_DEFAULTS = `:host { --ca-logos-padding: 0 0 8px; display: block; }`;

function createShadowRoot(host) {
  const shadow = host.attachShadow({ mode: "open" });
  const style = document.createElement("style");
  style.textContent = `${HOST_DEFAULTS}\n${css}`;
  shadow.appendChild(style);
  return shadow;
}

/*
 * The lightbox is `position: fixed`, which breaks if any ancestor on the host
 * page has a transform/filter/perspective. Portalling it into a bare element on
 * <body> -- with its own shadow root so it keeps its styles -- sidesteps that.
 */
function createLightboxHost() {
  const host = document.createElement("div");
  host.setAttribute("data-ca-logo-lightbox", "");
  (document.body || document.documentElement).appendChild(host);
  const shadow = createShadowRoot(host);
  const mountPoint = document.createElement("div");
  shadow.appendChild(mountPoint);
  return mountPoint;
}

/**
 * Render the logo browser into `element`.
 * @param {Element} element Container to mount into.
 * @param {{ baseUrl?: string }} [options]
 * @returns {import('react-dom/client').Root|undefined}
 */
export function mount(element, options = {}) {
  if (!element) return undefined;
  if (element.dataset[MOUNTED]) return undefined; // already rendered
  element.dataset[MOUNTED] = "true";

  const baseUrl = options.baseUrl
    ? withTrailingSlash(new URL(options.baseUrl, document.location.href).href)
    : resolveBaseUrl(element);

  let shadow;
  try {
    shadow = createShadowRoot(element);
  } catch (error) {
    // The container already hosts a shadow root, or cannot host one at all.
    console.error(
      "C.A. Logo Finder: could not mount into",
      element,
      "-- use an empty <div>.",
      error
    );
    return undefined;
  }
  const container = document.createElement("div");
  shadow.appendChild(container);

  const root = createRoot(container);
  root.render(
    <StrictMode>
      <LogoGrid baseUrl={baseUrl} lightboxContainer={createLightboxHost()} />
    </StrictMode>
  );
  return root;
}

/**
 * Mount into every matching element on the page.
 * @param {string} [selector]
 */
export function mountAll(selector = DEFAULT_SELECTOR) {
  document.querySelectorAll(selector).forEach((element) => mount(element));
}

function autoMount() {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => mountAll(), { once: true });
  } else {
    mountAll();
  }
}

window.CALogoApp = { mount, mountAll };

autoMount();
