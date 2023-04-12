import { Dispatch } from "redux";
import actions from "./crafts-actions";
import {
  CraftType,
  getAllCrafts,
  createCraft,
  editCraft,
  deleteCraft,
  getCraft,
} from "../../../services/crafts";
import _ from "lodash";

/**
 * Usage - This file will be used to communcate with the API services via redux.
 *
 * Description - This file will act as a mediator for the services and the redux global states
 */

/**
 * Description and Usage - This function that will be used load all the crafts
 * to the redux state
 *
 * @param dispatch @typedef Dispatch
 */
export const loadAllCrafts = () => (dispatch: Dispatch) => {
  dispatch(actions.craftLoadStart());
  getAllCrafts()
    .then((response) => {
      if (_.isEmpty(response) || _.isNull(response)) {
        throw Error("load all crafts response null");
      }
      const crafts = response.data.data;
      dispatch(actions.craftLoadSuccess(crafts));
    })
    .catch((error) => {
      dispatch(actions.craftLoadError(error.message));
      throw Error(error.message);
    });
};

/**
 * Description and Usage - This function that will be used create crafts
 * by fetching the payload from the redux state
 *
 * @param dispatch @typedef Dispatch
 * @param crafts @typedef Omit<CraftType, "photo" | "_id">
 */
export const createCrafts =
  (craft: Omit<CraftType, "photo" | "_id">) => (dispatch: Dispatch) => {
    dispatch(actions.craftLoadStart());
    createCraft(craft)
      .then((response) => {
        if (_.isEmpty(response) || _.isNull(response)) {
          throw Error("create craft response null");
        }
        const createdResponse = response.data;
        dispatch(actions.singlecraftLoadSuccess(createdResponse));
      })
      .catch((error) => {
        dispatch(actions.craftLoadError(error.message));
        throw Error(error.message);
      });
  };

/**
 * Description and Usage - This function can be used edit crafts
 * by fetching the payload from the redux state
 *
 * @param dispatch @typedef Dispatch
 * @param craft @typedef Omit<CraftType, "photo" | "_id">
 * @param craftId @typedef string
 */
export const editCrafts =
  (craft: Omit<CraftType, "photo" | "_id">, craftId: string) =>
  (dispatch: Dispatch) => {
    dispatch(actions.craftLoadStart());
    editCraft(craft, craftId)
      .then((response) => {
        if (_.isEmpty(response) || _.isNull(response)) {
          throw Error("edit craft response null");
        }
        const createdResponse = response.data;
        dispatch(actions.singlecraftLoadSuccess(createdResponse));
      })
      .catch((error) => {
        dispatch(actions.craftLoadError(error.message));
        throw Error(error.message);
      });
  };

/**
 * Description and Usage - This function that will be used remove crafts
 * by fetching the craft id as the payload from the redux state
 *
 * @param dispatch @typedef Dispatch
 * @param id @typedef string
 */
export const removeCraft = (id: string) => (dispatch: Dispatch) => {
  dispatch(actions.craftLoadStart());
  deleteCraft(id)
    .then((response) => {
      if (_.isEmpty(response) || _.isNull(response)) {
        throw Error("remove craft response null");
      }
      const deletedResponse = response.data;
      dispatch(actions.singlecraftLoadSuccess(deletedResponse));
    })
    .catch((error) => {
      dispatch(actions.craftLoadError(error.message));
      throw Error(error.message);
    });
};

/**
 * Description and Usage - This function that will be used to fetch
 * a single craft for a given craft id
 *
 * @param dispatch @typedef Dispatch
 * @param id @typedef string
 */
export const getSingleCraft = (id?: string) => (dispatch: Dispatch) => {
  dispatch(actions.craftLoadStart());
  getCraft(id)
    .then((response) => {
      if (_.isEmpty(response) || _.isNull(response)) {
        throw Error("get single craft response null");
      }
      const craft = response.data.data;
      dispatch(actions.singlecraftLoadSuccess(craft));
    })
    .catch((error) => {
      dispatch(actions.craftLoadError(error.message));
      throw Error(error.message);
    });
};
