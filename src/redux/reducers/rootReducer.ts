import { combineReducers } from "redux";
import craftReducer from "./crafts/crafts-reducer";

/**
 * Description and Usage - This function and file will act
 * as a wrapper to handle multiple redcuers in the system
 *
 */

const rootReducer = () =>
  combineReducers({
    crafts: craftReducer,
  });

export default rootReducer;
