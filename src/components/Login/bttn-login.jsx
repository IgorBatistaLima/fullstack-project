import { useState } from 'react';
import LoginForm from './loginform';

const ButtonLogin = ({ onLogin }) => {
    const [showLoginForm, setShowLoginForm] = useState(false);

    const handleLoginSuccess = () => {
        onLogin();
        setShowLoginForm(false);
    };

    return (
        <>
            <button
                onClick={() => setShowLoginForm(true)}
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
            >
                Login
            </button>
            {showLoginForm && <LoginForm onClose={() => setShowLoginForm(false)} onLoginSuccess={handleLoginSuccess} />}
        </>
    );
};

export default ButtonLogin;
