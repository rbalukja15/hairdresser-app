//Define item actions
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING, GET_ITEM_BY_ID, UPDATE_ITEM } from "./types";
//Http Client
import axios from "axios";
//Import the token helper action to be able to add items
import { tokenConfig } from "./authActions";
//To be able to return errors
import { 
    // errors, 
    returnErrors } from "./errorActions";

//Action to get the items into the component
export const getItems = () => dispatch => {
  dispatch(setItemsLoading()); //Change the state of the loading
  axios
    .get("/api/items")
    .then(res =>
      dispatch({
        type: GET_ITEMS, //use the get action
        payload: res.data //Get the data from response and send them as a payload
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

//Action to get an item by id into the components
export const getItemById = id => dispatch => {
  axios
    .get(`/api/items/${id}`) //Send the id as defined in our back end api
    .then(res =>
      dispatch({
        type: GET_ITEM_BY_ID, //Define the action
        payload: id //Send the id as a payload
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
    
};

//Action to add an item
export const addItem = item => (dispatch, getState) => {
  axios
    .post("/api/items", item, tokenConfig(getState)) //Post the data from the modal into the api
    .then(res =>
      dispatch({
        type: ADD_ITEM, //Define the action
        payload: res.data //Send as a payload
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

//Action to delete an item
export const deleteItem = id => (dispatch, getState) => {
  axios
    .delete(`/api/items/${id}`, tokenConfig(getState)) //Send the id as defined in our back end api
    .then(res =>
      dispatch({
        type: DELETE_ITEM, //Define the action
        payload: id //Send the id as a payload
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

//Action to update an item
export const updateItem = item => (dispatch, getState) => {
  axios
    .put(`/api/items/${item._id}`, item, tokenConfig(getState))
    .then(res => 
      dispatch({
        type: UPDATE_ITEM,
        payload: res.data
      })
    )
    .catch(err => 
      dispatch(returnErrors(err.response.data, err.response.status))
    );
}

//Dispatch Items Loading
export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  };
};
