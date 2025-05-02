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

  return (
    <nav className="navbar navbar-expand-lg fixed-top">
      <div className="container">
        <Link to="/" className="page-link">Navbar</Link>

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
              <li>
                <a className="dropdown-item px-4" href="#">Cadeiras de Escritório</a>
              </li>
              <li>
                <a className="dropdown-item px-4" href="#">Cadeiras Gamer</a>
              </li>
              <li>
                <a className="dropdown-item px-4" href="#">Cadeiras Ergonômicas</a>
              </li>
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

            <a href="#" className="btnCart">
              <button className="bi bi-person" aria-label="Person Icon"></button>
            </a>
            <a href="#" className="btnCart">
              <button className="bi bi-cart2" aria-label="Cart Icon"></button>
            </a>
            <a href="#" className="btnCart">
              <button className="bi bi-heart-fill" aria-label="Favorites Icon"></button>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
