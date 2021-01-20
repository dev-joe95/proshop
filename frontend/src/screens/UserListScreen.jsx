import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, listUsers } from "../actions/userActions";
import Loader from "../components/Loader";
import { getCurrentUser } from "../getUserInfo";

const UserListScreen = ({ history }) => {
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.userLogin);
    const { loading, users, error } = useSelector((state) => state.userList);
    const { success: successDelete } = useSelector((state) => state.userDelete);
    useEffect(() => {
        if (token && getCurrentUser(token).isAdmin) {
            dispatch(listUsers());
        } else {
            history.push("/login");
        }
    }, [dispatch, successDelete, token, history]);
    const deleteHandler = (id) => {
        if (window.confirm("Are you sure")) {
            dispatch(deleteUser(id));
        }
    };
    return (
        <React.Fragment>
            <h1>Users</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Alert variant="danger">{error}</Alert>
            ) : (
                <Table striped hover responsive bordered size="sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>ADMIN</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users &&
                            users.map((user, index) => (
                                <tr key={index}>
                                    <td>{user._id}</td>
                                    <td>{user.name}</td>
                                    <td>
                                        <a href={`mailto:${user.email}`}>
                                            {user.email}
                                        </a>
                                    </td>
                                    <td>
                                        {user.isAdmin ? (
                                            <i className="fas fa-check text-success"></i>
                                        ) : (
                                            <i className="fas fa-times text-danger"></i>
                                        )}
                                    </td>
                                    <td className="d-flex">
                                        <LinkContainer
                                            to={`/admin/users/${user._id}/edit`}
                                        >
                                            <Button
                                                variant="info"
                                                className="btn-sm"
                                            >
                                                <i className="fas fa-edit"></i>
                                            </Button>
                                        </LinkContainer>
                                        <Button
                                            variant="danger"
                                            className="btn-sm"
                                            onClick={() =>
                                                deleteHandler(user._id)
                                            }
                                        >
                                            <i className="fas fa-trash"></i>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </Table>
            )}
        </React.Fragment>
    );
};

export default UserListScreen;
