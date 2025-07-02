//using Express
const express = require('express'); 
//create and instance of express
const app = express();
app.use(express.json());//express middleware to instruct to derive data from json type

// //define a route - to access api service via url we need a route
// app.get('/',(req,res)=>{
//     res.send("Hello.") //this will be displayed when we run it in browser for our selcted port, localhost.3000

// });

//create a variable to sample in menory storage for todo items
let todo =[]; 
//Create a new todo task
app.post('/todo',(req,res)=>{
    const{title,description}=req.body;
    const newtodo = { //object for to do task
        id: todo.length+1,//index start with 0 so +1 
        title,
        description
    };
    todo.push(newtodo);//push new element to todo array from newtodo variable
    res.status(201).json({
        message: "Todo created successfully",
        data: newtodo
    });
});

//get all todo tasks
app.get('/todo',(req,res) => { //get will take the data while post will save data.
    res.json(todo);
});

//start the server
const port = 3000; //select the port in which the app should run.
app.listen(port, ()=>{
    console.log("Server is listening to port "+port);//call back function will tell the server started with this message.

})

