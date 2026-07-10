import connectToMongoDB from "./db.js";
import authRoutes from './routes/auth.js'
import notesRoutes from './routes/notes.js'
import express from 'express';
import cors from 'cors';

const port = process.env.PORT || 5011;
connectToMongoDB()
const app = express()
app.use(cors())


app.use(express.json());

app.use('/api/auth', authRoutes)
app.use('/api/notes', notesRoutes)



app.listen(port, () => {
  console.log(`CloudNotes backend listening on port ${port}`);
});


