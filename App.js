import React ,{ useEffect,useState} from "react";
import axios  from "axios";
const App =()=>{ 
  const[item,setItem]=useState([]); 
  const[newtask,setNewtask]=useState(''); 

  useEffect(()=>{
    axios.get("http://localhost:5000/gettask").then(
      arr=> setItem(arr.data)
    )
  },[])
  const submitHandler=e=>{
    e.preventDefault();
    axios.post("http://localhost:5000/add",{todo:newtask}).then(
      arr=>setItem(arr.data)
    )
  }
  const deleteHandler=id=>{
    axios.delete(`http://localhost:5000/delete/${id}`).then(
      arr=>setItem(arr.data)
    )

  }
   
  return (
    <div class="border">
      <center><form onSubmit={submitHandler}>
        <input className="input" type="text" value={newtask}
        onChange={(e)=>setNewtask(e.target.value)}/>
        <input class="submit" type="submit"/>

      </form><br/> 
        {item.map(task=>
          <div class ="bor" key={task._id}>
            <h3>{task.todo}</h3><button onClick={()=>deleteHandler(task._id)}> x</button>
          </div>)}
      </center>
    </div>
  )
}
export default App;