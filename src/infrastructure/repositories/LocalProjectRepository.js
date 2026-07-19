import { IProjectRepository } from '../../domain/repositories/IProjectRepository.js';
import { Project } from '../../domain/entities/Project.js';
import projectsData from '../../data/projects.json';

/**
 * Implementación concreta — lee datos desde JSON local.
 * Principio L: intercambiable con cualquier otra implementación de IProjectRepository.
 */
export class LocalProjectRepository extends IProjectRepository {
  constructor() {
    super();
    this.projects = projectsData.map(p => new Project(p));
  }

  async getAll() {
    return this.projects;
  }

  async getByCategory(category) {
    return this.projects.filter(p => p.category === category);
  }

  async getById(id) {
    return this.projects.find(p => p.id === id) ?? null;
  }
}