import { useState, useRef } from 'react';
import { EmailContactRepository } from '../../infrastructure/repositories/EmailContactRepository.js';
import { SubmitContactForm } from '../../application/useCases/SubmitContactForm.js';

const contactRepository = new EmailContactRepository();
const submitContactForm = new SubmitContactForm(contactRepository);

export function useContact() {
  const [status, setStatus]   = useState('idle');
  const [errors, setErrors]   = useState({});
  const isSubmitting          = useRef(false); // ref updates synchronously, no stale closure

  const submit = async (formData) => {
    if (isSubmitting.current) return; // blocks immediately, no re-render needed
    isSubmitting.current = true;

    setStatus('loading');
    setErrors({});

    const result = await submitContactForm.execute(formData);

    if (!result.success && result.errors) {
      setErrors(result.errors);
      setStatus('idle');
      isSubmitting.current = false;
      return;
    }

    setStatus(result.success ? 'success' : 'error');
    isSubmitting.current = false;
  };

  const reset = () => { setStatus('idle'); setErrors({}); };

  return { submit, status, errors, reset };
}