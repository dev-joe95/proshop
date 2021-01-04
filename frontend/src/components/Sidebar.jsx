import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
    return (
        <React.Fragment>
            <nav
                id="sidebarMenu"
                className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
            >
                <div className="sidebar-sticky pt-3">
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/dashboard">
                                <i className="fas fa-tachometer-alt mx-2"></i>
                                <span data-feather="dashboard">Dashboard</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/admin/users">
                                <i className="fas fa-users mx-2"></i>
                                <span data-feather="users">Users</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                className="nav-link"
                                to="/admin/categories"
                            >
                                <i className="fas fa-bookmark mx-2"></i>
                                <span data-feather="categories">
                                    Categories
                                </span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/admin/products">
                                <i className="fas fa-gifts mx-2"></i>
                                <span data-feather="products">Products</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/admin/orders">
                                <i className="fas fa-box mx-2"></i>
                                <span data-feather="orders">Orders</span>
                            </NavLink>
                        </li>
                    </ul>
                    <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                        <span>Your Profile</span>
                    </h6>
                    <ul className="nav flex-column mb-2">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/profile">
                                <i className="fa fa-user mx-2"></i>
                                <span data-feather="file-text"></span>
                                Profile
                            </NavLink>
                            <NavLink className="nav-link" to="/notifications">
                                <i className="fa fa-bell mx-2"></i>
                                <span data-feather="file-text"></span>
                                Notifications
                            </NavLink>
                            <NavLink className="nav-link" to="messages">
                                <i className="fa fa-comments mx-2"></i>
                                <span data-feather="file-text"></span>
                                Messages
                            </NavLink>
                        </li>
                    </ul>
                    <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                        <span>Saved reports</span>
                    </h6>
                    <ul className="nav flex-column mb-2">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="a">
                                <i className="fas fa-chart-area mx-2"></i>
                                <span data-feather="file-text"></span>
                                Current month
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </React.Fragment>
    );
};

export default Sidebar;
