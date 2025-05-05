import { useState } from 'react'; // Corrigido: é necessário importar useEffect
import Navbar from './componentes/Navbar.jsx';
import Banner01 from './componentes/Banner01.jsx';
import Footer from './componentes/Footer.jsx';
import './index.css';
import './fourPage.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function SecondPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
  });

  const [mensagem, setMensagem] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem('');
    try {
      const response = await fetch('http://127.0.0.1:8000/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      if (response.status === 409) {
        setMensagem('Usuário já cadastrado. Por favor, faça login.');
        return;
      }
      
      if (!response.ok) {
        throw new Error('Erro ao cadastrar usuário');
      }
  
      const data = await response.json();
      setMensagem('Cadastro realizado com sucesso.');
      localStorage.setItem('token', data.token);  // Caso você precise do token
      localStorage.setItem('userId', data.id);  // Armazenando o ID do usuário
      localStorage.setItem('carrinhoId', data.carrinhoId);  // Armazenando o ID do usuário
      navigate(`/sixPage/${data.id}`);  // Usando o id retornado pela API
  
    } catch (error) {
      console.error(error);
      setMensagem('Erro ao fazer login. Verifique seu e-mail e senha.');
    }
  };

  return (
    <>
      <Navbar />
      <Banner01 />

      <section>
        <div className="px-4 text-center text-lg-start mb-5 pb-3">
          <div className="container">
            <div className="row gx-lg-5 align-items-center">
              <div className="col-lg-6 mb-5 mb-lg-0">
                <h1 className="my-5 display-3 fw-bold ls-tight">
                  Faça seu cadastro <br />
                  <span className="textoBurlywood">e aproveite as ofertas</span>
                </h1>
              </div>

              <div className="col-lg-6 mb-5 mb-lg-0">
                <div className="card px-5">
                  <div className="card-body py-5 px-md-5">
                    <h3 className="text-center mb-5">Cadastre-se</h3>
                    <form onSubmit={handleSubmit}>
                    <div className="input-icon-wrapper mb-4">
                      <i className="bi bi-person-fill"></i>
                      <input
                        type="text"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        className="form-control"
                        required
                        placeholder="Nome"
                      />
                    </div>

                    <div className="input-icon-wrapper mb-4">
                      <i className="bi bi-envelope"></i>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-control"
                        required
                        placeholder="Email"
                      />
                    </div>

                    <div className="input-icon-wrapper mb-4">
                      <i className="bi bi-key-fill"></i>
                      <input
                        type="password"
                        name="senha"
                        value={formData.senha}
                        onChange={handleChange}
                        className="form-control"
                        required
                        placeholder="Senha"
                      />
                    </div>


                      <button id="botaoCadastro" type="submit" className="btn btn-block mb-4 w-100">
                        Cadastrar
                      </button>

                      <p className="login">Já possui cadastro? <Link to="/fifthPage" className="facaLogin">Faça Login</Link></p>

                      {mensagem && <div className="alert alert-info">{mensagem}</div>}
                    </form>
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
