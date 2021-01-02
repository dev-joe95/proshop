import axios from "axios";
import { logout } from "./userActions";
export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: "ORDER_CREATE_REQUEST",
        });
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getState().userLogin.token}`,
            },
        };
        const { data } = await axios.post("/api/order", order, config);
        dispatch({
            type: "ORDER_CREATE_SUCCESS",
            payload: data,
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        if (message === "Not authorized, token failed") {
            dispatch(logout());
        }
        dispatch({
            type: "ORDER_CREATE_FAIL",
            payload: message,
        });
    }
};

export const getOrderDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: "ORDER_DETAILS_REQUEST",
        });
        const config = {
            headers: {
                Authorization: `Bearer ${getState().userLogin.token}`,
            },
        };
        const { data } = await axios.get(`/api/order/${id}`, config);
        dispatch({
            type: "ORDER_DETAILS_SUCCESS",
            payload: data,
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        if (message === "Not authorized, token failed") {
            dispatch(logout());
        }
        dispatch({
            type: "ORDER_DETAILS_FAIL",
            payload: message,
        });
    }
};

export const payOrder = (orderId, paymentResult) => async (
    dispatch,
    getState
) => {
    try {
        dispatch({
            type: "ORDER_PAY_REQUEST",
        });
        const config = {
            headers: {
                "Content-Type": "application/json",

                Authorization: `Bearer ${getState().userLogin.token}`,
            },
        };
        const { data } = await axios.put(
            `/api/order/${orderId}/pay`,
            paymentResult,
            config
        );
        dispatch({
            type: "ORDER_PAY_SUCCESS",
            payload: data,
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        if (message === "Not authorized, token failed") {
            dispatch(logout());
        }
        dispatch({
            type: "ORDER_PAY_FAIL",
            payload: message,
        });
    }
};

export const listMyOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: "ORDER_LIST_MY_REQUEST",
        });
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getState().userLogin.token}`,
            },
        };
        const { data } = await axios.get(`/api/order/myorders`, config);
        dispatch({
            type: "ORDER_LIST_MY_SUCCESS",
            payload: data,
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        if (message === "Not authorized, token failed") {
            dispatch(logout());
        }
        dispatch({
            type: "ORDER_LIST_MY_FAIL",
            payload: message,
        });
    }
};
