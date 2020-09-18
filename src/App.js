import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./Login/Login";
import Header from "./Header/Header";
import Checkout from "./Checkout/Checkout";
import Home from "./Home/Home";
import Payment from "./Payment/Payment";
import { useStateValue } from "./DataLayer/StateProvider";
import { auth } from "./Firebase/Firebase";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import "./App.css";
import Orders from "./Orders/Orders";

const promise = loadStripe(
  "pk_test_51HBxAOFcKg5Z4KjahjWeyEpaisbV1SIF3tAhNs7Hh7XAcX0anVolsOMkPqlu0kvt7O9WWZFOuC2y35AtIG3jyRms00m4W922zn"
);

function App() {
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser);
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
    return () => {
      // what
      unsubscribe();
    };
  }, [user]);

  return (
    <Router>
      <Switch>
        <Route path="/checkout">
          <Header />
          <Checkout />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/payment">
          <Header />
          <Elements stripe={promise}>
            <Payment />
          </Elements>
        </Route>
        <Route path="/orders">
          <Header />
          <Orders />
        </Route>
        <Route path="/">
          <Header />
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
