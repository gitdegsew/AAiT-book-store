import React from "react";
import { Redirect, Route } from "react-router-dom";

function AdminRouter({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      component={(props) => {
        const token = JSON.parse(localStorage.getItem('userInfo')).isAdmin
        console.log("token is :",token)
        if (token) {
          return <Component {...props} />;
        } else {
          return <Redirect to={"/"} />;
        }
      }}
    />
  );
}

export default AdminRouter;