const nodemailer=require('nodemailer');
const {connect,model}=require('../connect')

exports.sendVerifymail=async(emailAddress,name,userid)=>{
try{
const transporter=nodemailer.createTransport({
      host:"smtp.gmail.com",
      port:587,
      secure:false,
      requireTLS:true,
      auth:{
            user:"112215180@cse.iiitp.ac.in",
            pass:"qegvqufdtwmbcuod"
      }

});
const mailOptions={
      from:"112215180@cse.iiitp.ac.in",
      to:emailAddress,
      subject:"For Verification Mail",
      html:`<p>Hii ${name}+ please click here to <a href="http://localhost:3000/verify?id=${userid}"> Verify </a> Your Mail</p>`
}


const info=await transporter.sendMail(mailOptions,(error,info)=>{
      if(error){
            console.log(error);
      }
      else {
            console.log("email has been sent",info.response);
      }
})


}catch(error){
      console.log("error in sendVerifymail",error.message)
}
}


exports.verifyMail = async (req, resp) => {
      try {
        console.log("Mail verification function ", req.query.id);
        const response=await model.find({});
        console.log("data in your db",response);
        const updateInfo = await model.updateOne(
          { _id: req.query.id },
          { $set: { verification: 1 } }
        );

        console.log(updateInfo);
        if (updateInfo.modifiedCount === 1) {
          console.log("User verification successful");
          resp.send({
            success: true,
            message: 'User verification successful'
          });
        } else {
          console.log("User not found or already verified");
          resp.status(404).send({
            success: false,
            message: 'User not found or already verified'
          });
        }
    
      } catch (error) {
        console.error("Error during verification:", error.message);
        resp.status(500).send({
          success: false,
          message: 'Internal Server Error'
        });
      }
    };
    