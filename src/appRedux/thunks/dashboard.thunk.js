import * as common from "../actions/Common";
import * as Actions from "../actions/";
import dashboardSvc from "appServices/dashboardService";

export {
  getBasicProfile,
  getEvents,
  /*getRecentActivities,
  getIntroInfo,
  submitIntroWatched,*/
  getNotifications,
  getTimetableContent,
};

const getBasicProfile = () => async (dispatch) => {
  dispatch(common.fetchStart(Actions.DB_BASIC_PROFILE_LOADING));
  dashboardSvc
    .getBasicProfile()
    .then((basicProfile) => {
      return dispatch({
        type: Actions.DB_BASIC_PROFILE_SUCCESS,
        basicProfile,
      });
    })

    .catch((error) => {
      debugger;
      console.error(`Error****:`, error);
      dispatch(common.fetchError(error));
    });
};

const getEvents = (fromDate, toDate) => async (dispatch) => {
  dispatch(common.fetchStart(Actions.DB_EVENT_LIST_LOADING));
  dashboardSvc
    .getEventList(fromDate, toDate)
    .then((eventList) => {
      return dispatch({
        type: Actions.DB_EVENT_LIST_SUCCESS,
        eventList,
      });
    })
    .catch((error) => {
      debugger;
      console.error(`Error****:`, error);
      dispatch(common.fetchError(error));
    });
};

const getNotifications=filter => async (dispatch) => {
  try {
    filter.notificationTypeId = 1;
    dispatch(common.fetchStart(Actions.DB_NOTIFICATION_LIST_LOADING));

    const result = await dashboardSvc.getNotifications(filter);
    return dispatch(
      common.fetchSuccessWithData(
        Actions.DB_NOTIFICATION_LIST_SUCCESS,
        result
      )
    );
  } catch (error) {
    debugger;
    return dispatch(
      common.fetchError(error, Actions.DB_NOTIFICATION_LIST_ERROR)
    );
  }
}
const getTimetableContent=filter => async (dispatch) => {
  try {
    filter.notificationTypeId = 2;
    dispatch(common.fetchStart(Actions.DB_TIMETABLE_CONTENT_LOADING));

    const result = await dashboardSvc.getNotifications(filter);
    return dispatch(
      common.fetchSuccessWithData(
        Actions.DB_TIMETABLE_CONTENT_SUCCESS,
        result
      )
    );
  } catch (error) {
    debugger;
    return dispatch(
      common.fetchError(error, Actions.DB_TIMETABLE_CONTENT_ERROR)
    );
  }
}
/*
const recentActivity = [
  {
    id: 1,
    day: "Today",
    tasks: [
      {
        id: 1,
        name: "Hafiz Ahmed",
        title: "Hafiz Ahmed of class VI completed Hifz",
        avatar: "https://via.placeholder.com/150x150",
        imageList: [],
      },
      {
        id: 2,
        name: "Musa Khan",
        title: "Musa Khan presented on Tajweed",
        avatar: "https://via.placeholder.com/150x150",
        imageList: [],
      },
    ],
  },
  {
    id: 2,
    day: "Yesterday",
    tasks: [
      {
        id: 5,
        name: "Exams",
        title: "Exams started",
        avatar: "",
        imageList: [
          "https://via.placeholder.com/150x150",
          "https://via.placeholder.com/150x150",
          "https://via.placeholder.com/150x150",
        ],
      },
    ],
  },
];
function getRecentActivities() {
  return async (dispatch) => {
    return dispatch({
      type: Actions.DB_RECENT_ACTIVITIES,
      recentActivity: recentActivity,
    });
    //   dispatch(common.fetchStart());
    //   dashboardSvc
    //     .getEventList()
    //     .then(eventList => {
    //       dispatch(common.fetchSuccess);
    //       return dispatch({
    //         type: Actions.DB_EVENT_LIST_SUCCESS,
    //         eventList
    //       });
    //     })
    //     .catch(error => {
    //       debugger;
    //       console.error(`Error****:`, error);
    //       dispatch(common.fetchError(error));
    //     });
  };
}

function getIntroInfo(grNo) {
  return async (dispatch) => {
    try {
      dispatch(common.fetchStart(Actions.DB_INTRO_LOADING));

      const result = await dashboardSvc.getIntroUrl(grNo);
      return dispatch(
        common.fetchSuccessWithData(Actions.DB_INTRO_SUCCESS, result)
      );
    } catch (error) {
      debugger;
      return dispatch(common.fetchError(error, Actions.DB_INTRO_ERROR));
    }
  };
}

function submitIntroWatched(grNo) {
  return async (dispatch) => {
    try {
      dispatch(common.fetchStart(Actions.DB_INTRO_WATCHED_LOADING));

      const result = await dashboardSvc.submitIntroWatched(grNo);
      return dispatch(
        common.fetchSuccessWithData(Actions.DB_INTRO_WATCHED_SUCCESS, result)
      );
    } catch (error) {
      debugger;
      return dispatch(common.fetchError(error, Actions.DB_INTRO_WATCHED_ERROR));
    }
  };
}
*/