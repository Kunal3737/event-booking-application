const initialState = {
  eventbookingData: [],
  eventbookingDataError: "",
};

const eventBookingReducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case "EVENT_BOOKING_RESPONSE":
      return {
        ...state,
        eventbookingData: action.payload,
      };
    case "EVENT_BOOKING_RESPONSE_ERROR":
      return {
        ...state,
        eventbookingDataError: action.payload,
      };
    default:
      return state;
  }
};

export default eventBookingReducer;
