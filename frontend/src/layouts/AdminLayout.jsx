import React from "react";
import "./AdminLayout.css";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function AdminLayout(props) {
    return (
        <React.Fragment>
            <Navbar />
            <div className="container-fluid">
                <div className="row">
                    <Sidebar />
                    <main
                        role="main"
                        className="col-md-9 ml-sm-auto col-lg-10 px-md-4"
                    >
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h1 className="h2">Dashboard</h1>
                            <div className="btn-toolbar mb-2 mb-md-0">
                                <div className="btn-group mr-2">
                                    <button
                                        type="button"
                                        className="btn btn-sm btn-outline-secondary"
                                    >
                                        Share
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-sm btn-outline-secondary"
                                    >
                                        Export
                                    </button>
                                </div>
                                <button
                                    type="button"
                                    className="btn btn-sm btn-outline-secondary dropdown-toggle"
                                >
                                    <span data-feather="calendar"></span>
                                    This week
                                </button>
                            </div>
                        </div>
                        <div className="main-content">{props.children}</div>
                    </main>
                </div>
            </div>
        </React.Fragment>
    );
}

export default AdminLayout;
