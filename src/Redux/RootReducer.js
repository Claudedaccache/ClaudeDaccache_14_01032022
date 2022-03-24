import { combineReducers } from "redux";
import EmployeesReducer from "../Redux/Employees/EmployeesReducer"
const rootReducer = combineReducers({
  employees: EmployeesReducer,


});
export default rootReducer;