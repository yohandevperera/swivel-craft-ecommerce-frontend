import { combineReducers } from "redux";
import imageReducer from "./image-view-uploader-reducer/image-view-uploader-reducer";
import crudOperationsReducer from "./crud-operations-reducer/crud-operations-reducer";
import authReducer from "./auth-reducer/auth-reducer";

/**
 * Description and Usage - This function and file will act
 * as a wrapper to handle multiple redcuers in the system
 *
 */

const rootReducer = () =>
  combineReducers({
    crudOperations: crudOperationsReducer,
    imageUploader: imageReducer,
    auth: authReducer,
  });

export default rootReducer;
