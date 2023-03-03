import axios from "axios";
import _ from "lodash";

export interface ResponseType {
  status?: number;
  message?: undefined | null | string;
  data?: undefined | object;
}

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
