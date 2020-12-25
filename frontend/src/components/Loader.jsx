import React from "react";
import { Spinner } from "react-bootstrap";

const Loader = () => {
    return (
        <div className="d-flex justify-content-center">
            <Spinner
                animation="border"
                role="status"
                style={{ width: "100px", height: "100px" }}
            >
                <span className="sr-only">Loading...</span>
            </Spinner>
        </div>
    );
};

export default Loader;
