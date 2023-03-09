import { EmployeeType } from "../../../services/employee";
import actionTypes from "./employees-actionTypes";


/**
 * Usage - This file will manipulate the redux global actions.
 *
 * Description - This file consists for all the redux global actions that will be used
 * to manipulate data
 */


/**
 * function that will handle the loading action 
 */
const employeeLoadStart = () => ({
  type: actionTypes.EMPLOYEE_LOAD_START,
});

/**
 * function that will handle the load success action 
 */
const employeeLoadSuccess = (employees: EmployeeType[]) => ({
  type: actionTypes.EMPLOYEE_LOAD_SUCCESS,
  payload: employees,
});

/**
 * function that will handle the load error action 
 */
const employeeLoadError = (errorMessage: any) => ({
  type: actionTypes.EMPLOYEE_LOAD_ERROR,
  payload: errorMessage,
});

/**
 * function that will handle single employee load success action 
 */
const singleEmployeeLoadSuccess = (employee: EmployeeType) => ({
  type: actionTypes.SINGLE_EMPLOYEE_LOAD_SUCCESS,
  payload: employee,
});

export default {
  employeeLoadStart,
  employeeLoadSuccess,
  employeeLoadError,
  singleEmployeeLoadSuccess,
};
