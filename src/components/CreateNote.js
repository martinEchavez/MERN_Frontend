import React, { Component } from 'react'
import DatePicker from 'react-datepicker';//Mostrar el calendario
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'//Cliente HTTP basado en promesas para el navegador y node.js

export default class CreateNote extends Component {
    //Estado de cada uno de los campos del formulario notas.
    state = {
        title: '',
        content: '',
        date: new Date(),
        userSelected: '',
        users: [],
        editing: false,//Se verifica si se esta editando una nota.
        _id: ''
    }
    // Este metodo garantiza que se invocará dos veces el render(), el usuario no verá el estado intermedio. 
    async componentDidMount() {//async se utiliza para indicar que es un codigo asincrono y se utiliza junto con await
        const res = await axios.get('http://localhost:4000/api/users');
        if (res.data.length > 0) {
            this.setState({
                users: res.data.map(user => user.firstName),
                userSelected: res.data[0].firstName//Se selecciona un usuario por defecto en el Select
            }) 
        }
        if (this.props.match.params.id) {
            console.log(this.props.match.params.id)
            const res = await axios.get('http://localhost:4000/api/notes/' + this.props.match.params.id);
            console.log(res.data)
            this.setState({//asignan los datos en la vista para ser editados.
                title: res.data.title,
                content: res.data.content,
                date: new Date(res.data.date),
                userSelected: res.data.author,
                _id: res.data._id,
                editing: true
            });
        }
    }

    onSubmit = async (e) => {
        e.preventDefault();//Evita que al enviar el formulario se refresque la vista.
        if (this.state.editing) {//si se esta editando se mandan los datos a cambair.
            const updatedNote = {
                title: this.state.title,
                content: this.state.content,
                author: this.state.userSelected,
                date: this.state.date
            };
            await axios.put('http://localhost:4000/api/notes/' + this.state._id, updatedNote);
        } else {//Si editing = false; se crea la nota.
            const newNote = {
                title: this.state.title,
                content: this.state.content,
                author: this.state.userSelected,
                date: this.state.date
            };
            axios.post('http://localhost:4000/api/notes', newNote);//Se crea la nota.
        }
        window.location.href = '/notesList';//Despues de guardar la nota se redirecciona a la vista lista de notas.

    }
    //Se desencadena después de escribir algo en un campo para mostrar su estado.
    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    //Se escucha el estado de cada entrada.
    onChangeDate = date => {
        this.setState({ date });
    }

    render() {
        return (
            <div className="col-md-6 offset-md-3">{/*Se crea el espacio dinamico para la card y se centra. */}
                <div className="card card-body">
                    <h4>Create a Note</h4>
                    <form onSubmit={this.onSubmit}>
                        {/* Se selecciona el usuario*/}
                        <div className="form-group">
                            <select
                                className="form-control"
                                value={this.state.userSelected}
                                onChange={this.onInputChange}
                                name="userSelected"
                                required>
                                {
                                    this.state.users.map(user => (
                                        <option key={user} value={user}>
                                            {user}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                        {/* Titulo de la nota */}
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Title"
                                onChange={this.onInputChange}
                                name="title"
                                value={this.state.title}
                                required />
                        </div>
                        {/* Contenido de la nota */}
                        <div className="form-group">
                            <textarea
                                type="text"
                                className="form-control"
                                placeholder="Content"
                                name="content"
                                onChange={this.onInputChange}
                                value={this.state.content}
                                required>
                            </textarea>
                        </div>
                        {/* Fecha de la nota */}
                        <div className="form-group">
                            <DatePicker className="form-control" selected={this.state.date} onChange={this.onChangeDate} />
                        </div>
                        <button className="btn btn-primary">
                            Save
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}