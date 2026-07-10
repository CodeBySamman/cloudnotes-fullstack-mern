import connectToMongoDB from "./db.js";
import authRoutes from './routes/auth.js'
import notesRoutes from './routes/notes.js'
import express from 'express';
import cors from 'cors';


connectToMongoDB()
const app = express()
app.use(cors())

const port = 5011
app.use(express.json());

app.use('/api/auth', authRoutes)
app.use('/api/notes', notesRoutes)



app.listen(port, () => {
  console.log(`CloudNotes backend listening on port http://localhost:${port}`)
})


