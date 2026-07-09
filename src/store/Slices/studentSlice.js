import { createSlice } from "@reduxjs/toolkit";
import AddStudents from "../../Components/AddStudents";
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
       fetchSuccess(state,action){
         state.loading=false;
         state.students=action.payload;
       },
       fetchFailure(state,action){
        state.loading=false;
        state.error=action.payload;
       },
       addStudents(state,action){
        state.students.push(action.payload);
       },
       deleteStudents(state,action){
        state.students=state.students.filter(
            (student)=>student.id!==action.payload
        );
       },
       updatedStudents(state,action){
        const {id,firstName,university} = action.payload;
        const student= state.students.find(
            (student)=>student.id===id
        );
        if(student){
            student.firstName=firstName;
            student.university=university;
        }
       }
    }
})
export const { fetchStart,fetchSuccess,fetchFailure,addStudents,deleteStudents,updatedStudents} = studentSlice.actions;
export default studentSlice.reducer;