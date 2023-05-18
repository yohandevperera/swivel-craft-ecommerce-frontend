import { Dispatch } from "redux";
import actions from "../reducers/crud-operations-reducer/crud-operations-actions";
import {
  UserType,
  createUser,
  deleteUser,
  editUser,
  getAllUsers,
  getUser,
  searchUserByFristname,
} from "../../services/users";
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
export const loadAllUsers = () => async (dispatch: Dispatch) => {
  try {
    dispatch(actions.loadStart());
    const response = await getAllUsers();
    if (_.isEmpty(response.data) || _.isNull(response.data.data)) {
      throw Error("error loading all Users response null");
    }
    const users: any[] = response.data.data;
    dispatch(actions.loadSuccess(users));
  } catch (error: any) {
    dispatch(actions.loadError(error.message));
    throw Error(error.message);
  }
};

/**
 * Description and Usage - This function that will be used create Users
 * by fetching the payload from the redux state
 *
 * @param dispatch @typedef Dispatch
 * @param Users @typedef Omit<UserType, "_id">
 */
export const createUsers =
  (user: Omit<UserType, "_id">) => (dispatch: Dispatch) => {
    dispatch(actions.loadStart());
    createUser(user)
      .then((response) => {
        if (_.isEmpty(response) || _.isNull(response)) {
          throw Error("Error creating user response null");
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
 * Description and Usage - This function can be used edit Users
 * by fetching the payload from the redux state
 *
 * @param dispatch @typedef Dispatch
 * @param user @typedef Omit<UserType, "_id">
 * @param userId @typedef string
 */
export const editUsers =
  (user: Omit<UserType, "_id">, userId: string) => (dispatch: Dispatch) => {
    dispatch(actions.loadStart());
    editUser(user, userId)
      .then((response) => {
        if (_.isEmpty(response) || _.isNull(response)) {
          throw Error("Error editing user response null");
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
 * Description and Usage - This function that will be used remove Users
 * by fetching the user id as the payload from the redux state
 *
 * @param dispatch @typedef Dispatch
 * @param id @typedef string
 */
export const removeUser = (id: string) => (dispatch: Dispatch) => {
  dispatch(actions.loadStart());
  deleteUser(id)
    .then((response) => {
      if (_.isEmpty(response) || _.isNull(response)) {
        throw Error("Error removing user response null");
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
 * a single user for a given user id
 *
 * @param dispatch @typedef Dispatch
 * @param id @typedef string
 */
export const getSingleuser = (id?: string) => (dispatch: Dispatch) => {
  dispatch(actions.loadStart());
  getUser(id)
    .then((response) => {
      if (_.isEmpty(response) || _.isNull(response)) {
        throw Error("error get single user response null");
      }
      const user = response.data.data;
      dispatch(actions.singleLoadSuccess(user));
    })
    .catch((error) => {
      dispatch(actions.loadError(error.message));
      throw Error(error.message);
    });
};

/**
 * Description and Usage - This function that will be used as a
 * search function to search an user from the firstname
 *
 * @param dispatch @typedef Dispatch
 * @param firstname @typedef any
 */
export const searchUsers = (name: string) => (dispatch: Dispatch) => {
  dispatch(actions.loadStart());
  searchUserByFristname(name)
    .then(async (response) => {
      if (_.isEmpty(response) || _.isNull(response)) {
        throw Error("search Users response null");
      }
      const Users: any[] = response.data.data;
      dispatch(actions.loadSuccess(Users));
    })
    .catch((error) => {
      dispatch(actions.loadError(error.message));
      throw Error(error.message);
    });
};
