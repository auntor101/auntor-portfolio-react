import { Routes, Route, useLocation } from "react-router-dom";
import Nav from "./components/Nav.jsx";
import Landing from "./pages/Landing.jsx";
import ProjectPage from "./pages/ProjectPage.jsx";

export default function App() {
  const loc = useLocation();
  const onProject = loc.pathname.startsWith("/project/");
  return (
    <>
      <Nav onProject={onProject} />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/project/:id" element={<ProjectPage />} />
        <Route path="*" element={<Landing />} />
      </Routes>
    </>
  );
}
