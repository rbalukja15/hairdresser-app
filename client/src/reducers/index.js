//The main point of this reducer is to bring together all the other reducers
import { combineReducers } from 'redux';
import itemReducer from './items/itemReducer';
import errorReducer from './errors/errorReducer';
import authReducer from './auth/authReducer';
import clientReducer from './clients/clientReducer';
import categoryReducer from './categories/categoryReducer';
import saleReducer from './sales/saleReducer';
import buyingReducer from './buyings/buyingReducer';
import employeeReducer from './employees/employeeReducer';
import eventReducer from './events/eventReducer';
import {reducer as toastrReducer} from 'react-redux-toastr';

export default combineReducers({
  item: itemReducer,
  client: clientReducer,
  error: errorReducer,
  auth: authReducer,
  category: categoryReducer,
  sale: saleReducer,
  buying: buyingReducer,
  employee: employeeReducer,
  event: eventReducer,
  toastr: toastrReducer
});