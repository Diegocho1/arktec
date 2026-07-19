import { useState, useEffect } from 'react';
import { LocalProjectRepository } from '../../infrastructure/repositories/LocalProjectRepository.js';
import { GetAllProjects } from '../../application/useCases/GetAllProjects.js';
import { GetProjectsByCategory } from '../../application/useCases/GetProjectsByCategory.js';
import { ProjectService } from '../../application/services/ProjectService.js';

const repository            = new LocalProjectRepository();
const getAllProjects         = new GetAllProjects(repository);
const getProjectsByCategory = new GetProjectsByCategory(repository);
const projectService        = new ProjectService({ getAllProjects, getProjectsByCategory });

// Module-level cache — persists across renders and route changes
let projectsCache = null;

export function useProjects(category = null) {
  const [projects, setProjects] = useState(projectsCache ?? []);
  const [loading, setLoading]   = useState(projectsCache === null);
  const [error, setError]       = useState(null);

  useEffect(() => {
    if (projectsCache) {
      setProjects(
        category
          ? projectsCache.filter(p => p.category === category)
          : projectsCache
      );
      setLoading(false);
      return;
    }

    setLoading(true);
    projectService
      .fetchByCategory(category)
      .then(data => {
        projectsCache = data;
        setProjects(data);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [category]);

  return { projects, loading, error };
}