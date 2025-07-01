import React, { useState, useEffect } from 'react';
import Navbar from './componentes/Navbar.jsx';
import Banner01 from './componentes/Banner01.jsx';
import Footer from './componentes/Footer.jsx';
import './index.css';
import './sevenPage.css';
import { Link } from 'react-router-dom';

const FavoritosList = () => {
  const [favoritos, setFavoritos] = useState([]);
  const [erro, setErro] = useState(null);
  const [buscaId, setBuscaId] = useState('');
  const [resultadoBusca, setResultadoBusca] = useState(null);

  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 8;

  const usuarioId = localStorage.getItem('userId');

  useEffect(() => {
    if (usuarioId) {
      fetch(`http://localhost:8000/favoritos?usuario_id=${usuarioId}`)
        .then((response) => {
          if (response.status === 404) return [];
          if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
          return response.json();
        })
        .then((data) => {
          setErro(null);
          setFavoritos(Array.isArray(data) ? data : [data]);
        })
        .catch((error) => setErro(error.message));
    } else {
      setErro('Usuário não autenticado.');
    }
  }, [usuarioId]);

  const removerFavorito = (favoritoId) => {
    fetch(`http://localhost:8000/favoritos/${favoritoId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          setFavoritos((prev) => prev.filter((item) => item.id !== favoritoId));
          if (resultadoBusca && resultadoBusca.id === favoritoId) {
            setResultadoBusca(null);
          }
          setErro(null);
        } else {
          alert('Erro ao remover favorito.');
        }
      })
      .catch((error) => console.error('Erro ao remover favorito:', error));
  };

  const addCarrinho = (produto) => {
    const carrinhoId = localStorage.getItem('carrinhoId');
    if (!carrinhoId) {
      alert('Carrinho não encontrado. Faça login ou inicie um carrinho.');
      return;
    }

    const novoItem = {
      produto_id: produto.id,
      quantidade: 1,
    };

    fetch(`http://localhost:8000/carrinhos/${carrinhoId}/itens`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novoItem),
    })
      .then((response) => {
        if (!response.ok) throw new Error('Erro ao adicionar ao carrinho');
        return response.json();
      })
      .then(() => alert('Item adicionado ao carrinho com sucesso'))
      .catch((error) => {
        console.error('Erro ao adicionar ao carrinho:', error);
        alert('Erro ao adicionar item ao carrinho');
      });
  };

  const renderCardProduto = (produto, favoritoId) => (
    <li
      key={produto.id}
      className="cardLista"
      style={{ listStyle: 'none', position: 'relative' }}
    >
      <div className="card" style={{ width: '18rem', position: 'relative' }}>
        <button
          onClick={() => removerFavorito(favoritoId)}
          aria-label="Remover favorito"
          style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            background: 'transparent',
            border: 'none',
            color: '#dc3545',
            cursor: 'pointer',
            fontSize: '1.5rem',
            zIndex: 10,
          }}
          title="Remover favorito"
        >
          <i className="bi bi-trash"></i>
        </button>

        <img src={produto.img} className="card-img-top" alt={produto.produto} />
        <div className="card-body">
          <h5 className="card-title">{produto.produto}</h5>
          <p className="card-text text-muted">{produto.detalhes}</p>
          <p className="card-text fw-bold">R$ {produto.preco.toFixed(2)}</p>
          <button
            id="adicionarCarrinhoCard"
            className="addCarrinho"
            onClick={() => addCarrinho(produto)}
          >
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    </li>
  );

  const todosProdutos = favoritos.flatMap(item =>
    item.produtos.map(produto => ({ ...produto, favoritoId: item.id }))
  );

  const indexOfLastItem = paginaAtual * itensPorPagina;
  const indexOfFirstItem = indexOfLastItem - itensPorPagina;
  const produtosPaginados = todosProdutos.slice(indexOfFirstItem, indexOfLastItem);
  const totalPaginas = Math.ceil(todosProdutos.length / itensPorPagina);

  return (
    <>
      <Navbar />
      <Banner01 />
      <div
        className="container bottom py-5 mb-4"
        style={{ marginBottom: favoritos.length === 0 ? '53vh' : undefined }}
      >
        <h1 className="carrinhoTitulo">Favoritos</h1>

        {erro && <p className="text-danger">{erro}</p>}

        {resultadoBusca ? (
          <ul className="d-flex flex-wrap gap-3 p-0 m-0 justify-content-center justify-content-md-start">
            {resultadoBusca.produtos.map(produto => renderCardProduto(produto, resultadoBusca.id))}
          </ul>
        ) : todosProdutos.length === 0 ? (
          <p className="text-dark mb-5">Você não possui itens favoritos.</p>
        ) : (
          <>
            <ul className="d-flex flex-wrap gap-3 p-0 m-0 justify-content-center justify-content-md-start">
              {produtosPaginados.map(produto =>
                renderCardProduto(produto, produto.favoritoId)
              )}
            </ul>

            <nav aria-label="Page navigation">
              <ul className="pagination justify-content-end mt-4">
                <li className={`page-item ${paginaAtual === 1 ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => setPaginaAtual(p => Math.max(p - 1, 1))}>
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
                  <button className="page-link" onClick={() => setPaginaAtual(p => Math.min(p + 1, totalPaginas))}>
                    Próximo
                  </button>
                </li>
              </ul>
            </nav>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default FavoritosList;
