import { EmployeeType } from "../../../services/employee";
import actionTypes from "./employees-actionTypes";

const employeeLoadStart = () => ({
  type: actionTypes.EMPLOYEE_LOAD_START,
});

const employeeLoadSuccess = (employees: EmployeeType[]) => ({
  type: actionTypes.EMPLOYEE_LOAD_SUCCESS,
  payload: employees,
});

const employeeLoadError = (errorMessage: any) => ({
  type: actionTypes.EMPLOYEE_LOAD_ERROR,
  payload: errorMessage,
});

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
