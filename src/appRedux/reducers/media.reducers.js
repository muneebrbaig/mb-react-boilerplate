import * as Actions from "./../actions/media.actions";
const INIT_STATE = {
  isLoading: true,
  alertMessage: "",
  showMessage: false,
  mediaUploading: false,
  mediaInfo: null,
  error: {
    code: null,
    message: null,
  },
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case Actions.MEDIA_SAVING: {
      return {
        ...state,
        mediaUploading: true,
        mediaInfo: null,
        error: null,
      };
    }
    case Actions.MEDIA_SAVED: {
      return {
        ...state,
        mediaUploading: false,
        mediaInfo: action.payload,
        error: null,
      };
    }
    case Actions.MEDIA_SAVE_ERROR: {
      return {
        ...state,
        mediaUploading: false,
        mediaInfo: null,
        error: {
          ...state.error,
          code: action.payload.code,
          message: `Media upload failed, please verify the file conforms the requirements.`,
        },
      };
    }
    case Actions.MEDIA_RESET:
    default: {
      return {
        ...state,
        isLoading: false,
        mediaUploading: false,
        mediaInfo: null,
      };
    }
  }
};
