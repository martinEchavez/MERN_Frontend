import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Clock from './Clock'

export default class Navigation extends Component {


    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-primary bg-light">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        Sysnet
                    </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/">Users</Link>{/*Cada Link redirecciona a una vista diferente*/}
                            </li>
                            <li className="nav-item ">
                                <Link className="nav-link" to="/notes">Notes +</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/notesList">Notes</Link>
                            </li>
                            <li className="nav-item">
                                <Clock/>
                            </li>
                        </ul>                        
                    </div>
                </div>
            </nav>
        )
    }
}
