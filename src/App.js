import './App.css';
import { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStart,fetchSuccess,fetchFailure,addEmployees,deleteEmployees,updatedEmployees} from './store/Slices/employeeSlice';
function App() {
 const dispatch=useDispatch();
 const employees=useSelector((state)=>state.employee.employees);
 const loading=useSelector((state)=>state.employee.loading);
 const error = useSelector((state)=>state.employee.error);
 const [name,setName]=useState();
 const [university,setUniversity] =useState();
 const [lastname,setLastname] =useState();
 const [email,setEmail]= useState();
 const [age,setAge]=useState();
 const [gender,setGender]=useState();
 const handleAdd = () => {
    fetch("https://dummyjson.com/users/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            firstName: name,
             lastName:lastname,
               email:email,
               age:age,
              gender:gender,
            university: university,
        })
    })
    .then(res => res.json())
    .then(data => {
         data.id=Date.now();
        dispatch(addEmployees(data));
  setName("");
  setLastname("");
  setEmail("");
  setAge("");
  setGender("")
  setUniversity("");
    });
}
 const handleDelete = (id) => {
    fetch(`https://dummyjson.com/users/${id}`, {
        method: "DELETE"
    })
    .then(res => res.json())
    .then(() => {
        dispatch(deleteEmployees(id));
    });
}
const handleUpdate = (employee) => {
    const newName = prompt("Enter Name",employee.firstName );
      const newlastName=prompt("enter last name",employee.lastName );
    const newUniversity = prompt( "Enter University", employee.university);
    const newemail=prompt("enter email",employee.email);
            const newage=prompt("enter age",employee.age );
            const newgender=prompt("enter gender",employee.gender);
    fetch(`https://dummyjson.com/users/${employee.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            firstName: newName,
            lastName:newlastName,
             email:newemail,
             age:newage,
             gender:newgender,
            university: newUniversity
        })
    })
    .then(res => res.json())
    .then(data => {
        dispatch(updatedEmployees(data));
    });
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
    <div className='container'>
  <h1>Employee Management System</h1>
  <div className='f'>
      <h2>ADD EMPLOYEE</h2>
      <div className='i/p'>
       <label>FIRST NAME</label>
          <input type='text'placeholder='Enter Name' value={name} onChange={(e)=>setName(e.target.value)} required></input>
          <br></br>
          <label>LAST NAME</label>
          <input type='text' value={lastname} placeholder='Enter last Name' onChange={(e)=>setLastname(e.target.value)} required></input>
          <br></br>
          <label>EMAIL</label>
          <input type='text' value={email} placeholder='Enter email' onChange={(e)=>setEmail(e.target.value)} required></input>
          <br></br>
          <label>AGE</label>
          <input type='text' value={age} placeholder='Enter age' onChange={(e)=>setAge(e.target.value)} required></input>
          <br></br>
          <label>GENDER</label>
          <input type='text' placeholder='Enter gender' value={gender} onChange={(e)=>setGender(e.target.value)} required></input>
          <br></br>
          <label>UNIVERSITY</label>
          <input type='text'placeholder='Enter University' value={university} onChange={(e)=>setUniversity(e.target.value)} required></input>
          <br></br>
          </div>
          <button className='btn'  onClick={handleAdd}>Submit</button>
          </div>
  {loading && <h2>loading...</h2>}
  {error && <h2>{error}</h2>}
  <table className='t'>
    <thead>
      <tr>
        <th>firstName</th>
         <th>lastName</th>
          <th>Email</th>
          <th>Age</th>
          <th>gender</th>
        <th>University</th>
        <th>Edit</th>
        <th>Delete</th>
        </tr>
      </thead>
        <tbody>
   {employees.map((employee) => (
        <tr key={employee.id}>
         <td>{employee.firstName}</td> 
          <td>{employee.lastName}</td>
           <td>{employee.email}</td>
           <td>{employee.age}</td>
          <td>{employee.gender}</td>
         <td> {employee.university}</td>
       <td>
         <button className='edit'
          onClick={()=>handleUpdate(employee)}
         >edit</button>
         </td>
         <td>
         <button className='delete' onClick={()=>handleDelete(employee.id)}>delete</button>
         </td>
        </tr>
      ))}
            </tbody>
      </table>
    </div>
  );
}
export default App;
