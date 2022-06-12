import React from "react";
import { Route, Routes } from "react-router-dom";
//blue-->componentes
import { Login } from "../views/login/Login";
import { AdminView } from "../views/admin/Admin";
import { Error404 } from "../views/global/Error404";
import { UserView } from "../views/user/User";
import { PerfilAccess } from "../views/admin/PerfilAccess";
import { WorkEdith } from "../views/admin/WorkEdith";
//green-->contexto

export const Navigation = () => {
  return (
    <div>
      <Routes>
        {
          //yellow--> RUTA INICIAL
        }
        <Route path="/" element={<Login />} />
        {
          //NOTA--><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
          //yellow--> RUTA DEL ADMINISTRADOR
        }
        {
          //purple-->SOLO PARA EL DAMINISTRADOR
          //AQUI DEBE DE HABER UN CONTEXTO DESPUES DE QUE EL USUARIO SE LOGEE
        }
        <Route path="/admin" element={<AdminView />} />
        <Route
          path="/PerfilAccess/:username/:userId"
          element={<PerfilAccess />}
        />
        <Route
          path="/WorkEdith/:username/:userId/:workId"
          element={<WorkEdith />}
        />
        {
          //NOTA--><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
        }
        {
          //yellow--> RUTA DEL USUARIO
        }
        <Route path="/userProfile" element={<UserView />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  );
};
