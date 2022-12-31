import React from 'react'
import { useContext } from 'react'
import { useRef } from 'react'
import noteContext from '../context/notes/noteContext'
import { Noteitem } from './Noteitem'
import AddNote from './AddNote'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const Notes =async (props) => {
let navigate= useNavigate();

  const {showAlert}=props;

    const context= useContext(noteContext)
    const {notes,getNotes,editNotes}=context
    const [note,setNote]=useState({id:" ",title:" ",description:" ",tag:"default "})

    const ref = useRef(null)
    const refClose=useRef(null)


  useEffect(()=>{
    if(localStorage.getItem('token')){
      getNotes();

   }
    else{
     navigate("/login")
   }
  },[])

  const updateNotes=(currentNote)=>{
      ref.current.click()
      setNote({ id:currentNote._id , title:currentNote.title,description:currentNote.description,tag:currentNote.tag})

  }

  const handleClick=(e)=>{
    e.preventDefault();
    refClose.current.click();
    editNotes(note.id,note.title,note.description,note.tag);
    showAlert("Notes Updated Sucessfully","success")


  }

 
  const onChange=(e)=>{
    setNote({...note,[e.target.name]:e.target.value})

  }




  return (
    <div>
        <AddNote showAlert={showAlert}></AddNote>
        <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal"  ref={ref}>
  Launch demo modal
</button>

<div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel" >Edit Note</h5>
        <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
      <form>
  <div className="mb-3">
    <label   htmlFor=   "title" className="form-label">Title</label>
    <input type="text" className="form-control" id="title"   minLength={3} required  name='title'value={note.title} aria-describedby="emailHelp"  onChange={onChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label">Description</label>
    <input type="text" className="form-control" id="description"  minLength={5} required value={note.description} name='description'   onChange={onChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="tag" className="form-label">Tag</label>
    <input type="text" className="form-control" id="tag" name='tag' value={note.tag}  onChange={onChange}/>
  </div>
  
</form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"  ref={refClose}>Close</button>
        <button type="button" className="btn btn-primary"  disabled={note.title.length<3 || note.description.length<5} onClick={handleClick}>Update Note</button>
      </div>
    </div>
  </div>
</div>
        <div className="row  my-3">
       <h2>Your Notes</h2>
       <div className="container mx-2">
       {notes.length===0 && 'No Notes to display'}
       </div>
       { await  notes.map((note)=>{
        return <Noteitem showAlert={showAlert} key={note._id} note={note}  updateNotes={updateNotes}/>
       })}

       </div>
    </div>
  )
}
