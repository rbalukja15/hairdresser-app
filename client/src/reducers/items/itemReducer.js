//Reducer is where our actual state is going to go
//Here we check our actions that are dispatched
//Data from server are fetched and we add it to our component using the reducer
 
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING, GET_ITEM_BY_ID, UPDATE_ITEM  } from '../../actions/types';

const initialState = {
  items: [],
  loading: false //Used when we fetch the data
}

export default function(state = initialState, action) {
  //decide what to do
  switch(action.type) {
    //Check for get action
    case GET_ITEMS:
      return {
        ...state, //Get the copy of the state
        items: action.payload, //Add the values into the items array
        loading: false //After getting the data, send the loading back to false
      }
    
    //Check for get by id action
    case GET_ITEM_BY_ID:
      return {
        ...state,
        item: action.payload
      }
    //Check for delete action
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item._id !== action.payload)
      }
    
    //Check for the item action
    case ADD_ITEM:
      return {
        //Why we use ...state is that we cannot directly change the state
        //We make a copy of it and add to it
        ...state,
        items: [action.payload, ...state.items]
      }

    //Check for the edit action
    case UPDATE_ITEM:
      return {
        //Why we use ...state is that we cannot directly change the state
        //We make a copy of it and add to it
        ...state,
        items: [action.payload, ...state.items]
      }

    //Check if we are fetching data
    case ITEMS_LOADING:
      return {
        //Why we use ...state is that we cannot directly change the state
        //We make a copy of it and add to it
        ...state,
        loading: true //If yes, change the state of loading
      }

    default:
      return state;
  }
}