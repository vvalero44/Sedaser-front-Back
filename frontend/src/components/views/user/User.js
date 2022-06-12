import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavBar } from "../../global/NavBar/NavBar";
import { ButtonScrollTop } from "../../global/ScrollButton/ScrollButton";
export const UserView = (user) => {
  const { token } = user.user;
  const { username } = user.user.userToken;
  const [datos, setDatos] = useState([]);
  const GetWorks = async () => {
    try {
      const getProfileUrl = "http://localhost:4000/api/profile";
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "x-access-token": token,
        },
      };
      const { data } = await axios.get(getProfileUrl, config);
      setDatos(data);
    } catch (err) {
      console.log("ERROR DEL CATCH", err);
    }
  };
  useEffect(() => {
    GetWorks();
  }, []);

  return (
    <div>
      <NavBar />
      <div className="principal-contenedor">
        <h1 className="">{username}</h1>
        <div className="d-flex flex-wrap m-2">
          <div className="table-responsive">
            <table className="align-middle table container-fluid w-75 table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">inicio</th>
                  <th scope="col">Final</th>
                  <th scope="col">Tiempo empleado: </th>
                  <th>Técnico:</th>
                  <th scope="col">Titulo</th>
                  <th scope="col">Comentario</th>
                </tr>
              </thead>
              {datos
                .map((data, i) => (
                  <tbody className=" ">
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
                      <th key={data.time}>{data.time}</th>
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
                    </tr>
                  </tbody>
                ))
                .reverse()}
            </table>
          </div>
        </div>
        <ButtonScrollTop/>
      </div>
    </div>
  );
};
