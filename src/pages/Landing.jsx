import { useEffect } from "react";
import Hero from "../components/Hero.jsx";
import { About, Experience } from "../components/Story.jsx";
import Research from "../components/Research.jsx";
import Projects from "../components/Projects.jsx";
import { Skills, Contact } from "../components/Contact.jsx";

export default function Landing() {
  useEffect(() => {
    window.scrollTo(0, 0);
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && (e.target.classList.add("in"), io.unobserve(e.target))), { rootMargin: "0px 0px -8% 0px" });
    document.querySelectorAll(".rv").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return (
    <main id="main">
      <Hero />
      <About />
      <Experience />
      <Research />
      <Projects />
      <Skills />
      <Contact />
    </main>
  );
}
