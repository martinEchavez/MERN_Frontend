import React, { useState, useEffect } from 'react'
import { URL } from './Configuracion'
import { format } from 'timeago.js'//Manejar el calendario y mostrar las fechas en formato "hace un momento"
import { Link } from 'react-router-dom'
import { store } from 'react-notifications-component';
import MaterialIcon from 'material-icons-react';//manejo de iconos en React

const AreasList = () => {
    //estado de cada nota
    const [areas, setAreas] = useState([])
    useEffect(() => {
        getAreas();
    }, [])

    const getAreas = async () => {
        try {
            const respuesta = await fetch(`${URL}/api/areas`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Accept': 'application/json',
                },
            });
            const res = await respuesta.json();
            setAreas(res)
        } catch (error) {
            alert('No hay Areas: ' + error);
        }
    }
    //Se elimina una nota por su ID

    const deleteNote = async (id) => {
        try {
            const resConfirm = window.confirm('¿Está seguro de querer eliminar esta área? ');
            if (resConfirm) {
                const res = await fetch(`${URL}/api/areas/${id}`, {
                    method: 'DELETE'
                });
                const data = await res.json();
                console.log(data);
                getAreas();
                store.addNotification({
                    title: "Éxito",
                    message: "Área eliminada",
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
            {
                areas.map(area => (
                    <div className="col-md-3 p-2" key={area._id}>{/*Permite manejar el tamaño de cada CARD y su ubicación dinamicamente en la pantalla*/}
                        <div className="card">
                            <div className="card-header d-flex justify-content-between">
                                <h5>Código: {area.codigo}</h5>
                                <Link to={"/updateArea/" + area._id} className="btn btn-outline-secondary">
                                    <MaterialIcon icon="edit" />
                                </Link>
                            </div>
                            <div className="card-body">
                                <p>
                                    {area.nombre}
                                </p>
                                <p>
                                    Lider: {area.lider}
                                </p>
                                <p>
                                    {format(area.createdAt)}
                                </p>
                            </div>
                            <div className="card-footer">
                                <button className="btn btn-outline-danger" onClick={() => deleteNote(area._id)}>
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
export default AreasList;