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
                        <div className="main-content py-3">
                            {props.children}
                        </div>
                    </main>
                </div>
            </div>
        </React.Fragment>
    );
}

export default AdminLayout;
