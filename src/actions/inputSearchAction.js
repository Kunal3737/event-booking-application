const axios = require("axios").default;

const inputSearchAction = () => {
  //   console.log(searchedInput);
  return (dispatch) => {
    axios
      .get(`https://event-booking-applicatio-f036d.firebaseio.com/events.json`)
      .then((response) => {
        // console.log("RESPONSE", response.data);
        response.data &&
          dispatch({
            type: "EVENT_RESPONSE",
            payload: response.data,
          });
      })
      .catch((error) => {
        dispatch({
          type: "EVENT_RESPONSE_ERROR",
          payload: error.message,
        });
      });
  };
};

export default inputSearchAction;
