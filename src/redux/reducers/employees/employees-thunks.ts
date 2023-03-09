import { Dispatch } from "redux";
import actions from "./employees-actions";
import {
  EmployeeType,
  getAllEmployees,
  createEmployee,
  editEmployee,
  deleteEmployee,
  getEmployee,
} from "../../../services/employee";
import _ from "lodash";

/**
 * Usage - This file will be used to communcate with the API services via redux.
 *
 * Description - This file will act as a mediator for the services and the redux global states
 */

export type createAndEditEmployeeParams = {
  type: "add" | "edit";
  employee: Omit<EmployeeType, "photo" | "_id">;
  employeeId?: string;
};

/**
 * Description and Usage - This function that will be used load all the users
 * to the redux state
 *
 * @param dispatch @typedef Dispatch
 */
export const loadAllEmployees = () => (dispatch: Dispatch) => {
  dispatch(actions.employeeLoadStart());
  getAllEmployees()
    .then((response) => {
      const employees = response.data.data;
      dispatch(actions.employeeLoadSuccess(employees));
    })
    .catch((error) => {
      dispatch(actions.employeeLoadError(error.message));
      throw Error(error.message);
    });
};

/**
 * Description and Usage - This function that will be used create and edit employees
 * by fetching the payload from the redux state
 *
 * @param dispatch @typedef Dispatch
 * @param params @typedef createAndEditEmployeeParams
 */
export const createAndEditEmployees =
  (params: createAndEditEmployeeParams) => (dispatch: Dispatch) => {
    dispatch(actions.employeeLoadStart());
    params.employee = {
      ...params.employee,
      phone: params.employee.phone.toString(),
    };
    if (params.type == "add") {
      createEmployee(params.employee)
        .then((response) => {
          const createdResponse = response.data;
          dispatch(actions.singleEmployeeLoadSuccess(createdResponse));
        })
        .catch((error) => {
          dispatch(actions.employeeLoadError(error.message));
          throw Error(error.message);
        });
    } else {
      editEmployee(params.employee, params.employeeId)
        .then((response) => {
          const createdResponse = response.data;
          dispatch(actions.singleEmployeeLoadSuccess(createdResponse));
        })
        .catch((error) => {
          dispatch(actions.employeeLoadError(error.message));
          throw Error(error.message);
        });
    }
  };

/**
 * Description and Usage - This function that will be used remove employees
 * by fetching the employee id as the payload from the redux state
 *
 * @param dispatch @typedef Dispatch
 * @param id @typedef string
 */
export const removeEmployee = (id: string) => (dispatch: Dispatch) => {
  dispatch(actions.employeeLoadStart());
  deleteEmployee(id)
    .then((response) => {
      const deletedResponse = response.data;
      dispatch(actions.singleEmployeeLoadSuccess(deletedResponse));
    })
    .catch((error) => {
      dispatch(actions.employeeLoadError(error.message));
      throw Error(error.message);
    });
};

/**
 * Description and Usage - This function that will be used to fetch 
 * a single employee for a given employee id 
 *
 * @param dispatch @typedef Dispatch
 * @param id @typedef string
 */
export const getSingleEmployee = (id?: string) => (dispatch: Dispatch) => {
  dispatch(actions.employeeLoadStart());
  getEmployee(id)
    .then((response) => {
      const employee = response.data.data;
      dispatch(actions.singleEmployeeLoadSuccess(employee));
    })
    .catch((error) => {
      dispatch(actions.employeeLoadError(error.message));
      throw Error(error.message);
    });
};

/**
 * Description and Usage - This function that will be used as a 
 * sorting and search function to sort all the employees
 *
 * @param dispatch @typedef Dispatch
 * @param firstname @typedef any
 * @param employees @typedef EmployeeType[]
 * @param type @typedef enum
 * @param method @typedef enum
 */
export const searchAndSortEmployee =
  (
    firstname: any,
    employees: EmployeeType[],
    type: "search" | "sort",
    method?: "sort" | "disorder"
  ) =>
  (dispatch: Dispatch) => {
    dispatch(actions.employeeLoadStart());
    if (!_.isEmpty(firstname) && type == "search") {
      const searchedEmployees: any = _.filter(employees, {
        firstname,
      });
      dispatch(actions.employeeLoadSuccess(searchedEmployees));
    } else if (type == "sort") {
      if (method == "sort") {
        const sortedEmployees = employees.sort((a, b) =>
          a.firstname.localeCompare(b.firstname)
        );
        dispatch(actions.employeeLoadSuccess(sortedEmployees));
      } else {
        const sortedEmployees = employees.sort((a, b) =>
          b.firstname.localeCompare(a.firstname)
        );
        dispatch(actions.employeeLoadSuccess(sortedEmployees));
      }
    } else {
      dispatch(actions.employeeLoadError("Error searching data"));
    }
  };
