const express=require('express')
require('dotenv').config()
const port=process.env.PORT||5001;
const app=express();
var cors = require('cors')
const cookieParser = require('cookie-parser');
const SignUp = require('./routes/Signup');
const Login = require('./routes/Login')
const Auth = require('./routes/Auth')
const Edit = require('./routes/Edit')
const cron = require('node-cron');
const {verifyMail}=require('./controllers/Auth')
// const signup=require('./routes/Signup')
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(cookieParser());
app.use(express.json());


const {model,connect}=require('./connect')
connect();







app.post("/signup", SignUp.signup);
app.get('/verify',verifyMail);
app.post('/login',Login.login);
// getting information about account
app.put('/myaccount',Auth.Auth,Edit.Edit);
// to provide data bout user if login
app.get('/auth/userinformation',Auth.Auth,(req,resp)=>{
      console.log("======================");
      if(!req.user) {
            resp.send({"message":"false"});
            return;
      }
      resp.send(req.user);
      console.log("user data ",req.user)
})
// logout
app.get('/logout',(req,resp)=>{
      resp.cookie('test', '', {
            expires: new Date(0)
      });
      resp.send({'message':"your are logout"})
});




cron.schedule('* * * * *', async() => {
      const timeLimit=new Date(Date.now()-5*60*1000);
var filter={
      verification:false,
      registrationTime:{$lt:timeLimit}
}
      const response =await model.deleteMany(filter);
      console.log(response);
      const ddd=await model.find({registrationTime:{$lt:timeLimit}})
      console.log("ddd",ddd);
  console.log('running a task every minute');
});


app.listen(port,(err)=>{
      if(!err)
      console.log("backend server started at " ,port);
})