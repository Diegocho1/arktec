/**
 * @interface IProjectRepository
 * Principio D: los casos de uso dependen de esta abstracción.
 */
export class IProjectRepository {
  async getAll()                  { throw new Error('getAll() must be implemented.'); }
  async getByCategory(category)   { throw new Error('getByCategory() must be implemented.'); }
  async getById(id)               { throw new Error('getById() must be implemented.'); }
}