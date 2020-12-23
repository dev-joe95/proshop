import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import axios from "axios";
import Product from "../components/Product";
const HomeScreen = () => {
    const [products, getProducts] = useState([]);
    useEffect(() => {
        const fetchProducts = async () => {
            const { data } = await axios.get("/api/product");
            getProducts(data)
        };
        fetchProducts()
    },[]);
    return (
        <React.Fragment>
            <h2>Latest Products</h2>
            <Row>
                {products.map((p, index) => (
                    <Col key={index} sm={12} md={6} lg={4} xl={3}>
                        <Product product={p} />
                    </Col>
                ))}
            </Row>
        </React.Fragment>
    );
};

export default HomeScreen;
