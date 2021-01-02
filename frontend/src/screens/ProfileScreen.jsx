import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import { Form, Button, Row, Col, Alert, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { listMyOrders } from "../actions/orderActions";
import { LinkContainer } from "react-router-bootstrap";

const ProfileScreen = ({ history }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [problem, setProblem] = useState("");
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.userLogin);
    const { loading, error, user } = useSelector((state) => state.userDetails);
    const { success } = useSelector((state) => state.userUpdateProfile);
    const { loading: loadingOrders, error: errorOrders, orders } = useSelector(
        (state) => state.orderListMy
    );
    useEffect(() => {
        if (token) {
            if (!user || !user.name || success) {
                dispatch({ type: "USER_UPDATE_PROFILE_RESET" });
                dispatch(getUserDetails("profile"));
                dispatch(listMyOrders());
            } else {
                setName(user.name);
                setEmail(user.email);
            }
        } else {
            history.push("/login");
        }
    }, [dispatch, history, user, token, success]);
    const submitHandler = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            dispatch(updateUserProfile("profile", { name, email, password }));
            setProblem("");
        } else {
            setProblem("Password do not match");
        }
    };
    return (
        <Row>
            <Col md={3}>
                <h2>User profile</h2>
                {error && !success && (
                    <Alert variant="danger">{error || problem}</Alert>
                )}
                {problem && !success && (
                    <Alert variant="danger">{error || problem}</Alert>
                )}
                {!error && !problem && success && (
                    <Alert variant="success">Profile has been updated</Alert>
                )}
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>
                    <Form.Group>
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Example:  John Ash"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Example:  john-ash@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Example:  e&3Ap5Le46"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Re-enter Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Example:  e&3Ap5Le46"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Button type="submit" variant="dark" className="my-3">
                        Update
                    </Button>
                </Form>
            </Col>

            <Col md={9}>
                <h2>My Orders</h2>
                {loadingOrders ? (
                    <Loader />
                ) : errorOrders ? (
                    <Alert variant="danger">{errorOrders}</Alert>
                ) : (
                    <Table
                        striped
                        bordered
                        hover
                        responsive
                        className="table-sm"
                    >
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th>PAID</th>
                                <th>DELIVERED</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, index) => (
                                <tr key={index}>
                                    <td>{order._id}</td>
                                    <td>{order.createdAt.substring(0, 10)}</td>
                                    <td>{order.totalPrice}</td>
                                    <td>
                                        {order.isPaid ? (
                                            order.paidAt.substring(0, 10)
                                        ) : (
                                            <i
                                                className="fas fa-times"
                                                style={{ color: "red" }}
                                            ></i>
                                        )}
                                    </td>
                                    <td>
                                        {order.isDelivered ? (
                                            order.deliveredAt.substring(0, 10)
                                        ) : (
                                            <i
                                                className="fas fa-times"
                                                style={{ color: "red" }}
                                            ></i>
                                        )}
                                    </td>
                                    <td>
                                        <LinkContainer
                                            to={`/order/${order._id}`}
                                        >
                                            <Button
                                                className="btn-sm"
                                                variant="dark"
                                            >
                                                Details
                                            </Button>
                                        </LinkContainer>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Col>
        </Row>
    );
};

export default ProfileScreen;
