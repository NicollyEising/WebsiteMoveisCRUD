import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './componentes/Navbar.jsx';
import Banner01 from './componentes/Banner01.jsx';
import Footer from './componentes/Footer.jsx';
import './index.css';
import './sixPage.css';
import { Link } from 'react-router-dom';


function SecondPage() {
  const { id } = useParams(); // Obtém o ID diretamente da URL
  const [usuario, setUsuario] = useState(null); // Armazenar as informações do usuário
  const [setMensagem] = useState('');

  // Buscar as informações do usuário ao carregar a página
  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/usuarios/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log('ID recebido:', id);
          console.log('Dados recebidos:', data);
          setUsuario(data);
        } else {
          setMensagem('Usuário não encontrado');
        }
      } catch (error) {
        console.error(error);
        setMensagem('Erro ao carregar os dados do usuário.');
      }
    };

    if (id) {
      fetchUsuario();
    }
  }, [id]);

  return (
    <>
      <Navbar />
      <Banner01 />
      <section className="mt-5 mb-5 pb-3">
        <div className="container py-5 h-100 mb-5">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-lg-6 mb-4 mb-lg-0">
              <div className="card mb-3" style={{ borderRadius: '.5rem' }}>
                <div className="row g-0">
                <div className="d-flex justify-content-end pe-3 pt-3">
                <Link
  to="/fifthPage"
  onClick={() => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  }}
>
  <i className="bi bi-box-arrow-in-right"></i>
</Link>                  </div>
                  <div className="col-md-4 gradient-custom text-center text-white"
                    style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1rTLeQraa9s-Rkj2_KMPOzh30CwK1G2D85A&s"
                      alt="Avatar" className="img-fluid my-5" style={{ width: '80px' }} />
                    <h5>{usuario ? usuario.nome : 'Carregando...'}</h5>
                    <i className="far fa-edit mb-5"></i>
                  </div>
                  <div className="col-md-8 mt-5">
                    <div className="card-body p-4">
                      <h6>Information</h6>
                      <hr className="mt-0 mb-4" />
                      <div className="row pt-1">
                        <div className="col-6 mb-3">
                          <h6>Email</h6>
                          <p className="text-muted">{usuario ? usuario.email : 'Carregando...'}</p>
                        </div>
                        <div className="col-6 mb-3">
                          <h6>Phone</h6>
                          <p className="text-muted">{usuario ? usuario.telefone : 'Carregando...'}</p>
                        </div>
                      </div>
                     
                      
                      <div className="d-flex justify-content-start">
                        <a href="#!"><i className="fab fa-facebook-f fa-lg me-3"></i></a>
                        <a href="#!"><i className="fab fa-twitter fa-lg me-3"></i></a>
                        <a href="#!"><i className="fab fa-instagram fa-lg"></i></a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default SecondPage;
