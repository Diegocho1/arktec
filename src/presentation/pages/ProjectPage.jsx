import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProjects } from '../hooks/useProjects.js';
import { useViewTransition } from '../hooks/useViewTransition.js';

export function ProjectPage() {
  const { id }                        = useParams();
  const navigateFn                    = useNavigate();
  const navigate                      = useViewTransition();
  const { projects, loading }         = useProjects();
  const [heroVisible, setHeroVisible] = useState(false);
  const imgRef                        = useRef(null);

  const project = projects.find(p => p.id === id) ?? null;

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 200);
    return () => clearTimeout(t);
  }, [id]);

  if (loading) return <div className="project-page__loading">Cargando...</div>;
  if (!project) return (
    <div className="project-page__not-found">
      <p>Proyecto no encontrado.</p>
      <button onClick={() => navigateFn('/')}>← Volver</button>
    </div>
  );

  return (
    <div className="project-page">
      <button
        className="project-page__back"
        onClick={() => navigate('/', imgRef.current)}
      >
        ← Proyectos
      </button>

      <div className={`project-page__hero ${heroVisible ? 'project-page__hero--visible' : ''}`}>
        <img
          ref={imgRef}
          src={project.coverImage}
          alt={project.title}
        />
      </div>

      <div className="project-page__header">
        <div className="project-page__meta">
          <span>{project.category}</span>
          <span>{project.location}</span>
          <span>{project.year}</span>
        </div>
        <h1 className="project-page__title">{project.title}</h1>
      </div>

      <div className="project-page__body">
        <p className="project-page__description">{project.description}</p>
      </div>

      {project.images.length > 0 && (
        <div className="project-page__gallery">
          {project.images.map((src, i) => (
            <div key={i} className="project-page__gallery-item">
              <img src={src} alt={`${project.title} — imagen ${i + 1}`} loading="lazy" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}