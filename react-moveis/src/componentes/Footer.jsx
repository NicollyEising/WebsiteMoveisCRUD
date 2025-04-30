import React, { useEffect } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Carousel = () => {
  useEffect(() => {
    // Inicialização de componentes Bootstrap, se necessário.
  }, []);

  return (
    <footer className="text-center bg-body-tertiary">
      {/* Grid container */}
      <div className="container pt-2">
        {/* Section: Social media */}
        <section>
          {/* Facebook */}
          <a
            className="btn btn-link btn-floating btn-lg text-body m-1"
            href="#!"
            role="button"
          >
            <i className="bi bi-facebook"></i>
          </a>

          {/* Twitter */}
          <a
            className="btn btn-link btn-floating btn-lg text-body m-1"
            href="#!"
            role="button"
          >
            <i className="bi bi-twitter-x"></i>
          </a>

          {/* Google */}
          <a
            className="btn btn-link btn-floating btn-lg text-body m-1"
            href="#!"
            role="button"
          >
            <i className="bi bi-google"></i>
          </a>

          {/* Instagram */}
          <a
            className="btn btn-link btn-floating btn-lg text-body m-1"
            href="#!"
            role="button"
          >
            <i className="bi bi-instagram"></i>
          </a>

          {/* Linkedin */}
          <a
            className="btn btn-link btn-floating btn-lg text-body m-1"
            href="#!"
            role="button"
          >
            <i className="bi bi-linkedin"></i>
          </a>

          {/* Github */}
          <a
            className="btn btn-link btn-floating btn-lg text-body m-1"
            href="#!"
            role="button"
          >
            <i className="bi bi-github"></i>
          </a>
        </section>
        {/* Section: Social media */}
      </div>
    </footer>
  );
};

export default Carousel;
