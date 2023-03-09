import axios from "axios";
import _ from "lodash";

/**
 *
 * Description & Usage  - This file will act as a wrapper for the third party library Axios
 * which will be used to communcate to the backend APIS
 *
 */

/**
 * Description - A global type thats used as response object
 */
export interface ResponseType {
  status?: number;
  message?: undefined | null | string;
  data?: undefined | object;
}

/**
 * Description and Usage - This function will be used
 * main api calling function in the service layer
 *
 * @param route @typedef string
 * @param method @typedef enum
 * @param data @typedef any
 */
export const invoke = async (
  route: string,
  method: "get" | "post" | "put" | "delete",
  data: any
): Promise<any> => {
  return axios({
    method,
    url: _.isUndefined(process.env.REACT_APP_SERVER_HOST)
      ? `http://localhost:5000/${route}`
      : process.env.REACT_APP_SERVER_HOST + route,
    data,
  });
};
