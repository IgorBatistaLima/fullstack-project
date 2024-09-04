import { useState } from 'react';

const ModalAddGame = ({ onClose, onAddGame }) => {
    const [name, setName] = useState('');
    const [year, setYear] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('');

    const [errors, setErrors] = useState({});

    const validarFormulario = () => {
        const novoErros = {};


        if (!name) {
            novoErros.name = 'O nome do jogo é obrigatório.';
        }


        if (!year) {
            novoErros.year = 'O ano de lançamento é obrigatório.';
        } else if (isNaN(year) || year.length !== 4) {
            novoErros.year = 'Ano inválido. Deve conter 4 dígitos.';
        }


        if (!description) {
            novoErros.description = 'A descrição é obrigatória.';
        }


        if (!price) {
            novoErros.price = 'O preço é obrigatório.';
        } else if (isNaN(price) || Number(price) <= 0) {
            novoErros.price = 'Preço inválido. Deve ser um número positivo.';
        }


        if (!category) {
            novoErros.category = 'A categoria é obrigatória.';
        }


        if (!image) {
            novoErros.image = 'A URL da imagem é obrigatória.';
        }

        setErrors(novoErros);


        return Object.keys(novoErros).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();


        if (!validarFormulario()) {
            return;
        }

        const response = await fetch('http://localhost:3000/api/games/games', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ name, year, description, price, category, image })
        });

        if (response.ok) {
            onAddGame();
            onClose();
        } else {
            console.error('Falha ao adicionar o jogo');
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded shadow-lg w-80">
                <h2 className="text-xl font-bold mb-4">Adicionar Novo Jogo</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Nome"
                            className="w-full px-4 py-2 border border-gray-300 rounded"
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                    </div>
                    <div>
                        <input
                            type="text"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            placeholder="Ano"
                            className="w-full px-4 py-2 border border-gray-300 rounded"
                        />
                        {errors.year && <p className="text-red-500 text-sm">{errors.year}</p>}
                    </div>
                    <div>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Descrição"
                            className="w-full px-4 py-2 border border-gray-300 rounded"
                        />
                        {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                    </div>
                    <div>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="Preço"
                            className="w-full px-4 py-2 border border-gray-300 rounded"
                        />
                        {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
                    </div>
                    <div>
                        <input
                            type="text"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            placeholder="Categoria"
                            className="w-full px-4 py-2 border border-gray-300 rounded"
                        />
                        {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
                    </div>
                    <div>
                        <input
                            type="text"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            placeholder="URL da Imagem"
                            className="w-full px-4 py-2 border border-gray-300 rounded"
                        />
                        {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
                    >
                        Adicionar Jogo
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-700 transition duration-300 mt-2"
                    >
                        Fechar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ModalAddGame;
