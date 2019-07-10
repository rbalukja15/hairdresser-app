//Reducer is where our actual state is going to go
//Here we check our actions that are dispatched
//Data from server are fetched and we add it to our component using the reducer

import {
  GET_CLIENTS,
  ADD_CLIENT,
  DELETE_CLIENT,
  CLIENTS_LOADING,
  GET_CLIENT_BY_ID,
  UPDATE_CLIENT
} from "../../actions/types";

const initialState = {
  clients: [],
  loading: false //Used when we fetch the data
};

export default function(state = initialState, action) {
  //decide what to do
  switch (action.type) {
    //Check for get action
    case GET_CLIENTS:
      return {
        ...state, //Get the copy of the state
        clients: action.payload, //Add the values into the items array
        loading: false //After getting the data, send the loading back to false
      };

    case GET_CLIENT_BY_ID:
      return {
        ...state,
        client: action.payload,
        loading: false
      }

    //Check for delete action
    case DELETE_CLIENT:
      return {
        ...state,
        clients: state.clients.filter(client => client._id !== action.payload)
      };

    //Check for the add action
    case ADD_CLIENT:
      return {
        //Why we use ...state is that we cannot directly change the state
        //We make a copy of it and add to it
        ...state,
        clients: [action.payload, ...state.clients]
      };

    //Check for update action
    case UPDATE_CLIENT:
      return {
        ...state,
        clients: [action.payload, ...state.clients]
      }

    //Check if we are fetching data
    case CLIENTS_LOADING:
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
