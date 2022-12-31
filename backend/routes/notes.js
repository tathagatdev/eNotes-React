const express = require("express");
const router = express.Router();
const Notes = require("../models/Notes");
var fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");

//ROUTE-1   Get All the notes using GET"api/notes/fetchallnotes"   LOGIN Required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try{
  const notes = await Notes.find({ user: req.user.id });
  res.json({notes} );
    }
    catch(error){
        console.error(error.message)
        res.status(500).send("Internal Server Error Occured")
      
    }
});
//ROUTE-2   Add a new note using GET"api/notes/addnote"   LOGIN Required
router.post(
  "/addnotes",
  fetchuser,
  [
    body("title", "Enter a valid Title").isLength({ min: 3 }), //Express Validatpr
    body("description", "Description must be atleast 5 Characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try{
    const {title,description,tag}= req.body;
    // If there are errors ,return bad request  ---Express Validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const notes=new Notes({

       title,description,tag,user:req.user.id
    })
    const savedNotes=await notes.save();
    res.json(savedNotes)
  }
catch(error){
    console.error(error.message)
    res.status(500).send("Internal Server Error Occured")
  
  }
});
//ROUTE-3 Updating a existing note using PUT:"api/notes/updatenotes" --LOGIN REQUIRED
router.put('/updatenotes/:id',fetchuser, async(req,res)=>{
  try{
  const {title,description,tag}=req.body;
  // Creating a new Note Object
  const newNote={}
  if(title){
    newNote.title=title
  }
  if(description){
    newNote.description=description
  }
  if(tag){
    newNote.tag=tag
  }
 let notes= await Notes.findById(req.params.id)  //Note id params is used to fetch /:id
 if(!notes){
  return res.status(404).send('Not Found')
 }
  if(notes.user.toString() !== req.user.id){  // Jo login kiya hai kya wahi id hai jiska note hai 

  return res.status(401).send('Not Allowed');
  }
  
  notes =await Notes.findByIdAndUpdate(req.params.id, {$set:newNote},{new:true})
  res.json(notes);
}
catch(error){
   console.error(error.message)
  res.status(500).send("Internal Server Error Occured")


}

})

//ROUTE-4  Deleting a existing note using DELETE:"api/notes/deletenotes" --LOGIN REQUIRED
router.delete('/deletenotes/:id',fetchuser, async(req,res)=>{
  try{

 let notes= await Notes.findById(req.params.id)  //Note id params is used to fetch /:id
 if(!notes){
  return res.status(404).send('Not Found')
 }
 // Checks If the note belongs to that user
  if(notes.user.toString() !== req.user.id){  // Jo login kiya hai kya wahi id hai jiska note hai 

  return res.status(401).send('Not Allowed');
  }
  
  notes =await Notes.findByIdAndDelete(req.params.id)
  res.json({"Sucess": "Note has been Deleted ",notes:notes});
}
catch(error){
  console.error(error.message)
  res.status(500).send("Internal Server Error Occured")


}

})

module.exports = router;
