import React, { useEffect, useState } from 'react';
import { studentService, reportService } from '../resources/js/services/api'; // CAMINHO CORRETO!

function App() {
    const [students, setStudents] = useState([]);
    const [stats, setStats] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [studentsResponse, statsResponse] = await Promise.all([
                studentService.getAll(),
                reportService.getRevenueByCourse()
            ]);

            setStudents(studentsResponse.data);
            setStats(statsResponse.data);
        } catch (error) {
            console.error('Erro ao carregar dados:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Carregando...</div>;

    return (
        <div className="container">
            <h1>🎓 Gerenciamento de Cursos</h1>
            
            <div className="dashboard">
                <h2>📊 Dashboard</h2>
                <div className="stats">
                    <div className="stat-card">
                        <h3>Alunos</h3>
                        <p>{students.length}</p>
                    </div>
                    <div className="stat-card">
                        <h3>Receita</h3>
                        <p>R$ {stats.total_revenue || 0}</p>
                    </div>
                </div>
            </div>

            <div className="students-list">
                <h2>👥 Estudantes</h2>
                {students.map(student => (
                    <div key={student.id} className="student-card">
                        <h3>{student.name}</h3>
                        <p>Email: {student.email}</p>
                        <p>CPF: {student.cpf}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;