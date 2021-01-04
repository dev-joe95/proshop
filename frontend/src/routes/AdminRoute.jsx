import React from "react";
import { Redirect, Route } from "react-router-dom";
import { getCurrentUser } from "../getUserInfo";
import AdminLayout from "../layouts/AdminLayout";

const AdminRoute = ({ component: Component, render, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) => {
                if (getCurrentUser(localStorage.getItem("token").isAdmin))
                    return (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: props.location },
                            }}
                        />
                    );
                return Component ? (
                    <AdminLayout>
                        <Component {...props} />
                    </AdminLayout>
                ) : (
                    render(props)
                );
            }}
        />
    );
};

export default AdminRoute;
