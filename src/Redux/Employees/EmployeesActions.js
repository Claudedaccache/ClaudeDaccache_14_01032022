import * as actions from "./ActionTypes";

export const createEmployee = (user) => {
  return {
    type: actions.ADD_EMPLOYEE,
    payload: user,
  };
};

