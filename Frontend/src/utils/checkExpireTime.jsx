import moment from "moment"
export const checkDateTime = (datetime) => moment(datetime, import.meta.env.VITE_FORMAT_TIME).isSameOrAfter(new Date().toDateString())
