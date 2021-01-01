import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col, Card, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { register } from "../actions/userActions";

const RegisterScreen = ({ location, history }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const redirect = location.search ? location.search.split("=")[1] : "/";
    const dispatch = useDispatch();
    const { loading, error, token } = useSelector(
        (state) => state.userRegister
    );
    const [problem, setProblem] = useState("");
    useEffect(() => {
        if (token) {
            history.push(redirect);
            window.location.reload();
        }
    }, [history, redirect, token]);
    const submitHandler = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setProblem("");
            dispatch(register(name, email, password));
        } else {
            setProblem("Password do not match");
        }
    };
    return (
        <FormContainer>
            <Card className="p-5">
                <h1 className="text-secondary">Sign Up</h1>
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
                            autoFocus
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
                        Sign Up
                    </Button>
                </Form>
                <Row>
                    <Col>
                        Already Customer?
                        <Link
                            to={
                                redirect
                                    ? `/login?redirect=${redirect}`
                                    : "/login"
                            }
                            className="mx-1"
                        >
                            Sign In
                        </Link>
                    </Col>
                </Row>
            </Card>
        </FormContainer>
    );
};

export default RegisterScreen;
