import actionTypes from "./crud-operations-actionTypes";

/**
 * Usage - This file will manipulate the redux global actions.
 *
 * Description - This file consists for all the redux global actions that will be used
 * to manipulate data
 */

/**
 * function that will handle the loading action
 */
const loadStart = () => ({
  type: actionTypes.LOAD_START,
});

/**
 * function that will handle the load success action
 */
const loadSuccess = (dataSet: any[]) => ({
  type: actionTypes.LOAD_SUCCESS,
  payload: dataSet,
});

/**
 * function that will handle the load error action
 */
const loadError = (errorMessage: any) => ({
  type: actionTypes.LOAD_ERROR,
  payload: errorMessage,
});

/**
 * function that will handle single  load success action
 */
const singleLoadSuccess = (data: any) => ({
  type: actionTypes.SINGLE_LOAD_SUCCESS,
  payload: data,
});

export default {
  loadStart,
  loadSuccess,
  loadError,
  singleLoadSuccess,
};
