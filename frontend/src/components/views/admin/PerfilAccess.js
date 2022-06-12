import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
//blue--> COMPONENTES
import { NavBar } from "../../global/NavBar/NavBar";
import { ButtonScrollTop } from "../../global/ScrollButton/ScrollButton";
import "./PerfilAccess.css";
export const PerfilAccess = () => {
  const Navigate = useNavigate();
  const [datos, setDatos] = useState([]);
  const [userLogged, setUserLogged] = useState([]);
  //purple-->
  const [postDatos, setPostDatos] = useState({
    startDay: datos.startDay,
    endDay: datos.endDay,
    description: datos.description,
    comments: datos.comments,
    technical: datos.technical,
    time: datos.time,
  });
  //purple-->
  const params = useParams();

  //GREEN--> GET WORKS
  useEffect(() => {
    const localStorageToken = window.sessionStorage.getItem("sedaserTokenUser");
    if (localStorageToken) {
      const user = JSON.parse(localStorageToken);
      setUserLogged(user);
      GetWorks(user);
    }
  }, []);
  const GetWorks = async (user) => {
    try {
      const getProfileUrl = `http://localhost:4000/api/admin/GetUserWorks/${params.userId}`;
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "x-access-token": user.token,
        },
      };
      const { data } = await axios.get(getProfileUrl, config);
      console.log('TRY',data);
      setDatos(data);
    } catch (err) {
      console.log("ERROR DEL CATCH", err);
      const {response} = err
      console.log('Catch',response.data)
      Navigate("*")
    }
  };
  //green--><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  //yellow--> AGREGAR UN WORK GET
  const PostWorks = async () => {
    try {
      const getProfileUrl = `http://localhost:4000/api/admin/PostEdithUserWork/${params.userId}`;
      const config = {
        headers: {
          Authorization: `Bearer ${userLogged.token}`,
          "x-access-token": userLogged.token,
        },
      };
      const { data } = await axios.post(getProfileUrl, postDatos, config);
      setDatos(data);
      window.location.reload();
    } catch (err) {
      console.log("ERROR DEL CATCH", err);
      const {response} = err
      console.log('Catch',response.data)
      Navigate("*")
    }
  };
  const handlePutData = (e) => {
    setPostDatos({
      ...postDatos,
      [e.target.name]: e.target.value,
    });
  };
  //yellow--><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

  //red--> ELIMINAR UNA NOTA

  const DeleteWork = async (id) => {
    if (window.confirm("¿Seguro que quieres eliminar el trabajo?")) {
      try {
        const getProfileUrl = `http://localhost:4000/api/admin/DeleteEdithUserWork/${id}`;
        const config = {
          headers: {
            Authorization: `Bearer ${userLogged.token}`,
            "x-access-token": userLogged.token,
          },
        };
        await axios.delete(getProfileUrl, config);
        window.location.reload();
      } catch (err) {
        console.log("DELETE WORK ERROR DEL CATCH", err);
        
      const {response} = err
      console.log('Catch',response.data)
      Navigate("*")
      }
    }

  };

  return (
    <div>
      <NavBar />
      <div className="principal-contenedor text-center  ">
        <div className="container">
          <h1 className="text-start">{params.username}</h1>
          <div className="accordion formulario" id="accordionExample">
            <div className="accordion-item ">
              <h2 className="accordion-header" id="headingTwo">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  Agregar Trabajo
                </button>
              </h2>
              <div
                id="collapseTwo"
                className="accordion-collapse collapse"
                aria-labelledby="headingTwo"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <form onSubmit={PostWorks} className="formulario-interior">
                    <div className="form-group text-start fw-bold">
                      <label>Fecha de inicio:</label>

                      <input
                        className="form-control"
                        id="start"
                        name="startDay"
                        defaultValue={datos.startDay}
                        onChange={(e) => {
                          handlePutData(e);
                        }}
                        type="date"
                        required
                      />
                      <br />
                    </div>
                    <div className="form-group text-start fw-bold">
                      <label>Fecha de finalizacion:</label>
                      <input
                        className="form-control"
                        id="start"
                        name="endDay"
                        defaultValue={datos.endDay}
                        onChange={(e) => {
                          handlePutData(e);
                        }}
                        type="date"
                        required
                      />
                      <br />
                    </div>

                    <div className="form-group text-start fw-bold">
                      <label>Tiempo empleado:</label>
                      <input
                        className="form-control"
                        id="start"
                        name="time"
                        defaultValue={datos.endDay}
                        onChange={(e) => {
                          handlePutData(e);
                        }}
                        type="time"
                        required
                      />
                      <br />
                    </div>
                    <div className="form-floating">
                      <textarea
                        className="form-control"
                        name="technical"
                        defaultValue={datos.description}
                        onChange={(e) => {
                          handlePutData(e);
                        }}
                        type="text"
                        required
                      />
                      <label>Tecnico:</label>
                      <br />
                    </div>
                    <div className="form-floating">
                      <textarea
                        className="form-control"
                        name="description"
                        defaultValue={datos.description}
                        onChange={(e) => {
                          handlePutData(e);
                        }}
                        type="text"
                        required
                      />
                      <label>Titulo:</label>
                      <br />
                    </div>

                    <div className="form-floating">
                      <textarea
                        className="form-control"
                        name="comments"
                        defaultValue={datos.comments}
                        onChange={(e) => {
                          handlePutData(e);
                        }}
                        type="update"
                        required
                      />
                      <label>Comentario:</label> <br />
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
            <table className="align-middle table container-fluid w-100 table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">inicio</th>
                  <th scope="col">Final</th>
                  <th scope="col">Tiempo empleado:</th>
                  <th scope="col">Tecnico:</th>
                  <th scope="col">Titulo</th>
                  <th scope="col">Comentario</th>
                  <th scope="col">Editar</th>
                </tr>
              </thead>
              {datos
                .map((data, i) => (
                  <tbody className="">
                    <tr>
                      <th scope="row" key={i}>
                        {i}
                      </th>

                      <td key={data.startDay}>
                        <div className=" date card border-info mb-3">
                          <div className="card-body ">
                            <p className="card-text">{data.startDay}</p>
                          </div>
                        </div>
                      </td>
                      <td key={data.endDay}>
                        <div className=" date card border-warning mb-3">
                          <div className="card-body ">
                            <p className="card-text">{data.endDay}</p>
                          </div>
                        </div>
                      </td>

                      <th key={data.time}>{data.time} h</th>
                      <td key={data.technical}>{data.technical}</td>

                      <td key={data.description}>
                        <div className="tarjeta card border-primary mb-3">
                          <div className="card-body text-primary">
                            <p className="card-text">{data.description}</p>
                          </div>
                        </div>
                      </td>
                      <td key={data.comments}>
                        <div className="tarjeta card border-success mb-3">
                          <div className="card-body text-success">
                            <p className="card-text">{data.comments}</p>
                          </div>
                        </div>
                      </td>

                      <td>
                        <Link
                          to={`/WorkEdith/${params.username}/${params.userId}/${data._id}`}
                        >
                          <button className="boton btn btn-secondary">
                            <span className="material-icons">mode_edit</span>
                          </button>
                          <br />
                        </Link>

                        <button
                          onClick={() => {
                            DeleteWork(data._id);
                          }}
                          className="btn btn-danger"
                        >
                          <span className="material-icons">delete_forever</span>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                ))
                .reverse()}
            </table>
          </div>
          <ButtonScrollTop/>
        </div>
      </div>
    </div>
  );
};
