import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'//Bootstrap para dar estilo.

import './App.css';
//Se importa cada uno de los componentes para ser mostrados a través de la URL
import Navigation from './components/Navigation'
import AreasList from './components/AreasList'
import CreateArea from './components/CreateArea'
import UsersList from './components/UsersList'

function App() {
  return (
    <Router>
      {/* Navegación */}
      <Navigation />
      <div className="container p-4">
      {/* Componentes por URL */}
        <Route path="/" exact component={UsersList} />
        <Route path="/areas" component={CreateArea} />
        <Route path="/areasList" component={AreasList} />
        <Route path="/updateArea/:id" component={CreateArea} />
      </div>
    </Router>
  );
}

export default App;
