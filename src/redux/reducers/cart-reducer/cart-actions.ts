import actionTypes from "./cart-actionTypes";

const addToCart = (itemId: string) => {
  return {
    type: actionTypes.ADD_TO_CART,
    payload: {
      id: itemId,
    },
  };
};

const removeFromCart = (itemId: string) => {
  return {
    type: actionTypes.REMOVE_FROM_CART,
    payload: {
      id: itemId,
    },
  };
};

const adjustQty = (itemId: string, value: number) => {
  return {
    type: actionTypes.ADJUST_QTY,
    payload: {
      id: itemId,
      qty: value,
    },
  };
};

const loadCurrentItem = (item: any) => {
  return {
    type: actionTypes.LOAD_CURRENT_ITEM,
    payload: item,
  };
};

export default {
  addToCart,
  removeFromCart,
  adjustQty,
  loadCurrentItem,
};
