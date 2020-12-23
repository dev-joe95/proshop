import React from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import logo from "../logo.svg";

const Header = () => {
    return (
        <header>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">
                        <img
                            alt=""
                            src={logo}
                            width="20"
                            height="20"
                            className="d-inline-block align-top"
                        />{" "}
                        proshop
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="#features">products</Nav.Link>
                            <Nav.Link href="#pricing">categories</Nav.Link>
                            <NavDropdown
                                title="categories"
                                id="collasible-nav-dropdown"
                                className="text-uppercase"
                            >
                                <NavDropdown.Item href="#action/3.1">
                                    category 1
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">
                                    category 2
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">
                                    category 3
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">
                                    category 1
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Nav>
                            <Nav.Link href="/cart">
                                <i className="fas fa-shopping-cart px-1"></i>
                                cart
                            </Nav.Link>
                            <Nav.Link href="/signup">
                                <i className="fas fa-user-plus px-1"></i>register
                            </Nav.Link>
                            <Nav.Link eventKey={2} href="/signin">
                                <i className="fas fa-sign-in-alt px-1"></i>login
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;
