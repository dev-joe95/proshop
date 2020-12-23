import React from "react";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
import { NavLink } from "react-router-dom";

const Product = ({ product }) => {
    const { _id, name, image, rating, numReviews, price } = product;
    return (
        <Card className="my-3 p-3 rounded">
            <NavLink to={`/product/${_id}`}>
                <Card.Img src={image} variant="top" />
            </NavLink>
            <Card.Body>
                <NavLink to={`/product/${_id}`}>
                    <Card.Title as="div">{name}</Card.Title>
                </NavLink>
                <Card.Text as="div">
                    <Rating value={rating} text={`${numReviews} reviews`} />
                </Card.Text>
                <Card.Text as="h4">${price}</Card.Text>
            </Card.Body>
        </Card>
    );
};

export default Product;
