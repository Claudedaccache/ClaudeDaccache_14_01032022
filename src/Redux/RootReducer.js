import { combineReducers } from "redux";
import reducer from "../Redux/Employees/AuthReducer"
const rootReducer = combineReducers({
  employees: reducer,


});
export default rootReducer;