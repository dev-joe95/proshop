import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { getUserDetails, updateUser } from "../actions/userActions";

const UserEditScreen = ({ match, history }) => {
    const userId = match.params.id;
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const dispatch = useDispatch();
    const { loading, error, user } = useSelector((state) => state.userDetails);
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = useSelector((state) => state.userUpdate);
    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: "USER_UPDATE_RESET" });
            history.push("/admin/users");
        } else {
            if (!user.name || user._id !== userId) {
                dispatch(getUserDetails(userId));
            } else {
                setName(user.name);
                setEmail(user.email);
                setIsAdmin(user.isAdmin);
            }
        }
    }, [userId, dispatch, user, history, successUpdate]);
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateUser({ _id: userId, name, email, isAdmin }));
    };
    return (
        <React.Fragment>
            <Link className="btn btn-dark my-3" to="/admin/users">
                <i className="fas fa-chevron-left mx-1"></i>Go Back
            </Link>

            <h1 className="text-secondary">Edit User</h1>
            {loadingUpdate && <Loader />}
            {errorUpdate && <Alert variant="danger">{errorUpdate}</Alert>}
            {loading ? (
                <Loader />
            ) : error ? (
                <Alert variant="danger">{error}</Alert>
            ) : (
                <React.Fragment>
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
                            <Form.Check
                                type="checkbox"
                                label="Is Admin"
                                checked={isAdmin}
                                onChange={(e) => setIsAdmin(e.target.checked)}
                            ></Form.Check>
                        </Form.Group>

                        <Button type="submit" variant="dark" className="my-3">
                            Update
                        </Button>
                    </Form>
                </React.Fragment>
            )}
        </React.Fragment>
    );
};

export default UserEditScreen;
