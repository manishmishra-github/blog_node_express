const express = require('express');
const bodyParser = require('body-parser');
const path  = require('path');
const exphbs = require('express-handlebars');
const session= require('express-session');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const passport=require('passport');


// initialize app
const app = express();

//express-session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  }));


//body-parser middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


//express-handlebars middlewares
app.use(express.static(path.join(__dirname,'public')));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


  //middlewares

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());

  //middlewares
app.use((req,res,next)=>{
    res.locals.success_msg=req.flash('success_msg');
    res.locals.error_msg=req.flash('error_msg');
    res.locals.error=req.flash('error');
    res.locals.user=req.user||null;

    next();
});


//databse config
const db = require('./config/db');
mongoose.connect(db.mongoUri)
.then(()=>{
    console.log("connected")
}).catch((err)=>{
    console.log(err)
});



//routes files
const index = require('./routes/index');
const post = require('./routes/post');



//routes middlewares
app.use('/',index);
app.use('/post',post);

const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log('server started');
})