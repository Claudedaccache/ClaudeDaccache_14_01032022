import * as actions from "../Employees/ActionTypes";

export const createEmployee = (user) => {
  return {
    type: actions.ADD_EMPLOYEE,
    payload: user,
  };
};

