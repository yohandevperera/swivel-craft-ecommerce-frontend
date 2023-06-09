import { Dispatch } from "redux";
import actions from "../reducers/crud-operations-reducer/crud-operations-actions";
import {
  CraftType,
  createCraft,
  deleteCraft,
  editCraft,
  getAllCrafts,
  getCraft,
  searchCraftByName,
} from "../../services/crafts";
import _ from "lodash";
import { getCraftCategory } from "../../services/craft-categories";
import cartActions from "../reducers/cart-reducer/cart-actions";

/**
 * Usage - This file will be used to communcate with the API craft services via redux.
 *
 * Description - This file will act as a mediator for the services and the redux global states
 */

/**
 * Description and Usage - This function that will be used load all the crafts
 * to the redux state
 *
 * @param dispatch @typedef Dispatch
 */
export const loadAllCrafts = () => async (dispatch: Dispatch) => {
  try {
    dispatch(actions.loadStart());
    const response = await getAllCrafts();
    if (_.isEmpty(response.data) || _.isNull(response.data.data)) {
      throw Error("error loading all crafts response null");
    }
    dispatch(actions.loadSuccess(response.data.data));
    dispatch(cartActions.loadItems(response.data.data));
  } catch (error: any) {
    dispatch(actions.loadError(error.message));
    throw Error(error.message);
  }
};

/**
 * Description and Usage - This function that will be used create crafts
 * by fetching the payload from the redux state
 *
 * @param dispatch @typedef Dispatch
 * @param crafts @typedef Omit<CraftType, "_id">
 */
export const createCrafts =
  (craft: Omit<CraftType, "_id">) => (dispatch: Dispatch) => {
    dispatch(actions.loadStart());
    createCraft(craft)
      .then((response) => {
        if (_.isEmpty(response) || _.isNull(response)) {
          throw Error("Error creating craft response null");
        }
        const createdResponse = response.data;
        console.log(createdResponse);
        dispatch(actions.loadSuccess(createdResponse));
      })
      .catch((error) => {
        dispatch(actions.loadError(error.message));
        throw Error(error.message);
      });
  };

/**
 * Description and Usage - This function can be used edit crafts
 * by fetching the payload from the redux state
 *
 * @param dispatch @typedef Dispatch
 * @param craft @typedef Omit<CraftType, "_id">
 * @param craftId @typedef string
 */
export const editCrafts =
  (craft: Omit<CraftType, "_id">, craftId: string) => (dispatch: Dispatch) => {
    dispatch(actions.loadStart());
    editCraft(craft, craftId)
      .then((response) => {
        if (_.isEmpty(response) || _.isNull(response)) {
          throw Error("Error editing craft response null");
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
 * Description and Usage - This function that will be used remove crafts
 * by fetching the craft id as the payload from the redux state
 *
 * @param dispatch @typedef Dispatch
 * @param id @typedef string
 */
export const removecraft = (id: string) => (dispatch: Dispatch) => {
  dispatch(actions.loadStart());
  deleteCraft(id)
    .then((response) => {
      if (_.isEmpty(response) || _.isNull(response)) {
        throw Error("Error removing craft response null");
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
  getCraft(id)
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
 * search function to search an craft from the name
 *
 * @param dispatch @typedef Dispatch
 * @param name @typedef any
 */
export const searchCrafts = (name: string) => (dispatch: Dispatch) => {
  dispatch(actions.loadStart());
  searchCraftByName(name)
    .then(async (response) => {
      if (_.isEmpty(response) || _.isNull(response)) {
        throw Error("search Crafts response null");
      }
      const crafts: any[] = response.data.data;
      const restructuredCrafts = await Promise.all(
        crafts.map(async (craft: CraftType) => {
          const craftCategory = await getCraftCategory(craft.categoryId);
          return {
            name: craft.name,
            craftCategory: craftCategory?.data?.data?.name,
            description: craft.description,
            price: craft.price,
            qty: craft.qty,
            photo: craft.photo,
            _id: craft._id,
          };
        })
      );
      dispatch(actions.loadSuccess(restructuredCrafts));
    })
    .catch((error) => {
      dispatch(actions.loadError(error.message));
      throw Error(error.message);
    });
};
