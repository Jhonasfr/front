import './styles/AdminHome.css';
import { useEffect, useState } from 'react';

function AdminHome({ user }) {
    const [winners, setWinners] = useState([]);

    useEffect(() => {
        const fetchWinners = async () => {
            try {
                const response = await fetch('https://backen-gamma.vercel.app/v1/signos/viewUser');
                const data = await response.json();

                if (response. ok) {
                    setWinners(data);
                } else {
                    console.error('Error al obtener los ganadores:', data.message);
                        
                    setWinners(data);
                }
            } catch (error) {
                console.error('Error al conectarse al servidor:', error);
            }
        };

        fetchWinners();
    }, []);

    return (
        <div className="container">
            <h1>Lista de Ganadores</h1>
            <div className="table-container">
                <table className="styled-table">
                    <thead>
                        <tr>
                            <th>Fecha de Registro</th>
                            <th>Nombre del Ganador</th>
                            <th>Cédula</th>
                            <th>Teléfono</th>
                            <th>Código Usado</th>
                            <th>Monto del Premio</th>
                        </tr>
                    </thead>
                    <tbody>
                        {winners.map((winner, index) => ( winner.codigos.map((codigo)=>
                            <tr key={index}>
                                <td>{codigo.fechaRegistro}</td>
                                <td>{winner.usuario.username}</td>
                                <td>{winner.usuario.cedula}</td>
                                <td>{winner.usuario.celular}</td>
                                <td>{codigo.codigo}</td>
                                <td>{codigo.premio}</td>
                            </tr>
                        )))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AdminHome;
