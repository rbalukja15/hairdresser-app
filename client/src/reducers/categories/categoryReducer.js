//Reducer is where our actual state is going to go
//Here we check our actions that are dispatched
//Data from server are fetched and we add it to our component using the reducer

import {
  GET_CATEGORIES,
  ADD_CATEGORY,
  DELETE_CATEGORY,
  CATEGORIES_LOADING,
  GET_CATEGORY_BY_ID,
  UPDATE_CATEGORY
} from "../../actions/types";

const initialState = {
  categories: [],
  loading: false //Used when we fetch the data
};

export default function(state = initialState, action) {
  //decide what to do
  switch (action.type) {
    //Check for get action
    case GET_CATEGORIES:
      return {
        ...state, //Get the copy of the state
        categories: action.payload, //Add the values into the items array
        loading: false //After getting the data, send the loading back to false
      };

    //Check for get by id action
    case GET_CATEGORY_BY_ID:
      return {
        ...state, //Get the copy of the state
        category: action.payload, //Add the values into the items array
        loading: false //After getting the data, send the loading back to false
      };

    //Check for delete action
    case DELETE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter(
          category => category._id !== action.payload
        )
      };

    //Check for the add action
    case ADD_CATEGORY:
      return {
        //Why we use ...state is that we cannot directly change the state
        //We make a copy of it and add to it
        ...state,
        categories: [action.payload, ...state.categories]
      };

    //Check for the item action
    case UPDATE_CATEGORY:
      return {
        //Why we use ...state is that we cannot directly change the state
        //We make a copy of it and add to it
        ...state,
        categories: [action.payload, ...state.categories]
      };

    //Check if we are fetching data
    case CATEGORIES_LOADING:
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
