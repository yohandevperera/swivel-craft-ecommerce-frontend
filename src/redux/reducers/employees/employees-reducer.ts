import actionTypes from "./employees-actionTypes";
import initialState from "./employees-intialStates";

const employeeReducer = (state = initialState, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.EMPLOYEE_LOAD_START:
      return {
        ...state,
        isLoading: true,
        employees: null,
        errorMessage: null,
      };
    case actionTypes.EMPLOYEE_LOAD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        employees: payload,
        employeeList: payload,
      };
    case actionTypes.SINGLE_EMPLOYEE_LOAD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        employee: payload,
      };
    case actionTypes.EMPLOYEE_LOAD_ERROR:
      return {
        ...state,
        isLoading: false,
        errorMessage: payload,
      };

    default:
      return state;
  }
};

export default employeeReducer;
