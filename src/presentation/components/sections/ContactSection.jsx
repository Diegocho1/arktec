import { useState } from 'react';
import { useContact } from '../../hooks/useContact.js';
import { useRevealOnScroll } from '../../hooks/useRevealOnScroll.js';

const INITIAL_FORM = { name: '', email: '', phone: '', message: '' };

export function ContactSection() {
  const [formData, setFormData]   = useState(INITIAL_FORM);
  const { submit, status, errors, reset } = useContact();
  const { ref, isVisible }        = useRevealOnScroll();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submit(formData);
  };

  if (status === 'success') {
    return (
      <section id="contacto" className="contact">
        <div className="contact__success">
          <h2>Mensaje enviado.</h2>
          <p>Nos pondremos en contacto contigo pronto.</p>
          <button className="contact__btn" onClick={() => { reset(); setFormData(INITIAL_FORM); }}>
            Enviar otro mensaje
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="contacto" className="contact" ref={ref}>
      <div className={`contact__inner ${isVisible ? 'contact__inner--visible' : ''}`}>

        <div className="contact__header">
          <div className="contact__label">Contacto</div>
          <h2 className="contact__title">Hablemos de tu proyecto</h2>
        </div>

        <form className="contact__form" onSubmit={handleSubmit} noValidate>

          <div className="contact__row">
            <div className="contact__field">
              <label className="contact__label-field" htmlFor="name">Nombre *</label>
              <input id="name" name="name" type="text" className={`contact__input ${errors.name ? 'contact__input--error' : ''}`}
                value={formData.name} onChange={handleChange} placeholder="Tu nombre completo" />
              {errors.name && <span className="contact__error">{errors.name}</span>}
            </div>

            <div className="contact__field">
              <label className="contact__label-field" htmlFor="email">Correo *</label>
              <input id="email" name="email" type="email" className={`contact__input ${errors.email ? 'contact__input--error' : ''}`}
                value={formData.email} onChange={handleChange} placeholder="tu@correo.com" />
              {errors.email && <span className="contact__error">{errors.email}</span>}
            </div>
          </div>

          <div className="contact__field">
            <label className="contact__label-field" htmlFor="phone">Teléfono</label>
            <input id="phone" name="phone" type="tel" className="contact__input"
              value={formData.phone} onChange={handleChange} placeholder="+52 618 000 0000" />
          </div>

          <div className="contact__field">
            <label className="contact__label-field" htmlFor="message">Mensaje *</label>
            <textarea id="message" name="message" className={`contact__input contact__textarea ${errors.message ? 'contact__input--error' : ''}`}
              value={formData.message} onChange={handleChange} placeholder="Cuéntanos sobre tu proyecto..." rows={5} />
            {errors.message && <span className="contact__error">{errors.message}</span>}
          </div>

          <button type="submit" className="contact__btn" disabled={status === 'loading'}>
            {status === 'loading' ? 'Enviando...' : 'Enviar mensaje'}
          </button>

          {status === 'error' && (
            <p className="contact__error contact__error--global">
              Ocurrió un error al enviar. Intenta de nuevo.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}