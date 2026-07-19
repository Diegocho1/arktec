import { useRef } from 'react';
import { useViewTransition } from '../../hooks/useViewTransition.js';

export function ProjectCard({ project, index }) {
  const navigate = useViewTransition();
  const imgRef   = useRef(null);

  return (
    <article
      className="project-card"
      style={{ '--delay': `${index * 0.08}s` }}
      aria-label={`Proyecto: ${project.title}`}
      onClick={() => navigate(`/proyecto/${project.id}`, imgRef.current)}
    >
      <div className="project-card__image-wrap">
        <img
          ref={imgRef}
          src={project.coverImage}
          alt={project.title}
          className="project-card__image"
          loading="lazy"
        />
      </div>
      <div className="project-card__hover">
        <h3 className="project-card__title">{project.title}</h3>
        <span className="project-card__meta">{project.location} · {project.year}</span>
      </div>
    </article>
  );
}