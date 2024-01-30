import React from "react";
import { Redirect, Route } from "react-router-dom";

function AdminRouter({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      component={(props) => {
<<<<<<< HEAD
        const token = JSON.parse(localStorage.getItem('userInfo')).isAdmin
        console.log("token is :",token)
        if (token) {
=======
        const isAdmin = JSON.parse(localStorage.getItem('userInfo')).isAdmin
        
        if (isAdmin) {
>>>>>>> 96b7573c5576b2f5affa3561a5dd01dadcb2d632
          return <Component {...props} />;
        } else {
          return <Redirect to={"/"} />;
        }
      }}
    />
  );
}

export default AdminRouter;