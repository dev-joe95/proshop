import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from './screens/CartScreen';

function App() {
    return (
        <React.Fragment>
            <BrowserRouter>
                <Header />
                <Container>
                    <main className="py-4">
                        <Route path="/cart/:id?" component={CartScreen} />
                        <Route path="/product/:id" component={ProductScreen} />
                        <Route path="/products" component={HomeScreen} exact />
                        <Route path="/" component={HomeScreen} exact />
                    </main>
                </Container>
                <Footer />
            </BrowserRouter>
        </React.Fragment>
    );
}

export default App;
