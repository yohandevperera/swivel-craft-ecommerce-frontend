import { Dispatch } from "redux";
import actions from "../reducers/crud-operations-reducer/crud-operations-actions";
import {
  CraftCategoryType,
  createCraftCategory,
  deleteCraftCategory,
  editCraftCategory,
  getAllCraftCategories,
  getCraftCategoriesByName,
  getCraftCategory,
  searchCraftCategoryByName,
} from "../../services/craft-categories";
import _ from "lodash";

/**
 * Usage - This file will be used to communcate with the API services via redux.
 *
 * Description - This file will act as a mediator for the services and the redux global states
 */

/**
 * Description and Usage - This function that will be used load all the users
 * to the redux state
 *
 * @param dispatch @typedef Dispatch
 */
export const loadAllCraftsCategories = () => async (dispatch: Dispatch) => {
  try {
    dispatch(actions.loadStart());
    const response = await getAllCraftCategories();
    if (_.isEmpty(response.data) || _.isNull(response.data.data)) {
      throw Error("error loading all craft categories response null");
    }
    dispatch(actions.loadSuccess(response.data.data));
  } catch (error: any) {
    dispatch(actions.loadError(error.message));
    throw Error(error.message);
  }
};

/**
 * Description and Usage - This function that will be used create Crafts
 * by fetching the payload from the redux state
 *
 * @param dispatch @typedef Dispatch
 * @param crafts @typedef Omit<CraftType, "_id">
 */
export const createCraftCategories =
  (craftCategory: Omit<CraftCategoryType, "_id">) => (dispatch: Dispatch) => {
    dispatch(actions.loadStart());
    createCraftCategory(craftCategory)
      .then((response) => {
        if (_.isEmpty(response) || _.isNull(response)) {
          throw Error("Error creating craft category response null");
        }
        const createdResponse = response.data;
        dispatch(actions.loadSuccess(createdResponse));
      })
      .catch((error) => {
        dispatch(actions.loadError(error.message));
        throw Error(error.message);
      });
  };

/**
 * Description and Usage - This function can be used edit Crafts
 * by fetching the payload from the redux state
 *
 * @param dispatch @typedef Dispatch
 * @param craft @typedef Omit<CraftType, "_id">
 * @param craftId @typedef string
 */
export const editCraftCategories =
  (craftCategory: Omit<CraftCategoryType, "_id">, craftCategoryId: string) =>
  (dispatch: Dispatch) => {
    dispatch(actions.loadStart());
    editCraftCategory(craftCategory, craftCategoryId)
      .then((response) => {
        if (_.isEmpty(response) || _.isNull(response)) {
          throw Error("Error editing craft category response null");
        }
        const createdResponse = response.data;
        dispatch(actions.singleLoadSuccess(createdResponse));
      })
      .catch((error) => {
        dispatch(actions.loadError(error.message));
        throw Error(error.message);
      });
  };

/**
 * Description and Usage - This function that will be used remove Crafts
 * by fetching the craft id as the payload from the redux state
 *
 * @param dispatch @typedef Dispatch
 * @param id @typedef string
 */
export const removeCraftCategory = (id: string) => (dispatch: Dispatch) => {
  dispatch(actions.loadStart());
  deleteCraftCategory(id)
    .then((response) => {
      if (_.isEmpty(response) || _.isNull(response)) {
        throw Error("Error removing craft category response null");
      }
      const deletedResponse = response.data;
      dispatch(actions.singleLoadSuccess(deletedResponse));
    })
    .catch((error) => {
      dispatch(actions.loadError(error.message));
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
export const getSinglecraft = (id?: string) => (dispatch: Dispatch) => {
  dispatch(actions.loadStart());
  getCraftCategory(id)
    .then((response) => {
      if (_.isEmpty(response) || _.isNull(response)) {
        throw Error("error get single craft response null");
      }
      const craft = response.data.data;
      dispatch(actions.singleLoadSuccess(craft));
    })
    .catch((error) => {
      dispatch(actions.loadError(error.message));
      throw Error(error.message);
    });
};

/**
 * Description and Usage - This function that will be used as a
 * search function to search an craft from the firstname
 *
 * @param dispatch @typedef Dispatch
 * @param firstname @typedef any
 */
export const searchCrafts = (name: string) => (dispatch: Dispatch) => {
  dispatch(actions.loadStart());
  searchCraftCategoryByName(name)
    .then(async (response) => {
      if (_.isEmpty(response) || _.isNull(response)) {
        throw Error("search Crafts response null");
      }
      const craftCategories: any[] = response.data.data;
      dispatch(actions.loadSuccess(craftCategories));
    })
    .catch((error) => {
      dispatch(actions.loadError(error.message));
      throw Error(error.message);
    });
};

export const loadAllCraftsCategoryNames = () => async (dispatch: Dispatch) => {
  try {
    dispatch(actions.loadStart());
    const response = await getCraftCategoriesByName();
    if (_.isEmpty(response.data) || _.isNull(response.data.data)) {
      throw Error("error loading all craft category names response null");
    }
    dispatch(actions.loadSuccess(response.data.data));
  } catch (error: any) {
    dispatch(actions.loadError(error.message));
    throw Error(error.message);
  }
};
