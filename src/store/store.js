import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import rotaractReducer from "./rotaractMemberSlice";
import dmsReducer from "./dmsMemberSlice";
import adminReducer from "./adminSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dms: dmsReducer,  
    rotaract: rotaractReducer, 
    admin: adminReducer
  },
});
