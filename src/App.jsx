import { useState, useEffect } from 'react';
import ButtonLogin from './components/Login/bttn-login';
import ButtonLogout from './components/logout/button-logout';
import ButtonAddGame from './components/games/ButtonAddGame';
import CardGame from './components/games/cardGame';
import ButtonRegister from './components/Register/ButtonRegister '; // Importa o botão de registro
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [games, setGames] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  useEffect(() => {
    const fetchGames = async () => {
      const response = await fetch('http://localhost:3000/api/games/games', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setGames(data);
    };

    if (isAuthenticated) {
      fetchGames();
    }
  }, [isAuthenticated]);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    window.location.reload(); // Recarrega a página após o logout
  };

  const handleRegister = () => {
    // Você pode adicionar lógica adicional aqui, como uma mensagem de boas-vindas
    console.log('Registro concluído');
  };

  const handleAddGame = () => {
    const fetchGames = async () => {
      const response = await fetch('http://localhost:3000/api/games/games', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setGames(data);
    };

    fetchGames();
  };

  const handleUpdate = () => {
    const fetchGames = async () => {
      const response = await fetch('http://localhost:3000/api/games/games', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setGames(data);
    };

    fetchGames();
  };

  return (
    <>
      <div className='Header' style={{ display: 'flex', justifyContent: 'center' }}>
        {isAuthenticated ? (
          <>
            <ButtonLogout onLogout={handleLogout} />
            <ButtonAddGame onAddGame={handleAddGame} />
          </>
        ) : (
          <>
            <ButtonLogin onLogin={handleLogin} />
            <ButtonRegister onRegister={handleRegister} />
          </>
        )}
      </div>
      <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
        {isAuthenticated && <CardGame games={games} onUpdate={handleUpdate} />}
      </div>
    </>
  );
}

export default App;
