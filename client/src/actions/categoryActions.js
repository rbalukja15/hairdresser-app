//Define item actions
import {
  GET_CATEGORIES,
  ADD_CATEGORY,
  DELETE_CATEGORY,
  CATEGORIES_LOADING,
  GET_CATEGORY_BY_ID,
  UPDATE_CATEGORY
} from "./types";

//Http Client
import axios from "axios";

//Import the token helper action to be able to add CATEGORIES
import { tokenConfig } from "./authActions";

//To be able to return errors
import { errors, returnErrors } from "./errorActions";

//Action to get the CATEGORIES into the component
export const getCategories = () => dispatch => {
  dispatch(setCategoriesLoading()); //Change the state of the loading
  axios
    .get("/api/category")
    .then(res =>
      dispatch({
        type: GET_CATEGORIES, //use the get action
        payload: res.data //Get the data from response and send them as a payload
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

//Action to get a sale by id into the components
export const getCategoryById = id => dispatch => {
  axios
    .get(`/api/category/${id}`) //Send the id as defined in our back end api
    .then(res =>
      dispatch({
        type: GET_CATEGORY_BY_ID, //Define the action
        payload: id //Send the id as a payload
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

//Action to add a category
export const addCategory = category => (dispatch, getState) => {
  axios
    .post("/api/category", category, tokenConfig(getState)) //Post the data from the modal into the api
    .then(res =>
      dispatch({
        type: ADD_CATEGORY, //Define the action
        payload: res.data //Send as a payload
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

//Action to delete a category
export const deleteCategory = id => (dispatch, getState) => {
  axios
    .delete(`/api/category/${id}`, tokenConfig(getState)) //Send the id as defined in our back end api
    .then(res =>
      dispatch({
        type: DELETE_CATEGORY, //Define the action
        payload: id //Send the id as a payload
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

//Action to update a SALE
export const updateCategory = category => (dispatch, getState) => {
  axios
    .put(`/api/category/${category._id}`, category, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: UPDATE_CATEGORY,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

//Dispatch Items Loading
export const setCategoriesLoading = () => {
  return {
    type: CATEGORIES_LOADING
  };
};
