import { useState } from "react"

function AddStudents(){
    const [name,setName] = useState();
    const [university,setUniversity]=useState();
    return(
        <>
        <div className='container'>
    <h2>Student Details</h2>
    <label>name</label>
    <input
    type="text"
    value={name}
    onChange={(e) => setName(e.target.value)}
    required
    ></input>
    <br>
    </br>
    <label>University</label>
    <input
    type='text'
    value={university}
    required
    onChange={(e)=>setUniversity(e.target.value)}>
    </input>
    <br></br>
    <button>Add Student</button>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>NAME</th>
          <th>UNIVERSITY</th>
        </tr>
      </thead>
    </table>
    </div>
    
        </>
    )
}
export default AddStudents;