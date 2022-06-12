//purple--> CONFIGURACIONES
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Admin.css";
//blue--> COMPONENTES
import { NavBar } from "../../global/NavBar/NavBar";
import { ButtonScrollTop } from "../../global/ScrollButton/ScrollButton";
export const AdminView = (user) => {
  const Navigate = useNavigate();
  //red-->PROCESO DE SUSUTITUCION

  const { username } = user.user.userToken;
  //red--><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

  const [datos, setDatos] = useState([]);
  const [datosAdmins, setDatosAdmins] = useState([]);
  //yellow--> local user loged
  const [userLogged, setUserLogged] = useState([]);

  //yellow--> ESTE EFECTO RECUPERA EL TOKEN DEL LOCAL STORAGE
  useEffect(() => {
    const localStorageToken = window.sessionStorage.getItem("sedaserTokenUser");
    if (localStorageToken) {
      const user = JSON.parse(localStorageToken);
      setUserLogged(user);
      GetAdmins(user);
      GetUsers(user);
    }
  }, []);

  const GetUsers = async (user) => {
    try {
      const getProfileUrl = "http://localhost:4000/api/admin/ListUsers";
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "x-access-token": user.token,
        },
      };
      const { data } = await axios.get(getProfileUrl, config);
      setDatos(data);
    } catch (err) {
      console.log("ERROR DEL CATCH", err);
      const { response } = err;
      console.log("Catch", response.data);
      Navigate("*");
    }
  };
  const GetAdmins = async (user) => {
    try {
      const getProfileUrl = "http://localhost:4000/api/admin/ListAdmins";
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "x-access-token": user.token,
        },
      };
      const { data } = await axios.get(getProfileUrl, config);
      setDatosAdmins(data);
    } catch (err) {
      console.log("ERROR DEL CATCH", err);
      const { response } = err;
      console.log("Catch", response.data);
      Navigate("*");
    }
  };
  //green-->AGREGAR USUARIO
  const [postDatos, setPostDatos] = useState({
    username: "",
    email: "",
    password: "",
    roles: ["user"],
  });
  const PostUser = async () => {
    try {
      const getProfileUrl = `http://localhost:4000/api/auth/signup`;
      const config = {
        headers: {
          Authorization: `Bearer ${userLogged.token}`,
          "x-access-token": userLogged.token,
        },
      };

      await axios.post(getProfileUrl, postDatos, config);
    } catch (err) {
      console.log("ERROR DEL CATCH PostUser", err);
      const { response } = err;
      console.log("Catch", response.data);
      Navigate("*");
    }
  };
  const handlePutData = (e) => {
    setPostDatos({
      ...postDatos,
      [e.target.name]:
        e.target.value === "administrador"
          ? (postDatos.roles = ["admin"])
          : e.target.value === "usuario"
          ? (postDatos.roles = ["user"])
          : e.target.value === "null"
          ? (postDatos.roles = [])
          : e.target.value,
    });
  };
  //green--><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  const [BotonCondicional, setBotonCondicional] = useState(true);
  const DeleteUser = async (id) => {
    if (window.confirm("¿Seguro que quieres eliminar el trabajo?")) {
      try {
        const getProfileUrl = `http://localhost:4000/api/admin/DeleteEdithUser/${id}`;
        const config = {
          headers: {
            Authorization: `Bearer ${userLogged.token}`,
            "x-access-token": userLogged.token,
          },
        };
        window.location.reload();
        const { data } = await axios.delete(getProfileUrl, config);
        console.log("DELETE USER", data);
      } catch (err) {
        console.log("DELETE USER ERROR DEL CATCH", err);
        const { response } = err;
        console.log("Catch", response.data);
        Navigate("*");
      }
    }
  };
  return (
    <div>
      <NavBar />
      <div className="principal-contenedor">
        <div className="container">
          <h1 className="text-start">{username}</h1>

          {BotonCondicional && <h3>Lista de Usuarios</h3>}
          {!BotonCondicional && <h3>Lista de Administradores</h3>}

          <div className="btn-group d-inlines">
            <button
              type="button"
              className="btn btn-warning dropdown-toggle mb-3"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Ver ...
            </button>
            <ul className="dropdown-menu">
              <li>
                <button
                  onClick={() => {
                    setBotonCondicional(true);
                  }}
                  className="dropdown-item"
                >
                  Usuarios
                </button>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <button
                  onClick={() => {
                    setBotonCondicional(false);
                  }}
                  className="dropdown-item"
                >
                  Administradores
                </button>
              </li>
            </ul>
          </div>
          <div className="accordion formulario" id="accordionExample">
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingTwo">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  Agregar Usuario
                </button>
              </h2>
              <div
                id="collapseTwo"
                className="accordion-collapse collapse"
                aria-labelledby="headingTwo"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <form onSubmit={PostUser} className="formulario-interior ">
                    <div className="form-floating">
                      <input
                        onChange={(e) => {
                          handlePutData(e);
                        }}
                        className="form-control"
                        id="start"
                        name="username"
                        type="text"
                        required
                      />
                      <label>Nombre de usuario:</label>
                      <br />
                    </div>

                    <div className="form-floating">
                      <input
                        onChange={(e) => {
                          handlePutData(e);
                        }}
                        className="form-control"
                        id="start"
                        name="email"
                        type="email"
                        required
                      />
                      <label>Correo electronico:</label>
                      <br />
                    </div>

                    <div className="form-floating">
                      <input
                        onChange={(e) => {
                          handlePutData(e);
                        }}
                        className="form-control"
                        name="password"
                        type="text"
                        minLength="8"
                        required
                      />
                      <label>Contraseña:</label>
                      <br />
                    </div>

                    <div className="form-floating">
                      <select
                        name="roles"
                        className="form-select"
                        aria-label="Default select example"
                        onChange={(e) => {
                          handlePutData(e);
                        }}
                      >
                        <option value="usuario">Asignar rol</option>

                        <option value="usuario">Usuario</option>

                        <option value="administrador">Administrador</option>
                      </select>
                      <label>Rol:</label> <br />
                    </div>
                    <br />
                    <button type="submit" className="btn btn-success">
                      AGREGAR
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="table-responsive">
            <table className="align-middle table container-fluid w-100 table-hover ">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Correo</th>
                  <th scope="col">Editar</th>
                </tr>
              </thead>
              {BotonCondicional
                ? datos
                    .map((data, i) => (
                      <tbody className="">
                        <tr>
                          <th scope="row" key={i}>
                            {i}
                          </th>

                          <td key={data.username}>{data.username}</td>
                          <td key={data.email}>{data.email}</td>
                          <td key="button">
                            <Link
                              to={`/PerfilAccess/${data.username}/${data._id}`}
                            >
                              <button
                                className="button-style btn btn-primary m-1"
                                type="button"
                              >
                                <span className="material-icons">
                                  remove_red_eye
                                </span>
                              </button>
                            </Link>
                            {data.username === "NativeUser" ? (
                              <button
                                disabled
                                className="button-style btn btn-danger m-1"
                              >
                                <span className="material-icons">
                                  delete_forever
                                </span>
                              </button>
                            ) : (
                              <button
                                onClick={() => {
                                  DeleteUser(data._id);
                                }}
                                className="button-style btn btn-danger m-1"
                              >
                                <span className="material-icons">
                                  delete_forever
                                </span>
                              </button>
                            )}
                          </td>
                        </tr>
                      </tbody>
                    ))
                    .reverse()
                : datosAdmins
                    .map((data, i) => (
                      <tbody className="">
                        <tr>
                          <th scope="row" key={i}>
                            {i}
                          </th>

                          <td key={data.username}>{data.username}</td>
                          <td key={data.email}>{data.email}</td>
                          <td key="button">
                            <Link
                              to={`/PerfilAccess/${data.username}/${data._id}`}
                            >
                              <button
                                className="button-style-ver btn btn-primary m-1"
                                type="button"
                              >
                                <span className="material-icons">
                                  remove_red_eye
                                </span>
                              </button>
                              <br />
                            </Link>
                            {data.username === "NativeAdmin" ? (
                              <button
                                disabled
                                className="button-style-eliminar btn btn-danger m-1"
                              >
                                <span className="material-icons">
                                  delete_forever
                                </span>
                              </button>
                            ) : (
                              <button
                                onClick={() => {
                                  DeleteUser(data._id);
                                }}
                                className="button-style-eliminar btn btn-danger m-1"
                              >
                                <span className="material-icons">
                                  delete_forever
                                </span>
                              </button>
                            )}
                          </td>
                        </tr>
                      </tbody>
                    ))
                    .reverse()}
            </table>
          </div>
          <ButtonScrollTop />
        </div>
      </div>
    </div>
  );
};
