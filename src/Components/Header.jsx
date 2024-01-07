import React, { Fragment, useState } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { getSession, removeSession } from "../config/session";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import AddComponent from "./AddComponent";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  function handleLogout() {
    removeSession("isAuthenticated");
    navigate("/");
  }

  function handleAdd() {
    toggle();
  }
  return (
    <Fragment>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand>
          <Link to="/" style={{ textDecoration: "none", color: "gray" }}>
            Nivesh Dev
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav
            className="mr-auto"
            style={{ display: "flex", marginLeft: "auto" }}
          >
            {location?.pathname === "/" ? (
              <Nav.Link>
                <Link
                  to={getSession("isAuthenticated") ? "/dashboard" : "/login"}
                  style={{ textDecoration: "none", color: "gray" }}
                >
                  {" "}
                  Login
                </Link>
              </Nav.Link>
            ) : null}

            {location?.pathname === "/dashboard" ? (
              <>
                <Nav.Link onClick={() => handleAdd()}>Add</Nav.Link>
                <Nav.Link onClick={() => handleLogout()}>Log Out</Nav.Link>
              </>
            ) : null}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add</ModalHeader>
        <ModalBody>
          <AddComponent toggle={toggle} />
        </ModalBody>
      </Modal>
    </Fragment>
  );
}
