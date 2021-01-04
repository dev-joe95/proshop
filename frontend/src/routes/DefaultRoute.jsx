import React from "react";
import { Route } from "react-router-dom";

import FrontLayout from "../layouts/DefaultLayout";

const DefaultRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) => (
                <FrontLayout>
                    <Component {...props} />
                </FrontLayout>
            )}
        />
    );
};

export default DefaultRoute;
