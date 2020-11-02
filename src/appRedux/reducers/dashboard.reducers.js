import * as Actions from "../actions";

const INIT_STATE = {
  basicProfile: null,
  basicProfileLoading: false,
  eventList: [],
  eventListLoading: false,
  recentActivities: [],
  recentActivitiesLoading: false,
  introLoading: false,
  introInfo: null,
  notificationList: [],
  notificationListLoading: false,
  shouldFetchNotifications: true,
  shouldFetchTimetable:true,
  timeTableLoading: false,
  timeTableContent: null,
  error: {
    code: null,
    message: null,
  },
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case Actions.DB_BASIC_PROFILE_LOADING: {
      return {
        ...state,
        basicProfileLoading: true,
        error: null,
      };
    }
    case Actions.DB_INTRO_WATCHED_LOADING:
    case Actions.DB_INTRO_LOADING: {
      return {
        ...state,
        introLoading: true,
        error: null,
      };
    }
    case Actions.DB_EVENT_LIST_LOADING: {
      return {
        ...state,
        eventListLoading: true,
        error: null,
      };
    }
    case Actions.DB_NOTIFICATION_LIST_LOADING: {
      return {
        ...state,
        notificationListLoading: true,
        shouldFetchNotifications: false,
        error: null,
      };
    }
    case Actions.DB_TIMETABLE_CONTENT_LOADING: {
      return {
        ...state,
        shouldFetchTimetable:false,
        timeTableLoading: true,
        timeTableContent: null,
        error: null,
      };
    }
    case Actions.DB_RECENT_LOADING: {
      return {
        ...state,
        recentActivitiesLoading: true,
        error: null,
      };
    }
    case Actions.DB_BASIC_PROFILE_SUCCESS: {
      return {
        ...state,
        basicProfileLoading: false,
        basicProfile: {
          ...state.basicProfile,
          ...action.basicProfile,
        },
        error: null,
      };
    }
    case Actions.DB_INTRO_WATCHED_SUCCESS:
    case Actions.DB_INTRO_SUCCESS: {
      return {
        ...state,
        introLoading: false,
        introInfo: action.payload,
        error: null,
      };
    }
    case Actions.DB_EVENT_LIST_SUCCESS: {
      return {
        ...state,
        eventListLoading: false,
        eventList: [
          //...state.eventList,
          ...action.eventList,
        ],
        error: null,
      };
    }
    case Actions.DB_NOTIFICATION_LIST_SUCCESS: {
      return {
        ...state,
        notificationListLoading: false,
        notificationList: [...action.payload],
        error: null,
      };
    }
    case Actions.DB_TIMETABLE_CONTENT_SUCCESS: {
      return {
        ...state,
        timeTableLoading: false,
        timeTableContent: action.payload,
        error: null,
      };
    }
    case Actions.DB_RECENT_ACTIVITIES: {
      return {
        ...state,
        recentActivitiesLoading: false,
        recentActivities: [
          //...state.eventList,
          ...action.recentActivities,
        ],
        error: null,
      };
    }
    case Actions.DB_BASIC_PROFILE_ERROR: {
      return {
        ...state,
        basicProfile: null,
        basicProfileLoading: false,
        error: {
          ...state.error,
          code: action.payload.code,
          message: action.payload.message,
        },
      };
    }
    case Actions.DB_TIMETABLE_CONTENT_ERROR: {
      return {
        ...state,
        timeTableLoading: false,
        timeTableContent: null,
        error: {
          ...state.error,
          code: action.payload.code,
          message: action.payload.message,
        },
      };
    }
    case Actions.DB_INTRO_WATCHED_ERROR:
    case Actions.DB_INTRO_ERROR: {
      return {
        ...state,
        introInfo: null,
        introLoading: false,
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
        basicProfileLoading: false,
        eventListLoading: false,
        notificationListLoading: false,
        timeTableLoading: false,
        recentActivitiesLoading: false,
        introLoading: false,
      };
    }
  }
};
