const {model,connect}=require('../connect');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');





const login = async(req,resp) => {
console.log("login page router ",req.body)
const {emailAddress,password:userpassword}=req.body;
console.log("emailaddress",emailAddress);
const user = await model.findOne({ emailAddress: emailAddress });
console.log("user",user)
if(!user)
{
resp.send({'message':"user not found"});
return;
}

else {
      console.log(user);
const {password:dbpassword}=user;
const {id,firstName,emailAddress,accountNumber}=user;

bcrypt.compare(userpassword,dbpassword, function(err, result) {
      console.log("result : ",result);
      if(result){
            // we will create json webtoken
            //  resp.send({'message':"login in successfullt and cookie set"});
            jwt.sign(
                  { id:id,
                    firstName:firstName,
                    accountNumber:accountNumber,
                    emailAddress:emailAddress,
                    accountNumber:accountNumber
                },
                  'shhhhh', // Secret key for signing the token
                  { expiresIn: '1h' }, // Token expiration time (e.g., 1 hour)
                  async function (err, token) {
                      if (err) {
                          console.error('Error signing JWT:', err);
                          resp.status(500).send({ error: 'Internal Server Error' });
                      } else {
                          // Set the JWT as a cookie in the response
                          await resp.cookie('test', token,{ httpOnly: true,
                            maxAge: 5 * 60 * 1000, });
                          // Send the response after setting the cookie
                          resp.send({'firstname':firstName,
                        'message':"login is successuful"})
                        //   resp.send({ message: "Login successful and cookie set" });
                      }
                  }
              );
      }
      else{
            // password not matched

            resp.send({'message':"Password not matching"})
      }
  });
}
console.log(user);

}

exports.login=login

