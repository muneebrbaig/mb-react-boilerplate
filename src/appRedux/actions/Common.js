import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  HIDE_MESSAGE,
  SHOW_MESSAGE,
} from "../../constants/ActionTypes";

export const fetchStart = (startType = FETCH_START) => {
  return {
    type: startType,
  };
};

export const fetchSuccess = (successType = FETCH_SUCCESS) => {
  return {
    type: successType,
  };
};

export const fetchSuccessWithData = (successType = FETCH_SUCCESS, payload) => {
  return {
    type: successType,
    payload,
  };
};

export const fetchError = (error, errorType = FETCH_ERROR) => {
  return {
    type: errorType,
    payload: error,
  };
};

export const showMessage = (message) => {
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

export const thunkHelper = async (
  dispatch,
  loading,
  scucess,
  error,
  delegate,
  data
) => {
  try {
    dispatch(fetchStart(loading));

    const result = await delegate(data);
    return dispatch(fetchSuccessWithData(scucess, result));
  } catch (ex) {
    debugger;
    return dispatch(fetchError(ex, error));
  }
};
