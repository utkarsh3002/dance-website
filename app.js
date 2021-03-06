const express=require("express");
const path=require("path");
const mongoose = require('mongoose');
// const bodyparser = require("body-parser");
// async function main() {
//     await mongoose.connect('mongodb://localhost:27017/contactdance');
//   }
const app=express();
const port=8000;

// Define mongoose schema 
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String,
  });
  const contact = mongoose.model('contact', contactSchema); 

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res)=>{
    const params = {}
    res.status(200).render('contact.pug', params);
})
app.post('/contact', (req, res)=>{
    var mydata = new contact(req.body);
    main().catch(err => console.log(err));
    async function main() {
        await mongoose.connect('mongodb://localhost:27017/contactdance');
        await mydata.save().then(()=>{
            res.send("this item has been save to database");
        })
      }
    })
app.get('/about', (req, res)=>{
    const params = {}
    res.status(200).render('about.pug', params); 
});
app.get('/class', (req, res)=>{
    const params = {}
    res.status(200).render('class.pug', params); 
});
app.get('/services', (req, res)=>{
    const params = {}
    res.status(200).render('services.pug', params); 
});
    
    


    //  mydata.save().then(()=>{
    //     res.send("this item has been save to database");
    // }).catch(()=>{
    //     res.status(400).send("this item is not saved to database");
    // })

    // res.status(200).render('contact.pug', params); 


// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
})