import { Link } from "react-router-dom";
import { languages } from "./Logos";


export default function BrandGuidelines() {
  return (
    <div className="brand-guidelines">
        <h2>Brand Guidelines</h2>
        <p style={{ marginTop: 10 }}>Useful tips and tricks for using the Cocaine Anonymous logo the <em>proper</em> way.</p>
        <p style={{ marginTop: 10 }}><a href="https://pi.ca.org/wp-content/uploads/2022/12/CA-Brand-Guide-2022.2_.pdf" target="_blank">Click here</a> to see the official Brand Guidelines document.</p>

        <p style={{ marginTop: 10 }}><strong>General Guidelines:</strong></p>
        <ul style={{ marginLeft: 30 }}>
            <li>A solid color must always be used for the logo background.</li>
            <li>The logo should not be altered or distorted in any way.</li>
            <li>Clear space around the logo must be maintained.</li>
            <li>Do not scale, distort, rotate or warp the logo in any way.</li>
            <li>Do not add effects that overlap or alter the logo.</li>
            <li>The block letters “CA” should not be used alone. The shortened form of Cocaine Anonymous is C.A.</li>
            <li>Do not change the typeface nor recreate or manipulate the logo.</li>
            <li>No other text or design element may touch, overlap or show through behind the logo other than a solid color.</li>
            <li>Every logo must have the appropriate trademark or registered symbol (™ or ®) as required.</li>
            <li>Use the logos available <Link to="/">on the logos page</Link>.</li>
        </ul>

        <p style={{ marginTop: 10 }}>
            There are {languages.length} languages available for the Cocaine Anonymous logo with 12 variations per logo.
        </p>
    </div>
  )
};
