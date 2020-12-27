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

export const logout = () => async (dispatch) => {
    localStorage.removeItem("token");
    dispatch({
        type: "USER_LOGOUT"
    });
};
