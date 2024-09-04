

const ButtonLogout = ({ onLogout }) => {
    const handleLogout = () => {
        onLogout();
        window.location.reload();
    };

    return (
        <button
            onClick={handleLogout}
            className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-700 transition duration-300"
        >
            Logout
        </button>
    );
};

export default ButtonLogout;
