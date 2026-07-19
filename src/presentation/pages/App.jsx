import { Routes, Route } from 'react-router-dom';
import { Navbar }           from '../components/layout/Navbar.jsx';
import { Footer }           from '../components/layout/Footer.jsx';
import { SocialSidebar }    from '../components/common/SocialSidebar.jsx';
import { HeroSection }      from '../components/sections/HeroSection.jsx';
import { AboutSection }     from '../components/sections/AboutSection.jsx';
import { PortfolioSection } from '../components/sections/PortfolioSection.jsx';
import { ServicesSection }  from '../components/sections/ServicesSection.jsx';
import { ContactSection }   from '../components/sections/ContactSection.jsx';
import { ProjectPage }      from './ProjectPage.jsx';

function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <PortfolioSection />
      <ServicesSection />
      <ContactSection />
    </>
  );
}

export default function App() {
  return (
    <>
      <Navbar />
      <SocialSidebar />
      <main>
        <Routes>
          <Route path="/"              element={<HomePage />} />
          <Route path="/proyecto/:id" element={<ProjectPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}