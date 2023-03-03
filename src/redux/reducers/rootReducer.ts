import { combineReducers } from "redux";
import employeeReducer from "./employees/employees-reducer";

const rootReducer = () =>
  combineReducers({
    employees: employeeReducer,
  });

export default rootReducer;
