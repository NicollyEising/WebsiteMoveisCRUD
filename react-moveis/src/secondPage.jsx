import { useEffect, useState } from 'react';
import Navbar from './componentes/Navbar.jsx';
import Banner01 from './componentes/Banner01.jsx';
import Footer from './componentes/Footer.jsx';
import './index.css';
import './secondPage.css';
import { useParams } from 'react-router-dom';

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
            <h1>{item.produto}</h1>
            <p>Descrição: {item.detalhes}</p>
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
