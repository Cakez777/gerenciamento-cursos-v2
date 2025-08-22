// src/App.tsx
import React from 'react';
import './App.css';
import StudentList from './StudentList'; // Importe o componente

function App() {
  return (
    <div className="App">
      <h1>Gestão de Alunos</h1>
      <StudentList /> {/* Adicione o componente aqui */}
    </div>
  );
}

export default App;