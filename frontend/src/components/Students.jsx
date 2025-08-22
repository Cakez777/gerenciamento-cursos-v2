import React, { useState, useEffect } from 'react';
import { studentService } from '../services/api';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Students = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [editingStudent, setEditingStudent] = useState(null);
    const [formData, setFormData] = useState({ name: '', email: '', cpf: '' });

    const navigate = useNavigate();

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            setLoading(true);
            const response = await studentService.getAll();
            setStudents(response.data);
        } catch (err) {
            setError('Failed to fetch students');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingStudent) {
                await studentService.update(editingStudent.id, formData);
                setFormData({ name: '', email: '', cpf: '' });
                setShowForm(false);
                setEditingStudent(null);
                fetchStudents();
            } else {
                const response = await studentService.create(formData);
                const newStudent = response.data.data;
                navigate('/enrollments', { state: { newStudent, message: 'Aluno criado com sucesso!' } });
            }
        } catch {
            setError('Failed to save student');
        }
    };

    const handleEdit = (student) => {
        setEditingStudent(student);
        setFormData({ name: student.name, email: student.email, cpf: student.cpf });
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Tem certeza que deseja deletar este aluno?')) {
            try {
                await studentService.delete(id);
                fetchStudents();
            } catch {
                setError('Failed to delete student');
            }
        }
    };

    const handleCancel = () => {
        setShowForm(false);
        setEditingStudent(null);
        setFormData({ name: '', email: '', cpf: '' });
    };

    if (loading) return <div>Carregando...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="page-center-wrapper">
            <h2>Alunos</h2>
            <button onClick={() => setShowForm(!showForm)}>{showForm ? 'Cancelar' : 'Novo Aluno'}</button>

            {showForm && (
                <div className="card">
                    <h3>{editingStudent ? 'Editar Aluno' : 'Novo Aluno'}</h3>
                    <form onSubmit={handleSubmit}>
                        <label>Nome</label>
                        <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />

                        <label>Email</label>
                        <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />

                        <label>CPF</label>
                        <input type="text" name="cpf" value={formData.cpf} onChange={handleInputChange} required />

                        <button type="submit">{editingStudent ? 'Atualizar' : 'Criar'}</button>
                        <button type="button" onClick={handleCancel}>Cancelar</button>
                    </form>
                </div>
            )}

            {students.map(student => (
                <div key={student.id} className="card">
                    <p><strong>Nome:</strong> {student.name}</p>
                    <p><strong>Email:</strong> {student.email}</p>
                    <p><strong>CPF:</strong> {student.cpf}</p>
                    <button onClick={() => handleEdit(student)}>Editar</button>
                    <button onClick={() => handleDelete(student.id)}>Excluir</button>
                </div>
            ))}
        </div>
    );
};

export default Students;
