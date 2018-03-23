const router = require('express').Router();
const mongoose = require('mongoose');
const multer= require('multer');

require('../models/post');
const post= mongoose.model('post');

//multer config

router.get('/add',(req,res)=>{
    res.render('post/add',{
        title:'add post'
    })
})

router.get('/',(req,res)=>{
    res.render('./post/index');
})

router.post('/',(req,res)=>{
    const newPost={
        title:req.body.title,
        details:req.body.details,
        cat:req.body.cat,
        content:req.body.content,
        link:req.body.link
    }

    new post(newPost).save()
    .then(()=>{
        req.flash('success_msg','post added');
        res.redirect('/post');
    })
})
module.exports=router;