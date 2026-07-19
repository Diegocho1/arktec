import { useRevealOnScroll } from '../../hooks/useRevealOnScroll.js';

export function AboutSection() {
  const { ref, isVisible } = useRevealOnScroll();

  return (
    <section id="nosotros" className="about" ref={ref}>
      <div className={`about__inner ${isVisible ? 'about__inner--visible' : ''}`}>
        <div className="about__label">Nosotros</div>
        <div className="about__body">
          <h2 className="about__title">
            Creemos en la arquitectura<br />como herramienta de vida.
          </h2>
          <p className="about__text">
            Arktec Arquitectos surge a partir de una inquietud compartida 
            por entender la arquitectura como una disciplina que requiere análisis, 
            precisión y responsabilidad.
          </p>
          <p className="about__text">
            Fundado durante la etapa universitaria por estudiantes que compartían una misma 
            visión, el despacho se construyó sobre la idea de desarrollar proyectos donde el 
            diseño responda a una lógica clara: la forma como consecuencia del estudio del 
            contexto, la función y las necesidades del usuario.
          </p>
        </div>
        <div className="about__img-wrap">
          <div className="about__image">
            <img src="/assets/images/brand/DSC01232-2.jpg.jpeg" alt="Equipo Arktec" />
          </div>
          <div className="about__names">
            <span className="about__names-sub">Arq. Leonardo Jair Reyes Quian</span>
            <span className="about__names-sub">Arq. Marcos Gerardo González Garay</span>
          </div>
        </div>
      </div>
    </section>
  );
}