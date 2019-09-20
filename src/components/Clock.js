import React, { Component } from 'react'

export default class Clock extends Component {
    constructor(props) {
        super(props);
        this.state = { date: new Date() };//Asigna la hora actual cuando se llama Clock
    }
    //Ciclo de vida del componente
    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),//Se pide al navegador que invoque el método tick() una vez por segundo. 
            1000
        );
    }
    //Si el componente Clock se elimina en algún momento del DOM, React invoca al método de ciclo de vida componentWillUnmount(), por lo que el temporizador se detiene.
    componentWillUnmount() {
        clearInterval(this.timerID);
    }
    //El navegador invoca este método cada segundo.
    tick() {
        this.setState({//Se cambia el estado del Date y esto hace que se invoque el método render nuevamente.
            date: new Date()
        });
    }

    render() {
        return (//Se muestra el estado de date cada segundo.
            <h4>{this.state.date.toLocaleTimeString()}</h4>
        );
    }
}

