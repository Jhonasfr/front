import './styles/Form.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Form({ callback }) {
    const [correo, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const goTo = useNavigate();

    const validateUser = async (event) => {
        event.preventDefault();
        const role = 'user';  // Solo usuarios, no admins

        try {
            const response = await fetch('https://backen-gamma.vercel.app/v1/signos/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ role, correo, password }),
            });

            const data = await response.json();
            console.log(data)
            if (response.ok) {
                callback(role);
                goTo('/userHome'); 
            } else {
                alert(data.message || 'Credenciales incorrectas');
            }
        } catch (error) {
            console.error('Error al intentar iniciar sesión:', error);
            alert('Hubo un problema con el servidor. Intenta de nuevo más tarde.');
        }
    };


    const handleAddUserClick = () => {
        goTo('/addUser');
    };

    return (
        <form onSubmit={validateUser}>
            <h1 id="txtBienvenida">Bienvenido</h1>
            <h4 className="txt">correo</h4>
            <input type="text" className="entry" onChange={(e) => setUsername(e.target.value)} required /><br />
            <h4 className="txt">password</h4>
            <input type="password" className="entry" onChange={(e) => setPassword(e.target.value)} required /><br />
            <input type="submit" value="Ingresar" id="btnEnviar" />
            <button type="button" id="btnAddUser" onClick={handleAddUserClick}>Crear Usuario</button>
        </form>
    );
}

export default Form;
