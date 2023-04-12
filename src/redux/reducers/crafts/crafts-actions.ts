import { CraftType } from "../../../services/crafts";
import actionTypes from "./crafts-actionTypes";

/**
 * Usage - This file will manipulate the redux global actions.
 *
 * Description - This file consists for all the redux global actions that will be used
 * to manipulate data
 */

/**
 * function that will handle the loading action
 */
const craftLoadStart = () => ({
  type: actionTypes.CRAFT_LOAD_START,
});

/**
 * function that will handle the load success action
 */
const craftLoadSuccess = (crafts: CraftType[]) => ({
  type: actionTypes.CRAFT_LOAD_SUCCESS,
  payload: crafts,
});

/**
 * function that will handle the load error action
 */
const craftLoadError = (errorMessage: any) => ({
  type: actionTypes.CRAFT_LOAD_ERROR,
  payload: errorMessage,
});

/**
 * function that will handle single craft load success action
 */
const singlecraftLoadSuccess = (craft: CraftType) => ({
  type: actionTypes.SINGLE_CRAFT_LOAD_SUCCESS,
  payload: craft,
});

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  craftLoadStart,
  craftLoadSuccess,
  craftLoadError,
  singlecraftLoadSuccess,
};
