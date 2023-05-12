import actionTypes from "./image-view-uploader-actionTypes";
import initialState from "./image-view-uploader-intialStates";

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
const imageReducer = (state = initialState, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.IMAGE_LOAD_START:
      return {
        ...state,
        isLoading: true,
        imageBase64: "",
      };
    case actionTypes.IMAGE_LOAD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        imageBase64: payload,
      };
    default:
      return state;
  }
};

export default imageReducer;
