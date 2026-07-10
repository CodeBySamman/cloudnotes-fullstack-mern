import connectToMongoDB from "./db.js";
import authRoutes from "./routes/auth.js";
import notesRoutes from "./routes/notes.js";
import express from "express";
import cors from "cors";

const app = express();
const port = process.env.PORT || 5011;

connectToMongoDB();

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "auth-token"],
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);

app.listen(port, () => {
  console.log(`CloudNotes backend listening on port ${port}`);
});