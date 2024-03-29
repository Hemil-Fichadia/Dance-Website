const express = require("express");
const path = require("path");
const app = express();
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
main().catch((err) => console.log(err));
async function main() {
    await mongoose.connect("mongodb://localhost:27017/ContactDance");
    console.log("Connection established bro...");
  }
const port = 8000;


//Defining mongoose schema
const ContactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});

const Contact = mongoose.model("Contact", ContactSchema);


// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')); // For serving static files
app.use(express.urlencoded());

// PUG SPECIFIC STUFF 
app.set('view engine', 'pug');  // Set the template engine as pug
app.set('views',path.join(__dirname,'views')); //Set the views directory 

//ENDPOINTS
app.get('/', (req,res)=>{
    const params = {};
    res.status(200).render('home.pug', params);
});
app.get('/contact', (req,res)=>{
    const params = {};
    res.status(200).render('contact.pug', params);
});
app.post('/contact', (req,res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("Your data has been saved to database");
    }).catch(()=>{
        res.status(400).send("Your data can't be saved to database")
    });
    // res.status(200).render('contact.pug', params);
});

//START SERVER 
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});
