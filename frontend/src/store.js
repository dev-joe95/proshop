import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { cartReducer } from "./reducers/cartReducers";
import {
    productDetailsReducer,
    productListReducer,
} from "./reducers/productReducers";
import {
    userDetailsReducer,
    userLoginReducer,
    userRegisterReducer,
} from "./reducers/userReducers";

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
});
const cartItemsFromStorage = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];
const token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : null;
const initialState = {
    cart: { cartItems: cartItemsFromStorage },
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
