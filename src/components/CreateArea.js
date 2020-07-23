import React, { useState, useEffect } from 'react'
import { URL } from './Configuracion'
import { store } from 'react-notifications-component';

const CreateArea = (props) => {
    const { match: { params } } = props;
    //Estado de cada uno de los campos del formulario notas.
    let editing = false;
    const [datos, setDatos] = useState({
        codigo: '',
        nombre: '',
        lider: '',
        estado: false,
    })
    useEffect(() => {
        getArea();
    }, [])
    const { codigo, nombre, lider, estado } = datos;
    if(params.id !== undefined){
        editing = true;
    }
    const getArea = async () => {
        try {
            const respuesta = await fetch(`${URL}/api/areas/` + params.id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Accept': 'application/json',
                },
            });
            const res = await respuesta.json();
            console.log(res)
            setDatos(res)
        } catch (error) {
            alert('No hay Area: ' + error);
        }
    }
    const guardarArea = async (e) => {
        e.preventDefault();
        if(editing) {
            const resultado = await fetch(`${URL}/api/areas/` + params.id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ datos }),
            });
            const res = await resultado.json();
            console.log(res)
            store.addNotification({
                title: "Éxito",
                message: "Área editada",
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
            setDatos({
                codigo: '',
                nombre: '',
                lider: '',
                estado: false,
            });
        } else {
            const resultado = await fetch(`${URL}/api/areas`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ datos }),
            });
            const res = await resultado.json();
            console.log(res)
            setDatos({
                codigo: '',
                nombre: '',
                lider: '',
                estado: false,
            });
            store.addNotification({
                title: "Éxito",
                message: "Área guardada",
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
        }
    }

    //Se desencadena después de escribir algo en un campo para mostrar su estado.
    const onInputChange = (event) => {
        const target = event.target;
        const value = target.name === 'estado' ? target.checked : target.value;
        const name = target.name;
        setDatos({
            ...datos,
            [name]: value
        });
    }
    return (
        <div className="col-md-6 offset-md-3">{/*Se crea el espacio dinamico para la card y se centra. */}
            <div className="card card-body">
                <h4>Crear Área</h4>
                <form onSubmit={guardarArea}>
                    {/* Código del área */}
                    <div className="form-group">
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Código"
                            onChange={onInputChange}
                            name="codigo"
                            value={codigo}
                            required />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nombre"
                            onChange={onInputChange}
                            name="nombre"
                            value={nombre}
                            required />
                    </div>
                    <div className="form-group">
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Lider"
                            onChange={onInputChange}
                            name="lider"
                            value={lider}
                            required />
                    </div>
                    <div className="form-group form-check">
                        <input
                            className="form-check-input"
                            checked={estado}
                            onChange={onInputChange}
                            type="checkbox"
                            name="estado"
                        />
                        <label className="form-check-label">
                            Estado
                                </label>
                    </div>
                    {editing ?< button className="btn btn-primary btn-block">
                        Editar
                    </button> : <button className="btn btn-primary btn-block">
                        Guardar
                    </button>}
                    
                </form>
            </div>
        </div>
    )
}
export default CreateArea;