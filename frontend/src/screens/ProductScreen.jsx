import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    Alert,
    Row,
    Col,
    Image,
    ListGroup,
    Card,
    Button,
    FormControl,
    FormGroup,
    Form,
    FormLabel,
} from "react-bootstrap";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import { Helmet } from "react-helmet";
import {
    listProductDetails,
    createProductReview,
} from "../actions/productActions";

const ProductScreen = ({ history, match }) => {
    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const dispatch = useDispatch();
    const { loading, product, error } = useSelector(
        (state) => state.productDetails
    );
    const {
        loading: loadingProductReview,
        success: successProductReview,
        error: errorProductReview,
    } = useSelector((state) => state.productReviewCreate);
    const { token } = useSelector((state) => state.userLogin);
    useEffect(() => {
        if (successProductReview) {
            alert("Submitting a review success");
            setRating(0);
            setComment("");
            dispatch({ type: "PRODUCT_CREATE_REVIEW_RESET" });
        }
        dispatch(listProductDetails(match.params.id));
    }, [match, dispatch, successProductReview]);
    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`);
    };
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(createProductReview(match.params.id, { rating, comment }));
    };
    return (
        <React.Fragment>
            <Helmet>
                <title>{`${product.name}`} | Welcome to proshop</title>
            </Helmet>
            <Link className="btn btn-dark my-3" to="/">
                <i className="fas fa-chevron-left mx-1"></i>Go Back
            </Link>
            {loading ? (
                <Loader />
            ) : error ? (
                <Alert variant="danger">{error}</Alert>
            ) : (
                <React.Fragment>
                    <Row>
                        <Col md={6}>
                            <Image
                                src={product.image}
                                alt={product.name}
                                fluid
                            />
                        </Col>
                        <Col md={3}>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h2>{product.name}</h2>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Rating
                                        value={product.rating}
                                        text={`${product.numReviews} reviews`}
                                    />
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Price: {`$${product.price}`}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Description: {product.description}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={3}>
                            <Card>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Price:</Col>
                                            <Col>
                                                <strong>{`$${product.price}`}</strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Status:</Col>
                                            <Col>
                                                <strong>
                                                    {product.countInStock >
                                                    0 ? (
                                                        <span className="text-success">
                                                            In stock
                                                        </span>
                                                    ) : (
                                                        <span className="text-danger">
                                                            Out of stock
                                                        </span>
                                                    )}
                                                </strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    {product.countInStock > 0 && (
                                        <ListGroup.Item>
                                            <Row className="flex align-items-center">
                                                <Col>Quantity</Col>
                                                <Col>
                                                    <FormControl
                                                        as="select"
                                                        value={qty}
                                                        onChange={(e) =>
                                                            setQty(
                                                                e.target.value
                                                            )
                                                        }
                                                    >
                                                        {[
                                                            ...Array(
                                                                product.countInStock
                                                            ).keys(),
                                                        ].map((x) => (
                                                            <option
                                                                key={x + 1}
                                                                value={x + 1}
                                                            >
                                                                {x + 1}
                                                            </option>
                                                        ))}
                                                    </FormControl>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    )}
                                    <ListGroup.Item>
                                        <Button
                                            className="btn btn-dark btn-block"
                                            type="button"
                                            onClick={addToCartHandler}
                                            disabled={
                                                !(product.countInStock > 0)
                                            }
                                        >
                                            Add to cart
                                        </Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                    {loadingProductReview ? (
                        <Loader />
                    ) : (
                        <Row>
                            <Col md={6}>
                                <h2>Review</h2>
                                {product.reviews.length === 0 && (
                                    <Alert variant="info">
                                        There is no reviews
                                    </Alert>
                                )}
                                <ListGroup>
                                    {product.reviews.map((review, index) => (
                                        <ListGroup.Item key={index}>
                                            <strong>{review.name}</strong>
                                            <Rating value={review.rating} />
                                            <p>
                                                {review.createdAt.substring(
                                                    0,
                                                    10
                                                )}
                                            </p>
                                            <p>{review.comment}</p>
                                        </ListGroup.Item>
                                    ))}
                                    <ListGroup.Item>
                                        <h3>Write your comment</h3>
                                        {errorProductReview && (
                                            <Alert variant="danger">
                                                {" "}
                                                {errorProductReview}
                                            </Alert>
                                        )}
                                        {token ? (
                                            <Form>
                                                <FormGroup>
                                                    <FormLabel>
                                                        Rating
                                                    </FormLabel>
                                                    <Form.Control
                                                        as="select"
                                                        value={rating}
                                                        onChange={(e) =>
                                                            setRating(
                                                                e.target.value
                                                            )
                                                        }
                                                    >
                                                        <option value="">
                                                            Select ...
                                                        </option>
                                                        <option value="1">
                                                            1 - Poor
                                                        </option>
                                                        <option value="2">
                                                            2 - Fair
                                                        </option>
                                                        <option value="3">
                                                            3 - Good
                                                        </option>
                                                        <option value="4">
                                                            4 - Very good
                                                        </option>
                                                        <option value="5">
                                                            5 - Excellent
                                                        </option>
                                                    </Form.Control>
                                                </FormGroup>
                                                <FormGroup>
                                                    <FormLabel>
                                                        Comment
                                                    </FormLabel>
                                                    <Form.Control
                                                        as="textarea"
                                                        rows={6}
                                                        placeholder="Example:  your comment"
                                                        value={comment}
                                                        onChange={(e) =>
                                                            setComment(
                                                                e.target.value
                                                            )
                                                        }
                                                    ></Form.Control>
                                                </FormGroup>
                                                <Button
                                                    type="submit"
                                                    variant="dark"
                                                    onClick={submitHandler}
                                                >
                                                    Comment
                                                </Button>
                                            </Form>
                                        ) : (
                                            <Alert variant="info">
                                                Please
                                                <Link
                                                    to="/login"
                                                    className="mx-1"
                                                >
                                                    sign in
                                                </Link>
                                                to write a comment
                                            </Alert>
                                        )}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>
                            <Col></Col>
                        </Row>
                    )}
                </React.Fragment>
            )}
        </React.Fragment>
    );
};

export default ProductScreen;
