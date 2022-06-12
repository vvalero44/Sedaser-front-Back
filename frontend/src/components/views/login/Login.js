//configuraciones
import React, { useState, useEffect } from "react";
import "./Login.css";
import { login } from "../../../services/Login";
//vistas condicionales
import { AdminView } from "../admin/Admin";
import { UserView } from "../user/User";
//

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [datosError, setDatosError] = useState({
    loading: false,
    error: false,
  });
  useEffect(() => {
    const localStorageToken = window.sessionStorage.getItem("sedaserTokenUser");
    if (localStorageToken) {
      setUser(JSON.parse(localStorageToken));
    }
  }, []);

  const handleLogin = async (e) => {
    setDatosError({
      loading: true,
      error: false,
    });
    try {
      e.preventDefault();
      const user = await login({
        email: username,
        password: password,
      });

      window.sessionStorage.setItem("sedaserTokenUser", JSON.stringify(user));

      setUser(user);
      setUsername("");
      setPassword("");
    } catch (err) {
      console.log(err.response.data);
      setDatosError({
        loading: false,
        error: true,
      });
      setTimeout(() => {
        setDatosError({
          loading: false,
          error: false,
        });
      }, 3500);
    }
  };

  return (
    <div className="">
      {user ? (
        user.userToken.roles === "user" ? (
          <UserView user={user} /> //RED--> solucionar, sacar a un contexto global
        ) : (
          <AdminView user={user} /> //RED--> solucionar, sacar a un contexto global
        )
      ) : (
        <div className="">
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
          <div className="justify-content-center align-items-center">
            <div className="divForm text-center mt-5">
              <form className="" onSubmit={handleLogin}>
                <img
                  src="https://sedaser.com/wp-content/uploads/2021/06/Logo-Sedaser-web-1-e1635151429167.png"
                  alt=""
                  className="logo"
                />
                <h2>Iniciar sesion:</h2>
                <div className="form-floating">
                  <input
                    className="form-control"
                    id="floatingInputValue"
                    type="email"
                    value={username}
                    name="username"
                    onChange={({ target }) => setUsername(target.value)}
                    required
                  />
                  <label>Correo: </label>
                  <br />
                </div>

                <div className="form-floating">
                  <input
                    className="form-control"
                    id="floatingInputValue"
                    type="password"
                    value={password}
                    name="password"
                    onChange={({ target }) => setPassword(target.value)}
                    minLength="4"
                    required
                  />
                  <label>Contraseña: </label>
                  <br />
                </div>

                {datosError.loading && (
                  <>
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <br />
                    <br />
                  </>
                )}
                {datosError.error && (
                  <>
                    <div className="alert alert-danger p-1" role="alert">
                      <p className="error-login text-danger">
                        ¡¡¡E-mail o contraseña incorrectos!!!
                      </p>
                    </div>
                  </>
                )}
                <button className="btn btn-primary" type="submit">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
