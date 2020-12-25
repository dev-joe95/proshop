import React from "react";
import { Navbar, Nav, NavDropdown, Container, Badge } from "react-bootstrap";
import logo from "../logo.svg";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector } from "react-redux";

const Header = () => {
    const { cartItems } = useSelector((state) => state.cart);
    return (
        <header>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand>
                            <img
                                alt=""
                                src={logo}
                                width="20"
                                height="20"
                                className="d-inline-block align-top"
                            />{" "}
                            proshop
                        </Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <LinkContainer to="/products">
                                <Nav.Link>products</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/categories">
                                <Nav.Link>categories</Nav.Link>
                            </LinkContainer>
                            <NavDropdown
                                title="categories"
                                id="collasible-nav-dropdown"
                            >
                                <LinkContainer to="/category-1">
                                    <NavDropdown.Item>
                                        category 1
                                    </NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to="/category-2">
                                    <NavDropdown.Item>
                                        category 2
                                    </NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to="/category-3">
                                    <NavDropdown.Item>
                                        category 3
                                    </NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Divider />
                                <LinkContainer to="/categories">
                                    <NavDropdown.Item>
                                        categories
                                    </NavDropdown.Item>
                                </LinkContainer>
                            </NavDropdown>
                        </Nav>
                        <Nav>
                            <LinkContainer to="/cart">
                                <Nav.Link>
                                    {cartItems.length > 0 && (
                                        <Badge variant="danger" className="rounded">
                                            {cartItems.length}
                                        </Badge>
                                    )}
                                    <i className="fas fa-shopping-cart px-1"></i>
                                    cart
                                </Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/signup">
                                <Nav.Link>
                                    <i className="fas fa-user-plus px-1"></i>
                                    register
                                </Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/login">
                                <Nav.Link>
                                    <i className="fas fa-sign-in-alt px-1"></i>
                                    login
                                </Nav.Link>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;
