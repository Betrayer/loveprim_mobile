import { createReducer } from "@reduxjs/toolkit";
import types from "./types";

const initialState = {
  userName: "",
  userId: "",
  userEmail: "",
  userPhone: "",
  isAuth: false,
};

const reducer = {
  [types.LOGIN_USER]: (state, { payload }) => {
    return {
      admin: payload.admin,
      userEmail: payload.userEmail,
      userId: payload.userId,
      userPhone: payload.userPhone,
      userName: payload.userName,
      isAuth: true,
      userAdress: payload.userAdress,
      buyer: payload.buyer,
    };
  },
  [types.REGISTR_USER]: (state, { payload }) => {
    return {
      admin: payload.admin,
      userEmail: payload.userEmail,
      userId: payload.userId,
      userPhone: payload.userPhone,
      userName: payload.userName,
      isAuth: true,
      userAdress: payload.userAdress,
    };
  },
  [types.USER_SIGNOUT]: () => initialState,
};

export const user = createReducer(initialState, reducer);
