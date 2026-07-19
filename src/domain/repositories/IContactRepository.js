/**
 * @interface IContactRepository
 * Principio I: interfaz separada, responsabilidad única.
 */
export class IContactRepository {
  async send(contactForm) { throw new Error('send() must be implemented.'); }
}