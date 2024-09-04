import { useState } from 'react';
import ModalAddGame from './ModalAddGame';

const ButtonAddGame = ({ onAddGame }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsModalOpen(true)}
                className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-700 transition duration-300"
            >
                Add Game
            </button>
            {isModalOpen && <ModalAddGame onClose={() => setIsModalOpen(false)} onAddGame={onAddGame} />}
        </>
    );
};

export default ButtonAddGame;
