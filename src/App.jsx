import { Routes, Route, useLocation } from "react-router-dom";
import Nav from "./components/Nav.jsx";
import Landing from "./pages/Landing.jsx";
import ProjectPage from "./projects/ProjectPage.jsx";

export default function App() {
  const onProject = useLocation().pathname.startsWith("/project/");
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Nav onProject={onProject} />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/project/:id" element={<ProjectPage />} />
        <Route path="*" element={<Landing />} />
      </Routes>
    </>
  );
}
