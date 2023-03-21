import { Dispatch } from "redux";
import actions from "./employees-actions";
import {
  EmployeeType,
  getAllEmployees,
  createEmployee,
  editEmployee,
  deleteEmployee,
  getEmployee,
  searchEmployeeByFirstname,
  sortEmployees,
} from "../../../services/employee";
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
export const loadAllEmployees = () => (dispatch: Dispatch) => {
  dispatch(actions.employeeLoadStart());
  getAllEmployees()
    .then((response) => {
      if (_.isEmpty(response) || _.isNull(response)) {
        throw Error("load all employees response null");
      }
      const employees = response.data.data;
      dispatch(actions.employeeLoadSuccess(employees));
    })
    .catch((error) => {
      dispatch(actions.employeeLoadError(error.message));
      throw Error(error.message);
    });
};

/**
 * Description and Usage - This function that will be used create employees
 * by fetching the payload from the redux state
 *
 * @param dispatch @typedef Dispatch
 * @param employees @typedef Omit<EmployeeType, "photo" | "_id">
 */
export const createEmployees =
  (employee: Omit<EmployeeType, "photo" | "_id">) => (dispatch: Dispatch) => {
    dispatch(actions.employeeLoadStart());
    employee = {
      ...employee,
      phone: employee.phone.toString(),
    };
    createEmployee(employee)
      .then((response) => {
        if (_.isEmpty(response) || _.isNull(response)) {
          throw Error("create employee response null");
        }
        const createdResponse = response.data;
        dispatch(actions.singleEmployeeLoadSuccess(createdResponse));
      })
      .catch((error) => {
        dispatch(actions.employeeLoadError(error.message));
        throw Error(error.message);
      });
  };

/**
 * Description and Usage - This function can be used edit employees
 * by fetching the payload from the redux state
 *
 * @param dispatch @typedef Dispatch
 * @param employee @typedef Omit<EmployeeType, "photo" | "_id">
 * @param employeeId @typedef string
 */
export const editEmployees =
  (employee: Omit<EmployeeType, "photo" | "_id">, employeeId: string) =>
  (dispatch: Dispatch) => {
    dispatch(actions.employeeLoadStart());
    employee = {
      ...employee,
      phone: employee.phone.toString(),
    };
    editEmployee(employee, employeeId)
      .then((response) => {
        if (_.isEmpty(response) || _.isNull(response)) {
          throw Error("edit employee response null");
        }
        const createdResponse = response.data;
        dispatch(actions.singleEmployeeLoadSuccess(createdResponse));
      })
      .catch((error) => {
        dispatch(actions.employeeLoadError(error.message));
        throw Error(error.message);
      });
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
      if (_.isEmpty(response) || _.isNull(response)) {
        throw Error("remove employee response null");
      }
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
      if (_.isEmpty(response) || _.isNull(response)) {
        throw Error("get single employee response null");
      }
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
 * search function to search an employee from the firstname
 *
 * @param dispatch @typedef Dispatch
 * @param firstname @typedef any
 */
export const searchEmployees = (firstname: string) => (dispatch: Dispatch) => {
  dispatch(actions.employeeLoadStart());
  searchEmployeeByFirstname(firstname)
    .then((response) => {
      if (_.isEmpty(response) || _.isNull(response)) {
        throw Error("search employees response null");
      }
      const employees = response.data.data;
      dispatch(actions.employeeLoadSuccess(employees));
    })
    .catch((error) => {
      dispatch(actions.employeeLoadError(error.message));
      throw Error(error.message);
    });
};

/**
 * Description and Usage - This function that will be used as a
 * sort function to sort an employees from the ascending or descending order 
 *
 * @param dispatch @typedef Dispatch
 * @param type @typedef enum
 */
export const orderEmployees =
  (type: "asc" | "desc") => (dispatch: Dispatch) => {
    dispatch(actions.employeeLoadStart());
    sortEmployees(type)
      .then((response) => {
        if (_.isEmpty(response) || _.isNull(response)) {
          throw Error("search employees response null");
        }
        const employees = response.data.data;
        dispatch(actions.employeeLoadSuccess(employees));
      })
      .catch((error) => {
        dispatch(actions.employeeLoadError(error.message));
        throw Error(error.message);
      });
  };
