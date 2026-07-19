/**
 * @service ProjectService
 * Orquesta los casos de uso relacionados a proyectos.
 * Principio S: delega la lógica a los casos de uso, no la repite.
 */
export class ProjectService {
  constructor({ getAllProjects, getProjectsByCategory }) {
    this.getAllProjects          = getAllProjects;
    this.getProjectsByCategory  = getProjectsByCategory;
  }

  async fetchAll() {
    return this.getAllProjects.execute();
  }

  async fetchByCategory(category) {
    return this.getProjectsByCategory.execute(category);
  }
}