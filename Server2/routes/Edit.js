const {model}=require('../connect');

const Edit = async (req,resp) => {
console.log(req.body);
const {id}=req.body;
console.log("meme");
const response=await model.findByIdAndUpdate(
      id,req.body,
      {new:true});
      if(response)
      {
            console.log("updated document",response);
      }
      else 
      {
            console.log("document.not found with id",id );
      }
resp.send({'message':"data updated "});

}

exports.Edit =Edit;
