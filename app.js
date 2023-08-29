const express=require('express');
const expreeLayouts=require('express-ejs-layouts');
const mongoose=require('mongoose');


const app=express();

app.use(express.static('config'));

//DB Config
const db=require('./config/keys').MongoURI;

//connect to mongo
mongoose.connect(db,{useNewUrlParser:true})
.then(()=> console.log('MongoDb Connected.....'))
.catch(err=>console.log(err));

//EJS
app.use(expreeLayouts);
app.set('view engine','ejs');

//BodyParser
app.use(express.urlencoded({extended: false}));

//routes
app.use('/',require('./routes/homepage'));
app.use('/teachers',require('./routes/teachers')); //doing it is very imp without it we would not be able to route in our welcome.ejs file using the href="/students/view"
app.use('/students',require('./routes/students'));


const port=process.env.port || 8080;
app.listen(port,console.log(`server started on ${port}`));