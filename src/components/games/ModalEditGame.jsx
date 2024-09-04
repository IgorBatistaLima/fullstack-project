import React, { useState, useEffect } from 'react';

const ModalEditGame = ({ game, onClose, onUpdate }) => {
    const [name, setName] = useState(game.name || '');
    const [year, setYear] = useState(game.year || '');
    const [description, setDescription] = useState(game.description || '');
    const [price, setPrice] = useState(game.price || '');
    const [category, setCategory] = useState(game.category || '');
    const [image, setImage] = useState(game.image || '');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(`http://localhost:3000/api/games/games/${game._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ name, year, description, price, category, image })
        });

        if (response.ok) {
            onUpdate();
            onClose();
        } else {
            console.error('Failed to update game');
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded shadow-lg w-80">
                <h2 className="text-xl font-bold mb-4">Edit Game</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Name"
                            className="w-full px-4 py-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            placeholder="Year"
                            className="w-full px-4 py-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Description"
                            className="w-full px-4 py-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="Price"
                            className="w-full px-4 py-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            placeholder="Category"
                            className="w-full px-4 py-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            placeholder="Image URL"
                            className="w-full px-4 py-2 border border-gray-300 rounded"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
                    >
                        Save Changes
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-700 transition duration-300 mt-2"
                    >
                        Close
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ModalEditGame;
