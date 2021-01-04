import React, { useEffect } from "react";
import {
    Row,
    Col,
    ListGroup,
    Image,
    Card,
    Button,
    Alert,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";
import { Link } from "react-router-dom";
import { createOrder } from "../actions/orderActions";
import { emptyCart } from "../actions/cartActions";

const PlaceOrderScreen = ({ history }) => {
    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2);
    };
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const { shippingAddress, paymentMethod, cartItems } = cart;
    cart.itemsPrice = addDecimals(
        cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
    cart.shippingPrice = Number(cart.itemsPrice > 1000 ? 0 : 100);
    cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));
    cart.totalPrice = (
        Number(cart.itemsPrice) +
        Number(cart.shippingPrice) +
        Number(cart.taxPrice)
    ).toFixed(2);
    const { order, success, error } = useSelector((state) => state.orderCreate);
    useEffect(() => {
        if (success) {
            dispatch(emptyCart());
            history.push(`/order/${order._id}`);
        }
    }, [history, success, order, dispatch]);
    const placeOrderHandler = () => {
        dispatch(
            createOrder({
                orderItems: cartItems,
                shippingAddress: shippingAddress,
                paymentMethod: paymentMethod,
                itemsPrice: cart.itemsPrice,
                taxPrice: cart.taxPrice,
                shippingPrice: cart.shippingPrice,
                totalPrice: cart.totalPrice,
            })
        );
    };
    return (
        <React.Fragment>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Shipping Address</h2>
                            <p>
                                {shippingAddress.address},{" "}
                                {shippingAddress.city},{" "}
                                {shippingAddress.country}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method: </strong>
                                {paymentMethod}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order Item </h2>
                            {cartItems.length === 0 ? (
                                <Alert variant="info">Cart is empty</Alert>
                            ) : (
                                <ListGroup variant="flush">
                                    {cartItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={2}>
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        fluid
                                                    />
                                                </Col>
                                                <Col>
                                                    <div>
                                                        <Link
                                                            to={`/product/${item.product}`}
                                                        >
                                                            {item.name}
                                                        </Link>
                                                    </div>
                                                </Col>
                                                <Col>
                                                    <div>
                                                        {item.qty} x $
                                                        {item.price} ={" "}
                                                        {item.qty * item.price}
                                                    </div>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup className="lead">
                            <ListGroup.Item>
                                <h4>Order Summary</h4>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        <i class="fas fa-money-bill-wave mr-1"></i>
                                        Total:
                                    </Col>
                                    <Col>${cart.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        <i class="fas fa-coins mr-1"></i>Tax:
                                    </Col>
                                    <Col>${cart.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        <i class="fas fa-shipping-fast mr-1"></i>
                                        Shipping:
                                    </Col>
                                    <Col>${cart.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        <i class="fas fa-file-invoice-dollar mr-1"></i>
                                        Total price:
                                    </Col>
                                    <Col>${cart.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button
                                    className="btn btn-dark btn-block"
                                    type="button"
                                    onClick={placeOrderHandler}
                                    disabled={cartItems.length === 0}
                                >
                                    <i className="fas fa-credit-card mx-1"></i>
                                    <span>Place Order</span>
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {success && (
                        <Alert variant="success">
                            Your order has been created
                        </Alert>
                    )}
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default PlaceOrderScreen;
