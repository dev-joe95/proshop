import axios from "axios";
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
export const logout = () => async (dispatch) => {
    localStorage.removeItem("token");
    dispatch({
        type: "USER_LOGOUT",
    });
};
