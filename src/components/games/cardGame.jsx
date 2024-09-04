import { useState, useEffect } from 'react';
import ModalEditGame from './ModalEditGame';
import '../../tailwind.css';

const CardGame = ({ games, onUpdate }) => {
    const [editGame, setEditGame] = useState(null);
    const [filterName, setFilterName] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
    const [filteredGames, setFilteredGames] = useState(games);

    useEffect(() => {
        // Filtro
        const applyFilters = () => {
            setFilteredGames(
                games.filter(game =>
                    (filterName === '' || game.name.toLowerCase().includes(filterName.toLowerCase())) &&
                    (filterCategory === '' || game.category.toLowerCase().includes(filterCategory.toLowerCase()))
                )
            );
        };

        applyFilters();
    }, [games, filterName, filterCategory]);

    const handleEditClick = (game) => {
        setEditGame(game);
    };

    const handleUpdate = () => {
        onUpdate();
        setEditGame(null);
    };

    return (
        <div className="container mx-auto p-6">

            <div className="mb-6">
                <input
                    type="text"
                    value={filterName}
                    onChange={(e) => setFilterName(e.target.value)}
                    placeholder="Filter by name"
                    className="mr-4 px-4 py-2 border border-gray-300 rounded"
                />
                <button
                    onClick={() => setFilterName('')}
                    className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
                >
                    Clear Name Filter
                </button>
                <input
                    type="text"
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    placeholder="Filter by category"
                    className="ml-4 px-4 py-2 border border-gray-300 rounded"
                />
                <button
                    onClick={() => setFilterCategory('')}
                    className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300 ml-4"
                >
                    Clear Category Filter
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredGames.map(game => (
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105" key={game._id}>
                        <img className="w-full h-48 object-cover" src={game.image} alt={game.name} />
                        <div className="p-4">
                            <h2 className="font-bold text-xl text-gray-800 mb-2">{game.name}</h2>
                            <p className="text-gray-600 text-sm mb-1">{game.year}</p>
                            <p className="text-gray-700 text-base mb-4">{game.description}</p>
                            <p className="font-semibold text-lg text-gray-900 mb-2">${game.price}</p>
                            <span className="inline-block bg-blue-200 text-blue-800 text-xs px-2 py-1 rounded">{game.category}</span>
                            <button
                                onClick={() => handleEditClick(game)}
                                className="bg-yellow-500 text-white font-bold py-1 px-2 rounded hover:bg-yellow-700 transition duration-300 mt-2"
                            >
                                Edit
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {editGame && <ModalEditGame game={editGame} onClose={() => setEditGame(null)} onUpdate={handleUpdate} />}
        </div>
    );
};

export default CardGame;
