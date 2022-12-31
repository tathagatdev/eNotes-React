 const mongoose=require('mongoose');
{/* const mongoURI="mongodb://localhost:27017/inotebook";

const connectToMongo=()=>{
   
    
    mongoose.set("strictQuery", false);
    mongoose.connect(mongoURI, ()=> {
        console.log("Connected to MongoDB sucessfully");
    })
    }

*/}

const connectToMongo = async () => {
    mongoose.set("strictQuery", false);
    await mongoose.connect('mongodb://localhost:27017/inotebook',{
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        family: 4,
  });
}
module.exports=connectToMongo;