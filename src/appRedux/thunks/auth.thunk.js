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
} from "../../constants/ActionTypes";

import jwtService from "appServices/jwtService";
import { utils } from "@mb";

const submitResetAuthInfo = () => (dispatch) => {
  dispatch({ type: RESET_AUTH_DATA });
};

const submitLogin = ({ email, password }) => (dispatch) => {
  dispatch(showAuthLoader());
  dispatch({ type: FETCH_START });

  jwtService
    .signInWithEmailAndPassword(email, password)
    .then((authInfo) => {
      if (!utils.isEmpty(authInfo)) {
        dispatch({ type: FETCH_SUCCESS });
        dispatch({ type: USER_TOKEN_SET, payload: authInfo.token });
        dispatch({ type: USER_DATA, payload: authInfo.basicProfile });
      } else {
        dispatch(
          common.fetchError(
            { failed: true, message: "Sign in error, please try again." },
            USER_TOKEN_FAILED
          )
        );
      }
      dispatch(hideAuthLoader());
    })
    .catch((error) => {
      debugger;
      console.error(`Error****:`, error);

      if (error && error.loginRestrictionReason) {
        dispatch(
          common.fetchError(
            { failed: true, message: error.loginRestrictionReason },
            USER_TOKEN_FAILED
          )
        );
      } else {
        dispatch(
          common.fetchError(
            { failed: true, message: "Sign in error, please try again." },
            USER_TOKEN_FAILED
          )
        );
      }

      dispatch(hideAuthLoader());

      return dispatch({
        type: FETCH_ERROR,
        payload: error,
      });
    });
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

const submitChangePassword = ({ currentPassword, password }) => async (
  dispatch
) => {
  try {
    dispatch(common.fetchStart());
    jwtService
      .changePassword(currentPassword, password)
      .then((changedPasswordInfo) => {
        if (changedPasswordInfo.isValid) {
          dispatch(common.fetchSuccess());
        } else {
          dispatch(common.fetchError(changedPasswordInfo.message));
        }
        dispatch({ type: PASSWORD_CHANGED, payload: changedPasswordInfo });
      })
      .catch((error) => {
        debugger;
        console.error(`Error****:`, error);
        return dispatch(common.fetchError(error));
      });
  } catch (error) {
    debugger;
    return dispatch(common.fetchError(error));
  }
};

const submitForgotPassword = ({ grNo, phone }) => async (dispatch) => {
  try {
    dispatch(common.fetchStart());
    jwtService
      .forgotPassword(grNo, phone)
      .then((forgotPasswordInfo) => {
        if (forgotPasswordInfo.isValid) {
          dispatch(common.fetchSuccess());
        } else {
          dispatch(
            common.fetchError(forgotPasswordInfo.message, PASSWORD_RESET_FAILED)
          );
        }
        dispatch({ type: PASSWORD_RESET, payload: forgotPasswordInfo });
      })
      .catch((error) => {
        debugger;
        console.error(`Error****:`, error);
        return dispatch(common.fetchError(error));
      });
  } catch (error) {
    debugger;
    return dispatch(common.fetchError(error));
  }
};

const fetchWelcomeInfo = (grNo) => async (dispatch) => {
  jwtService
    .welcome(grNo)
    .then((welcomeInfo) => {
      if (!utils.isEmpty(welcomeInfo)) {
        dispatch(common.fetchSuccessWithData(WELCOME_SUCCESS, welcomeInfo));
      } else {
        dispatch(
          common.fetchError(
            {
              failed: true,
              message: "Unable to verify user, please contact Administrator.",
            },
            WELCOME_ERROR
          )
        );
      }
    })
    .catch((error) => {
      debugger;
      console.error(`Error****:`, error);

      return dispatch({
        type: WELCOME_ERROR,
        payload: { failed: true, error },
      });
    });
};

const resetWelcomeErroInfo = () => async (dispatch) =>
  dispatch(common.fetchSuccess(WELCOME_ERROR_RESET));

export {
  submitChangePassword,
  submitResetAuthInfo,
  submitLogin,
  submitForgotPassword,
  fetchWelcomeInfo,
  resetWelcomeErroInfo,
};
