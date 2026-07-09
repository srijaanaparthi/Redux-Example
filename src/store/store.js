import {configureStore} from "@reduxjs/toolkit"
import studentReducer from './Slices/studentSlice'
export const store=configureStore({
  reducer:{
    student:studentReducer,
  },  
})