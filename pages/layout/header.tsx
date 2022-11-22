import React from "react";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";

export default function Header(props: any) {
  return (
    <>
      <Navbar fixed="top" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">PSA Sistema de Gestión</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/proyectos/">Proyectos</Nav.Link>
            <Nav.Link href="/soporte/">Soporte</Nav.Link>
            <img
              style={{
                position: "absolute",
                left: "84%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
              src="/usuario_blanco.png"
              width={28}
              alt="..."
            />
            <Navbar.Collapse
              style={{
                position: "absolute",
                left: "90%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
              id="navbar-dark-example"
            >
              <Nav>
                <NavDropdown
                  id="nav-dropdown-dark-example"
                  title="Mario Mendoza"
                  menuVariant="dark"
                >
                  <NavDropdown.Item href="/recursos/">
                    Cargar horas
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item>Ver perfil</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
