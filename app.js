const express = require("express");
const mongoose = require("mongoose");

var cors = require('cors')

const app = express();

app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://localhost:27017/batch", {useNewUrlParser: true, useUnifiedTopology: true });

// schemas
const yearSchema = {
    tName:String,
    bName:String,
    year:String,
    date:String
};
const monthSchema = {
  tName:String,
  bName:String,
  month:String,
  date:String
};
const daySchema = {
  tName:String,
  bName:String,
  fromDay:String,
  toDay:String,
  date:String
};





// modals
const year = mongoose.model("year", yearSchema);
const monthModal = mongoose.model("month", monthSchema);
const day = mongoose.model("day", daySchema);

//routes

app.post("/Year", function(req, res){

    // console.log(req.body);

    year.insertMany(req.body)
    .then(response=>{

      return res.json({
        "message":"Year submitted",
      })
    })
    .catch(err => console.error(`Failed to insert item: ${err.message}`))

});

app.post("/Day", function(req, res){

  // console.log(req.body);
  day.insertMany(req.body)
  .then(response=>{

    return res.json({
      "message":"Day submitted",
    })
  })
  .catch(err => console.error(`Failed to insert item: ${err.message}`))




});

app.post("/Month", function(req, res){

  monthModal.insertMany(req.body)
  .then(response=>{

    return res.json({
      "message":"Month submitted",
    })
  })
  .catch(err => console.error(`Failed to insert item: ${err.message}`))

});


//  routes to display data

app.get("/getYear",(req,res)=>{

  year.find({})
  .then(response=>{
    // console.log(response);
    return res.send(response);
  })
  .catch(err=>{console.error(`Failed to get item: ${err.message}`)})
})

app.get("/getMonth",(req,res)=>{

  monthModal.find({})
  .then(response=>{
    // console.log(response);
    return res.send(response);
  })
  .catch(err=>{console.error(`Failed to get item: ${err.message}`)})
})


app.post("/getDay",(req,res)=>{

  var date=req.body.date;

  day.find({date:date})
  .then(response=>{
    // console.log(response);
    return res.send(response);
  })
  .catch(err=>{console.error(`Failed to get item: ${err.message}`)})
})



// delete items
app.post("/deleteYear",(req,res)=>{

  console.log(req.body);
  year.deleteOne(req.body)
  .then(response=>{
    
    return res.json({
      "message":"Year Deleted",
    })
  }).catch(err=>{console.log(err.message);})
  
})

app.post("/deleteMonth",(req,res)=>{

  console.log(req.body);
  monthModal.deleteOne(req.body)
  .then(response=>{
    return res.json({
      "message":"Month Deleted",
    })
  }).catch(err=>{console.log(err.message);})
  
})

app.post("/deleteDay",(req,res)=>{

  console.log(req.body);
  day.deleteOne(req.body)
  .then(response=>{
    return res.json({
      "message":"Day Deleted",
    })
  }).catch(err=>{console.log(err.message);})
  
})






// listen to port 5000
app.listen(5000, function() {
  console.log("Server started on port 5000");
});
