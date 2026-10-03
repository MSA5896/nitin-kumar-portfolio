import Hero from '../components/sections/Hero'
import Stats from '../components/sections/Stats'
import About from '../components/sections/About'
import Services from '../components/sections/Services'
import FeaturedProject from '../components/sections/FeaturedProject'
import Projects from '../components/sections/Projects'
import Experience from '../components/sections/Experience'
import QualityWork from '../components/sections/QualityWork'
import Skills from '../components/sections/Skills'
import WhyWorkWithMe from '../components/sections/WhyWorkWithMe'
import GitHubSection from '../components/sections/GitHubSection'
import Certifications from '../components/sections/Certifications'
import NotesPreview from '../components/sections/NotesPreview'
import Resume from '../components/sections/Resume'
import BusinessCta from '../components/sections/BusinessCta'
import Contact from '../components/sections/Contact'
import { usePageMeta } from '../hooks/usePageMeta'

export default function Home() {
  usePageMeta({
    description:
      'Nitin Kumar is a QA and manufacturing engineer in medical-device manufacturing (M.Tech, IIT Bhilai) building practical Python, AI automation, data analytics and IoT solutions. Open to part-time and full-time freelance projects.',
  })

  return (
    <>
      <Hero />
      <Stats />
      <About />
      <Services />
      <FeaturedProject />
      <Projects />
      <Experience />
      <QualityWork />
      <Skills />
      <WhyWorkWithMe />
      <GitHubSection />
      <Certifications />
      <NotesPreview />
      <Resume />
      <BusinessCta />
      <Contact />
    </>
  )
}
