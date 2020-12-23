import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import logo from "../logo.svg";

const Footer = () => {
    return (
        <footer className="bg-dark text-white">
            <Container>
                <Row>
                    <Col className="text-center py-4">
                        Copyright &copy; {new Date().getFullYear()}{" "}
                        <img
                            alt=""
                            src={logo}
                            width="20"
                            height="20"
                            className="d-inline-block align-top"
                        />{" "}
                        Proshop
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
