import axios from "axios";
export const listCategories = () => async (dispatch) => {
    try {
        dispatch({
            type: "CATEGORY_LIST_REQUEST",
        });
        const { data } = await axios.get("/api/category");
        dispatch({
            type: "CATEGORY_LIST_SUCCESS",
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: "CATEGORY_LIST_FAIL",
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
export const listCategoryDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "CATEGORY_DETAILS_REQUEST",
        });
        const { data } = await axios.get(`/api/category/${id}`);
        dispatch({
            type: "CATEGORY_DETAILS_SUCCESS",
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: "CATEGORY_DETAILS_FAIL",
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const deleteCategory = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: "CATEGORY_DELETE_REQUEST",
        });
        const config = {
            headers: {
                Authorization: `Bearer ${getState().userLogin.token}`,
            },
        };
        await axios.delete(`/api/category/${id}`, config);
        dispatch({
            type: "CATEGORY_DELETE_SUCCESS",
        });
    } catch (error) {
        dispatch({
            type: "CATEGORY_DELETE_FAIL",
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const createCategory = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: "CATEGORY_CREATE_REQUEST",
        });
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getState().userLogin.token}`,
            },
        };
        const { data } = await axios.post(`/api/category`, {}, config);
        dispatch({
            type: "CATEGORY_CREATE_SUCCESS",
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: "CATEGORY_CREATE_FAIL",
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const updateCategory = (category) => async (dispatch, getState) => {
    try {
        dispatch({
            type: "CATEGORY_UPDATE_REQUEST",
        });
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getState().userLogin.token}`,
            },
        };
        const { data } = await axios.put(
            `/api/category/${category._id}`,
            category,
            config
        );
        dispatch({
            type: "CATEGORY_UPDATE_SUCCESS",
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: "CATEGORY_UPDATE_FAIL",
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
