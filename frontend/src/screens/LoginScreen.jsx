import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col, Card, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { login } from "../actions/userActions";

const LoginScreen = ({ location, history }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const redirect = location.search ? location.search.split("=")[1] : "/";
    const dispatch = useDispatch();
    const { loading, errors, token } = useSelector((state) => state.userLogin);

    useEffect(() => {
        if (token) {
            history.push(redirect);
            window.location.reload();
        }
    }, [history, redirect, token]);
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    };
    return (
        <FormContainer>
            <Card className="p-5">
                <h1 className="text-secondary">Sign In</h1>
                {errors && <Alert variant="danger">{errors}</Alert>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>
                    <Form.Group>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="ex : john-ash@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete
                            autoFocus
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="ex : e&3Ap5Le46"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Button type="submit" variant="dark" className="my-3">
                        Sign In
                    </Button>
                </Form>
                <Row>
                    <Col>
                        New Customer?{" "}
                        <Link
                            to={
                                redirect
                                    ? `/register?redirect=${redirect}`
                                    : "/register"
                            }
                        >
                            Sign Up
                        </Link>
                    </Col>
                </Row>
            </Card>
        </FormContainer>
    );
};

export default LoginScreen;
