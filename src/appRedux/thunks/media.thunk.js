import * as Actions from "../actions";
import * as common from "../actions/Common";

import mediaService from "appServices/mediaService";

const submitMedia = (entityId, formData) => async (dispatch) => {
  try {
    dispatch(common.fetchStart(Actions.MEDIA_SAVING));

    const result = await mediaService.submitMedia(entityId, formData);
    result.entityId = entityId;
    return dispatch(common.fetchSuccessWithData(Actions.MEDIA_SAVED, result));
  } catch (error) {
    return dispatch(common.fetchError(error, Actions.MEDIA_SAVE_ERROR));
  }
};
const resetMediaInfo = () => async (dispatch) =>
  dispatch(common.fetchSuccess(Actions.MEDIA_RESET));

export { submitMedia, resetMediaInfo };
