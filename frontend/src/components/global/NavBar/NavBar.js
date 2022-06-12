import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";
export const NavBar = () => {
  const navigation = useNavigate();
  const cerrarSession = () => {
    window.sessionStorage.removeItem("sedaserTokenUser");
    navigation("/");
    window.location.reload();
  };

  return (
    <nav className="Padre navbar navbar-light bg-dark p-0">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img
            src="https://sedaser.com/wp-content/uploads/2021/06/Logo-Sedaser-web-1-e1635151429167.png"
            alt=""
            
            className="d-inline-block align-text-top"
          />
        </Link>

        <Link to="/">
          <button
            id="cerrar"
            className="cerrarSession btn"
            onClick={cerrarSession}
          >
            Cerrar Sesion
          </button>
        </Link>
      </div>
    </nav>
  );
};
