import {
  INIT_URL,
  ON_HIDE_LOADER,
  ON_SHOW_LOADER,
  SHOW_MESSAGE,
  HIDE_MESSAGE,
  SIGNOUT_USER_SUCCESS,
  USER_DATA,
  USER_TOKEN_SET,
  PASSWORD_CHANGED,
  USER_TOKEN_FAILED,
  PASSWORD_RESET,
  PASSWORD_RESET_FAILED,
  RESET_AUTH_DATA,
  SIGNUP_USER_SUCCESS,
  WELCOME_SUCCESS,
  WELCOME_ERROR,
  WELCOME_ERROR_RESET,
  //USER_IMAGE_SET
} from "constants/ActionTypes";
import { storage } from "@mb";
import { ADMIN_LOGIN_ERROR, ADMIN_LOGIN_SUCCESS } from "../actions";
const INIT_STATE = {
  loader: false,
  alertMessage: "",
  showMessage: false,
  token: storage.getObject("token"),
  tokenVerified: false,
  signInError: { failed: true },
  initURL: "",
  authUser: storage.getObject("authUser"),
  userImage: storage.getObject("imageLink"),
  passwordChangedInfo: { isValid: false },
  passwordResetInfo: null,
  userRegInfo: null,
  continueUrl: null,
  welcomeError: { failed: false },
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case INIT_URL: {
      return { ...state, initURL: action.payload };
    }

    case SIGNOUT_USER_SUCCESS: {
      return {
        //...state,
        ...INIT_STATE,
        token: null,
        tokenVerified: false,
        authUser: null,
        userImage: null,
      };
    }

    case RESET_AUTH_DATA: {
      return {
        ...state,
        alertMessage: "",
        signInError: null,
        passwordChangedInfo: null,
        passwordResetInfo: null,
        tokenVerified: false,
      };
    }

    case USER_DATA: {
      return {
        ...state,
        authUser: action.payload,
        userImage: storage.getObject("imageLink"),
        tokenVerified: true,
      };
    }

    case ADMIN_LOGIN_SUCCESS:
    case USER_TOKEN_SET: {
      return {
        ...state,
        token: action.payload,
        tokenVerified: true,
      };
    }
    case ADMIN_LOGIN_ERROR:
    case USER_TOKEN_FAILED: {
      return {
        ...state,
        token: null,
        signInError: action.payload,
        tokenVerified: false,
        showMessage: true,
      };
    }

    case WELCOME_SUCCESS: {
      return {
        ...state,
        token: null,
        tokenVerified: false,
        continueUrl: action.payload.portalLink,
      };
    }
    case WELCOME_ERROR: {
      return {
        ...state,
        token: null,
        tokenVerified: false,
        continueUrl: null,
        welcomeError: action.payload,
      };
    }
    case WELCOME_ERROR_RESET: {
      return {
        ...state,
        token: null,
        tokenVerified: false,
        continueUrl: null,
        welcomeError: { failed: false },
      };
    }
    case PASSWORD_CHANGED: {
      return {
        ...state,
        passwordChangedInfo: action.payload,
      };
    }
    case PASSWORD_RESET: {
      return {
        ...state,
        passwordResetInfo: action.payload,
      };
    }
    case PASSWORD_RESET_FAILED: {
      return {
        ...state,
        passwordResetInfo: action.payload,
      };
    }

    case SHOW_MESSAGE: {
      return {
        ...state,
        alertMessage: action.payload,
        showMessage: true,
        loader: false,
      };
    }
    case HIDE_MESSAGE: {
      return {
        ...state,
        alertMessage: "",
        showMessage: false,
        loader: false,
      };
    }
    case ON_SHOW_LOADER: {
      return {
        ...state,
        loader: true,
      };
    }
    case ON_HIDE_LOADER: {
      return {
        ...state,
        loader: false,
      };
    }

    case SIGNUP_USER_SUCCESS: {
      return {
        ...state,
        userRegInfo: action.payload,
      };
    }
    default:
      return state;
  }
};
