import * as Actions from "../actions/";
import * as common from "../actions/Common";

import theService from "appServices/profileService";

const loadProfile = () => async (dispatch) =>
  await common.thunkHelper(
    dispatch,
    Actions.PROFILE_LOADING,
    Actions.PROFILE_SUCCESS,
    Actions.PROFILE_ERROR,
    theService.getMyProfile
  );

export { loadProfile };
