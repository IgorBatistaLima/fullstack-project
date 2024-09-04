import { useState } from 'react';
import RegisterForm from './RegisterForm ';

const ButtonRegister = ({ onRegister }) => {
    const [showRegisterForm, setShowRegisterForm] = useState(false);

    const handleRegisterSuccess = () => {
        onRegister();
        setShowRegisterForm(false);
    };

    return (
        <>
            <button
                onClick={() => setShowRegisterForm(true)}
                className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-700 transition duration-300"
            >
                Register
            </button>
            {showRegisterForm && <RegisterForm onClose={() => setShowRegisterForm(false)} onRegisterSuccess={handleRegisterSuccess} />}
        </>
    );
};

export default ButtonRegister;
