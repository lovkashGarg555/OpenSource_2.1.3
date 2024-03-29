const mongoose = require('mongoose');
// const collection="Auctionlist";
// require('dotenv').config();
const AuctionSchema = new mongoose.Schema({
    Auctionname: {type: String },
  Itemname: { type: String,},
  Email:{type:String},
  accountno: String,
  Startprice: {type:Number},
  IncrementperBid:{type:Number},
});

const historyschema = new mongoose.Schema({
    email: {type: String },
  name: { type: String,},
  currentprice:{type:String},
  roomid: String
});

const model=mongoose.model('auctionlist',AuctionSchema); // used to make a collection
const modelforhistroy=mongoose.model('historylist',historyschema);
async function connect()
{      
await mongoose.connect(`mongodb://localhost:27017/Auctionlist`)
.then(()=>{
    console.log('mongodb Connected!');
})
.catch(()=>{
    console.log('failed');
})
}

module.exports={model,connect,modelforhistroy};