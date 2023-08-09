import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],

  shippingInfo: localStorage.getItem("shippingInfoEcommerce")
    ? JSON.parse(localStorage.getItem("shippingInfoEcommerce"))
    : {},
  error: null,
};

export const cartReducer = createReducer(initialState, {
  addToCart: (state, action) => {
    const item = action.payload;
    const isItemExist = state.cartItems.find(
      (cartItem) => cartItem.id === item.id
    );

    if (isItemExist) {
      return {
        ...state,
        cartItems: state.cartItems.map((cartItem) =>
          cartItem.id === isItemExist.id ? item : cartItem
        ),
      };
    } else {
      return {
        ...state,
        cartItems: [...state.cartItems, item],
      };
    }
  },

  addToCartFail: (state, action) => {
    state.error = action.payload;
  },

  removeFromCart: (state, action) => {
    return {
      ...state,
      cartItems: state.cartItems.filter(
        (cartItem) => cartItem.id !== action.payload
      ),
    };
  },
  removeFromCartFail: (state, action) => {
    state.error = action.payload;
  },

  saveShippingInfo: (state, action) => {
    state.shippingInfo = action.payload;
  },
});
