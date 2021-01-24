import React, { useEffect } from "react";
import { Alert, Carousel, Image } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { listTopSaleProducts } from "../actions/productActions";
import Loader from "./Loader";
import { Link } from "react-router-dom";

const SaleCarousel = () => {
    const dispatch = useDispatch();
    const { loading, error, products } = useSelector(
        (state) => state.productTopSale
    );
    useEffect(() => {
        dispatch(listTopSaleProducts());
    }, [dispatch]);
    return loading ? (
        <Loader />
    ) : error ? (
        <Alert variant="danger">{error}</Alert>
    ) : (
        <React.Fragment>
            <Carousel pause="hover" className="bg-dark" indicators={false}>
                {products.map((product, index) => (
                    <Carousel.Item key={index}>
                        <Link to={`/product/${product._id}`}>
                            <Image
                                src={product.image}
                                alt={product.name}
                                fluid
                            />
                        </Link>
                    </Carousel.Item>
                ))}
            </Carousel>
        </React.Fragment>
    );
};

export default SaleCarousel;
