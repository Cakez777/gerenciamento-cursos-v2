import axios from 'axios';
import { useEffect, useState } from 'react';

const api = axios.create({
    baseURL: 'http://localhost:3000', // Update this URL as needed
});

export { api };
interface Student {
    id: number;
    name: string;
    email: string;
    cpf: string;
}

const StudentList = () => {
    const [students, setStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await api.get('/students');
                setStudents(response.data);
            } catch (err) {
                setError('Erro ao carregar alunos');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, []);

    if (loading) return <div>Carregando...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold">Lista de Alunos</h2>
            <ul className="divide-y divide-gray-200">
                {students.map(student => (
                    <li key={student.id} className="py-4">
                        <div className="font-medium">{student.name}</div>
                        <div className="text-gray-600">{student.email}</div>
                        <div className="text-sm text-gray-500">CPF: {student.cpf}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default StudentList;