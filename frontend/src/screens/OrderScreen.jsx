import React, { useState, useEffect } from "react";
import {
    Row,
    Col,
    ListGroup,
    Image,
    Card,
    Alert,
    Button,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import {
    deliverOrder,
    getOrderDetails,
    payOrder,
} from "../actions/orderActions";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import { getCurrentUser } from "../getUserInfo";

const OrderScreen = ({ match, history }) => {
    const [sdkReady, setSdkReady] = useState(false);
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.userLogin);
    const { order, loading, error } = useSelector(
        (state) => state.orderDetails
    );
    const { loading: loadingPay, success: successPay } = useSelector(
        (state) => state.orderPay
    );
    const { loading: loadingDeliver, success: successDeliver } = useSelector(
        (state) => state.orderDeliver
    );
    useEffect(() => {
        if (!token) {
            history.push("/login");
        }
        const addPayPalScript = async () => {
            const { data: clientId } = await axios.get("/api/config/paypal");
            const script = document.createElement("script");
            script.type = "text/javascript";
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
            script.async = true;
            script.onload = () => {
                setSdkReady(true);
            };
            document.body.appendChild(script);
        };
        if (!order || successPay || successDeliver) {
            dispatch({ type: "ORDER_PAY_RESET" });
            dispatch({ type: "ORDER_DELIVER_RESET" });
            dispatch(getOrderDetails(match.params.id));
        } else if (!order.isPaid) {
            if (!window.paypal) {
                addPayPalScript();
            } else {
                setSdkReady(true);
            }
        }
        if (successDeliver) {
            history.push("/admin/orders");
        }
    }, [dispatch, match, history, token, successPay, order, successDeliver]);
    const successPaymentHandler = (paymentResult) => {
        console.log(paymentResult);
        dispatch(payOrder(match.params.id, paymentResult));
    };
    const deliverHandler = (id) => {
        dispatch(deliverOrder(id));
    };
    return loading ? (
        <Loader />
    ) : error ? (
        <Alert variant="danger">{error}</Alert>
    ) : (
        <React.Fragment>
            <h2>Order No. {order._id}</h2>
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Shipping Address</h2>
                            <p>
                                <strong>Name: </strong> {order.user.name}
                            </p>
                            <p>
                                <a href={`mailto:${order.user.email}`}>
                                    {order.user.email}
                                </a>
                            </p>

                            <p>
                                {order.shippingAddress.address},
                                {order.shippingAddress.city},
                                {order.shippingAddress.country}
                            </p>
                            <div>
                                {order.isDelivered ? (
                                    <Alert variant="success">
                                        Delivered Successfully on
                                        {order.deliveredAt}
                                    </Alert>
                                ) : (
                                    <Alert variant="danger">
                                        Not delivered yet
                                    </Alert>
                                )}
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method: </strong>
                                {order.paymentMethod}
                            </p>
                            <div>
                                {order.isPaid ? (
                                    <Alert variant="success">
                                        Payment Successfully on {order.paidAt}
                                    </Alert>
                                ) : (
                                    <Alert variant="danger">Not paid yet</Alert>
                                )}
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order Item </h2>
                            {order.orderItems.length === 0 ? (
                                <Alert variant="info">Cart is empty</Alert>
                            ) : (
                                <ListGroup variant="flush">
                                    {order.orderItems.map((item, index) => (
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
                                        <i className="fas fa-money-bill-wave mr-1"></i>
                                        Total:
                                    </Col>
                                    <Col>${order.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        <i className="fas fa-coins mr-1"></i>
                                        Tax:
                                    </Col>
                                    <Col>${order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        <i className="fas fa-shipping-fast mr-1"></i>
                                        Shipping:
                                    </Col>
                                    <Col>${order.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        <i className="fas fa-file-invoice-dollar mr-1"></i>
                                        Total price:
                                    </Col>
                                    <Col>${order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            {!order.isPaid && (
                                <ListGroup.Item>
                                    {loadingPay && <Loader dimension="20px" />}
                                    {!sdkReady ? (
                                        <Loader dimension="20px" />
                                    ) : (
                                        <PayPalButton
                                            amount={order.totalPrice}
                                            onSuccess={successPaymentHandler}
                                        />
                                    )}
                                </ListGroup.Item>
                            )}
                            {token &&
                                getCurrentUser(token).isAdmin &&
                                order.isPaid &&
                                !order.isDelivered && (
                                    <ListGroup.Item>
                                        {loadingDeliver && (
                                            <Loader dimension="20px" />
                                        )}
                                        <Button
                                            type="button"
                                            variant={
                                                order.isDelivered
                                                    ? "success"
                                                    : "dark"
                                            }
                                            className="btn btn-block"
                                            onClick={() =>
                                                deliverHandler(order._id)
                                            }
                                        >
                                            Mark As Delivered
                                        </Button>
                                    </ListGroup.Item>
                                )}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default OrderScreen;
