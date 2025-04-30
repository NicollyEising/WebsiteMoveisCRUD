import React, { useEffect } from 'react';

const Carousel = () => {
  useEffect(() => {
    // Inicialização do componente Bootstrap se necessário
    // Por exemplo, se precisar inicializar algo do Bootstrap, adicione aqui
  }, []);

  return (
    <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            src="https://assets.betalabs.net/fit-in/2500x0/production/flexform/extra_fields/717/phpneXnvo1696418497.png"
            className="d-block w-100"
            alt="Slide 1"
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://assets.betalabs.net/fit-in/2500x0/production/flexform/extra_fields/717/phpNGhGlS1721996581.jpg"
            className="d-block w-100"
            alt="Slide 2"
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://assets.betalabs.net/fit-in/2500x0/production/flexform/extra_fields/717/phppm3ZD21674501913.jpg"
            className="d-block w-100"
            alt="Slide 3"
          />
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Carousel;
