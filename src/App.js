
import './App.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStart,fetchSuccess,fetchFailure } from './store/Slices/studentSlice';
function App() {
 const dispatch=useDispatch();
 const students=useSelector((state)=>state.student.students);
 const loading=useSelector((state)=>state.student.loading);
 const error = useSelector((state)=>state.student.error);
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
        </div>
      ))}
</div>
  );


}

export default App;
