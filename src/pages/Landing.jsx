import { useEffect } from "react";
import Hero from "../components/Hero.jsx";
import About from "../components/About.jsx";
import Skills from "../components/Skills.jsx";
import Projects from "../components/Projects.jsx";
import Publications from "../components/Publications.jsx";
import Experience from "../components/Experience.jsx";
import Footer from "../components/Footer.jsx";

export default function Landing() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Publications />
      <Experience />
      <Footer />
    </>
  );
}
