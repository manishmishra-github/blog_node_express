const mongoose= require('mongoose');
const schema= mongoose.Schema;

const postSchema= new schema({
    title:{
        type:String,
        required:true
    },
    details:{
        type:String,
        required:true
    },
    cat:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    link:{
        type:String,
        required:true
    },
    image_path:{
        type:String,
        required:true
    }
})

mongoose.model('post',postSchema);