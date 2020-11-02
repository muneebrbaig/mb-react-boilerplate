import * as common from "../actions/Common";
import { utils } from "@mb";
import { ADMIN_LOGIN_SUCCESS, ADMIN_LOGIN_ERROR } from "../actions";
import jwtService from "appServices/jwtService";
import { USER_DATA } from "../../constants/ActionTypes";

export const submitAdminLogin = authToken => async (dispatch) => {
  jwtService
    .signInAdminForUser(authToken)
    .then((authInfo) => {
      if (!utils.isEmpty(authInfo)) {
        dispatch(
          common.fetchSuccessWithData(ADMIN_LOGIN_SUCCESS, authInfo.token)
        );
        dispatch({ type: USER_DATA, payload: authInfo.basicProfile });
      } else {
        dispatch(
          common.fetchError(
            { failed: true, message: "Sign in error, please try again." },
            ADMIN_LOGIN_ERROR
          )
        );
      }
    })
    .catch((error) => {
      debugger;
      console.error(`Error****:`, error);

      return dispatch({
        type: ADMIN_LOGIN_ERROR,
        payload: error,
      });
    });
};
