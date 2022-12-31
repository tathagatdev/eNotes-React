import React from 'react'
import { useContext } from 'react';
import noteContext from '../context/notes/noteContext';
export const Noteitem = async (props) => {
    const {note,updateNotes,showAlert}=props;
    const context=useContext(noteContext)
    const {deleteNotes}=context

  return (
    <div className='col-md-3'>
        
        <div className="card my-3" >
       
  <div className="card-body">
    <h5 className="card-title">{note.title}</h5>
    <p className="card-text">{note.description}</p>
    <i className="fa-solid fa-trash mx-2"  onClick={()=>{deleteNotes(note._id);showAlert("Deleted Sucessfully","success")}}></i>
    <i className="fa-solid fa-pen-to-square mx-2"     onClick={()=>{updateNotes(note)}}  ></i>
  </div>
</div>
    </div>
  )
}
