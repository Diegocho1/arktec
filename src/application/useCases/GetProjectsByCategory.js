export class GetProjectsByCategory {
  constructor(projectRepository) {
    this.projectRepository = projectRepository;
  }

  async execute(category = null) {
    if (!category) return this.projectRepository.getAll();
    return this.projectRepository.getByCategory(category);
  }
}