import actionTypes from "./crafts-actionTypes";
import initialState from "./crafts-intialStates";

/**
 * Usage - This file will manipulate the defined global redux states.
 *
 * Description - All the defined global redux states can be manipulated using this file
 */

/**
 *
 * Description - The function that will be used as the state reducer to manipulate
 * the defined states
 *
 * @param state @typedef object
 * @param action @typedef any
 */
const craftReducer = (state = initialState, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.CRAFT_LOAD_START:
      return {
        ...state,
        isLoading: true,
        crafts: null,
        errorMessage: null,
      };
    case actionTypes.CRAFT_LOAD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        crafts: payload,
        craftList: payload,
      };
    case actionTypes.SINGLE_CRAFT_LOAD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        craft: payload,
      };
    case actionTypes.CRAFT_LOAD_ERROR:
      return {
        ...state,
        isLoading: false,
        errorMessage: payload,
      };

    default:
      return state;
  }
};

export default craftReducer;
