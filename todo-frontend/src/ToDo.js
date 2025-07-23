import {useEffect, useState } from "react"

export default function ToDo(){
    //functional component ToDo
    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    const [todos,setTodos]=useState([]);
    const [error,setError]=useState("");
    const [success,setSuceess]=useState("");
    const apiUrl ="http://localhost:8000";
    
    const handleSubmit=()=>{
        setError("") //to clear any error messages
        //check inputs
        if (title.trim() !== '' && description.trim() !== '')  //trim will remove white spaces
        {
            fetch(apiUrl+"/todo",{
                method: "POST", //to add an item post request
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({title,description})
            }).then((res)=>{ 
                //task should be added based on response so that res
                if(res.ok)
                {
                    //add task to list
                    setTodos([...todos,{title,description}])
                    setSuceess("Task added successfully")
                    setTimeout(() => {
                        setSuceess("");
                    }, 3000); //empty message after 3 seeconds
                }
                else{
                    //set error
                    setError("Unable to create task")
                }
                
            }).catch(()=>{
                setError("Unable to create task")
            })
            
        }

    }
    useEffect(()=>{
        getItems()
    },[])


    const getItems =()=>{
        fetch(apiUrl+"/todo")
        .then((res)=>{
            return res.json()
        })
        .then((res)=>{
            setTodos(res)
        })
    }

    return(
    <>
        <div className="row p-3 bg-success text-light" >
            <h1>ToDo project with MERN stack</h1>
        </div>
        <div className="row">
            <h3>Add Item</h3>
            {success && <p className="text-success">{success}</p>}
            <div className="form-group d-flex gap-2">
                <input placeholder="Task" onChange={(e)=>setTitle(e.target.value)} value={title} className="form-control" type="text"></input>
                <input placeholder="Description" onChange={(e)=>setDescription(e.target.value)} value={description} className="form-control" type="text"></input>
                <button className="btn btn-dark" onClick={handleSubmit}>Add</button>
            </div>
            {error && <p className="text-danger">{error}</p>}
        </div>
        <div className="=row mt-3">
            <h3>Tasks</h3>
            <ul className="list-group">
            {
                todos.map((item)=>
                    <li className="list-group-item bg-info d-flex justify-content-between align-items-center my-2">
                    <div className="d-flex flex-column">
                        <span className="fw-bold">{item.title}</span>
                        <span>{item.description}</span>
                    </div>

                    <div className="d-flex gap-2">
                        <button className="btn btn-warning">Edit</button>
                        <button className="btn btn-danger">Delete</button>
                    </div>
                </li>

                )
            }
                

            </ul>

        </div>
    </> 
    );
}