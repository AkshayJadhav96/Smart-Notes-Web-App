import express from "express";

import {getNotes,createNote, deleteNote, updateNote} from "../controllers/notesController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getNotes);
router.post("/", authMiddleware, createNote);
router.delete("/:id", authMiddleware, deleteNote);
router.put("/:id", authMiddleware, updateNote);


export default router;
