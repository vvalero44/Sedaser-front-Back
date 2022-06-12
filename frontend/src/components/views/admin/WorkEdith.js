import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./WorkEdith.css";
import { NavBar } from "../../global/NavBar/NavBar";
export const WorkEdith = () => {
  const params = useParams();
  const Navigate = useNavigate();
  const [datos, setDatos] = useState([]);
  const [userLogged, setUserLogged] = useState([]);

  const [putData, setPutData] = useState({
    startDay: datos.startDay,
    endDay: datos.endDay,
    description: datos.description,
    comments: datos.comments,
    time: datos.time,
    technical: datos.technical,
  });

  useEffect(() => {
    const localStorageToken = window.sessionStorage.getItem("sedaserTokenUser");
    if (localStorageToken) {
      const user = JSON.parse(localStorageToken);
      setUserLogged(user);
      GetWorks(user);
    }
  }, []);
  //yellow--> RELLENAR EL FORMULARIO PARA EDITAR
  const GetWorks = async (user) => {
    try {
      const getProfileUrl = `http://localhost:4000/api/admin/GetEdithUserWork/${params.workId}`;
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
      const {response} = err
      console.log('Catch',response.data)
      Navigate("*")
    }
  };
  //yellow--><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

  //green-->ACTUALIZAR NOTA
  const PutWorks = async () => {
    try {
      const getProfileUrl = `http://localhost:4000/api/admin/PutEdithUserWork/${params.workId}`;
      const config = {
        headers: {
          Authorization: `Bearer ${userLogged.token}`,
          "x-access-token": userLogged.token,
        },
      };
      Navigate(`/PerfilAccess/${params.username}/${params.userId}`);
      const { data } = await axios.put(getProfileUrl, putData, config);
      setDatos(data);
    } catch (err) {
      console.log("ERROR DEL CATCH", err);
      const {response} = err
      console.log('Catch',response.data)
      Navigate("*")
    }
  };

  const handlePutData = (e) => {
    setPutData({
      ...putData,
      [e.target.name]: e.target.value,
    });
  };
  //green--><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

  return (
    <div>
      <NavBar />
      <div className="principal-contenedor text-center">
        <div className="m-3 mt-0">
          <div className="container contenedor-editar-trabajo">
            <h1>EDITAR TRABAJO</h1>
            <form className="formulario-workEdith" onSubmit={PutWorks}>
              <div className="form-group text-start fw-bold">
                <label>Fecha de inicio:</label>
                <input
                  className="form-control"
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
                  name="endDay"
                  defaultValue={datos.endDay}
                  onChange={(e) => {
                    handlePutData(e);
                  }}
                  type="date"
                  required
                />
                <br/>
              </div>
              <div className="form-group text-start fw-bold">
                <label>Tiempo empleado:</label>
                <input
                  className="form-control"
                  name="time"
                  defaultValue={datos.time}
                  onChange={(e) => {
                    handlePutData(e);
                  }}
                  type="time"
                  required
                />
              </div>
              <br />
              <hr className="fw-bold" />
              <br />
              <div className="form-floating">
                <input
                  className="form-control"
                  name="technical"
                  defaultValue={datos.technical}
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
                  id="comments"
                  className="form-control"
                  name="comments"
                  defaultValue={datos.comments}
                  onChange={(e) => {
                    handlePutData(e);
                  }}
                  type="update"
                  required
                />
                <label>Comentario:</label>
                <br />
              </div>

              <button type="submit" className="btn btn-success">
                <span className="material-icons">update</span>
                ACTUALIZAR
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
