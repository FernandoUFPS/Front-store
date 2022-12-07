import { types } from "../types/types";

export const authReducer = (state = {}, action) => {
  switch (action.type) {
    case types.login:
      return {
        ...state,
        isLogged: true,
        user: action.payload,
      };
    case types.signUp:
      return {
        ...state,
        isCreated: action.payload,
      };
    case types.logout:
      return {
        isLogged: false,
      };
    case types.forgotPass:
      return {
        ...state,
        isOk: false,
      };
    case types.verify:
      return {
        ...state,
        isVerify: action.payload,
      };

    default:
      return state;
  }
};
