import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { getCurrentUser } from "../getUserInfo";
import { listOrders } from "../actions/orderActions";

const OrderListScreen = ({ history, match }) => {
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.userLogin);
    const { loading, orders, error } = useSelector((state) => state.orderList);
    const { success: successDeliver } = useSelector(
        (state) => state.orderDeliver
    );
    useEffect(() => {
        // dispatch({ type: "PRODUCT_CREATE_RESET" });
        dispatch({ type: "PRODUCT_LIST_RESET" });
        if (!token && !getCurrentUser(token).isAdmin) {
            history.push("/login");
        } else {
            dispatch(listOrders());
        }
    }, [dispatch, token, history, successDeliver]);

    return (
        <React.Fragment>
            {loading ? (
                <Loader />
            ) : error ? (
                <Alert variant="danger">{error}</Alert>
            ) : (
                <Table striped hover responsive bordered size="sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>USER</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders &&
                            orders.map(
                                (order, index) =>
                                    order.isPaid && (
                                        <tr key={index}>
                                            <td>{order._id}</td>
                                            <td>
                                                {order.user && order.user.name}
                                            </td>
                                            <td>
                                                {order.createdAt.substring(
                                                    0,
                                                    10
                                                )}
                                            </td>
                                            <td>${order.totalPrice}</td>
                                            <td>
                                                {order.isPaid ? (
                                                    order.paidAt.substring(
                                                        0,
                                                        10
                                                    )
                                                ) : (
                                                    <i
                                                        className="fas fa-times"
                                                        style={{ color: "red" }}
                                                    ></i>
                                                )}
                                            </td>
                                            <td>
                                                {order.isDelivered ? (
                                                    order.deliveredAt.substring(
                                                        0,
                                                        10
                                                    )
                                                ) : (
                                                    <i
                                                        className="fas fa-times"
                                                        style={{ color: "red" }}
                                                    ></i>
                                                )}
                                            </td>
                                            <td className="d-flex">
                                                <LinkContainer
                                                    to={`/admin/orders/${order._id}`}
                                                >
                                                    <Button className="btn-sm">
                                                        <i className="fas fa-info-circle"></i>
                                                    </Button>
                                                </LinkContainer>
                                            </td>
                                        </tr>
                                    )
                            )}
                    </tbody>
                </Table>
            )}
        </React.Fragment>
    );
};

export default OrderListScreen;
