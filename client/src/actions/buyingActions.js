//Define buying actions
import {
  GET_BUYINGS,
  ADD_BUYING,
  DELETE_BUYING,
  BUYINGS_LOADING,
  GET_BUYING_BY_ID,
  UPDATE_BUYING
} from "./types";

//Http Client
import axios from "axios";

//Import the token helper action to be able to add buyings
import { tokenConfig } from "./authActions";

//To be able to return errors
import {
  // errors,
  returnErrors
} from "./errorActions";

//Action to get the buyings into the component
export const getBuyings = () => dispatch => {
  dispatch(setBuyingsLoading()); //Change the state of the loading
  axios
    .get("/api/buyings")
    .then(res =>
      dispatch({
        type: GET_BUYINGS, //use the get action
        payload: res.data //Get the data from response and send them as a payload
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

//Action to get a buying by id into the components
export const getBuyingById = id => dispatch => {
  axios
    .get(`/api/buyings/${id}`) //Send the id as defined in our back end api
    .then(res =>
      dispatch({
        type: GET_BUYING_BY_ID, //Define the action
        payload: id //Send the id as a payload
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );

};

//Action to add a buying
export const addBuying = buying => (dispatch, getState) => {
  //console.log(buying);
  axios
    .post("/api/buyings", buying, tokenConfig(getState)) //Post the data from the modal into the api
    .then(res =>
      dispatch({
        type: ADD_BUYING, //Define the action
        payload: res.data //Send as a payload
      })
    )
    .catch(err => console.log(err));
};

//Action to delete a buying
export const deleteBuying = id => (dispatch, getState) => {
  axios
    .delete(`/api/buyings/${id}`, tokenConfig(getState)) //Send the id as defined in our back end api
    .then(res =>
      dispatch({
        type: DELETE_BUYING, //Define the action
        payload: id //Send the id as a payload
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

//Action to update a buying
export const updateBuying = buying => (dispatch, getState) => {
  axios
    .put(`/api/buyings/${buying._id}`, buying, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: UPDATE_BUYING,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
}

//Dispatch buyings Loading
export const setBuyingsLoading = () => {
  return {
    type: BUYINGS_LOADING
  };
};
