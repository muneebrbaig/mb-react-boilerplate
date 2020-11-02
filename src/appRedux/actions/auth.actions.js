import {
  SHOW_MESSAGE,
  HIDE_MESSAGE,
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  INIT_URL,
  SIGNOUT_USER_SUCCESS,
  USER_DATA,
  RESET_ALL,
  SIGNUP_USER_SUCCESS,
} from "../../constants/ActionTypes";
import jwtService from "appServices/jwtService";

export const LOGIN_ERROR = "LOGIN_ERROR";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const ALLOW_SIGNIN = "ALLOW_SIGNIN";

export const setInitUrl = (url) => {
  return {
    type: INIT_URL,
    payload: url,
  };
};

export const getUser = () => {
  // return dispatch => dispatch({type:FETCH_ERROR, payload:null});
  return (dispatch) => {
    //dispatch({ type: FETCH_START });
    jwtService
      .verifyLoggedInUser()
      .then((authUser) => {
        //dispatch({ type: FETCH_SUCCESS });
        dispatch({ type: USER_DATA, payload: authUser });
      })
      .catch((error) => {
        debugger;
        console.error(`Error****:`, error);
        //dispatch(hideAuthLoader());
        return dispatch({
          type: FETCH_ERROR,
          payload: error,
        });
      });
  };
};
export const userSignUp = (newOnlineRegistration) => {
  return (dispatch) => {
    jwtService
      .registerOnline(newOnlineRegistration)
      .then((data) => {
        dispatch({ type: SIGNUP_USER_SUCCESS, payload: data });
      })
      .catch((error) => {
        debugger;
        console.error(`Error****:`, error);
        //dispatch(hideAuthLoader());
        return dispatch({
          type: FETCH_ERROR,
          payload: error,
        });
      });
  };
};
export const showAuthMessage = (message) => {
  return {
    type: SHOW_MESSAGE,
    payload: message,
  };
};

export const hideMessage = () => {
  return {
    type: HIDE_MESSAGE,
  };
};

export const userSignOut = () => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    jwtService.signOut();
    setTimeout(() => {
      dispatch({ type: FETCH_SUCCESS });
      dispatch({ type: SIGNOUT_USER_SUCCESS });
      dispatch({ type: RESET_ALL });
    }, 2000);
  };
};
