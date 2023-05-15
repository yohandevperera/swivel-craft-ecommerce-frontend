import { Dispatch } from "redux";
import actions from "../reducers/crud-operations-reducer/crud-operations-actions";
import {
  CraftType,
  createCraft,
  deleteCraft,
  editCraft,
  getAllCrafts,
  getCraft,
} from "../../services/crafts";
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
export const loadAllCrafts = () => (dispatch: Dispatch) => {
  dispatch(actions.loadStart());
  getAllCrafts()
    .then((response) => {
      if (_.isEmpty(response) || _.isNull(response)) {
        throw Error("error loading all crafts response null");
      }
      const crafts = response.data.data;
      dispatch(actions.loadSuccess(crafts));
    })
    .catch((error) => {
      dispatch(actions.loadError(error.message));
      throw Error(error.message);
    });
};

/**
 * Description and Usage - This function that will be used create Crafts
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
 * Description and Usage - This function can be used edit Crafts
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
 * Description and Usage - This function that will be used remove Crafts
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
 * search function to search an craft from the firstname
 *
 * @param dispatch @typedef Dispatch
 * @param firstname @typedef any
 */
// export const searchCrafts = (firstname: string) => (dispatch: Dispatch) => {
//   dispatch(actions.craftLoadStart());
//   searchcraftByFirstname(firstname)
//     .then((response) => {
//       if (_.isEmpty(response) || _.isNull(response)) {
//         throw Error("search Crafts response null");
//       }
//       const Crafts = response.data.data;
//       dispatch(actions.craftLoadSuccess(Crafts));
//     })
//     .catch((error) => {
//       dispatch(actions.craftLoadError(error.message));
//       throw Error(error.message);
//     });
// };

// /**
//  * Description and Usage - This function that will be used as a
//  * sort function to sort an Crafts from the ascending or descending order
//  *
//  * @param dispatch @typedef Dispatch
//  * @param type @typedef enum
//  */
// export const orderCrafts = (type: "asc" | "desc") => (dispatch: Dispatch) => {
//   dispatch(actions.craftLoadStart());
//   sortCrafts(type)
//     .then((response) => {
//       if (_.isEmpty(response) || _.isNull(response)) {
//         throw Error("search Crafts response null");
//       }
//       const Crafts = response.data.data;
//       dispatch(actions.craftLoadSuccess(Crafts));
//     })
//     .catch((error) => {
//       dispatch(actions.craftLoadError(error.message));
//       throw Error(error.message);
//     });
// };
