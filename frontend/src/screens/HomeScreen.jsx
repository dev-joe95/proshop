import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import Loader from "../components/Loader";
import { listProducts } from "../actions/productActions";

const HomeScreen = () => {
    const dispatch = useDispatch();
    const { loading, products, errors } = useSelector(
        (state) => state.productList
    );
    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);
    return (
        <React.Fragment>
            {loading ? (
                <Loader />
            ) : errors ? (
                <Alert variant="danger">{errors}</Alert>
            ) : (
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
            )}
        </React.Fragment>
    );
};

export default HomeScreen;
