const mongoose = require("mongoose")
const {ObjectId} = mongoose.Schema.Types;
const eventSchema = new mongoose.Schema({ 
   
  name:{
    type:String,
    required:true
  },
    venue: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required:true
    },
    time:{ type: String,required:true
     },
    postedBy:{
     type: ObjectId,
     ref:"User"
    }
  })

  mongoose.model("Event",eventSchema)