import { useRevealOnScroll } from '../../hooks/useRevealOnScroll.js';
import { Category } from '../../../domain/entities/Project.js';

const SERVICES = [
  {
    category: Category.RESIDENCIAL, 
    title: 'Diseño y planeación',
    description: 'Desarrollo arquitectónico basado en el análisis del contexto, las necesidades del cliente y la viabilidad técnica, estructurando el proyecto desde la conceptualización initial hasta su definición arquitectónica y constructiva.', 
    image: '/assets/images/Imagenes_servicios/Diseño_planeacion_BN.png',
    colorImage: '/assets/images/Imagenes_servicios/Diseño_planeacion_CL.png'
  },
  {
    category: Category.COMERCIAL, 
    title: 'Visualización y tecnología',
    description: 'Representación digital del proyecto mediante visualización arquitectónica y tecnologías inmersivas que facilitan la evaluación espacial y la toma de decisiones.',
    image: '/assets/images/Imagenes_servicios/Visualizacion_tecnologia_BN.png',
    colorImage: '/assets/images/Imagenes_servicios/Visualizacion_tecnologia_CL.png'
  },
  {
    category: Category.INDUSTRIAL, 
    title: 'Estudios técnicos y levantamientos topográficos',
    description: 'Obtención y procesamiento de información espacial mediante topografía, captura LiDAR, fotogrametría y levantamientos con drones para generar bases precisas de análisis y desarrollo del proyecto.',
    image: '/assets/images/Imagenes_servicios/Estudios_tecnicos_levantamientos_topograficos_BN.png',
    colorImage: '/assets/images/Imagenes_servicios/Estudios_tecnicos_levantamientos_topograficos_CL.png'
  },
  {
    category: Category.INTERIORISMO, 
    title: 'Construcción y ejecución',
    description: 'Coordinación y desarrollo del proceso constructivo mediante control técnico del proyecto, integración de especialidades y seguimiento de obra para asegurar la correcta materialización del diseño',
    image: '/assets/images/Imagenes_servicios/Construccion_ejecucion_BN.png',
    colorImage: '/assets/images/Imagenes_servicios/Construccion_ejecucion_CL.png'
  },
];

export function ServicesSection() {
  const { ref, isVisible } = useRevealOnScroll();

  return (
    <section id="servicios" className="services" ref={ref}>
      <div className={`services__inner ${isVisible ? 'services__inner--visible' : ''}`}>
        <div className="services__header">
          <div className="services__label">Servicios</div>
          <h2 className="services__title">Lo que hacemos</h2>
        </div>
        <div className="services__grid">
          {SERVICES.map(({ category, title, description, image, colorImage }, i) => (
            <div
              key={category}
              className="services__card"
              style={{ '--delay': `${i * 0.1}s` }}
            >
              {/* B&W image — always visible */}
              <div
                className="services__card-bg"
                style={{ backgroundImage: `url(${image})` }}
              />
              {/* Color image — fades in on hover */}
              <div
                className="services__card-bg services__card-bg--color"
                style={{ backgroundImage: `url(${colorImage})` }}
              />
              {/* Text content */}
              <div className="services__card-content">
                <span className="services__card-number">0{i + 1}</span>
                <h3 className="services__card-title">{title}</h3>
                <p className="services__card-desc">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}