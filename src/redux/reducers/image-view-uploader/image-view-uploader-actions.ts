import actionTypes from "./image-view-uploader-actionTypes";

/**
 * Usage - This file will manipulate the redux global actions.
 *
 * Description - This file consists for all the redux global actions that will be used
 * to manipulate data
 */

/**
 * function that will handle the loading action
 */
const imageLoadStart = () => ({
  type: actionTypes.IMAGE_LOAD_START,
});

/**
 * function that will handle the load success action
 */
const imageLoadSuccess = (image: string) => ({
  type: actionTypes.IMAGE_LOAD_SUCCESS,
  payload: image,
});

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  imageLoadStart,
  imageLoadSuccess,
};
