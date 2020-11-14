//Reducer is where our actual state is going to go
//Here we check our actions that are dispatched
//Data from server are fetched and we add it to our component using the reducer

import {
    GET_EMPLOYEES,
    ADD_EMPLOYEE,
    DELETE_EMPLOYEE,
    EMPLOYEES_LOADING,
    GET_EMPLOYEE_BY_ID,
    UPDATE_EMPLOYEE,
} from '../../actions/types'

const initialState = {
    employees: [],
    loading: false, //Used when we fetch the data
}

export default function (state = initialState, action) {
    //decide what to do
    switch (action.type) {
        //Check for get action
        case GET_EMPLOYEES:
            return {
                ...state, //Get the copy of the state
                employees: action.payload, //Add the values into the employees array
                loading: false, //After getting the data, send the loading back to false
            }

        //Check for get by id action
        case GET_EMPLOYEE_BY_ID:
            return {
                ...state,
                employee: action.payload,
            }
        //Check for delete action
        case DELETE_EMPLOYEE:
            return {
                ...state,
                employees: state.employees.filter((employee) => employee._id !== action.payload),
            }

        //Check for the employee action
        case ADD_EMPLOYEE:
            return {
                //Why we use ...state is that we cannot directly change the state
                //We make a copy of it and add to it
                ...state,
                employees: [action.payload, ...state.employees],
            }

        //Check for the edit action
        case UPDATE_EMPLOYEE:
            return {
                //Why we use ...state is that we cannot directly change the state
                //We make a copy of it and add to it
                ...state,
                employees: [action.payload, ...state.employees],
            }

        //Check if we are fetching data
        case EMPLOYEES_LOADING:
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
