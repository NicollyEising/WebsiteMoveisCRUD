import React, { useEffect, useState } from 'react';
import "./SecondSection.css";

const Carousel = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carouselElement = document.querySelector('#carouselExampleDark');
    if (carouselElement) {
      new window.bootstrap.Carousel(carouselElement);
    }

    fetch('http://127.0.0.1:8000/produtos')
      .then((response) => {
        if (!response.ok) throw new Error('Erro ao buscar os dados');
        return response.json();
      })
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Carregando...</p>;

  const groupedItems = [];
  for (let i = 0; i < items.length; i += 4) {
    groupedItems.push(items.slice(i, i + 4));
  }

  return (
    <div id="carouselExampleDark" className="carousel carousel-dark slide" data-bs-ride="carousel">
      
      {groupedItems.length > 1 && (
        <div className="carousel-indicators">
          {groupedItems.map((_, index) => (
            <button
              key={index}
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide-to={index}
              className={index === 0 ? "active" : ""}
              aria-current={index === 0 ? "true" : undefined}
              aria-label={`Slide ${index + 1}`}
            ></button>
          ))}
        </div>
      )}

      <div className="carousel-inner d-flex container">
        {groupedItems.map((grupo, index) => (
          <div
            className={`carousel-item ${index === 0 ? 'active' : ''}`}
            key={index}
            data-bs-interval="5000"
          >
            <div className="d-flex flex-wrap justify-content-center" style={{ gap: '10px' }}>
              {grupo.map((item) => (
                <div className="card" style={{ width: '18rem' }} key={item.id}>
                  <img
                    src={item.img}
                    className="card-img-top"
                    alt={item.produto}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item.produto}</h5>
                    <p className="card-text">{item.detalhes}</p>
                    <p className="card-text"><strong>Preço:</strong> R$ {item.preco}</p>
                    <a href="#" className="btn btn-primary">Adicionar ao Carrinho</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {groupedItems.length > 1 && (
        <>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Anterior</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Próximo</span>
          </button>
        </>
      )}
    </div>
  );
};

export default Carousel;
