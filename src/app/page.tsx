import LeftRail from './components/LeftRail';
import Hero from './components/Hero';
import AboutCard from './components/AboutCard';
import Experience from './components/Experience';
import ProjectsBlock from './components/ProjectsBlock';
import SkillGroups from './components/SkillGroups';
import Connect from './components/Connect';

export default function Home() {
  return (
    <div className="min-h-screen bg-ink bg-grid">
      <LeftRail />
      <main className="md:ml-[33.3333%]">
        <Hero />
        <AboutCard />
        <Experience />
        <ProjectsBlock />
        <SkillGroups />
        <Connect />
      </main>
    </div>
  );
}
