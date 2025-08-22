import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Home = () => {
  const navigate = useNavigate();

  const cards = [
    { title: 'Alunos', description: 'Gerenciar alunos', path: '/students' },
    { title: 'Cursos', description: 'Gerenciar cursos', path: '/courses' },
    { title: 'Matrículas', description: 'Gerenciar matrículas', path: '/enrollments' },
    { title: 'Relatórios', description: 'Visualizar relatórios', path: '/reports' },
  ];

  return (
    <div className="App">
      <header className="App-header">
        <h1>Bem-vindo ao Sistema de Cursos</h1>
      </header>

      <div className="home-cards">
        {cards.map((card, index) => (
          <div
            key={index}
            className="card"
            onClick={() => navigate(card.path)}
          >
            <h2>{card.title}</h2>
            <p>{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
