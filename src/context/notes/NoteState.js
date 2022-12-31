
import { useState } from "react";
import NoteContext from "./noteContext";


const NoteState=(props)=>{
  const host='http://localhost:5000'
     const   notesInitial=  [  ]



                                     // 1- Get all  Notes
      const getNotes=async ()=>{
        // API CALL
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
         method: 'GET', 
         headers: {
            'Content-Type': 'application/json',
            'auth-token': 'token'
          },
        });
   const json=await response.json()
   console.log(json)
   setNotes(json)
      }









                                               //2- Add a note
      const addNotes=async (title,description,tag)=>{
        // API CALL
        const response = await fetch(`${host}/api/notes/addnotes`, {
          method: 'POST', 
         headers: {
            'Content-Type': 'application/json',
            'auth-token':  'token'

           
          },
          body: JSON.stringify({title,description,tag}) 
        });
        // Front end logic for add note
        const newNote=await response.json()
         setNotes(notes.concat(newNote))
       
      }

       
                                      // 3-Update a Note
      const editNotes= async (id,title,description,tag)=>{
        //API CALL
        const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
          method: 'PUT', 
         headers: {
            'Content-Type': 'application/json',
            'auth-token': 'token'
           
          },
          body: JSON.stringify({title,description,tag}) 
        });
        const json= response.json();
          console.log(json)


          let newNote=JSON.parse(JSON.stringify(notes));
        //LOGIC TO EDIT IN FRONT END CLIENT SIDE
        for (let i= 0; i < newNote.length; i++) {
          const element = newNote[i];
          if(element._id ===id){
            newNote[i].title=title;
            newNote[i].description=description;
            newNote[i].tag=tag;
            break;
          }
          
        }
        setNotes(newNote)
          
        }
      
      
                                       // 4-Delete a Note
     const deleteNotes=async(id)=>{
        // API CALL
        const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
          method: 'DELETE', 
          headers: {
             'Content-Type': 'application/json',
             "auth-token": 'token'
            
           }
         });
    const json=await response.json()
    console.log(json)
        //FRONTEND LOGIC
     const  newNote=notes.filter((n1)=>{return n1._id!==id})
            setNotes(newNote)
      }
    

      //USe State 
    const [notes,setNotes]=useState(notesInitial);
    

    // Use Context 
    return(  // Children of all components can use this state 
        <NoteContext.Provider value={{notes,setNotes,addNotes,editNotes,deleteNotes,getNotes}}>
        {props.children}              
        </NoteContext.Provider>
    )

}

export default NoteState;