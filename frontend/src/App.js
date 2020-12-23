import React from "react";
import { Container } from "react-bootstrap";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";

function App() {
    return (
        <React.Fragment>
            <Header />
            <Container>
                <main className="py-4">
                    <HomeScreen />
                </main>
            </Container>
            <Footer />
        </React.Fragment>
    );
}

export default App;
