import emailjs from '@emailjs/browser';
import { IContactRepository } from '../../domain/repositories/IContactRepository.js';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_CONTACT = import.meta.env.VITE_EMAILJS_TEMPLATE_CONTACT;
const TEMPLATE_AUTOREPLY = import.meta.env.VITE_EMAILJS_TEMPLATE_AUTOREPLY;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export class EmailContactRepository extends IContactRepository {
  async send(contactForm) {
    try {
      const templateParams = {
        name: contactForm.name,
        email: contactForm.email,
        phone: contactForm.phone ?? '',
        message: contactForm.message,
        subject: `Nuevo mensaje de ${contactForm.name}`,
        time: new Date().toLocaleString('es-MX'),
        reply_to: contactForm.email,
      };

       // Only ONE send for the contact notification
      await emailjs.send(SERVICE_ID, TEMPLATE_CONTACT, templateParams, PUBLIC_KEY);

      // Only ONE send for the auto-reply
      await emailjs.send(SERVICE_ID, TEMPLATE_AUTOREPLY, templateParams, PUBLIC_KEY);

      return { success: true, message: 'Mensaje enviado correctamente.' };
    } catch (error) {
      console.error('EmailJS error:', error);
      return { success: false, message: 'Ocurrió un error al enviar el mensaje.' };
    }
  }
}