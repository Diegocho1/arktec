import { ContactForm } from '../../domain/entities/ContactForm.js';

export class SubmitContactForm {
  constructor(contactRepository) {
    this.contactRepository = contactRepository;
  }

  async execute(formData) {
    const form = new ContactForm(formData);

    if (!form.isValid()) {
      return { success: false, errors: form.getErrors() };
    }

    return this.contactRepository.send(form);
  }
}