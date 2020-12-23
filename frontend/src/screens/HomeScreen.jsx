import React from "react";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import products from "../products";

const HomeScreen = () => {
    return (
        <React.Fragment>
            <h2>Latest Products</h2>
            <Row>
                {products.map((p, index) => (
                    <Col key={index} sm={12} md={6} lg={4} xl={3}>
                        <Product product={p}  />
                    </Col>
                ))}
            </Row>
        </React.Fragment>
    );
};

export default HomeScreen;
