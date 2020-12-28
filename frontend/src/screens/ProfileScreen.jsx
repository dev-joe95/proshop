import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import { Form, Button, Row, Col, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { getUserDetails } from "../actions/userActions";

const ProfileScreen = ({ location, history }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [problem, setProblem] = useState("");
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.userLogin);
    const { loading, error, user } = useSelector((state) => state.userDetails);
    console.log("====================================");
    console.log(user);
    console.log("====================================");
    useEffect(() => {
        if (token) {
            if (user.name) {
                setName(user.name);
                setEmail(user.email);
            } else {
                dispatch(getUserDetails("profile"));
            }
        } else {
            history.push("/login");
        }
    }, [dispatch, history, user, token]);
    const submitHandler = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setProblem("");
            // dispatch(getUserDetails("profile"));
        } else {
            setProblem("Password do not match");
        }
    };
    return (
        <Row>
            <Col md={3}>
                <h2>User profile</h2>
                {error ||
                    (problem && (
                        <Alert variant="danger">{error || problem}</Alert>
                    ))}
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
                <h2>My orders</h2>
            </Col>
        </Row>
    );
};

export default ProfileScreen;
