import moment from "moment";
import { utils } from "..";

const formats = {
  DateMonthYear2: "DD/MM/YY",
  DateMonthYear4: "DD/MM/YYYY",
  MonthDateYear2: "MM/DD/YY",
  MonthDateYear4: "MM/DD/YYYY",
  MonthYear: "MMM-YY",
  DateTime: "DD/MM/YY, h:mm A",
};

const dateFormatList = [formats.DateMonthYear4, formats.DateMonthYear2];

const sessionStartEndDates = (date) => {
  const whichHalf = ~~(moment(date).month() / 6);
  const start = moment(date)
    .subtract(whichHalf == 0 ? 1 : 0, "y")
    .startOf("year")
    .add(180, "day")
    .startOf("month");
  const end = moment(date)
    .add(whichHalf, "y")
    .startOf("year")
    .add(150, "day")
    .endOf("month");
  return { start, end };
};
const sessionDates = {
  current: sessionStartEndDates(),
  lastSession: sessionStartEndDates(moment().startOf("year")),
  beforeLastSession: sessionStartEndDates(
    moment()
      .subtract(1, "year")
      .startOf("year")
  ),
};
const toShortDateString = (date) => {
  if (utils.isEmpty(date)) return "";
  let d = new moment(date);
  return d.format(formats.DateMonthYear4);
};
const toShortDateTimeString = (date) => {
  if (utils.isEmpty(date)) return "";
  let d = new moment(date);
  return d.format(formats.DateTime);
};

const toMomentDate = (dateString) =>
  utils.isEmpty(dateString) ? moment() : moment(dateString);

const toMomentCalendar = (date) => {
  if (utils.isEmpty(date)) return "Never";
  let d = new moment(date);
  return d.calendar(null, {
    sameDay: "[Today at] LT",
    nextDay: "[Tomorrow]",
    nextWeek: "dddd",
    lastDay: "[Yesterday at] LT",
    lastWeek: "[Last] ddd [at] LT",
    sameElse: "DD-MM-YY LT",
  });
};

const toMonthYearString = (date) =>
  utils.isEmpty(date) ? "" : new moment(date).format(formats.MonthYear);

const isPast = (date, from = moment(), granularity = "day") =>
  from.isAfter(date, granularity);

const isBetween = (date, before, after) =>
  moment(date).isBetween(before, after, "minute", "[]");

const toISOString = (date) => moment(date).toISOString(true);
const today = () => moment().startOf("day");
const yesterday = () =>
  moment()
    .subtract(1, "days")
    .startOf("day");

const sort = (array, field) =>
  array.sort((a, b) => new Date(a[field]) - new Date(b[field]));

const isLastSession = (date) =>
  moment(date).isBetween(
    sessionDates.lastSession.start,
    sessionDates.lastSession.end
  );

const isBeforeLastSession = (date) =>
  moment(date).isBetween(
    sessionDates.beforeLastSession.start,
    sessionDates.beforeLastSession.end
  );
const isCurrentSession = (date) =>
  moment(date).isBetween(sessionDates.current.start, sessionDates.current.end);

export const DateTimeHelper = {
  formats,
  dateFormatList,
  toShortDateString,
  toShortDateTimeString,
  toMomentDate,
  toMomentCalendar,
  toMonthYearString,
  isPast,
  isBetween,
  toISOString,
  today,
  yesterday,
  sort,
  isLastSession,
  isBeforeLastSession,
  isCurrentSession,
};
//const instance = new DateTimeHelper();

//export default instance;
