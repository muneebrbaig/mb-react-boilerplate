import * as Actions from "../actions/";

const INIT_STATE = {
  isLoading: false,
  alertMessage: "",
  showMessage: false,
  profileLoading: false,
  studentProfile: null,
  sessionList: [],
  error: {
    code: null,
    message: null,
  },
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case Actions.PROFILE_LOADING: {
      return {
        ...state,
        profileLoading: true,
        error: null,
      };
    }
    case Actions.PROFILE_SUCCESS: {
      return {
        ...state,
        profileLoading: false,
        studentProfile: action.payload,
        error: null,
        success: true,
      };
    }
    case Actions.PROFILE_ERROR: {
      return {
        profileLoading: false,
        success: false,
        studentProfile: null,
        error: {
          ...state.error,
          code: action.payload.code,
          message: action.payload.message,
        },
      };
    }
    case Actions.PROFILE_SESSION_LIST_LOADING: {
      return {
        ...state,
        isLoading: true,
        sessionList: [],
        error: null,
      };
    }
    case Actions.PROFILE_SESSION_LIST_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        sessionList: action.payload,
        error: null,
        success: true,
      };
    }
    case Actions.PROFILE_SESSION_LIST_ERROR: {
      return {
        isLoading: false,
        success: false,
        sessionList: [],
        error: {
          ...state.error,
          code: action.payload.code,
          message: action.payload.message,
        },
      };
    }
    default: {
      return {
        ...state,
        isLoading: false,
        profileLoading: false,
      };
    }
  }
};
