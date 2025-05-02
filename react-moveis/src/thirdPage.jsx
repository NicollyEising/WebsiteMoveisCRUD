import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from './componentes/Navbar.jsx';
import Banner01 from './componentes/Banner01.jsx';
import Footer from './componentes/Footer.jsx';
import './thirdPage.css';

const ThirdPage = () => {
  const { nome } = useParams();
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 8;

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/produtos/busca/?nome=${nome}`)
      .then((response) => {
        if (!response.ok) throw new Error("Erro ao buscar os dados");
        return response.json();
      })
      .then((data) => setProdutos(data))
      .catch((error) => console.error("Erro:", error))
      .finally(() => setLoading(false));
  }, [nome]);

  if (loading) return <div>Carregando...</div>;
  if (produtos.length === 0) return <div>Nenhum produto encontrado.</div>;

  // Calcular os itens da página atual
  const indexOfLastItem = paginaAtual * itensPorPagina;
  const indexOfFirstItem = indexOfLastItem - itensPorPagina;
  const produtosPaginaAtual = produtos.slice(indexOfFirstItem, indexOfLastItem);

  // Calcular o número total de páginas
  const totalPaginas = Math.ceil(produtos.length / itensPorPagina);

  const handlePaginaAnterior = () => {
    if (paginaAtual > 1) {
      setPaginaAtual(paginaAtual - 1);
    }
  };

  const handlePaginaSeguinte = () => {
    if (paginaAtual < totalPaginas) {
      setPaginaAtual(paginaAtual + 1);
    }
  };

  return (
    <>
      <Navbar />
      <Banner01 />
      <div className="container">
        <nav aria-label="Page navigation example">
          <ol className="breadcrumb mx-4 px-2 mt-5">
            <li className="breadcrumb-item">
              <Link to="/" className="page-link">Home</Link> 
            </li>
            <li className="breadcrumb-item active w-75">
              <a className="page-link" href="#">Search</a>
            </li>
          </ol>
        </nav>

        <h5 id="resultado">Resultados para: {nome}</h5>

        <ul className="d-flex">
          {produtosPaginaAtual.map((produto) => (
            <li key={produto.id} className="cardLista">
              <div className="card" style={{ width: '18rem' }}>
                <button className="bi bi-heart-fill heart-icon" aria-label="Favorites Icon"></button>
                <img
                  src={produto.img}
                  className="card-img-top"
                  alt={produto.produto}
                />
                <div className="card-body">
                  <Link to={`/secondPage/${produto.id}`}>
                    <h5 className="card-title">{produto.produto}</h5>
                    <p className="card-text"><strong>Preço:</strong> R$ {produto.preco}</p>
                  </Link>
                  <button id="adicionarCarrinhoCard" className='addCarrinho'>Carrinho</button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-end">
            <li className={`page-item ${paginaAtual === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={handlePaginaAnterior} disabled={paginaAtual === 1}>
                Anterior
              </button>
            </li>
            {[...Array(totalPaginas).keys()].map((index) => (
              <li key={index} className={`page-item ${paginaAtual === index + 1 ? 'active' : ''}`}>
                <button className="page-link" onClick={() => setPaginaAtual(index + 1)}>
                  {index + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${paginaAtual === totalPaginas ? 'disabled' : ''}`}>
              <button className="page-link" onClick={handlePaginaSeguinte} disabled={paginaAtual === totalPaginas}>
                Próximo
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <Footer />
    </>
  );
};

export default ThirdPage;
