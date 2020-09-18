import React from "react";
import { useHistory } from "react-router-dom";
import { getBasketTotal } from "../DataLayer/Reducer";
import { useStateValue } from "../DataLayer/StateProvider";

import CurrencyFormat from "react-currency-format";

import "./Subtotal.css";

function Subtotal() {
  const history = useHistory();
  const [{ basket }, dipatch] = useStateValue();
  return (
    <div className="subtotal">
      <CurrencyFormat
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType={"text"}
        thousandSeparato={true}
        prefix={"$"}
        renderText={(val) => (
          <>
            <p>
              Subtotal ({basket.length} items): <strong>{val}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" /> This order contain a gift
            </small>
          </>
        )}
      />

      <button onClick={(e) => history.push("/payment")}>
        {" "}
        Proceed to Checkout
      </button>
    </div>
  );
}

export default Subtotal;
