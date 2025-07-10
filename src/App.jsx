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
