//Reducer is where our actual state is going to go
//Here we check our actions that are dispatched
//Data from server are fetched and we add it to our component using the reducer

import {
  GET_EVENTS,
  ADD_EVENT,
  DELETE_EVENT,
  EVENTS_LOADING,
  GET_EVENT_BY_ID,
  UPDATE_EVENT
} from "../../actions/types";

const initialState = {
  events: [],
  loading: false //Used when we fetch the data
};

export default function(state = initialState, action) {
  //decide what to do
  switch (action.type) {
    //Check for get action
    case GET_EVENTS:
      return {
        ...state, //Get the copy of the state
        events: action.payload, //Add the values into the buyings array
        loading: false //After getting the data, send the loading back to false
      };

    //Check for get by id action
    case GET_EVENT_BY_ID:
      return {
        ...state, //Get the copy of the state
        event: action.payload, //Add the values into the buyings array
        loading: false //After getting the data, send the loading back to false
      };

    //Check for delete action
    case DELETE_EVENT:
      return {
        ...state,
        events: state.events.filter(event => event._id !== action.payload)
      };

    //Check for the add action
    case ADD_EVENT:
      return {
        //Why we use ...state is that we cannot directly change the state
        //We make a copy of it and add to it
        ...state,
        events: [action.payload, ...state.events]
      };

    //Check for the edit action
    case UPDATE_EVENT:
      return {
        //Why we use ...state is that we cannot directly change the state
        //We make a copy of it and add to it
        ...state,
        events: [action.payload, ...state.events]
      };

    //Check if we are fetching data
    case EVENTS_LOADING:
      return {
        //Why we use ...state is that we cannot directly change the state
        //We make a copy of it and add to it
        ...state,
        loading: true //If yes, change the state of loading
      };

    default:
      return state;
  }
}
