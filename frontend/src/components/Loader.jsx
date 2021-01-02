import React from "react";
import { Spinner } from "react-bootstrap";

const Loader = ({ dimension }) => {
    return (
        <div className="d-flex justify-content-center">
            <Spinner
                animation="border"
                role="status"
                style={{ width: dimension, height: dimension }}
            >
                <span className="sr-only">Loading...</span>
            </Spinner>
        </div>
    );
};

Loader.defaultProps = {
    dimension: "100px",
};

export default Loader;
