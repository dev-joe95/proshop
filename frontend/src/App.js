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
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import CategoryListScreen from "./screens/CategoryListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import CategoryEditScreen from "./screens/CategoryEditScreen ";
import OrderListScreen from "./screens/OrderListScreen";

function App() {
    return (
        <React.Fragment>
            <BrowserRouter>
                <DefaultRoute
                    path="/admin/orders/:id"
                    component={OrderScreen}
                />
                <AdminRoute
                    path="/admin/orders"
                    exact
                    component={OrderListScreen}
                />
                <AdminRoute
                    path="/admin/categories/:id/edit"
                    exact
                    component={CategoryEditScreen}
                />
                <AdminRoute
                    path="/admin/categories"
                    exact
                    component={CategoryListScreen}
                />
                <AdminRoute
                    path="/admin/products/:id/edit"
                    exact
                    component={ProductEditScreen}
                />
                <AdminRoute
                    path="/admin/products/:pageNumber"
                    exact
                    component={ProductListScreen}
                />
                <AdminRoute
                    path="/admin/products"
                    exact
                    component={ProductListScreen}
                />
                <AdminRoute
                    path="/admin/users/:id/edit"
                    component={UserEditScreen}
                />
                <AdminRoute
                    path="/admin/users"
                    exact
                    component={UserListScreen}
                />
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
                <DefaultRoute
                    path="/search/:keyword"
                    component={HomeScreen}
                    exact
                />
                <DefaultRoute
                    path="/pageNumber/:pageNumber"
                    component={HomeScreen}
                    exact
                />{" "}
                <DefaultRoute
                    path="/search/:keyword/pageNumber/:pageNumber"
                    component={HomeScreen}
                    exact
                />
                <DefaultRoute path="/" component={HomeScreen} exact />
            </BrowserRouter>
        </React.Fragment>
    );
}

export default App;
