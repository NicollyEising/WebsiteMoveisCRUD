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
  const [marcaSelecionada, setMarcaSelecionada] = useState("");
  const [corSelecionada, setCorSelecionada] = useState("");
  const itensPorPagina = 8;

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/produtos/busca/?nome=${nome}`)
      .then((response) => {
        if (!response.ok) throw new Error("Erro ao buscar os dados");
        return response.json();
      })
      .then((data) => {
        setProdutos(data);
      })
      .catch((error) => console.error("Erro:", error))
      .finally(() => setLoading(false));
  }, [nome]);

  if (loading) return <div>Carregando...</div>;
  if (produtos.length === 0) return <div>Nenhum produto encontrado.</div>;

  // Filtragem de produtos
  const produtosFiltrados = produtos.filter((produto) => {
    const marcaProduto = produto.marca?.trim().toLowerCase();  // Remover espaços extras e normalizar para minúsculas
    const corProduto = produto.cor?.trim().toLowerCase();
    
    // Garantir que a marca selecionada não tenha espaços extras
    const marcaSelecionadaTrimmed = marcaSelecionada?.trim().toLowerCase();
    const corSelecionadaTrimmed = corSelecionada?.trim().toLowerCase();

    // Log de depuração para verificar valores
    console.log('Produto Marca:', marcaProduto);
    console.log('Marca Selecionada:', marcaSelecionadaTrimmed);
    console.log('Produto Cor:', corProduto);
    console.log('Cor Selecionada:', corSelecionadaTrimmed);

    // Comparações de marca e cor
    const correspondeMarca = marcaSelecionadaTrimmed ? marcaProduto === marcaSelecionadaTrimmed : true;
    const correspondeCor = corSelecionadaTrimmed ? corProduto === corSelecionadaTrimmed : true;

    return correspondeMarca && correspondeCor;
  });

  const indexOfLastItem = paginaAtual * itensPorPagina;
  const indexOfFirstItem = indexOfLastItem - itensPorPagina;
  const produtosPaginaAtual = produtosFiltrados.slice(indexOfFirstItem, indexOfLastItem);
  const totalPaginas = Math.ceil(produtosFiltrados.length / itensPorPagina);

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
        <div className="row">
          <div className="col-sm-2 mt-5">
            <div className="listaFiltragem">
              <h5 className="pb-3">Filtrar por</h5>

              <h5>Marca</h5>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="marca" id="marca1" value="herman miller"
                  checked={marcaSelecionada === "herman miller"}
                  onChange={(e) => setMarcaSelecionada(e.target.value)} />
                <label className="form-check-label" htmlFor="marca1">Herman Miller</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="marca" id="marca2" value="flexform"
                  checked={marcaSelecionada === "flexform"}
                  onChange={(e) => setMarcaSelecionada(e.target.value)} />
                <label className="form-check-label" htmlFor="marca2">Flexform</label>
              </div>

              <h5 className="mt-3">Cor</h5>
              <div className="form-check">
                <input className="form-check-input color-white" type="radio" name="cor" id="cor1" value="preta"
                  checked={corSelecionada === "preta"}
                  onChange={(e) => setCorSelecionada(e.target.value)} />
                <label className="form-check-label" htmlFor="cor1">Preto</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="cor" id="cor2" value="cinza"
                  checked={corSelecionada === "cinza"}
                  onChange={(e) => setCorSelecionada(e.target.value)} />
                <label className="form-check-label" htmlFor="cor2">Cinza</label>
              </div>

              <button id="botaoLimpar" className="btn mt-3" onClick={() => {
                setMarcaSelecionada("");
                setCorSelecionada("");
              }}>Limpar filtros</button>
            </div>
          </div>

          <div className="col-sm-10">
            <nav aria-label="Page navigation example">
              <ol className="breadcrumb mx-4 px-2 mt-5">
                <li className="breadcrumb-item">
                  <Link to="/" className="page-link">Home</Link>
                </li>
                <li className="breadcrumb-item active w-75">
                  <span className="page-link">Search</span>
                </li>
              </ol>
            </nav>

            <h5 id="resultado">Resultados para: {nome}</h5>

            <ul className="d-flex flex-wrap gap-3">
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
                      <button id="adicionarCarrinhoCard" className="addCarrinho">Carrinho</button>
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
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ThirdPage;
