import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/addUser.css';

function AddUser() {
    const [username, setUsername] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [cedula, setCedula] = useState('');
    const [correo, setCorreo] = useState('');
    const [celular, setCelular] = useState('');
    const [ciudad, setCiudad] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const goTo = useNavigate();

    const handleAddUser = async (event) => {
        event.preventDefault();
        
        try {
            const response = await fetch('https://backen-bice.vercel.app/v1/signos/addUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password,
                    role,
                    fechaNacimiento,
                    cedula,
                    correo,
                    celular,
                    ciudad
                }),
            });

            const data = await response.json();

            if (response.ok) {
                alert('Usuario agregado con éxito.');
                goTo('/');
            } else {
                alert(data.error || 'Error al agregar el usuario.');
            }
        } catch (error) {
            console.error('Error al agregar el usuario:', error);
            
        }
    };

    const handleBack = () => {
        goTo(-1);
    };

    return (
        <form onSubmit={handleAddUser}>
            <h1>Agregar Nuevo Usuario</h1>

            <label htmlFor="username">Nombre de Usuario</label>
            <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            /><br />

            <label htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
            <input
                type="date"
                id="fechaNacimiento"
                value={fechaNacimiento}
                onChange={(e) => setFechaNacimiento(e.target.value)}
                required
            /><br />

            <label htmlFor="cedula">Cédula</label>
            <input
                type="text"
                id="cedula"
                value={cedula}
                onChange={(e) => setCedula(e.target.value)}
                required
            /><br />

            <label htmlFor="correo">Correo</label>
            <input
                type="email"
                id="correo"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
            /><br />

            <label htmlFor="celular">Celular</label>
            <input
                type="text"
                id="celular"
                value={celular}
                onChange={(e) => setCelular(e.target.value)}
                required
            /><br />

            <label htmlFor="ciudad">Ciudad</label>
            <input
                type="text"
                id="ciudad"
                value={ciudad}
                onChange={(e) => setCiudad(e.target.value)}
                required
            /><br />

            <label htmlFor="password">Contraseña</label>
            <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            /><br />

            <input type="submit" value="Agregar Usuario" className="btn" />
            <button type="button" onClick={handleBack} className="btn">Volver al Inicio</button>
        </form>
    );
}

export default AddUser;
