import React from "react";
import { useStateValue } from "../../DataLayer/StateProvider";
import "./Product.css";

export default function Product({
  id,
  title,
  image,
  price,
  rating,
  hideButton,
}) {
  const [, dispatch] = useStateValue();

  const removeFromBasket = () => {
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id,
    });
  };
  return (
    <div className="checkoutProduct">
      <img className="checkoutProduct__image" src={image} alt="" />

      <div className="checkoutProduct__info">
        <p className="checkoutProduct__title">{title}</p>

        <p className="checkoutProduct__price">
          <small>$</small>
          <small>{price}</small>
        </p>

        <div>
          {Array(rating)
            .fill()
            .map((_) => (
              <span role="img" aria-label="*">
                ⭐
              </span>
            ))}
        </div>
        {!hideButton && (
          <button
            className="checkoutProduct__button"
            onClick={removeFromBasket}
          >
            Remove from basket
          </button>
        )}
      </div>
    </div>
  );
}
