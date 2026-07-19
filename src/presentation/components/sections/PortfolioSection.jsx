import { useProjects } from '../../hooks/useProjects.js';
import { ProjectCard } from '../common/ProjectCard.jsx';

export function PortfolioSection() {
  const { projects, loading, error } = useProjects();

  return (
    <section id="proyectos" className="portfolio">
      <div className="portfolio__inner portfolio__inner--visible">
        <div className="portfolio__header">
          <span className="portfolio__label">Proyectos</span>
          <h2 className="portfolio__title">Nuestro trabajo</h2>
        </div>

        {loading && <p className="portfolio__state">Cargando proyectos...</p>}
        {error   && <p className="portfolio__state portfolio__state--error">Error: {error}</p>}

        {!loading && !error && (
          <div className="portfolio__masonry">
            {projects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}