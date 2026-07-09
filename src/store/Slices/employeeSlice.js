import { createSlice } from "@reduxjs/toolkit";

const initialState={
    employees:[],
    loading:false,
    error:null,
}
const employeeSlice =createSlice({
    name:"Employee",
    initialState,
    reducers:{
       fetchStart(state){
        state.loading=true;
        state.error=null;
       },
       fetchSuccess(state,action){
         state.loading=false;
         state.employees=action.payload;
       },
       fetchFailure(state,action){
        state.loading=false;
        state.error=action.payload;
       },
       addEmployees(state,action){
        state.employees.push(action.payload);
       },
       deleteEmployees(state,action){
        state.employees=state.employees.filter(
            (employee)=>employee.id!==action.payload
        );
       },
       updatedEmployees(state,action){
        const {id,firstName,lastName,email,age,gender,university} = action.payload;
        const employee= state.employees.find(
            (employee)=>employee.id===id
        );
        if(employee){
            employee.firstName=firstName;
            employee.lastName=lastName;
            employee.email=email;
            employee.age=age;
            employee.gender=gender;
            employee.university=university;
        }
       }
    }
})
export const { fetchStart,fetchSuccess,fetchFailure,addEmployees,deleteEmployees,updatedEmployees} = employeeSlice.actions;
export default employeeSlice.reducer;