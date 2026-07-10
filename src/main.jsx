import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import NoteState from './Context/notes/NoteState';
import { AlertProvider } from './Context/notes/Alertcontext.jsx';
createRoot(document.getElementById('root')).render(
   
  <>
   <AlertProvider>
      <NoteState>
        <App />
      </NoteState>
    </AlertProvider>
  </>
   
)
