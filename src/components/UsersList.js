import React, { useState, useEffect } from 'react'
import { URL } from './Configuracion'
import MaterialIcon from 'material-icons-react';//Material Icons, se utiliza para los iconos en React
import DatePicker from 'react-datepicker';//Mostrar el calendario
import 'react-datepicker/dist/react-datepicker.css'
import { store } from 'react-notifications-component';

const UsersList = () => {
    //Estado de cada uno de los campos del formulario usuarios.
    const [fechaNacimiento, setfechaNacimiento] = useState(new Date());
    const [users, setUsers] = useState([])
    const [datos, setDatos] = useState({
        nombres: '',
        apellidos: '',
        email: '',
        numDocumento: '',
        area: '',
        salario: '',
        estado: false
    })

    // Este metodo garantiza que se invocará dos veces el render(), el usuario no verá el estado intermedio. 
    useEffect(() => {
        getUsers();
    }, [])

    //Se obtien los usuarios desde la API utilizando axios.
    const getUsers = async () => {
        try {
            const respuesta = await fetch(`${URL}/api/users`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Accept': 'application/json',
                },
            });
            const res = await respuesta.json();
            setUsers(res)
        } catch (error) {
            alert('No hay usuarios registrados: ' + error);
        }
    }
    //Se desencadena después de escribir algo en un campo para mostrar su estado.
    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.name === 'estado' ? target.checked : target.value;
        const name = target.name;
        setDatos({
            ...datos,
            [name]: value
        });
    }
    const { nombres, apellidos, email, numDocumento, area, salario, estado } = datos;

    const createUser = async (e, id) => {
        e.preventDefault();
        const resultado = await fetch(`${URL}/api/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ datos, fechaNacimiento }),
        });
        const res = await resultado.json();
        console.log(res)
        store.addNotification({
            title: "Usuario guardado",
            message: "El usuario se ha creado exitosamente.",
            type: "success",
            insert: "top",
            container: "top-center",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
              duration: 3000,
              onScreen: true
            }
          });
        getUsers();
        setDatos({
            nombres: '',
            apellidos: '',
            email: '',
            numDocumento: '',
            area: '',
            salario: '',
            estado: false
        });
    }
    //Se elimina un usuario a través de el ID
    const deleteUser = async (id) => {
        try {
            const resConfirm = window.confirm('¿Está seguro de querer eliminar este usuario? ');
            if (resConfirm) {
                const res = await fetch(`${URL}/api/users/${id}`, {
                    method: 'DELETE'
                });
                const data = await res.json();
                console.log(data);
                getUsers();
                store.addNotification({
                    title: "Usuario eliminado",
                    message: "Usuario eliminado exitosamente.",
                    type: "danger",
                    insert: "top",
                    container: "top-center",
                    animationIn: ["animated", "fadeIn"],
                    animationOut: ["animated", "fadeOut"],
                    dismiss: {
                      duration: 3000,
                      onScreen: true
                    }
                  });
            }
        } catch (error) {
            alert('Error deleteUser: ' + error);
        }
    }
    return (
        <div className="row">
            <div className="col-md-4">{/*Se divide el hancho de la pantalla, 4 espacios para la CARD*/}
                <div className="card card-body">
                    <form onSubmit={createUser}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control mt-2"
                                placeholder="Nombre"
                                onChange={handleInputChange}
                                name="nombres"
                                value={nombres}
                            />
                            <input
                                type="text"
                                className="form-control mt-2"
                                placeholder="Apellidos"
                                onChange={handleInputChange}
                                name="apellidos"
                                value={apellidos}
                            />
                            {/* Fecha de la nota */}
                            <div>
                                <DatePicker
                                    className="form-control mt-2"
                                    selected={fechaNacimiento}
                                    onChange={date => setfechaNacimiento(date)}
                                />
                            </div>
                            <input
                                className="form-control mt-2"
                                type="email"
                                name="email"
                                id="email"
                                onChange={handleInputChange}
                                placeholder="Correo origen"
                                value={email}
                                required
                            />
                            <input
                                type="text"
                                className="form-control mt-2"
                                placeholder="Número de documento"
                                onChange={handleInputChange}
                                name="numDocumento"
                                value={numDocumento}
                            />
                            <input
                                type="number"
                                className="form-control mt-2"
                                placeholder="Área"
                                onChange={handleInputChange}
                                name="area"
                                value={area}
                            />
                            <input
                                type="number"
                                className="form-control mt-2"
                                placeholder="Salario"
                                onChange={handleInputChange}
                                name="salario"
                                value={salario}
                            />
                            <div className="form-group form-check">
                                <input
                                    className="form-check-input"
                                    checked={estado}
                                    onChange={handleInputChange}
                                    type="checkbox"
                                    name="estado"
                                />
                                <label className="form-check-label">
                                    Estado
                                </label>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary btn-block">
                            Guardar
                            </button>
                    </form>
                </div>
            </div>
            <div className="col-md-8">
                <table className="table table-bordered">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Nombres</th>
                            <th scope="col">Apellidos</th>
                            <th scope="col">Email</th>
                            <th scope="col">Área</th>
                            <th scope="col">Salario</th>
                            <th scope="col">Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map(
                                user => (

                                    <tr key={user._id}>
                                        <td >
                                            {user.nombres}
                                        </td>
                                        <td >
                                            {user.apellidos}
                                        </td>
                                        <td >
                                            {user.email}
                                        </td>
                                        <td >
                                            {user.area}
                                        </td>
                                        <td >
                                            {user.salario}
                                        </td>
                                        <td >
                                            <button onClick={() => deleteUser(user._id)}
                                                className="btn btn-outline-danger">
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
export default UsersList;