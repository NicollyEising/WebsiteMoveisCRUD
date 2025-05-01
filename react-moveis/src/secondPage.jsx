import { useEffect, useState } from 'react';
import Navbar from './componentes/Navbar.jsx';
import Banner01 from './componentes/Banner01.jsx';
import Footer from './componentes/Footer.jsx';
import './index.css';
import './secondPage.css';
import { useParams } from 'react-router-dom';

function SecondPage() {
  const { id } = useParams(); // Pegando o id da URL
  const [item, setItem] = useState(null); // Estado para armazenar o item
  const [loading, setLoading] = useState(true); // Estado para controle de carregamento

  useEffect(() => {
    // Verificando se o id é um número e se está sendo passado corretamente
    console.log('ID:', id); // Verifique se o id está sendo passado corretamente no console

    // Fetch para buscar o item baseado no id
    fetch(`http://127.0.0.1:8000/produtos/${id}?produto_id=${id}`)  // Ajuste aqui para passar o produto_id na query string
      .then((response) => {
        if (!response.ok) throw new Error('Erro ao buscar os dados');
        return response.json();
      })
      .then((data) => {
        console.log('Dados recebidos da API:', data); // Verifica o conteúdo completo da resposta
        setItem(data);
        setLoading(false);
      })      
      .catch((error) => {
        console.error('Erro:', error);  // Veja o erro completo aqui
        setLoading(false);
      });
  }, [id]); // O efeito será executado novamente caso o id mude

  if (loading) {
    return <div>Carregando...</div>; // Exibe uma mensagem de carregamento enquanto os dados não são carregados
  }

  if (!item) {
    return <div>Item não encontrado</div>; // Caso o item não seja encontrado
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
