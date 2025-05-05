import React, { useState, useEffect } from 'react';
import Navbar from './componentes/Navbar.jsx';
import Banner01 from './componentes/Banner01.jsx';
import Footer from './componentes/Footer.jsx';
import './index.css';
import './sevenPage.css';
import { Link } from 'react-router-dom';

const CarrinhoList = () => {
  const [carrinhos, setCarrinhos] = useState([]);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const usuarioId = localStorage.getItem('userId');

    if (usuarioId) {
      fetch(`http://localhost:8000/carrinhos?usuario_id=${usuarioId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setCarrinhos(data);
        })
        .catch((error) => {
          setErro(error.message);
        });
    } else {
      setErro('Usuário não autenticado.');
    }
  }, []);

  const deletarItem = (carrinhoId, itemId) => {
    fetch(`http://localhost:8000/carrinhos/${carrinhoId}/itens/${itemId}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.ok) {
          setCarrinhos((prevCarrinhos) => {
            return prevCarrinhos.map((carrinho) => {
              if (carrinho.id === carrinhoId) {
                carrinho.itens = carrinho.itens.filter((item) => item.id !== itemId);
              }
              return carrinho;
            });
          });
        } else {
          alert('Erro ao deletar item');
        }
      })
      .catch((error) => {
        console.error('Erro ao deletar item:', error);
      });
  };

  const calcularSubtotal = (itens) => {
    return itens.reduce((acc, item) => acc + (item.produto.preco * item.quantidade), 0);
  };

  const calcularTotal = (itens) => {
    const subtotal = calcularSubtotal(itens);
    const frete = 10.00;
    const impostos = 20.00;
    return subtotal + frete + impostos;
  };

  if (erro) {
    return <div>{erro}</div>;
  }

  return (
    <>
      <Navbar />
      <Banner01 />
      <div className="container py-5 mb-4">
        <h1 className='carrinhoTitulo'>Carrinho</h1>
        {carrinhos.length === 0 ? (
          <p className='text-dark'>Você não tem carrinhos.</p>
        ) : (
          <div className="row">
            <div className="col-lg-8">
              {carrinhos.map((carrinho) => (
                <div key={carrinho.id} className="card mb-4">
                  <div className="card-body">
                    {carrinho.itens && carrinho.itens.length > 0 ? (
                      carrinho.itens.map((item) => (
                        <div className="row cart-item mb-3 align-items-center" key={item.id}>
                          <div className="col-md-3">
                            <img src={item.produto.img} alt={item.produto.produto} className="img-fluid rounded" />
                          </div>
                          <div className="col-md-7">
                            <h5 className="card-title">{item.produto.produto}</h5>
                            <p className="text-muted">{item.produto.detalhes}</p>
                            <p className="text-muted">Preço: ${item.produto.preco.toFixed(2)}</p>
                          </div>
                          <div className="col-md-2 d-flex flex-column align-items-end">
                            <p className="fw-bold">${(item.produto.preco * item.quantidade).toFixed(2)}</p>
                            <button
                              className="btn btn-sm btn-outline-danger mt-auto"
                              onClick={() => deletarItem(carrinho.id, item.id)}
                            >
                              <i className="bi bi-trash"></i>
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p>Este carrinho não contém itens.</p>
                    )}
                  </div>
                </div>
              ))}
              <div className="text-start mb-4">
                <Link to="/" id='finalizarCompra' className="btn">
                  <i className="bi bi-arrow-left me-2"></i>Continuar Comprando
                </Link>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card cart-summary">
                <div className="card-body">
                  <h5 className="card-title mb-4">Resumo do Pedido</h5>
                  {carrinhos.map((carrinho) => {
                    const subtotal = calcularSubtotal(carrinho.itens);
                    const total = calcularTotal(carrinho.itens);
                    return (
                      <div key={`resumo-${carrinho.id}`}>
                        <div className="d-flex justify-content-between mb-3">
                          <span>Subtotal</span>
                          <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-3">
                          <span>Frete</span>
                          <span>$10.00</span>
                        </div>
                        <div className="d-flex justify-content-between mb-3">
                          <span>Impostos</span>
                          <span>$20.00</span>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between mb-4">
                          <strong>Total</strong>
                          <strong>${total.toFixed(2)}</strong>
                        </div>
                      </div>
                    );
                  })}
                  <button id='finalizarCompra' className="btn w-100">Finalizar Compra</button>
                </div>
              </div>
              <div className="card mt-4">
                <div className="card-body">
                  <h5 className="card-title mb-3">Aplicar Código de Desconto</h5>
                  <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Digite o código de desconto" />
                    <button className="btn btn-outline-secondary" type="button">Aplicar</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default CarrinhoList;
