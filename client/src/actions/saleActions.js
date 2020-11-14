//Define sale actions
import {
  GET_SALES,
  ADD_SALE,
  DELETE_SALE,
  SALES_LOADING,
  GET_SALE_BY_ID,
  UPDATE_SALE
} from "./types";

//Http Client
import axios from "axios";

//Import the token helper action to be able to add sales
import { tokenConfig } from "./authActions";

//To be able to return errors
import { 
  // errors, 
  returnErrors } from "./errorActions";

//Action to get the sales into the component
export const getSales = () => dispatch => {
  dispatch(setSalesLoading()); //Change the state of the loading
  axios
    .get("/api/sales")
    .then(res =>
      dispatch({
        type: GET_SALES, //use the get action
        payload: res.data //Get the data from response and send them as a payload
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

//Action to get a sale by id into the components
export const getSaleById = id => async (dispatch, getState) => {
    try {
        const response = await axios
            .get(`/api/sales/${id}`, tokenConfig(getState)); //Send the id as defined in our back end api
        dispatch({ type: GET_SALE_BY_ID, payload: response.data })
    } catch (error) {
        dispatch(returnErrors(error.response.data, error.response.status))
    }
};

//Action to add a sale
export const addSale = sale => (dispatch, getState) => {
  axios
    .post("/api/sales", sale, tokenConfig(getState)) //Post the data from the modal into the api
    .then(res =>
      dispatch({
        type: ADD_SALE, //Define the action
        payload: res.data //Send as a payload
      })
    )
    .catch(err => console.log(err));
};

//Action to delete a sale
export const deleteSale = id => (dispatch, getState) => {
  axios
    .delete(`/api/sales/${id}`, tokenConfig(getState)) //Send the id as defined in our back end api
    .then(res =>
      dispatch({
        type: DELETE_SALE, //Define the action
        payload: id //Send the id as a payload
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

//Action to update a SALE
export const updateSale = sale => (dispatch, getState) => {
  axios
    .put(`/api/sales/${sale._id}`, sale, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: UPDATE_SALE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

//Dispatch sales Loading
export const setSalesLoading = () => {
  return {
    type: SALES_LOADING
  };
};
