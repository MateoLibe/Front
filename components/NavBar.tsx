import React from "react";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";

export const NavBar = () => {
  return (
    <>
      <div className=" navigation d-flex  justify-content-between p-2 align-items-center">
        <div className="col-12 profile d-flex justify-content-end">
          <span className="mx-2">
            <NavDropdown title="Mario Mendoza">
              <NavDropdown.Item href="/recursos/">
                Cargar horas
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item active={false}>Ver perfil</NavDropdown.Item>
            </NavDropdown>
          </span>
          <div className="profile_picture ">
            <img src="/assets/img/profile_picture.svg" alt="profile_picture" />
          </div>
        </div>
      </div>
    </>
  );
};
