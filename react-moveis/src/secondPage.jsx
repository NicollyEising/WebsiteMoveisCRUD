import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from './componentes/Navbar.jsx';
import Banner01 from './componentes/Banner01.jsx';
import Footer from './componentes/Footer.jsx';
import './index.css';
import './secondPage.css';

function SecondPage() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true); 
  const carrinhoId = localStorage.getItem("carrinhoId");
  const userId = localStorage.getItem("userId");

  if (carrinhoId) {
      console.log("Carrinho ID:", carrinhoId);
  } else {
      console.log("Carrinho ID não encontrado no localStorage.");
  }

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/produtos/${id}?produto_id=${id}`)
      .then((response) => {
        if (!response.ok) throw new Error('Erro ao buscar os dados');
        return response.json();
      })
      .then((data) => {
        setItem(data);
        setLoading(false);
      })      
      .catch((error) => {
        console.error('Erro:', error); 
        setLoading(false);
      });
  }, [id]);

  const addCarrinho = () => {
    if (!carrinhoId) {
      alert('Carrinho não encontrado. Faça login ou inicie um carrinho.');
      return;
    }

    const novoItem = {
      produto_id: item.id,
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
    .then(() => {
      alert('Item adicionado ao carrinho com sucesso');
    })
    .catch(error => {
      console.error('Erro:', error);
      alert('Erro ao adicionar item ao carrinho');
    });
  };

  const addFavoritos = () => {
    if (!userId) {
      alert('Usuário não autenticado.');
      return;
    }
  
    const usuarioId = parseInt(userId);

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

        if (produtosExistentes.includes(item.id)) {
          alert('Produto já está nos favoritos');
          return;
        }

        const produtosAtualizados = [...produtosExistentes, item.id];

        const payload = {
          usuario_id: usuarioId,
          produtos_ids: produtosAtualizados
        };

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

  if (loading) {
    return <div>Carregando...</div>; 
  }

  if (!item) {
    return <div>Item não encontrado</div>;
  }

  return (
    <>
      <Navbar/>
      <Banner01 />
      <div className="container p-5">
        <div className="row">
          <div className="col-sm detalhesImg"><img src={item.img} alt="" /></div>
          <div className="col-sm detalhesItem">
            <nav aria-label="Page navigation example">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/" className="page-link">Home</Link></li>
                <li className="breadcrumb-item active w-75"><a className="page-link" href="#">{item.produto}</a></li>
              </ol>
            </nav>
            <h1>{item.produto}</h1>
            <div className="caracteristicas d-flex gap-2 pb-3">
              <span className="badge badge1">ergonômica</span>
              <span className="badge badge2">ajustável</span>
            </div>
            <p>{item.detalhes}</p>
            <h3>Preço: {item.preco}</h3>
            <button className='addCarrinho' onClick={addCarrinho}>Adicionar ao Carrinho</button>
            <button
              className="addFavoritos mt-3"
              onClick={addFavoritos}
              style={{ display: 'block' }}
            >
              Adicionar aos Favoritos
            </button>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default SecondPage;
