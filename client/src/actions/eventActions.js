//Define buying actions
import { GET_EVENTS, ADD_EVENT, DELETE_EVENT, EVENTS_LOADING, GET_EVENT_BY_ID, UPDATE_EVENT } from './types'

//Http Client
import axios from 'axios'

//Import the token helper action to be able to add buyings
import { tokenConfig } from './authActions'

//To be able to return errors
import {
    //  errors,
    returnErrors,
} from './errorActions'

//Action to get the buyings into the component
export const getEvents = () => (dispatch) => {
    dispatch(setEventsLoading()) //Change the state of the loading
    axios
        .get('/api/events')
        .then((res) =>
            dispatch({
                type: GET_EVENTS, //use the get action
                payload: res.data, //Get the data from response and send them as a payload
            }),
        )
        .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)))
}

//Action to get an event by id into the components
export const getEventById = (id) => (dispatch) => {
    axios
        .get(`/api/events/${id}`) //Send the id as defined in our back end api
        .then((res) =>
            dispatch({
                type: GET_EVENT_BY_ID, //Define the action
                payload: id, //Send the id as a payload
            }),
        )
        .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)))
}

//Action to add a buying
export const addEvent = (event) => (dispatch, getState) => {
    //console.log(buying);
    axios
        .post('/api/events', event, tokenConfig(getState)) //Post the data from the modal into the api
        .then((res) =>
            dispatch({
                type: ADD_EVENT, //Define the action
                payload: res.data, //Send as a payload
            }),
        )
        .catch((err) => console.log(err))
}

//Action to delete a buying
export const deleteEvent = (id) => (dispatch, getState) => {
    axios
        .delete(`/api/events/${id}`, tokenConfig(getState)) //Send the id as defined in our back end api
        .then((res) =>
            dispatch({
                type: DELETE_EVENT, //Define the action
                payload: id, //Send the id as a payload
            }),
        )
        .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)))
}

//Action to update an event
export const updateEvent = (event) => (dispatch, getState) => {
    axios
        .put(`/api/events/${event._id}`, event, tokenConfig(getState))
        .then((res) =>
            dispatch({
                type: UPDATE_EVENT,
                payload: res.data,
            }),
        )
        .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)))
}

//Dispatch buyings Loading
export const setEventsLoading = () => {
    return {
        type: EVENTS_LOADING,
    }
}
