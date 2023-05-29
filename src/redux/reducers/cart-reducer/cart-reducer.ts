import actionTypes from "./cart-actionTypes";
import initialState from "./cart-initalStates";

const cartReducer = (state = initialState, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.ADD_TO_CART:
      const item: any = state.items.find((item: any) => item.id === payload.id);
      const inCart = state.cart.find((item: any) =>
        item.id === payload.id ? true : false
      );
      return {
        ...state,
        cart: inCart
          ? state.cart.map((item: any) =>
              item.id === payload.id ? { ...item, qty: item.qty + 1 } : item
            )
          : [...state.cart, { ...item, qty: 1 }],
      };
    case actionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item: any) => item.id !== payload.id),
      };
    case actionTypes.ADJUST_QTY:
      return {
        ...state,
        cart: state.cart.map((item: any) =>
          item.id === payload.id ? { ...item, qty: payload.qty } : item
        ),
      };
    case actionTypes.LOAD_CURRENT_ITEM:
      return {
        ...state,
        currentItem: payload,
      };
    default:
      return state;
  }
};

export default cartReducer;
