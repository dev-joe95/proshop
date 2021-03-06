import axios from "axios";

export const logout = () => async (dispatch) => {
    localStorage.removeItem("token");
    dispatch({
        type: "USER_LOGOUT",
    });
    dispatch({
        type: "USER_DETAILS_RESET",
    });
    dispatch({
        type: "ORDER_LIST_MY_RESET",
    });
    dispatch({ type: "USER_LIST_RESET" });
};

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: "USER_LOGIN_REQUEST",
        });
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const { data } = await axios.post(
            "/api/user/login",
            { email, password },
            config
        );
        dispatch({
            type: "USER_LOGIN_SUCCESS",
            payload: data,
        });
        localStorage.setItem("token", data.token);
    } catch (error) {
        dispatch({
            type: "USER_LOGIN_FAIL",
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
export const register = (name, email, password) => async (dispatch) => {
    try {
        dispatch({
            type: "USER_REGISTER_REQUEST",
        });
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const { data } = await axios.post(
            "/api/user/",
            { name, email, password },
            config
        );
        dispatch({
            type: "USER_REGISTER_SUCCESS",
            payload: data,
        });
        localStorage.setItem("token", data.token);
    } catch (error) {
        dispatch({
            type: "USER_REGISTER_FAIL",
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: "USER_DETAILS_REQUEST",
        });
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getState().userLogin.token}`,
            },
        };
        const { data } = await axios.get(`/api/user/${id}`, config);
        dispatch({
            type: "USER_DETAILS_SUCCESS",
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: "USER_DETAILS_FAIL",
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
export const updateUserProfile = (id, user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: "USER_UPDATE_PROFILE_REQUEST",
        });
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getState().userLogin.token}`,
            },
        };
        const { data } = await axios.put(`/api/user/${id}`, user, config);
        dispatch({
            type: "USER_UPDATE_PROFILE_SUCCESS",
            payload: data,
        });
        localStorage.setItem("token", data.token);
    } catch (error) {
        dispatch({
            type: "USER_UPDATE_PROFILE_FAIL",
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
export const listUsers = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: "USER_LIST_REQUEST",
        });
        const config = {
            headers: {
                Authorization: `Bearer ${getState().userLogin.token}`,
            },
        };
        const { data } = await axios.get(`/api/user`, config);
        dispatch({
            type: "USER_LIST_SUCCESS",
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: "USER_LIST_FAIL",
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
export const deleteUser = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: "USER_DELETE_REQUEST",
        });
        const config = {
            headers: {
                Authorization: `Bearer ${getState().userLogin.token}`,
            },
        };
        const { data } = await axios.delete(`/api/user/${id}`, config);
        dispatch({
            type: "USER_DELETE_SUCCESS",
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: "USER_DELETE_FAIL",
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const updateUser = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: "USER_UPDATE_REQUEST",
        });
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getState().userLogin.token}`,
            },
        };
        const { data } = await axios.put(`/api/user/${user._id}`, user, config);
        dispatch({
            type: "USER_UPDATE_SUCCESS",
        });
        dispatch({
            type: "USER_DETAILS_SUCCESS",
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: "USER_UPDATE_FAIL",
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
