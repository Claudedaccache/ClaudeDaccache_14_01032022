import * as actions from "../Employees/ActionTypes";

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

const AuthToken = (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_EMPLOYEE:
      state = [...state, action.payload];
      return state;
    default:
      return state;
  }
};

export default AuthToken;
