import LogoGrid from "../logos/LogoGrid.jsx";
import "../logos/logos.css";

// The "View Logos" tab of the standalone site. The grid itself is shared with
// the embeddable build (src/embed/embed.jsx) so both stay in sync.
export default function Logos() {
  return <LogoGrid baseUrl={import.meta.env.BASE_URL} />;
}
