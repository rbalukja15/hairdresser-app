//Reducer is where our actual state is going to go
//Here we check our actions that are dispatched
//Data from server are fetched and we add it to our component using the reducer

import {
  GET_SALES,
  ADD_SALE,
  DELETE_SALE,
  SALES_LOADING,
  GET_SALE_BY_ID,
  UPDATE_SALE
} from "../../actions/types";

const initialState = {
  sales: [],
  loading: false //Used when we fetch the data
};

export default function(state = initialState, action) {
  //decide what to do
  switch (action.type) {
    //Check for get action
    case GET_SALES:
      return {
        ...state, //Get the copy of the state
        sales: action.payload, //Add the values into the items array
        loading: false //After getting the data, send the loading back to false
      };

    //Check for get by id action
    case GET_SALE_BY_ID:
      return {
        ...state,
        sale: action.payload
      };

    //Check for delete action
    case DELETE_SALE:
      return {
        ...state,
        sales: state.sales.filter(sale => sale._id !== action.payload)
      };

    //Check for the item action
    case ADD_SALE:
      return {
        //Why we use ...state is that we cannot directly change the state
        //We make a copy of it and add to it
        ...state,
        sales: [action.payload, ...state.sales]
      };

    //Check for the edit action
    case UPDATE_SALE:
      return {
        //Why we use ...state is that we cannot directly change the state
        //We make a copy of it and add to it
        ...state,
        sales: [action.payload, ...state.sales]
      };

    //Check if we are fetching data
    case SALES_LOADING:
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
