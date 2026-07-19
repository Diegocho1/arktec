import { useRevealOnScroll } from '../../hooks/useRevealOnScroll.js';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import { Autoplay, EffectFade } from 'swiper/modules';



export function HeroSection() {
  const { ref, isVisible } = useRevealOnScroll();

  return (
    <section id="inicio" className="hero" ref={ref}>
      {/* 🔹 Background slider */}
      <Swiper
      modules={[Autoplay, EffectFade]}
        className="hero__swiper"
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        effect="fade"
        speed={1500}
      >
        <SwiperSlide>
          <img src="/assets/images/proyecto-001/RRE-03 Fachada Casa.webp" alt="" />
        </SwiperSlide>

        <SwiperSlide>
          <img src="/assets/images/proyecto-002/RRE-02 Drotium.webp" alt="" />
        </SwiperSlide>

        <SwiperSlide>
          <img src="/assets/images/proyecto-004/MR SLIDERS.webp" alt="" />
        </SwiperSlide>
      </Swiper>

      {/* 🔹 Content on top */}
      <div className={`hero__content ${isVisible ? 'hero__content--visible' : ''}`}>
        <p className="hero__eyebrow">Arquitectos</p>
        <h1 className="hero__title">
          Diseñamos<br />espacios que<br />inspiran bebesitaaaaaa.
        </h1>
        <button
          className="hero__cta"
          onClick={() =>
            document.querySelector('#proyectos')?.scrollIntoView({ behavior: 'smooth' })
          }
        >
          Ver proyectos
        </button>
      </div>
    </section>
  );
}