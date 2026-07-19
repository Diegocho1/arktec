/**
 * @domain Entity
 * Representa un mensaje del formulario de contacto.
 */
export class ContactForm {
  constructor({ name, email, phone, message }) {
    this.name    = name?.trim();
    this.email   = email?.trim().toLowerCase();
    this.phone   = phone?.trim();
    this.message = message?.trim();
  }

  isValid() {
    return Boolean(this.name) && Boolean(this.message) && this.#isValidEmail(this.email);
  }

  getErrors() {
    const errors = {};
    if (!this.name)                      errors.name    = 'El nombre es requerido.';
    if (!this.#isValidEmail(this.email)) errors.email   = 'Ingresa un correo válido.';
    if (!this.message)                   errors.message = 'El mensaje es requerido.';
    return errors;
  }

  #isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email ?? '');
  }
}