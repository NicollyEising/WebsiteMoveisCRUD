import { useState, } from 'react';
import { useNavigate } from 'react-router-dom';

import Navbar from './componentes/Navbar.jsx';
import Banner01 from './componentes/Banner01.jsx';
import Footer from './componentes/Footer.jsx';
import { Link } from 'react-router-dom';

import './index.css';
import './fourPage.css';

function SecondPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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
      const response = await fetch('http://127.0.0.1:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 422) {
        const errorData = await response.json();
        setMensagem(`Erro de validação: ${errorData.detail.map((e) => e.msg).join(', ')}`);
        return;
      }

      if (response.status === 401) {
        setMensagem('Credenciais inválidas. Verifique e-mail e senha.');
        return;
      }

      if (!response.ok) {
        setMensagem('Ocorreu um erro inesperado. Tente novamente mais tarde.');
        return;
      }

      const data = await response.json();
      setMensagem('Login realizado com sucesso.');
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.userId);
      localStorage.setItem('carrinhoId', data.carrinhoId);  // Armazenando o ID do usuário
      navigate(`/sixPage/${data.userId}`);
      
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
        <div className="py-5 text-center text-lg-start mb-5 pb-5">
          <div className="container">
            <div className="row gx-lg-5 align-items-center">
              <div className="col-lg-6 mb-5 mb-lg-0">
                <h1 className="my-5 display-3 fw-bold ls-tight">
                  Acesse sua conta <br />
                  <span className="textoBurlywood">e aproveite as ofertas</span>
                </h1>
              </div>

              <div className="col-lg-6 mb-5 mb-lg-0">
                <div className="card px-5">
                  <div className="card-body py-5 px-md-5">
                    <h3 className="text-center mb-5">Login</h3>
                    <form onSubmit={handleSubmit}>
                    <div className="input-icon-wrapper mb-4">
                      <i className="bi bi-envelope"></i>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-control"
                        required
                        placeholder="E-mail"
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

                      <button id='botaoCadastro' type="submit" className="btn btn-block mb-4 w-100">
                        Entrar
                      </button>

                      <p className="login">Não possui cadastro? <Link to="/fourPage" className="facaLogin">Cadastre-se</Link></p>


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
