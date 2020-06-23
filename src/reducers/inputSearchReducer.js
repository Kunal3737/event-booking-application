const initialState = {
  eventData: [],
  eventDataError: "",
};

const inputSearchReducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case "EVENT_RESPONSE":
      return {
        ...state,
        eventData: action.payload,
      };
    case "EVENT_RESPONSE_ERROR":
      return {
        ...state,
        eventDataError: action.payload,
      };
    default:
      return state;
  }
};

export default inputSearchReducer;
