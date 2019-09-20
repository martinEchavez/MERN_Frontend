import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'//Bootstrap para dar estilo.

import './App.css';
//Se importa cada uno de los componentes para ser mostrados a través de la URL
import Navigation from './components/Navigation'
import NotesList from './components/NotesList'
import CreateNote from './components/CreateNote'
import UsersList from './components/UsersList'


function App() {
  return (
    <Router>
      {/* Navegación */}
      <Navigation />
      
      <div className="container p-4">
      {/* Componentes por URL */}
        <Route path="/" exact component={UsersList} />
        <Route path="/notes" component={CreateNote} />
        <Route path="/notesList" component={NotesList} />
        <Route path="/editNote/:id" component={CreateNote} />
        
      </div>

    </Router>
  );
}

export default App;
