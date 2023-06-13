import actionTypes from "./crud-operations-actionTypes";
import initialState from "./crud-operations-intialStates";

/**
 * Usage - This file will manipulate the defined global redux states for the crud operations.
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
const crudOperationsReducer = (state = initialState, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.LOAD_START:
      return {
        ...state,
        isLoading: true,
        dataSet: null,
        errorMessage: null,
        data: null,
        topSales: null,
        totalSales: null,
      };
    case actionTypes.LOAD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        dataSet: payload,
        errorMessage: null,
        data: null,
        topSales: null,
        totalSales: null,
      };
    case actionTypes.SINGLE_LOAD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        dataSet: null,
        errorMessage: null,
        data: payload,
        topSales: null,
        totalSales: null,
      };
    case actionTypes.LOAD_ERROR:
      return {
        ...state,
        isLoading: false,
        dataSet: null,
        errorMessage: payload,
        data: null,
      };

    default:
      return state;
  }
};

export default crudOperationsReducer;
