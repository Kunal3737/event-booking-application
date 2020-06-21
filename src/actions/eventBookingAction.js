const axios = require("axios").default;

const eventBookingAction = (eventId) => {
  console.log(eventId);
  return (dispatch) => {
    axios
      .get(
        `https://event-booking-applicatio-f036d.firebaseio.com/events/${eventId}.json`
      )
      .then((response) => {
        console.log("RESPONSE", response.data);
        response.data && dispatch({
          type: "EVENT_BOOKING_RESPONSE",
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: "EVENT_BOOKING_RESPONSE_ERROR",
          payload: error.message,
        });
      });
  };
};

export default eventBookingAction;
