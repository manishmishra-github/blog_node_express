const router = require('express').Router();
const mongoose = require('mongoose');
const multer= require('multer');

require('../models/post');
const post= mongoose.model('post');

//multer config
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,'./public/images/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })
  
  var upload = multer({ storage: storage })

router.get('/add',(req,res)=>{
    res.render('post/add',{
        title:'add post'
    })
})

router.get('/',(req,res)=>{
    res.render('./post/index');
})

router.post('/',upload.any(),(req,res)=>{
    const image_path= '/images/uploads/'+req.files[0].filename;
    const newPost={
        title:req.body.title,
        details:req.body.details,
        cat:req.body.cat,
        content:req.body.content,
        link:req.body.link,
        image_path
    }

    new post(newPost).save()
    .then(()=>{
        req.flash('success_msg','post added');
        res.redirect('/post');
    })
})
module.exports=router;