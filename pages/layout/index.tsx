import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import Header from "./header";

export default function Layout({ children }: any) {
  return (
    <div>
      <div className="content_title p-5">
        <h2>Bienvenido a PSA SPR SYSTEMa</h2>
      </div>

      <div className="modules d-flex justify-content-center align-items-center">
        <div className="modules_app ">
          <img src="icon_proyectos_xl.svg" alt="profile_picture" />
          <h3 className="module_title">Proyectoss</h3>
        </div>
        <div className="modules_app ">
          <img src="icon_soporte_xl.svg" alt="profile_picture" />
          <h3 className="module_title">Soporte</h3>
        </div>
      </div>
    </div>
  );
}
