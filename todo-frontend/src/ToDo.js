import { useState } from "react"

export default function ToDo(){
    //functional component ToDo
    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    
    const handleSubmit=()=>{
        //check inputs
        if(title.trim()!=='&&') //trim will remove white spaces
        {
            //add task to list
        }

    }
    return<>
    <div className="row p-3 bg-success text-light" >
        <h1>ToDo project with MERN stack</h1>
    </div>
    <div className="row">
        <h3>Add Item</h3>
        <p className="text-success">Task added successfully</p>
        <div className="form-group d-flex gap-2">
            <input placeholder="Task" onChange={(e)=>setTitle(e.target.value)} value={title} className="form-control" type="text"></input>
            <input placeholder="Description" onChange={(e)=>setDescription(e.target.value)} value={description} className="form-control" type="text"></input>
            <button className="btn btn-dark" onClick={handleSubmit}>Add</button>

        </div>
    </div>
    </> 
}