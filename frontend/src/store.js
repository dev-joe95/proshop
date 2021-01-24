import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { cartReducer } from "./reducers/cartReducers";
import {
    productCreateReducer,
    productDeleteReducer,
    productDetailsReducer,
    productListReducer,
    productReviewCreateReducer,
    productUpdateReducer,
} from "./reducers/productReducers";
import {
    userDeleteReducer,
    userDetailsReducer,
    userListReducer,
    userLoginReducer,
    userRegisterReducer,
    userUpdateProfileReducer,
    userUpdateReducer,
} from "./reducers/userReducers";
import {
    categoryCreateReducer,
    categoryDeleteReducer,
    categoryDetailsReducer,
    categoryListReducer,
    categoryUpdateReducer,
} from "./reducers/categoryReducers";
import {
    orderCreateReducer,
    orderDetailsReducer,
    orderPayReducer,
    orderListMyReducer,
    orderListReducer,
    orderDeliverReducer,
} from "./reducers/orderReducer";

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderListMy: orderListMyReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    productDelete: productDeleteReducer,
    categoryList: categoryListReducer,
    categoryDetails: categoryDetailsReducer,
    categoryDelete: categoryDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    categoryCreate: categoryCreateReducer,
    categoryUpdate: categoryUpdateReducer,
    orderList: orderListReducer,
    orderDeliver: orderDeliverReducer,
    productReviewCreate: productReviewCreateReducer,
});
const cartItemsFromStorage = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];
const token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : null;
const shippingAddress = localStorage.getItem("shippingAddress")
    ? JSON.parse(localStorage.getItem("shippingAddress"))
    : {};
const paymentMethod = localStorage.getItem("paymentMethod")
    ? JSON.parse(localStorage.getItem("paymentMethod"))
    : {};
const initialState = {
    cart: { cartItems: cartItemsFromStorage, shippingAddress, paymentMethod },
    userLogin: { token },
    userRegister: { token },
};
const middlewares = [thunk];
const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
