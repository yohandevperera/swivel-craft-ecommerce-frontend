import { combineReducers } from "redux";
import employeeReducer from "./employees/employees-reducer";

/**
 * Description and Usage - This function and file will act
 * as a wrapper to handle multiple redcuers in the system
 *
 */

const rootReducer = () =>
  combineReducers({
    employees: employeeReducer,
  });

export default rootReducer;
