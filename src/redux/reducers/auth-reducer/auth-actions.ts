import actionTypes from "./auth-actionTypes";

/**
 * Usage - This file will manipulate the redux global actions.
 *
 * Description - This file consists for all the redux global actions that will be used
 * to manipulate data
 */

/**
 * function that will handle the loading action
 */
const authLoadStart = () => ({
  type: actionTypes.AUTH_LOAD_START,
});

/**
 * function that will handle the load success action
 */
const authLoadSuccess = (authData: any[]) => ({
  type: actionTypes.AUTH_LOAD_SUCCESS,
  payload: authData,
});

/**
 * function that will handle the load error action
 */
const authLoadError = (errorMessage: any) => ({
  type: actionTypes.AUTH_LOAD_ERROR,
  payload: errorMessage,
});

export default {
  authLoadStart,
  authLoadSuccess,
  authLoadError,
};
