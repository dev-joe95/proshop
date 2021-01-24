import axios from "axios";
export const listProducts = (
    keyword = "",
    pageNumber = "",
    pageSize = ""
) => async (dispatch) => {
    try {
        dispatch({
            type: "PRODUCT_LIST_REQUEST",
        });
        const { data } = await axios.get(
            `/api/product?search=${keyword}&pageNumber=${pageNumber}&pageSize=${pageSize}`
        );
        dispatch({
            type: "PRODUCT_LIST_SUCCESS",
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: "PRODUCT_LIST_FAIL",
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
export const listProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "PRODUCT_DETAILS_REQUEST",
        });
        const { data } = await axios.get(`/api/product/${id}`);
        dispatch({
            type: "PRODUCT_DETAILS_SUCCESS",
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: "PRODUCT_DETAILS_FAIL",
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const deleteProduct = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: "PRODUCT_DELETE_REQUEST",
        });
        const config = {
            headers: {
                Authorization: `Bearer ${getState().userLogin.token}`,
            },
        };
        await axios.delete(`/api/product/${id}`, config);
        dispatch({
            type: "PRODUCT_DELETE_SUCCESS",
        });
    } catch (error) {
        dispatch({
            type: "PRODUCT_DELETE_FAIL",
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const createProduct = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: "PRODUCT_CREATE_REQUEST",
        });
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getState().userLogin.token}`,
            },
        };
        const { data } = await axios.post(`/api/product`, {}, config);
        dispatch({
            type: "PRODUCT_CREATE_SUCCESS",
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: "PRODUCT_CREATE_FAIL",
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const updateProduct = (product) => async (dispatch, getState) => {
    try {
        dispatch({
            type: "PRODUCT_UPDATE_REQUEST",
        });
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getState().userLogin.token}`,
            },
        };
        const { data } = await axios.put(
            `/api/product/${product._id}`,
            product,
            config
        );
        dispatch({
            type: "PRODUCT_UPDATE_SUCCESS",
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: "PRODUCT_UPDATE_FAIL",
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
export const createProductReview = (id, review) => async (
    dispatch,
    getState
) => {
    try {
        dispatch({
            type: "PRODUCT_CREATE_REVIEW_REQUEST",
        });
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getState().userLogin.token}`,
            },
        };
        await axios.post(`/api/product/${id}/review`, review, config);
        dispatch({
            type: "PRODUCT_CREATE_REVIEW_SUCCESS",
        });
    } catch (error) {
        dispatch({
            type: "PRODUCT_CREATE_REVIEW_FAIL",
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
export const listTopProducts = () => async (dispatch) => {
    try {
        dispatch({
            type: "PRODUCT_TOP_REQUEST",
        });
        const { data } = await axios.get(`/api/product/top`);
        dispatch({
            type: "PRODUCT_TOP_SUCCESS",
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: "PRODUCT_TOP_FAIL",
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
export const listTopSaleProducts = () => async (dispatch) => {
    try {
        dispatch({
            type: "PRODUCT_TOP_SALE_REQUEST",
        });
        const { data } = await axios.get(`/api/product/sale`);
        dispatch({
            type: "PRODUCT_TOP_SALE_SUCCESS",
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: "PRODUCT_TOP_SALE_FAIL",
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
