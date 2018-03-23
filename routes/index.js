const router = require('express').Router();
const mongoose= require('mongoose');

require('../models/post');
const post = mongoose.model('post');


router.get('/',(req,res)=>{
    post.find({}).then((result)=>{
        res.render('index',{
            result
        }) 
    })
})


module.exports= router;