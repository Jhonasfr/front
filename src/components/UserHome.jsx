import './styles/UserHome.css';
import { useEffect, useState } from 'react';

function UserHome({ user }) {
    const [codes, setCodes] = useState([]);
    const [codeInput, setCodeInput] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    

    const fetchCodes = async () => {
        try {
            const response = await fetch(`https://backen-bice.vercel.app/v1/signos/getCodes?usuarioId=${user}`);
            const data = await response.json();
            if (response.ok) {
                setCodes(data);
                setError(null);
            } else {
                setError(data.error || 'Error al obtener los códigos');
            }
        } catch (error) {
            setError('Error al conectarse al servidor');
            console.error('Error al conectarse al servidor:', error);
        }
    };

    useEffect(() => {
        fetchCodes();
    }, []);

    const registerCode = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('https://backen-bice.vercel.app/v1/signos/redeemCode', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ codigo: codeInput, usuarioId: user }),
            });
            const data = await response.json();
            if (response.ok) {
                fetchCodes();
                setSuccessMessage('Código registrado ');
            } else {
                setError(data.error || 'Error al registrar el código');
            }
        } catch (error) {
            setError('Error al conectarse al servidor');
            setSuccessMessage(null); 
            console.error('Error al conectarse al servidor:', error);
        }
    };

    

    return (
        <div className="container">
            <h1>Registrar Código</h1>
            {error && <p className="error">{error}</p>}
            <form onSubmit={registerCode}>
                <input
                    type="text"
                    placeholder="Código de 3 dígitos"
                    value={codeInput}
                    onChange={(e) => setCodeInput(e.target.value)}
                    required
                />
                <button type="submit">Registrar</button>
            </form>
            <div className="table-container">
                <table className="styled-table">
                    <thead>
                        <tr>
                            <th>Fecha de Registro</th>
                            <th>Código Usado</th>
                            <th>Monto del Premio</th>
                        </tr>
                    </thead>
                    <tbody>
                        {codes.map((code, index) => (
                            <tr key={index}>
                                <td>{new Date(code.fechaRegistro).toLocaleString()}</td>
                                <td>{code.codigo}</td>
                                <td>{code.premio}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default UserHome;
