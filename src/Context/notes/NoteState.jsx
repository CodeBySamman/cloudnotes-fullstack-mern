import React, { useState } from "react";
import NoteContext from "./noteContext";
import { useAlert } from "./Alertcontext";
import Swal from "sweetalert2";
import axios from "axios";

const NoteState = (props) => {

const host = import.meta.env.VITE_API_URL;

const { showDeleteAlert } = useAlert();

const [notes, setNotes] = useState([]);


// Get Notes
const getNotes = async () => {
  try {

    const { data } = await axios.get(
      `${host}/api/notes/fetchallnotes`,
      {
        headers: {
          "auth-token": localStorage.getItem("token")
        }});
setNotes(data);

  } catch(error){
    console.log(error);
  }
}



// Add Note..........
const addNote = async (title, description, tag) => {

try {

const { data } = await axios.post(
  `${host}/api/notes/addnote`,
  {
    title,
    description,
    tag
  },
  {
    headers:{
      "auth-token": localStorage.getItem("token")
    }
  }
);
const newNote = data.note || data;

if (newNote && newNote._id) {
  setNotes(prev => [...prev, newNote]);
}

Swal.fire({
  title: "Success!",
  text:  "Note has been added!",
  icon: "success",
  showConfirmButton: false,
  timer: 1200
});
}catch(error){

console.log(error);

Swal.fire({
  title: "Error!",
  text: "Something went wrong!",
  icon: "error",
  showConfirmButton: false,
  timer: 1200
});
}}



// Delete Note........
const deleteNote = async(id)=>{

const result = await showDeleteAlert();

if(!result.isConfirmed) return;

try{
await axios.delete(
 `${host}/api/notes/deletenote/${id}`,
 {
  headers:{
    "auth-token":localStorage.getItem("token")
  }});
setNotes(prev =>
 prev.filter(note=>note._id !== id)
);

Swal.fire({
  title: "Success!",
  text: "Your note has been deleted successfully.",
  icon: "success",
  showConfirmButton: false,
  timer: 1200
});
}catch(error){
  console.log(error);

Swal.fire({
  title: "Error!",
  text: "Note could not be deleted.",
  icon: "error",
  showConfirmButton: false,
  timer: 1200
});
}}


// Edit Note.....

const editNote = async(id,title,description,tag)=>{

try{
  const {data} = await axios.put(
 `${host}/api/notes/updatenote/${id}`,
 {
  title,
  description,
  tag
 },
 {
 headers:{
  "auth-token":localStorage.getItem("token")
 }});

setNotes(prev =>
 prev.map(note =>
  note._id === id
   ? {...note,title,description,tag}
   : note
 )
);

Swal.fire({
  title: "Success!",
  text: "Note has been updated!",
  icon: "success",
  showConfirmButton: false,
  timer: 1200
});

}catch(error){

console.log(error);
Swal.fire({
  title: "Error!",
  text: "Something went wrong!",
  icon: "error",
  showConfirmButton: false,
  timer: 1200
});

}

}



return (

<NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes}}>

{props.children}

</NoteContext.Provider>

)}


export default NoteState;
  




  
 
  
  

