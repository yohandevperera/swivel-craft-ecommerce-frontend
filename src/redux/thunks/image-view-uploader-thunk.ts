import { Dispatch } from "redux";
import actions from "../reducers/image-view-uploader-reducer/image-view-uploader-actions";
import _ from "lodash";

/**
 * Usage - This file will be used to to upload base64 images via redux.
 *
 * Description - This file will act as a mediator for the services and the redux global states
 */

/**
 * Description and Usage - This function that will be used to get and set a base64 image to the
 * redux state
 *
 * @param dispatch @typedef Dispatch
 */
export const getAndSetImageBase64 =
  (imageBase64: string) => (dispatch: Dispatch) => {
    dispatch(actions.imageLoadStart());
    if (!_.isEmpty(imageBase64) || !_.isUndefined(imageBase64)) {
      dispatch(actions.imageLoadSuccess(imageBase64));
    } else {
      dispatch(actions.imageLoadSuccess(""));
    }
  };
