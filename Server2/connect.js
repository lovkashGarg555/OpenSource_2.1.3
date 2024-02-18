const mongoose = require('mongoose');
require('dotenv').config();
const collection=process.env.COLLECTION;
const Schema = new mongoose.Schema({
  firstName: { type: String },
  emailAddress: { type: String,required:true},
  password:String,
  accountNumber: String,
  verification: {type:Boolean,default:false},
  registrationTime: { type: Date, default: () => new Date() }
});

const model=mongoose.model('users',Schema);
async function connect()
{      await mongoose.connect(`mongodb://127.0.0.1:27017/${collection}`);
  console.log('mongo db conneced Connected!');
}


module.exports={model,connect};

