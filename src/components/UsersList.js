import React, { Component } from 'react'
import axios from 'axios' //Cliente HTTP basado en promesas para el navegador y node.js
import MaterialIcon from 'material-icons-react';//Material Icons, se utiliza para los iconos en React

export default class UsersList extends Component {
    //Estado de cada uno de los campos del formulario usuarios.
    state = {
        users: [],
        firstname: '',
        secondname: '',
        email: '',
        telephone: '',
        address: '',
        age: ''
    }
    // Este metodo garantiza que se invocará dos veces el render(), el usuario no verá el estado intermedio. 
    async componentDidMount() {
        this.getUsers();
        console.log(this.state.users);
    }
    //Se obtien los usuarios desde la API utilizando axios.
    getUsers = async () => {
        const res = await axios.get('http://localhost:4000/api/users');
        this.setState({ users: res.data });
    }
    //Se desencadena después de escribir algo en un campo para mostrar su estado.
    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = async e => {
        e.preventDefault();//Evita que al enviar el formulario se refresque la vista.
        await axios.post('http://localhost:4000/api/users', {//se envia el estado de los datos obtenidos en cada campo.
            firstName: this.state.firstName,
            secondName: this.state.secondName,
            email: this.state.email,
            telephone: this.state.telephone,
            address: this.state.address,
            age: this.state.age
        })
        this.getUsers();//Se obtienen los usuarios 
        this.setState({ //Se limpian los campos para ingresar un nuevo usuario.
            firstName: '',
            secondName: '',
            email: '',
            telephone: '',
            address: '',
            age: ''
        });
    }
    //Se elimina un usuario a través de el ID
    deleteUser = async (id) => {
        await axios.delete('http://localhost:4000/api/users/' + id)
        this.getUsers();
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-4">{/*Se divide el hancho de la pantalla, 4 espacios para la CARD*/}
                    <div className="card card-body">
                        <div className="card-header">Create a User</div>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="from-control mt-2 col-md-12"
                                    placeholder="First Name"
                                    onChange={this.onInputChange}
                                    name="firstName"
                                    value={this.state.firstName}
                                />
                                <input
                                    type="text"
                                    className="from-control mt-2 col-md-12"
                                    placeholder="Second Name"
                                    onChange={this.onInputChange}
                                    name="secondName"
                                    value={this.state.secondName}
                                />
                                <input
                                    type="email"
                                    className="from-control mt-2 col-md-12"
                                    placeholder="Email"
                                    onChange={this.onInputChange}
                                    name="email"
                                    value={this.state.email}
                                />
                                <input
                                    type="text"
                                    className="from-control mt-2 col-md-12"
                                    placeholder="Address"
                                    onChange={this.onInputChange}
                                    name="address"
                                    value={this.state.address}
                                />
                                <input
                                    type="text"
                                    className="from-control mt-2 col-md-12"
                                    placeholder="Telephone"
                                    onChange={this.onInputChange}
                                    name="telephone"
                                    value={this.state.telephone}
                                />
                                <input
                                    type="number"
                                    className="from-control mt-2 col-md-12"
                                    placeholder="Age"
                                    onChange={this.onInputChange}
                                    name="age"
                                    value={this.state.age}
                                />
                            </div>
                            <button type="submit" className="btn btn-outline-primary">
                                Save
                            </button>
                        </form>
                    </div>
                </div>
                <div className="col-md-8">
                    <table className="table table-bordered">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">First Name</th>
                                <th scope="col">Second Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Telephone</th>
                                <th scope="col">Address</th>
                                <th scope="col">Age</th>
                                <th scope="col">Options</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                this.state.users.map(
                                    user => (

                                        <tr key={user._id}>
                                            <td >
                                                {user.firstName}
                                            </td>
                                            <td >
                                                {user.secondName}
                                            </td>
                                            <td >
                                                {user.email}
                                            </td>
                                            <td >
                                                {user.telephone}
                                            </td>
                                            <td >
                                                {user.address}
                                            </td>
                                            <td >
                                                {user.age}
                                            </td>
                                            <td onClick={() => this.deleteUser(user._id)}>
                                                <button className="btn btn-outline-danger">
                                                    <MaterialIcon icon="delete" />
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
