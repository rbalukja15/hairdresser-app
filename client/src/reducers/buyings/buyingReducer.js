//Reducer is where our actual state is going to go
//Here we check our actions that are dispatched
//Data from server are fetched and we add it to our component using the reducer

import {
    GET_BUYINGS,
    ADD_BUYING,
    DELETE_BUYING,
    BUYINGS_LOADING,
    GET_BUYING_BY_ID,
    UPDATE_BUYING,
} from '../../actions/types'

const initialState = {
    buyings: [],
    loading: false, //Used when we fetch the data
}

export default function (state = initialState, action) {
    //decide what to do
    switch (action.type) {
        //Check for get action
        case GET_BUYINGS:
            return {
                ...state, //Get the copy of the state
                buyings: action.payload, //Add the values into the buyings array
                loading: false, //After getting the data, send the loading back to false
            }

        //Check for get by id action
        case GET_BUYING_BY_ID:
            return {
                ...state, //Get the copy of the state
                buying: action.payload, //Add the values into the buyings array
                loading: false, //After getting the data, send the loading back to false
            }

        //Check for delete action
        case DELETE_BUYING:
            return {
                ...state,
                buyings: state.buyings.filter((buying) => buying._id !== action.payload),
            }

        //Check for the add action
        case ADD_BUYING:
            return {
                //Why we use ...state is that we cannot directly change the state
                //We make a copy of it and add to it
                ...state,
                buyings: [action.payload, ...state.buyings],
            }

        //Check for the edit action
        case UPDATE_BUYING:
            return {
                //Why we use ...state is that we cannot directly change the state
                //We make a copy of it and add to it
                ...state,
                buyings: [action.payload, ...state.buyings],
            }

        //Check if we are fetching data
        case BUYINGS_LOADING:
            return {
                //Why we use ...state is that we cannot directly change the state
                //We make a copy of it and add to it
                ...state,
                loading: true, //If yes, change the state of loading
            }

        default:
            return state
    }
}
