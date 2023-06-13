import actionTypes from "./cart-actionTypes";
import initialState from "./cart-initalStates";

/**
 * Usage - This file will manipulate the defined auth global redux states.
 *
 * Description - All the defined global cart redux states can be manipulated using this file
 */

/**
 *
 * Description - The function that will be used as the state reducer to manipulate
 * the defined states
 *
 * @param state @typedef object
 * @param action @typedef any
 */

const cartReducer = (state = initialState, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.ADD_TO_CART:
      const item: any = state.items.find(
        (item: any) => item._id === payload.id
      );
      const inCart = state.cart.find((item: any) =>
        item._id === payload.id ? true : false
      );
      return {
        ...state,
        cart: inCart
          ? state.cart.map((item: any) =>
              item._id === payload.id ? { ...item, qty: item.qty + 1 } : item
            )
          : [...state.cart, { ...item, qty: 1 }],
      };
    case actionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item: any) => item._id !== payload.id),
      };
    case actionTypes.ADJUST_QTY:
      return {
        ...state,
        cart: state.cart.map((item: any) =>
          item._id === payload.id ? { ...item, qty: payload.qty } : item
        ),
      };
    case actionTypes.LOAD_CURRENT_ITEM:
      return {
        ...state,
        currentItem: payload,
      };
    case actionTypes.LOAD_ITEMS:
      return {
        ...state,
        items: payload,
      };
    default:
      return state;
  }
};

export default cartReducer;
