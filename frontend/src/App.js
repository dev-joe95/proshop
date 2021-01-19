import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import AdminRoute from "./routes/AdminRoute";
import DefaultRoute from "./routes/DefaultRoute";
import UserEditScreen from './screens/UserEditScreen';

function App() {
    return (
        <React.Fragment>
            <BrowserRouter>
                <AdminRoute path="/admin/users/:id/edit" component={UserEditScreen} />
                <AdminRoute path="/admin/users" exact component={UserListScreen} />
                <AdminRoute path="/dashboard" component={UserListScreen} />
                <DefaultRoute path="/order/:id" component={OrderScreen} />
                <DefaultRoute path="/placeorder" component={PlaceOrderScreen} />
                <DefaultRoute path="/payment" component={PaymentScreen} />
                <DefaultRoute path="/shipping" component={ShippingScreen} />
                <DefaultRoute path="/profile" component={ProfileScreen} />
                <DefaultRoute path="/register" component={RegisterScreen} />
                <DefaultRoute path="/login" component={LoginScreen} />
                <DefaultRoute path="/cart/:id?" component={CartScreen} />
                <DefaultRoute path="/product/:id" component={ProductScreen} />
                <DefaultRoute path="/products" component={HomeScreen} exact />
                <DefaultRoute path="/" component={HomeScreen} exact />
            </BrowserRouter>
        </React.Fragment>
    );
}

export default App;
