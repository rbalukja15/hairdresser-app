//Define item actions
import { GET_CLIENTS, ADD_CLIENT, DELETE_CLIENT, CLIENTS_LOADING, GET_CLIENT_BY_ID, UPDATE_CLIENT } from './types'

//Http Client
import axios from 'axios'

//Import the token helper action to be able to add items
import { tokenConfig } from './authActions'

//To be able to return errors
import {
    // errors,
    returnErrors,
} from './errorActions'

//Action to get the items into the component
export const getClients = () => async (dispatch) => {
    dispatch(setClientsLoading()) //Change the state of the loading
    try {
        return await axios.get('/api/clients').then((response) => {
            dispatch({
                type: GET_CLIENTS, //use the get action
                payload: response.data, //Get the data from response and send them as a payload
            })
            return response.data
        })
    } catch (error) {
        dispatch(returnErrors(error.response.data, error.response.status))
    }
}

//Action to get a client by id into the components
export const getClientById = (id) => (dispatch) => {
    axios
        .get(`/api/clients/${id}`) //Send the id as defined in our back end api
        .then((res) =>
            dispatch({
                type: GET_CLIENT_BY_ID, //Define the action
                payload: id, //Send the id as a payload
            }),
        )
        .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)))
}

//Action to add a client
export const addClient = (client) => (dispatch, getState) => {
    axios
        .post('/api/clients', client, tokenConfig(getState)) //Post the data from the modal into the api
        .then((res) =>
            dispatch({
                type: ADD_CLIENT, //Define the action
                payload: res.data, //Send as a payload
            }),
        )
        .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)))
}

//Action to delete an item
export const deleteClient = (id) => (dispatch, getState) => {
    axios
        .delete(`/api/clients/${id}`, tokenConfig(getState)) //Send the id as defined in our back end api
        .then((res) =>
            dispatch({
                type: DELETE_CLIENT, //Define the action
                payload: id, //Send the id as a payload
            }),
        )
        .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)))
}

//Action to update a Client
export const updateClient = (client) => (dispatch, getState) => {
    axios
        .put(`/api/clients/${client._id}`, client, tokenConfig(getState))
        .then((res) =>
            dispatch({
                type: UPDATE_CLIENT,
                payload: res.data,
            }),
        )
        .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)))
}

//Dispatch Items Loading
export const setClientsLoading = () => {
    return {
        type: CLIENTS_LOADING,
    }
}
