import React from "react";
import { Container } from "react-bootstrap";
import "./App.css";
import Header from "./components/header";
import Footer from "./components/footer";

function App() {
    return (
        <React.Fragment>
            <Header />
            <Container>
                <main className="py-3">
                    <h1>Hello Proshop</h1>
                </main>
            </Container>
            <Footer />
        </React.Fragment>
    );
}

export default App;
