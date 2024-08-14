import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    // const isAdmin =
    //     customer &&
    //     customer.roleNames &&
    //     customer.roleNames.some((role) => role === "ADMIN");

    // if (!isAdmin) {
    //     return <Navigate to="/login" />;
    // }
    return children;
};

export default PrivateRoute;
