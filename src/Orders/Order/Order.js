import React from "react";

import moment from "moment";
import CurrencyFormat from "react-currency-format";

import Product from "../../Checkout/Product/Product";

import "./Order.css";

function Order({ order }) {
  return (
    <div className="order">
      <h2>Order</h2>
      {console.log("order", order)}
      <p>{moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}</p>
      <p className="order__id">
        <small>{order.data.id}</small>
      </p>

      {order.data.basket?.map((item) => (
        <Product
          id={item.id}
          title={item.title}
          image={item.image}
          price={item.price}
          rating={item.rating}
          hideButton={true}
        />
      ))}

      <CurrencyFormat
        decimalScale={2}
        value={order.data.amount / 100}
        displayType={"text"}
        thousandSeparato={true}
        prefix={"$"}
        renderText={(val) => <h3>Order Total: {val}</h3>}
      />
    </div>
  );
}
export default Order;
