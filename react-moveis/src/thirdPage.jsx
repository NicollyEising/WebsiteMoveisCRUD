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
      .then((data) => setProdutos(data))
      .catch((error) => console.error("Erro:", error))
      .finally(() => setLoading(false));
  }, [nome]);

  const addCarrinho = (produto) => {
    const userId = localStorage.getItem('userId');
    const carrinhoId = localStorage.getItem("carrinhoId");

    // Verifica se o carrinhoId existe
    if (carrinhoId) {
        console.log("Carrinho ID:", carrinhoId);
    } else {
        console.log("Carrinho ID não encontrado no localStorage.");
    }


  
    const novoItem = {
      produto_id: produto.id,
      quantidade: 1
    };
  
    fetch(`http://127.0.0.1:8000/carrinhos/${carrinhoId}/itens`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(novoItem)
    })
    .then(response => {
      if (!response.ok) throw new Error('Erro ao adicionar ao carrinho');
      return response.json();
    })
    .then(data => {
      alert('Item adicionado ao carrinho com sucesso');
    })
    .catch(error => {
      console.error('Erro:', error);
      alert('Erro ao adicionar item ao carrinho');
    });
  };


  const addFavoritos = (produto) => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('Usuário não autenticado.');
      return;
    }
  
    const usuarioId = parseInt(userId);
  
    // Passo 1: Buscar favoritos existentes do usuário
    fetch(`http://127.0.0.1:8000/favoritos?usuario_id=${usuarioId}`)
      .then((response) => {
        if (response.status === 404) {
          // Não existe ainda, cria novo
          return { produtos: [] };
        }
        if (!response.ok) {
          throw new Error("Erro ao buscar favoritos");
        }
        return response.json();
      })
      .then((dadosFavoritos) => {
        const produtosExistentes = dadosFavoritos.produtos?.map(p => p.id) || [];
  
        // Evita duplicação
        if (produtosExistentes.includes(produto.id)) {
          alert('Produto já está nos favoritos');
          return;
        }
  
        const produtosAtualizados = [...produtosExistentes, produto.id];
  
        const payload = {
          usuario_id: usuarioId,
          produtos_ids: produtosAtualizados
        };
  
        // Passo 2: Enviar atualização para o backend
        return fetch('http://127.0.0.1:8000/favoritos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      })
      .then((response) => {
        if (!response) return;
        if (!response.ok) throw new Error("Erro ao atualizar favoritos");
        return response.json();
      })
      .then(() => {
        alert("Produto adicionado aos favoritos");
      })
      .catch((error) => {
        console.error("Erro:", error);
        alert("Erro ao adicionar aos favoritos");
      });
  };
  
  
  

  if (loading) return <div>Carregando...</div>;
  if (produtos.length === 0) return <div>Nenhum produto encontrado.</div>;

  const produtosFiltrados = produtos.filter((produto) => {
    const marcaProduto = produto.marca?.trim().toLowerCase();
    const corProduto = produto.cor?.trim().toLowerCase();
    const marcaSelecionadaTrimmed = marcaSelecionada?.trim().toLowerCase();
    const corSelecionadaTrimmed = corSelecionada?.trim().toLowerCase();

    const correspondeMarca = marcaSelecionadaTrimmed ? marcaProduto === marcaSelecionadaTrimmed : true;
    const correspondeCor = corSelecionadaTrimmed ? corProduto === corSelecionadaTrimmed : true;

    return correspondeMarca && correspondeCor;
  });

  const indexOfLastItem = paginaAtual * itensPorPagina;
  const indexOfFirstItem = indexOfLastItem - itensPorPagina;
  const produtosPaginaAtual = produtosFiltrados.slice(indexOfFirstItem, indexOfLastItem);
  const totalPaginas = Math.ceil(produtosFiltrados.length / itensPorPagina);

  const handlePaginaAnterior = () => {
    if (paginaAtual > 1) setPaginaAtual(paginaAtual - 1);
  };

  const handlePaginaSeguinte = () => {
    if (paginaAtual < totalPaginas) setPaginaAtual(paginaAtual + 1);
  };

  return (
    <>
      <Navbar />
      <Banner01 />
      <div className="container">
        <div className="row">
          <div className="col-sm mt-5">
            <div className="listaFiltragem">
              <h5 className="pb-3">Filtrar por</h5>

              <h5>Marca</h5>
              {["herman miller", "flexform"].map((marca) => (
                <div className="form-check" key={marca}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="marca"
                    id={`marca-${marca}`}
                    value={marca}
                    checked={marcaSelecionada === marca}
                    onChange={(e) => setMarcaSelecionada(e.target.value)}
                  />
                  <label className="form-check-label" htmlFor={`marca-${marca}`}>
                    {marca.charAt(0).toUpperCase() + marca.slice(1)}
                  </label>
                </div>
              ))}

              <h5 className="mt-3">Cor</h5>
              {["preta", "cinza"].map((cor) => (
                <div className="form-check" key={cor}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="cor"
                    id={`cor-${cor}`}
                    value={cor}
                    checked={corSelecionada === cor}
                    onChange={(e) => setCorSelecionada(e.target.value)}
                  />
                  <label className="form-check-label" htmlFor={`cor-${cor}`}>
                    {cor.charAt(0).toUpperCase() + cor.slice(1)}
                  </label>
                </div>
              ))}

              <button
                id="botaoLimpar"
                className="btn mt-3"
                onClick={() => {
                  setMarcaSelecionada("");
                  setCorSelecionada("");
                }}
              >
                Limpar filtros
              </button>
            </div>
          </div>

          <div className="col-sm-10">
            <nav aria-label="breadcrumb">
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
                    <button className="bi bi-heart-fill heart-icon" onClick={() => addFavoritos(produto)} aria-label="Favorites Icon"></button>
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
                      <button
                        id="adicionarCarrinhoCard"
                        className="addCarrinho"
                        onClick={() => addCarrinho(produto)}
                      >
                        Carrinho
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <nav aria-label="Page navigation">
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
