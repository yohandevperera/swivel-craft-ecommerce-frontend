import actionTypes from "./cart-actionTypes";

/**
 * Usage - This file will manipulate the redux cart global actions.
 *
 * Description - This file consists for all the redux cart global actions that will be used
 * to manipulate auth data
 */

/**
 * function that will handle the cart add action
 */
const addToCart = (itemId: string) => {
  return {
    type: actionTypes.ADD_TO_CART,
    payload: {
      id: itemId,
    },
  };
};

/**
 * function that will handle the remove from cart action
 */
const removeFromCart = (itemId: string) => {
  return {
    type: actionTypes.REMOVE_FROM_CART,
    payload: {
      id: itemId,
    },
  };
};

/**
 * function that will handle the adjust cart qty action
 */
const adjustQty = (itemId: string, value: number) => {
  return {
    type: actionTypes.ADJUST_QTY,
    payload: {
      id: itemId,
      qty: value,
    },
  };
};

/**
 * function that will handle the load current cart item action
 */
const loadCurrentItem = (item: any) => {
  return {
    type: actionTypes.LOAD_CURRENT_ITEM,
    payload: item,
  };
};

/**
 * function that will handle the load all cart items action
 */
const loadItems = (items: any[]) => {
  return {
    type: actionTypes.LOAD_ITEMS,
    payload: items,
  };
};

export default {
  addToCart,
  removeFromCart,
  adjustQty,
  loadCurrentItem,
  loadItems,
};
