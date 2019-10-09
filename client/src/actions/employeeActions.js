//Define item actions
import { GET_EMPLOYEES, ADD_EMPLOYEE, DELETE_EMPLOYEE, EMPLOYEES_LOADING, GET_EMPLOYEE_BY_ID, UPDATE_EMPLOYEE } from "./types";
//Http Client
import axios from "axios";
//Import the token helper action to be able to add items
import { tokenConfig } from "./authActions";
//To be able to return errors
import { 
      // errors, 
      returnErrors } from "./errorActions";

//Action to get the employees into the component
export const getEmployees = () => dispatch => {
  dispatch(setEmployeesLoading()); //Change the state of the loading
  console.log("ckemi");
  axios
    .get("/api/employees")
    .then(res =>
      dispatch({
        type: GET_EMPLOYEES, //use the get action
        payload: res.data //Get the data from response and send them as a payload
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

//Action to get an employee by id into the components
export const getEmployeeById = id => dispatch => {
  axios
    .get(`/api/employees/${id}`) //Send the id as defined in our back end api
    .then(res =>
      dispatch({
        type: GET_EMPLOYEE_BY_ID, //Define the action
        payload: id //Send the id as a payload
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );

};

//Action to add an employee
export const addEmployee = employee => (dispatch, getState) => {
  axios
    .post("/api/employees", employee, tokenConfig(getState)) //Post the data from the modal into the api
    .then(res =>
      dispatch({
        type: ADD_EMPLOYEE, //Define the action
        payload: res.data //Send as a payload
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

//Action to delete an employee
export const deleteEmployee = id => (dispatch, getState) => {
  axios
    .delete(`/api/employees/${id}`, tokenConfig(getState)) //Send the id as defined in our back end api
    .then(res =>
      dispatch({
        type: DELETE_EMPLOYEE, //Define the action
        payload: id //Send the id as a payload
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

//Action to update an employee
export const updateEmployee = employee => (dispatch, getState) => {
  axios
    .put(`/api/employees/${employee._id}`, employee, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: UPDATE_EMPLOYEE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
}

//Dispatch Employees Loading
export const setEmployeesLoading = () => {
  return {
    type: EMPLOYEES_LOADING
  };
};
