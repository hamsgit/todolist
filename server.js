//using Express
const express = require('express'); 

const mongoose= require('mongoose');
//create and instance of express
const app = express();
app.use(express.json());//express middleware to instruct to derive data from json type



//create a variable to sample in memory storage for todo items
//let todo =[]; commented as mongoose

//connecting mongoDB
mongoose.connect('mongodb://localhost:27017/mern-todo')//the mern-todo is db name here
.then(()=>{ //promise
    console.log('DB connected')
})
.catch((err)=>{
    console.log(err)
})

//creating schema
const todoschema= new mongoose.Schema({
    title: {
        required: true, //create as it's required to have a title when entering items
        type: String //so the request will be sent even descriptions iis not given but it won't work when title is not given, means if nothing mentioned about title or try to pass blank to title. Just a Space can be shared.
    },
    description: String
})

//create a model
const todomodel= mongoose.model('Todo',todoschema); //model name should be singular, collection will be created in plural of this

//Create a new todo task
app.post('/todo',async(req,res)=>
    {
    const{title,description}=req.body;
    // const newtodo = { //object for to do task
    //     id: todo.length+1,//index start with 0 so +1 
    //     title,
    //     description
    // };
    // todo.push(newtodo);//push new element to todo array from newtodo variable
    
    
    try{
        const newtodo= new todomodel({title,description});
        await newtodo.save();//save the dcument given in the constructor.
        res.status(201).json({
        message: "Todo created successfully",
        data: newtodo
    });
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: message.error}); //the error message in the terminal when somethong went wrong will be sent to frontend from API if the request is not correct before sending.    }
    
    }
});

//get all todo tasks
app.get('/todo',async(req,res) => { //get will take the data while post will save data.
    try{
        todomodel.find();
    }
    catch{

    }
    res.json(todo);
});

//update a todo task
app.put('/todo/:id',async(req,res)=>{    //put is the route for update a data
   try{
    const{title,description}= req.body;
    const ID= req.params.id;
    const updatedtodo = await todomodel.findByIdAndUpdate(
        ID,
        {title,description}
    )
    if (!updatedtodo)
    {
        return res.status(404).json({message: "Todo not found"})
    }
    res.json(updatedtodo)

   } 
   catch(error)
   {
        console.log(error);
        res.status(500).json({message: message.error});
   }
}) 

//start the server
const port = 3000; //select the port in which the app should run.
app.listen(port, ()=>{
    console.log("Server is listening to port "+port);//call back function will tell the server started with this message.

})

