import { createSlice } from "@reduxjs/toolkit";
const initialState={
    students:[],
    loading:false,
    error:null,
}
const studentSlice =createSlice({
    name:"Student",
    initialState,
    reducers:{
       fetchStart(state){
        state.loading=true;
        state.error=null;
       },
       fetchSucess(state,action){
         state.loading=false;
         state.students=action.payload;
       },
       fetchFailure(state,action){
        state.loading=false;
        state.error=action.payload;
       },
    }
})
export const { fetchStart,fetchSucess,fetchFailure} = studentSlice.actions;
export default studentSlice.reducer;