import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Product from "../Checkout/Product/Product";
import { getBasketTotal } from "../DataLayer/Reducer";
import { useStateValue } from "../DataLayer/StateProvider";

import axios from "../Axios/Axios";
import { db } from "../Firebase/Firebase";
import CurrencyFormat from "react-currency-format";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import "./Payment.css";

function Payment() {
  const history = useHistory();

  const [{ basket, user }, dispatch] = useStateValue();

  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(null);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    console.log("backEnd >>>");
    const getClienSecret = async () => {
      const res = await axios({
        method: "post",
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
      });
      console.log("backEnd >>>", res.data);
      setClientSecret(res.data.clientSecret);
    };

    getClienSecret();
  }, [basket]);

  console.log("ClienSecret is  >>>", clientSecret);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {

        db.collection("user")
          .doc(user?.uid)
          .collection("orders")
          .doc(paymentIntent.id)
          .set({
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          });

        setSucceeded(true);
        setError(null);
        setProcessing(false);

        dispatch({
          type: "EMPTY_BASKET",
        });

        history.replace("/orders");
      });
  };

  const handleChange = (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout (<Link to="checkout">{basket?.length} items</Link>)
        </h1>

        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>

          <div className="payment__Address">
            <p>{user?.email}</p>
            <p>123 React Lean</p>
            <p>Los Angeles, CA</p>
          </div>
        </div>

        <div>
          <div className="payment__title">
            <h3>Review items and deliver</h3>
          </div>
          <div className="payment__item">
            {basket.map((item) => (
              <Product
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>

        <div>
          <div className="payment__title">
            <h3>Review items and deliver</h3>
          </div>
          <div className="payment__details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payment__priceContainer">
                <CurrencyFormat
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparato={true}
                  prefix={"$"}
                  renderText={(val) => <h3>Order Total: {val}</h3>}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Bay Now"}</span>
                </button>
              </div>
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
