import React from "react";
import { Link } from "react-router-dom";
export const Error404 = () => {
  return (
    <div>
      <nav className="navbar navbar-light bg-dark p-0 m-0">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img
              src="https://sedaser.com/wp-content/uploads/2021/06/Logo-Sedaser-web-1-e1635151429167.png"
              alt=""
              className="d-inline-block align-text-top"
            />
          </a>
          <br />
        </div>
      </nav>
      <div className="principal-contenedor">
        <h1>ERROR 404</h1>
        <h4>¿Te has perdido?</h4>
        <p>Regresa al inicio</p>
        <Link to={`/`}>
          <button className="boton btn btn-secondary">
            <strong>
              Inicio <span className="material-icons">home</span>
            </strong>
          </button>
          <br />
        </Link>
      </div>
    </div>
  );
};
