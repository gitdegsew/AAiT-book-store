import React from "react";
import "./App.css";
import "./responsive.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import SingleProduct from "./screens/SingleProduct";
import Login from "./screens/Login";
import Register from "./screens/Register";
import CartScreen from "./screens/CartScreen";
import ShippingScreen from "./screens/ShippingScreen";
import ProfileScreen from "./screens/ProfileScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import NotFound from "./screens/NotFound";
import PrivateRouter from "./PrivateRouter";
import AddBook from "./screens/AddBook";
import AdminRouter from "./AdminRouter";
import { ToastContainer } from "react-toastify";
import ListOfOrders from "./screens/ListOfOrders";
import AddCategory from "./screens/AddCategory";
import VerifyUsers from "./screens/VerifyUsers";

const App = () => {
  return (
    <Router>
      <ToastContainer />
      <Switch>
        <Route path="/" component={HomeScreen} exact />
        <Route path="/search/:keyword" component={HomeScreen} exact />
        <Route path="/page/:pagenumber" component={HomeScreen} exact />
        <Route
          path="/search/:keyword/page/:pageNumber"
          component={HomeScreen}
          exact
        />
        <Route path="/products/:id" component={SingleProduct} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <PrivateRouter path="/profile" component={ProfileScreen} />
        <Route path="/cart/:id?" component={CartScreen} />
        <PrivateRouter path="/shipping" component={ShippingScreen} />
        <PrivateRouter path="/payment" component={PaymentScreen} />
        <PrivateRouter path="/placeorder" component={PlaceOrderScreen} />

        <PrivateRouter path="/order/:id" component={OrderScreen} />
        <AdminRouter path="/addbook" component={AddBook} />
        <AdminRouter path="/orders" component={ListOfOrders} />
        <AdminRouter path="/addcategory" component={AddCategory} />
        <AdminRouter path="/users" component={VerifyUsers} />

        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
};

export default App;
