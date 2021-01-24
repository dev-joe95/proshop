import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import Loader from "../components/Loader";
import { listProducts } from "../actions/productActions";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import SaleCarousel from "../components/SaleCarousel";

const HomeScreen = ({ match }) => {
    const keyword = match.params.keyword;
    const pageNumber = match.params.pageNumber || 1;
    const dispatch = useDispatch();
    const { loading, products, errors, pages, page } = useSelector(
        (state) => state.productList
    );
    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber, 6));
    }, [dispatch, keyword, pageNumber]);
    return (
        <React.Fragment>
            {!keyword && <ProductCarousel />}
            {loading ? (
                <Loader />
            ) : errors ? (
                <Alert variant="danger">{errors}</Alert>
            ) : (
                <React.Fragment>
                    <h2 className="mt-5">Latest Products</h2>
                    <Row>
                        <Col md={9}>
                            <Row>
                                {products.map((p, index) => (
                                    <Col
                                        key={index}
                                        sm={12}
                                        md={6}
                                        lg={4}
                                        xl={4}
                                    >
                                        <Product product={p} />
                                    </Col>
                                ))}
                            </Row>
                        </Col>
                        <Col md={3}>{!keyword && <SaleCarousel />}</Col>
                    </Row>
                    <Paginate
                        pages={pages}
                        page={page}
                        keyword={keyword ? keyword : ""}
                    />
                </React.Fragment>
            )}
        </React.Fragment>
    );
};

export default HomeScreen;
