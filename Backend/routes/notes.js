import express from "express";
const router = express.Router();
import Note from "../models/Note.js";
import fetchuser from "../middleware/fetchuser.js";
import { body, validationResult } from "express-validator";



// Route:1  Get all the notes using: get  "/api/notes/fetchallnotes  login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    let notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(400).send("Internal Server Error");
  }
});


// Route:2  add a new note using: post  "/api/notes/addnote  login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title").isLength({ min: 3 }).withMessage("Enter a valid title"),
    body("description")
      .isLength({ min: 5 })
      .withMessage("Description must be atleast  5 characters"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title, description, tag } = req.body;
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  },
);


// Route:3 updatind an existing Note using: put  "/api/notes/updatenote  login required
router.put(
  "/updatenote/:id",
  fetchuser,

  async (req, res) => {
    const { title, description, tag } = req.body;

    //create a newNote object
    let newNote = {};

    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    //find the note to be update and update it
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true },
    );
    res.json({ note });
  },
);


// Route4: Deleting Note using: put  "/api/notes/deletenote  login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  //find the note to be update and delete it
  let note = await Note.findById(req.params.id);
  if (!note) {
    return res.status(404).send("Not Found");
  }
  if (note.user.toString() !== req.user.id) {
    return res.status(401).send("Not Allowed");
  }

  note = await Note.findByIdAndDelete(req.params.id);
  res.json({ success: true, msg: "Note deleted" });
});
export default router;









