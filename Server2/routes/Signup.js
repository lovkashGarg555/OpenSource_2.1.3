const {model,connect}=require('../connect');
const {sendVerifymail,verifyMail}=require('../controllers/Auth');

const bcrypt = require('bcrypt');
const nodemailer=require('nodemailer');
const signup = async(req,resp) =>{
      console.log("hi");
      console.log(req.body);
      const {emailAddress}=req.body;
     const arr=await  model.findOne({emailAddress:emailAddress});
     console.log(arr);
     if(arr && arr.length !==0)
     {
      resp.send({'message':"user already present"});
}
      else
{


      const {password:userpassword}=req.body;
      bcrypt.hash( userpassword  ,8, async function(err, hashedPassword) {
      if(!err){
            const newUser = new model({
                  ...req.body,
                  password: hashedPassword,
            });
      
      const userData=await newUser.save();
      // console.log("current time ",new Date(Date.now()));
      const updateregistration=model.updateOne(
            {emailAddress:req.body.emailAddress},
            {$set:{registrationTime:new Date(Date.now())}}
            )
            // const newtimesaved=updateregistration.save();
            // console.log("userData",userData)
            // console.log("newtimesaved",updateregistration);

// =================================================
// =========me adding nodemailer:

if(userData){
      sendVerifymail(emailAddress,"surya",userData._id)
      resp.send({'message':"account created, verify your email!!"});
return ;
}

else {
resp.send({'message':'server error'});
return;
}
}
// =================================================

      else {
            resp.send({"message":"server error try again"});
            return;
      }
      });
}


};

exports.signup = signup;
