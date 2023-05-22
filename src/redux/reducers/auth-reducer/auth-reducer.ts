import actionTypes from "./auth-actionTypes";
import initialState from "./auth-intialStates";

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
const authReducer = (state = initialState, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.AUTH_LOAD_START:
      return {
        ...state,
        isLoading: true,
        authData: null,
        errorMessage: null,
      };
    case actionTypes.AUTH_LOAD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        authData: payload,
        errorMessage: null,
      };
    case actionTypes.AUTH_LOAD_ERROR:
      return {
        ...state,
        isLoading: false,
        authData: null,
        errorMessage: payload,
      };

    default:
      return state;
  }
};

export default authReducer;
