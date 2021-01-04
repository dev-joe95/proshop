import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Container } from "react-bootstrap";
const DefaultLayout = (props) => {
    return (
        <React.Fragment>
            <Header />
            <Container>
                <main className="py-4">{props.children}</main>
            </Container>
            <Footer />
        </React.Fragment>
    );
};

export default DefaultLayout;
