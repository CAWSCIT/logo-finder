import './App.css'
import { HashRouter, Routes, Route, Outlet, NavLink } from "react-router-dom";

import Logos from "./components/Logos";
import BrandGuidelines from "./components/BrandGuidelines";


export function TabsLayout() {
  const tabClass = ({ isActive }) =>
    `${
      isActive ? "active-navlink" : ""
    }`;

  return (
    <div>
      <div>
        <h1 className="title">Cocaine Anonymous Logo Finder</h1>
        <h4 className="subtitle">View and download official Cocaine Anonynous logos.</h4>
        <div className="header-description">
          <p>Please note that the logos in the provided link are currently trademarked and officially registered by CAWSO, Inc. and CAWS.</p>
          <p>There are multiple approved variations available for area(s), events, and regional use. If you require or are seeking access to these logos, they are available in the individual areas’ sites.  In accordance, to make available an area logo approved by the conference in 2019, we ask that you click on <a href="https://ca.org/meetings/">ca.org/meetings</a> and locate the area of which you would like to use their logo and feel free to use it in accordance with 2025 C.A. Brand Guidelines for logo usage.</p>
        </div>
        <div className="" style={{ textAlign: 'center', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8, justifyContent: 'center', marginBottom: 16, fontSize: '1.05rem' }}>
          <NavLink to="" className={tabClass}>View Logos</NavLink>
          <NavLink to="brand-guidelines" className={tabClass}>View Guidelines</NavLink>
        </div>
      </div>
      <div>
        {/* Whatever the current tab should display */}
        <Outlet />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <Routes>
        {/* Route wrapper for tabbed layout */}
        <Route path="/" element={<TabsLayout />}>
          <Route index element={<Logos />} />
          <Route path="brand-guidelines" element={<BrandGuidelines />} />
        </Route>

        {/* …other non-tab routes… */}
      </Routes>
    </HashRouter>
  );
}
