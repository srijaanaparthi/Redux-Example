
import './App.css';
import { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStart,fetchSuccess,fetchFailure,addStudents,deleteStudents,updatedStudents } from './store/Slices/studentSlice';
function App() {
 const dispatch=useDispatch();
 const students=useSelector((state)=>state.student.students);
 const loading=useSelector((state)=>state.student.loading);
 const error = useSelector((state)=>state.student.error);
 const [name,setName]=useState();
 const [university,setUniversity] =useState();
 const handleSubmit=()=>{
  if(name === "") return;
  const newStudent={
    id:Date.now(),
    firstName:name,
    university:university,

  };
  dispatch(addStudents(newStudent));
  setName("");
  setUniversity("");
 }
useEffect(() => {
  dispatch(fetchStart());

  fetch("https://dummyjson.com/users")
    .then((res) => res.json())
    .then((data) => {
      console.log(data); 
      dispatch(fetchSuccess(data.users));
    })
    .catch((err) => {
      dispatch(fetchFailure(err.message));
    });
}, [dispatch]);
  return (
    <div>
  <h1>Student Management System</h1>
  {loading && <h2>loading...</h2>}
  {error && <h2>{error}</h2>}
   {students.map((student) => (
        <div key={student.id}>
          <h3>{student.firstName}</h3>
          <p>{student.university}</p>
         <button className='edit'
          onClick={()=> {
            const newName=prompt("enter new student",student.firstName );
            const newUniversity=prompt("eneter the university",student.university);
            if(newName&&newUniversity){
              dispatch(updatedStudents({
                id:student.id,
                 firstName:newName,
                university:newUniversity,
              }));
            }
          }}
         >edit</button>
         <button className='delete' onClick={()=>dispatch(deleteStudents(student.id))}>delete</button>
        </div>
      ))}
      <h2>ADD STUDENT</h2>
       <label>NAME</label>
          <input type='text' value={name} onChange={(e)=>setName(e.target.value)} required></input>
          <br></br>
          <label>UNIVERSITY</label>
          <input type='text' value={university} onChange={(e)=>setUniversity(e.target.value)} required></input>
          <br></br>
          <button onClick={handleSubmit}>Submit</button>
</div>
  );


}

export default App;
