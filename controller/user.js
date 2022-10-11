const router = require('express').Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const User = require('./../model/student');

// middleware setup

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));


//dafault routes
router.all('/', function (req, res) {
    return res.json({
        status: true,
        message: "user controller working...!!!"
    });
});

//create new user route
router.post('/createNew', [
    //check not empty
    check('studentname').not().isEmpty().trim().escape(),
    check('branch').not().isEmpty().trim().escape(),
    check('collegename').not().isEmpty().trim().escape(),
],
    function (req, res) {
        //check validation rules
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                status: false,
                message: 'form validation error',
                errors: errors.array()
            });
        }


        //output data to user
        // return res.json({ 
        //     status:true,
        //     message:'user data ok',
        //     data:req.body
        // });

        //cretae new student data
        var temp = new User({
            studentname: req.body.studentname,
            branch: req.body.branch,
            collegename: req.body.collegename
        });

        //insert into database
        temp.save(function (error, result) {
            //check error
            if (error) {
                return res.json({
                    status: false,
                    message: 'db insert fail',
                    error: error
                });

            }

            //everything okay
            return res.json({
                status: true,
                message: "db connection success",
                result: result
            });
        })

    }
);

//find student data
router.get('/find',
    function (req, res) {
        User.find(function (error, result) {
            //check error 
            if (error) {
                return res.json({
                    status: false,
                    messahe: "fail",
                    error: error
                })
            }
            //if everything ok
            return res.json({
                status: true,
                message: "success",
                result: result
            })
        });
    });

//update student data
router.put('/update/:branch',
    function (req, res) {
        //check branch is empty or not
        if (req.params.branch) {
            User.update(
                { branch: req.params.branch },
                { studentname: "sonu jha" },
                function (error, result) {
                    //check error
                    if (error) {
                        return res.json({
                            status: false,
                            message: "db update fail",
                            error: error
                        });
                    }
                    //ok
                    return res.json({
                        status: true,
                        message: "success",
                        result: result
                    });
                }
            );
        }else{
         return res.json({ 
            status:false,
            message:'branch not provided...'

         })   
         }

    });

    //remove student data
    router.delete('/delete/:branch',
    function(req,res){
        //check branch is not empty
        if(req.params.branch){
            User.remove(
                {
                    branch:req.params.branch
                 },
                 function(error,result){ 
                    //check error
                    if(error){ 
                        return res.json({ 
                            status:false,
                            message:'fail',
                            error:error
                        });

                    }
                    //everything okk
                    return res.json({ 
                        status:true,
                        message:"success",
                        result:result
                    });
                 }
            );
         }else{ 
            //if branch is not provided
            return res.json({ 
                status:false,
                message:'fail'
            });
         }
     });

//module export 
module.exports = router;

