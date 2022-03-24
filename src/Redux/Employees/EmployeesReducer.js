import * as actions from "./ActionTypes";

const initialState = [
  {
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    startDate: "",
    department: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
  },
];

const EmployeesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_EMPLOYEE:
      state = [...state, action.payload];
      return state;
    default:
      return state;
  }
};

export default EmployeesReducer;
