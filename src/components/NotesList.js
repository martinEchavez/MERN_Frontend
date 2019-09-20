import React, { Component } from 'react'
import axios from 'axios'//Cliente HTTP basado en promesas para el navegador y node.js
import { format } from 'timeago.js'//Manejar el calendario y mostrar las fechas en formato "hace un momento"
import { Link } from 'react-router-dom'
import MaterialIcon from 'material-icons-react';//manejo de iconos en React

export default class NotesList extends Component {
    //estado de cada nota
    state = {
        notes: []
    }
    // Este metodo garantiza que se invocará dos veces el render(), el usuario no verá el estado intermedio. 
    async componentDidMount() {
        this.getNotes();
    }
    //Se obtiene las notas desde la API
    getNotes = async () => {
        const res = await axios.get('http://localhost:4000/api/notes')
        this.setState({
            notes: res.data
        });
    }
    //Se elimina una nota por su ID
    deleteNote = async (id) => {
        await axios.delete('http://localhost:4000/api/notes/' + id);
        this.getNotes();
    }

    render() {
        return (
            <div className="row">
                {
                    this.state.notes.map(note => (
                        <div className="col-md-3 p-2" key={note._id}>{/*Permite manejar el tamaño de cada CARD y su ubicación dinamicamente en la pantalla*/}
                            <div className="card">
                                <div className="card-header d-flex justify-content-between">
                                    <h5>{note.title}</h5>
                                    <Link to={"/editNote/" + note._id} className="btn btn-outline-secondary">
                                        <MaterialIcon icon="edit" />
                                    </Link>
                                </div>
                                <div className="card-body">
                                    <p>
                                        {note.content}
                                    </p>
                                    <p>
                                        Author: {note.author}
                                    </p>
                                    <p>
                                        {format(note.createdAt)}
                                    </p>
                                </div>
                                <div className="card-footer">
                                    <button className="btn btn-outline-danger" onClick={() => this.deleteNote(note._id)}>
                                        <MaterialIcon icon="delete" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        )
    }
}