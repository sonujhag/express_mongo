const mongoose = require('mongoose');

//schema model

const userSchema = mongoose.Schema({ 
    studentname:{ 
        type:String,
        required:true
    },
    branch:{ 
        type:String,
        required:true
    },
    collegename:{ 
        type:String,
        required:true
    },
    isActive:{ 
        type:Boolean,
        default:true
    },
    createdOn:{ 
        type:Date,
        default:Date.now()
    }

});

//user model
mongoose.model('students',userSchema);

module.exports = mongoose.model('students');