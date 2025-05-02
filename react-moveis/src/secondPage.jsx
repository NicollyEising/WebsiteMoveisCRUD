import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom'; // Importação do Link
import Navbar from './componentes/Navbar.jsx';
import Banner01 from './componentes/Banner01.jsx';
import Footer from './componentes/Footer.jsx';
import './index.css';
import './secondPage.css';

function SecondPage() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    console.log('ID:', id);

    fetch(`http://127.0.0.1:8000/produtos/${id}?produto_id=${id}`)
      .then((response) => {
        if (!response.ok) throw new Error('Erro ao buscar os dados');
        return response.json();
      })
      .then((data) => {
        console.log('Dados recebidos da API:', data);
        setItem(data);
        setLoading(false);
      })      
      .catch((error) => {
        console.error('Erro:', error); 
        setLoading(false);
      });
  }, [id]);

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
            {/* Navegação */}
            <nav aria-label="Page navigation example">
              <ol class="breadcrumb">
                <li class="breadcrumb-item"><Link to="/" className="page-link">Home</Link> {/* Link para a home */}</li>
                <li class="breadcrumb-item active w-75"><a className="page-link" href="#">{item.produto}</a></li>
              </ol>
            </nav>
            {/* Detalhes do produto */}
            <h1>{item.produto}</h1>
              {/*Caracteristicas*/}
              <div className="caracteristicas d-flex gap-2 pb-3">
              <span class="badge badge1">ergonômica</span>
              <span class="badge badge2">ajustável</span>
              </div>
            <p>{item.detalhes}</p>
            <h3>Preço: {item.preco}</h3>
            <button className='addCarrinho'>Adicionar ao Carrinho</button>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default SecondPage;
