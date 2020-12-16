import * as common from "../actions/Common";

import {
  ON_HIDE_LOADER,
  ON_SHOW_LOADER,
  USER_TOKEN_SET,
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  PASSWORD_CHANGED,
  PASSWORD_RESET,
  USER_TOKEN_FAILED,
  PASSWORD_RESET_FAILED,
  RESET_AUTH_DATA,
  USER_DATA,
  WELCOME_SUCCESS,
  WELCOME_ERROR,
  WELCOME_ERROR_RESET,
  SIGNOUT_USER_SUCCESS,
  RESET_ALL,
} from "../../constants/ActionTypes";

import { utils } from "@mb";

const submitResetAuthInfo = () => (dispatch) => {
  dispatch({ type: RESET_AUTH_DATA });
};

const submitLogin = ({ email, password }) => (dispatch) => {
  dispatch(showAuthLoader());
  dispatch({ type: FETCH_START });

  dispatch({ type: FETCH_SUCCESS });
  /*dispatch({ type: USER_TOKEN_SET, payload: authInfo.token });
  dispatch({ type: USER_DATA, payload: authInfo.basicProfile });*/

  dispatch(hideAuthLoader());
};

const showAuthLoader = () => {
  return {
    type: ON_SHOW_LOADER,
  };
};

const hideAuthLoader = () => {
  return {
    type: ON_HIDE_LOADER,
  };
};

const userSignOut = () => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    // authService.signOut();
    setTimeout(() => {
      dispatch({ type: FETCH_SUCCESS });
      dispatch({ type: SIGNOUT_USER_SUCCESS });
      dispatch({ type: RESET_ALL });
    }, 2000);
  };
};
export { submitResetAuthInfo, submitLogin, userSignOut };
