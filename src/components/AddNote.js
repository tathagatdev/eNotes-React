import React, { useState } from 'react'
import { useContext } from 'react'
import noteContext from '../context/notes/noteContext'

export default function AddNote(props) {
  const context=useContext(noteContext)
    const {addNotes}=context

    const [note,setNote]=useState({title:" ",description:" ",tag:" "})
    const handleClick=(e)=>{
      e.preventDefault();
      addNotes(note.title,note.description,note.tag);
      props.showAlert("Note Added Sucessfully","success")
      setNote({title:" ",description:" ",tag:" "})
    }

    const onChange=(e)=>{    // Enterd Value from user is assigned to note
      setNote({...note,[e.target.name]:e.target.value})

    }
  return (
    <div>
        <div className="container my-3">
       <h1>Add Note</h1>
       <div className="container my-3">
       <form>
  <div className="mb-3">
    <label   htmlFor=   "title" className="form-label">Title</label>
    <input type="text" className="form-control" id="title" value={note.title} minLength={3} required name='title' aria-describedby="emailHelp"  onChange={onChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label">Description</label>
    <input type="text" className="form-control" value={note.description} minLength={5} required  id="description" name='description'   onChange={onChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="tag" className="form-label">Tag</label>
    <input type="text" className="form-control"  value={note.tag} id="tag" name='tag'   onChange={onChange}/>
  </div>
  <button type="submit" onClick={handleClick}  disabled={note.title.length<3 || note.description.length<5} className="btn btn-primary">Add Note</button>
</form>
</div>
</div>
    </div>
  )
}
