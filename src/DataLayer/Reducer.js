export const getBasketTotal = (basket) =>
  basket?.reduce((amount, item) => item.price + amount, 0);

export const initialState = {
  basket: [
    {
      id: "12234545",
      title: "The Lean startup: new constant Innovation",
      price: 11.22,
      rating: 5,
      image:
        "https://m.media-amazon.com/images/I/81Pi4nhjlwL._AC_UY327_FMwebp_QL65_.jpg",
    },
  ],
  user: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...state.basket, action.item],
      };
    case "REMOVE_FROM_BASKET":
      const newBasket = [...state.basket];
      const index = state.basket.findIndex((item) => item.id === action.id);
      newBasket.splice(index, 1);
      return { ...state, basket: newBasket };
    case "EMPTY_BASKET":
      return {
        ...state,
        basket: [],
      };
    default:
      return { ...state };
  }
};

export default reducer;
