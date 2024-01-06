import React, { Fragment } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();
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
            {location?.pathname === "/login" || "/dashboard" ? null : (
              <Nav.Link>
                <Link
                  to="/login"
                  style={{ textDecoration: "none", color: "gray" }}
                >
                  {" "}
                  Login
                </Link>
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Fragment>
  );
}
