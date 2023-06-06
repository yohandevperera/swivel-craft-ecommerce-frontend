import { Dispatch } from "redux";
import actions from "../reducers/crud-operations-reducer/crud-operations-actions";
import {
  OrderType,
  createOrder,
  getAllOrders,
  getOrder,
  getOrderTableData,
} from "../../services/orders";
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
export const loadAllOrders = () => async (dispatch: Dispatch) => {
  try {
    dispatch(actions.loadStart());
    const response = await getAllOrders();
    if (_.isEmpty(response.data) || _.isNull(response.data.data)) {
      throw Error("error loading all order response null");
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
 * @param crafts @typedef Omit<OrderType, "_id">
 */
export const createOrders =
  (order: Omit<OrderType, "_id">[]) => (dispatch: Dispatch) => {
    dispatch(actions.loadStart());
    createOrder(order)
      .then((response) => {
        if (_.isEmpty(response) || _.isNull(response)) {
          throw Error("Error creating order response null");
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
 * Description and Usage - This function that will be used to fetch
 * a single order for a given order id
 *
 * @param dispatch @typedef Dispatch
 * @param id @typedef string
 */
export const getSingleOrder = (id?: string) => (dispatch: Dispatch) => {
  dispatch(actions.loadStart());
  getOrder(id)
    .then((response) => {
      if (_.isEmpty(response) || _.isNull(response)) {
        throw Error("error get order response null");
      }
      const craft = response.data.data;
      dispatch(actions.singleLoadSuccess(craft));
    })
    .catch((error) => {
      dispatch(actions.loadError(error.message));
      throw Error(error.message);
    });
};

export const getTableDataOrders = () => (dispatch: Dispatch) => {
  dispatch(actions.loadStart());
  getOrderTableData()
    .then((response) => {
      if (_.isEmpty(response) || _.isNull(response)) {
        throw Error("error get order response null");
      }
      const orders = response.data.data;
      dispatch(actions.loadSuccess(orders));
    })
    .catch((error) => {
      dispatch(actions.loadError(error.message));
      throw Error(error.message);
    });
};
