const express = require('express');
const router= express.Router();
const mongoose = require('mongoose');
const requireLogin =require('../middleware/requireLogin')
const Event = mongoose.model("Event")


//get all posts

router.get('/allevent',requireLogin,(req,res)=>{
  Event.find()
  .populate("postedBy","_id name")
  .sort("date")
  .then((events)=>{
      res.json({events})
  }).catch(err=>{
      console.log(err)
  })
  
})

//create a event

router.post('/createEvent',requireLogin,(req, res) => {
  const {name,venue,date,time} = req.body
  if(!name || !venue || !date ||!time ){
    return res.status(422).json({error:"Please fill all the fields"})
  }
  req.user.password = undefined;
  const event = new Event({
    name,
    venue,
    date,
    time,
    postedBy:req.user
  })
  event.save().then(result=>{
    res.json({event:result})
  })
  .catch(err=>{
    console.log(err)
  })
})

router.delete('/deleteevent/:eventId',requireLogin,(req,res)=>{
  Event.findOne({_id:req.params.eventId})
  .populate("postedBy","_id")
  .exec((err,event)=>{
      if(err || !event){
          return res.status(422).json({error:err})
      }
      if(event.postedBy._id.toString() === req.user._id.toString()){
            event.remove()
            .then(result=>{
                res.json(result)
            }).catch(err=>{
                console.log(err)
            })
      }
  })
})

module.exports = router;