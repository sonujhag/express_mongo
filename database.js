const mongoose = require('mongoose');
const assert = require('assert');
const db_url = process.env.DB_URL;

//connection code
mongoose.connect(
    db_url,
    { 
        useNewUrlParser:true,
        useUnifiedTopology:true
    },function(error,link){ 
        //check error
        assert.equal(error,null,'DB Connection Fail')

        //ok
        console.log('DB Connection Success')
        console.log(link);
    }
)

