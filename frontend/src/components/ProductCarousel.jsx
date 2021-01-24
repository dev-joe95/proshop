import React, { useEffect } from "react";
import { Alert, Carousel, Image } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { listTopProducts } from "../actions/productActions";
import Loader from "./Loader";
import { Link } from "react-router-dom";

const ProductCarousel = () => {
    const dispatch = useDispatch();
    const { loading, error, products } = useSelector(
        (state) => state.productTopRated
    );
    useEffect(() => {
        dispatch(listTopProducts());
    }, [dispatch]);
    return loading ? (
        <Loader />
    ) : error ? (
        <Alert variant="danger">{error}</Alert>
    ) : (
        <React.Fragment>
            <Carousel pause="hover" className="bg-dark">
                {products.map((product, index) => (
                    <Carousel.Item key={index}>
                        <Link to={`/product/${product._id}`}>
                            <Image
                                className="d-block w-100"
                                src={product.image}
                                alt={product.name}
                                fluid
                            />
                            <Carousel.Caption className="carousel-caption">
                                <h2>{product.name}</h2>
                                <p className="text-dark">
                                    {product.description}
                                </p>
                            </Carousel.Caption>
                        </Link>
                    </Carousel.Item>
                ))}
            </Carousel>
        </React.Fragment>
    );
};

export default ProductCarousel;
