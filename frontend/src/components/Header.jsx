import React, { useState, useEffect } from "react";
import {
    Navbar,
    Nav,
    NavDropdown,
    Container,
    Badge,
    FormControl,
    Row,
    Col,
} from "react-bootstrap";
import logo from "../logo.svg";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../getUserInfo";
import { logout } from "../actions/userActions";

const Header = () => {
    const [user, setUser] = useState({});
    const dispatch = useDispatch();
    const { cartItems } = useSelector((state) => state.cart);
    useEffect(() => {
        setUser(getCurrentUser(localStorage.getItem("token")));
    }, []);
    const logoutHandler = () => {
        dispatch(logout());
        window.location = "/login";
    };
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
                            <LinkContainer to="/sale">
                                <Nav.Link>sale</Nav.Link>
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
                        <Row>
                            <Col>
                                <FormControl
                                    type="search"
                                    placeholder="Search"
                                ></FormControl>
                            </Col>
                        </Row>

                        <Nav className="ml-auto">
                            <LinkContainer to="/cart">
                                <Nav.Link>
                                    {cartItems.length > 0 && (
                                        <Badge pill variant="danger">
                                            {cartItems.length}
                                        </Badge>
                                    )}
                                    <i className="fas fa-shopping-cart px-1"></i>
                                    cart
                                </Nav.Link>
                            </LinkContainer>

                            {user ? (
                                <NavDropdown
                                    title={`Hi ${user.name}`}
                                    id="collasible-nav-dropdown"
                                >
                                    {user.isAdmin && (
                                        <LinkContainer to="/dashboard">
                                            <NavDropdown.Item>
                                                <i className="fas fa-tachometer-alt px-1"></i>
                                                Dashboard
                                            </NavDropdown.Item>
                                        </LinkContainer>
                                    )}
                                    <LinkContainer to="/profile">
                                        <NavDropdown.Item>
                                            <i className="far fa-user px-1"></i>
                                            Profile
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>
                                        <i className="fas fa-sign-out-alt px-1"></i>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <React.Fragment>
                                    <LinkContainer to="/register">
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
                                </React.Fragment>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;
