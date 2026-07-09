import {configureStore} from "@reduxjs/toolkit"
import employeeReducer from './Slices/employeeSlice'
export const store=configureStore({
  reducer:{
    employee:employeeReducer,
  },  
})