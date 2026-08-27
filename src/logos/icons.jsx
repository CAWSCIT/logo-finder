/*
 * Inline SVG icons so the embeddable bundle stays self-contained.
 * Lightbox icons are from https://material.io/icons/ (matching the previous
 * react-modal-image chrome); the download arrow is Heroicons' arrow-down-tray.
 */

export function DownloadArrowIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
      />
    </svg>
  );
}

function MaterialIcon({ path, size = 24 }) {
  return (
    <svg
      fill="#ffffff"
      height={size}
      width={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path d={path} />
    </svg>
  );
}

export const ZoomInIcon = () => (
  <MaterialIcon path="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
);

export const ZoomOutIcon = () => (
  <MaterialIcon path="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" />
);

export const DownloadIcon = () => (
  <MaterialIcon path="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
);

export const CloseIcon = () => (
  <MaterialIcon path="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
);

export const SpinnerIcon = () => (
  <MaterialIcon
    size={48}
    path="M6 2v6h.01L6 8.01 10 12l-4 4 .01.01H6V22h12v-5.99h-.01L18 16l-4-4 4-3.99-.01-.01H18V2H6zm10 14.5V20H8v-3.5l4-4 4 4zm-4-5l-4-4V4h8v3.5l-4 4z"
  />
);
