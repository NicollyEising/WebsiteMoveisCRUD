import React, { useState } from "react";
import "./Navbar.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      const encodedTerm = encodeURIComponent(searchTerm.trim());
      navigate(`/produtos/${encodedTerm}`);
    }
  };

  const handlePersonClick = () => {
    const storedUser = localStorage.getItem('userId');
    console.log("Raw localStorage:", storedUser);

    try {
      const parsed = JSON.parse(storedUser);

      // Caso o dado seja um objeto com userId
      if (parsed && typeof parsed === 'object' && parsed.userId) {
        console.log("Navigating to:", `/sixPage/${parsed.userId}`);
        navigate(`/sixPage/${parsed.userId}`);
        return;
      }

      // Caso seja uma string ou número direto (ex: "51")
      if (typeof parsed === 'number' || typeof parsed === 'string') {
        console.log("Navigating to:", `/sixPage/${parsed}`);
        navigate(`/sixPage/${parsed}`);
        return;
      }

      console.log("Sem userId válido, indo para /fourPage");
      navigate('/fourPage');

    } catch (error) {
      console.error("Erro ao fazer parse do localStorage:", error);
      navigate('/fourPage');
    }
  };

  return (
    <nav className="navbar navbar-expand-lg fixed-top">
      <div className="container">
        <Link to="/" className="title-link">Navbar</Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNavbar}
          aria-controls="navbarSupportedContent"
          aria-expanded={isNavbarOpen ? "true" : "false"}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isNavbarOpen ? "show" : ""}`} id="navbarSupportedContent">
          <div className="d-flex mx-auto align-items-center itensPequeno">
            <ul className="navbar-nav mb-2 mb-lg-0 itensPequeno">
              <li><Link to="/produtos/cadeira" className="page-link">Cadeiras de Escritório</Link></li>
              <li><Link to="/produtos/cadeira" className="page-link">Cadeiras Gamer</Link></li>
              <li><Link to="/produtos/cadeira" className="page-link">Cadeiras Ergonômicas</Link></li>
            </ul>
          </div>

          <div className="icons">
            <button
              className="btn btn-outline-primary me-2"
              onClick={() => setShowSearch(!showSearch)}
            >
              {showSearch ? <i className="bi bi-chevron-right"></i> : <i className="bi bi-search"></i>}
            </button>

            <div className={`search-container ${showSearch ? "show" : ""}`}>
              <form className="d-flex" role="search" onSubmit={handleSearchSubmit}>
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Buscar produto"
                  aria-label="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="btn btn-outline-success" type="submit">
                  <i className="bi bi-search"></i>
                </button>
              </form>
            </div>

            <button
              className="bi bi-person"
              aria-label="Person Icon"
              onClick={handlePersonClick}
            ></button>

            <Link to="/sevenPage" className="page-link">
              <button className="bi bi-cart2" aria-label="Cart Icon"></button>
            </Link>

            <a href="/eightPage" className="btnCart">
              <button className="bi bi-heart-fill" aria-label="Favorites Icon"></button>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
