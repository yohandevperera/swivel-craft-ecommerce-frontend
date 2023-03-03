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

export type createAndEditEmployeeParams = {
  type: "add" | "edit";
  employee: Omit<EmployeeType, "photo" | "_id">;
  employeeId?: string;
};

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
