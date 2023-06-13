import actionTypes from "./auth-actionTypes";

/**
 * Usage - This file will manipulate the redux auth global actions.
 *
 * Description - This file consists for all the redux auth global actions that will be used
 * to manipulate auth data
 */

/**
 * function that will handle the auth loading action
 */
const authLoadStart = () => ({
  type: actionTypes.AUTH_LOAD_START,
});

/**
 * function that will handle the auth load success action
 */
const authLoadSuccess = (authData: any[]) => ({
  type: actionTypes.AUTH_LOAD_SUCCESS,
  payload: authData,
});

/**
 * function that will handle the auth load error action
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
