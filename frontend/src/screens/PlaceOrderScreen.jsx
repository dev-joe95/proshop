import React from "react";
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

const PlaceOrderScreen = ({ history }) => {
    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2);
    };
    const { shippingAddress, paymentMethod, cartItems } = useSelector(
        (state) => state.cart
    );
    const itemsPrice = addDecimals(
        cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
    const shippingPrice = itemsPrice > 1000 ? 0 : 100;
    const taxPrice = addDecimals(Number((0.15 * itemsPrice).toFixed(2)));
    const placeOrderHandler = () => {};
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
                                    <Col>${itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        <i class="fas fa-coins mr-1"></i>Tax:
                                    </Col>
                                    <Col>${shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        <i class="fas fa-shipping-fast mr-1"></i>
                                        Shipping:
                                    </Col>
                                    <Col>${taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        <i class="fas fa-file-invoice-dollar mr-1"></i>
                                        Total price:
                                    </Col>
                                    <Col>
                                        ${itemsPrice + shippingPrice + taxPrice}
                                    </Col>
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
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default PlaceOrderScreen;
