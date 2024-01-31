import React from "react";
import { Redirect, Route } from "react-router-dom";

function AdminRouter({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      component={(props) => {
        const isAdmin = JSON.parse(localStorage.getItem('userInfo')).isAdmin
        
        if (isAdmin) {
          return <Component {...props} />;
        } else {
          return <Redirect to={"/"} />;
        }
      }}
    />
  );
}

export default AdminRouter;