import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    Row,
    Col,
    ListGroup,
    Button,
    Alert,
    Image,
    Card,
    FormControl,
} from "react-bootstrap";
import { addToCart, removeFromCart } from "../actions/cartActions";

const CartScreen = ({ match, location, history }) => {
    const productId = match.params.id;
    const qty = location.search ? Number(location.search.split("=")[1]) : 1;
    const dispatch = useDispatch();
    const { cartItems } = useSelector((state) => state.cart);

    const [total, setTotal] = useState(0);

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty));
        }
        setTotal(cartItems.reduce((acc, i) => acc + i.qty * i.price, 0));
    }, [dispatch, productId, qty, cartItems]);
    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    };
    const checkoutHandler = () => {
        history.push("/login?redirect=shipping");
    };
    return (
        <React.Fragment>
            <h1>Shopping Cart</h1>
            <Row>
                <Col lg={8}>
                    {cartItems.length === 0 ? (
                        <Alert variant="primary">The cart is empty</Alert>
                    ) : (
                        <React.Fragment>
                            <p className="h5 text-muted">
                                There is {cartItems.length} item in the cart
                            </p>
                            <ListGroup variant="flush">
                                {cartItems.map((i, index) => (
                                    <ListGroup.Item key={index}>
                                        <Row>
                                            <Col xs={2}>
                                                <Image
                                                    src={i.image}
                                                    alt={i.name}
                                                    fluid
                                                />
                                            </Col>
                                            <Col xs={3} lg={4}>
                                                <Link
                                                    to={`/product/${i.product}`}
                                                >
                                                    {i.name}
                                                </Link>
                                            </Col>
                                            <Col xs={2}>${i.price}</Col>
                                            <Col xs={3} lg={2}>
                                                <FormControl
                                                    as="select"
                                                    value={i.qty}
                                                    onChange={(e) =>
                                                        dispatch(
                                                            addToCart(
                                                                i.product,
                                                                Number(
                                                                    e.target
                                                                        .value
                                                                )
                                                            )
                                                        )
                                                    }
                                                >
                                                    {[
                                                        ...Array(
                                                            i.countInStock
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
                                            <Col xs={1} md={2}>
                                                <Button
                                                    variant="light"
                                                    className="text-danger"
                                                    type="button"
                                                    onClick={() =>
                                                        removeFromCartHandler(
                                                            i.product
                                                        )
                                                    }
                                                >
                                                    <i className="fas fa-trash"></i>
                                                </Button>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </React.Fragment>
                    )}
                </Col>

                <Col lg={4}>
                    <Card>
                        <ListGroup className="lead">
                            <ListGroup.Item>
                                <div>
                                    Subtotal (
                                    {cartItems.reduce(
                                        (acc, i) => acc + i.qty,
                                        0
                                    )}
                                    ) items
                                </div>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        <i class="fas fa-money-bill-wave mr-1"></i>
                                        Price:
                                    </Col>
                                    <Col>${total.toFixed(2)}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button
                                    className="btn btn-dark btn-block"
                                    type="button"
                                    onClick={checkoutHandler}
                                    disabled={cartItems.length === 0}
                                >
                                    <i className="fas fa-credit-card mx-1"></i>
                                    <span>Proceed to checkout</span>
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default CartScreen;
