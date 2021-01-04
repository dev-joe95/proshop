import React from "react";
import { Link, NavLink } from "react-router-dom";
import { logout } from "../actions/userActions";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "../getUserInfo";
function Navbar() {
    const dispatch = useDispatch();
    const signOut = () => {
        dispatch(logout());
        window.location = "/login";
    };
    return (
        <React.Fragment>
            <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
                <Link
                    className="navbar-brand col-md-3 col-lg-2 mr-0 px-3 text-uppercase"
                    to="/"
                >
                    Proshop
                </Link>
                <button
                    className="navbar-toggler position-absolute d-md-none collapsed"
                    type="button"
                    data-toggle="collapse"
                    data-target="#sidebarMenu"
                    aria-controls="sidebarMenu"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <NavLink to="" className="text-white">
                    Hi {getCurrentUser(localStorage.getItem("token")).name}
                </NavLink>

                <input
                    className="form-control form-control-dark w-50"
                    type="text"
                    placeholder="Search"
                    aria-label="Search"
                />
                <ul className="navbar-nav px-3">
                    <li className="nav-item text-nowrap">
                        <button
                            className="btn btn-danger text-white btn-sm"
                            onClick={signOut}
                        >
                            Sign out
                        </button>
                    </li>
                </ul>
            </nav>
        </React.Fragment>
    );
}

export default Navbar;
