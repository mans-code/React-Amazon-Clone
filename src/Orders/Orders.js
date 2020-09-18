import React, { useState, useEffect } from "react";
import { db } from "../Firebase/Firebase";
import Order from "./Order/Order";
import { useStateValue } from "../DataLayer/StateProvider";

import "./Orders.css";

function Orders({ order }) {
  const [{ user }, dispatch] = useStateValue();
  const [orders, setOrdres] = useState([]);

  useEffect(() => {
    if (!user) {
      setOrdres([
        {
          data: {
            created: 1600353633,
            amount: 100000,
            id:"12234545",
            basket: [{
                id: "12234545",
                title: "The Lean startup: new constant Innovation",
                price: 11.22,
                ratin: 5,
                image:
                  "https://m.media-amazon.com/images/I/81Pi4nhjlwL._AC_UY327_FMwebp_QL65_.jpg",
              }]
          }
        },
      ]);
      return;
    }

    db.collection("users")
      .doc(user?.uid)
      .collection("orders")
      .orderBy("created", "desc")
      .onSanpshot((sanpshot) =>
        setOrdres(
          sanpshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, []);

  return (
    <div className="orders">
      <h1>Your Orders</h1>
      <div className="orders__order">
        {
        orders?.map((order) => (
          <Order order={order} />
        ))}
      </div>
    </div>
  );
}

export default Orders;
