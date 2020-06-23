import { combineReducers } from "redux";
import inputSearchReducer from "../reducers/inputSearchReducer";
import eventBookingReducer from "../reducers/eventBookingReducer";

export default combineReducers({
  inputSearchReducer,
  eventBookingReducer,
});
