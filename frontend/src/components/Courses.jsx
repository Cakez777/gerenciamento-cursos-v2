import React, { useState, useEffect } from 'react';
import { courseService } from '../services/api';
import '../App.css';

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [editingCourse, setEditingCourse] = useState(null);
    const [formData, setFormData] = useState({ name: '', description: '', price: '' });

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            setLoading(true);
            const response = await courseService.getAll();
            if (Array.isArray(response.data.data)) {
                setCourses(response.data.data);
            } else {
                setCourses([]);
            }
        } catch (err) {
            setError('Falha ao buscar cursos');
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
            const payload = { ...formData, price: parseFloat(formData.price) };
            if (editingCourse) {
                await courseService.update(editingCourse.id, payload);
            } else {
                await courseService.create(payload);
            }
            setFormData({ name: '', description: '', price: '' });
            setShowForm(false);
            setEditingCourse(null);
            fetchCourses();
        } catch {
            setError('Falha ao salvar curso');
        }
    };

    const handleEdit = (course) => {
        setEditingCourse(course);
        setFormData({ name: course.name, description: course.description, price: course.price });
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Tem certeza que deseja deletar este curso?')) {
            try {
                await courseService.delete(id);
                fetchCourses();
            } catch {
                setError('Falha ao deletar curso');
            }
        }
    };

    const handleCancel = () => {
        setShowForm(false);
        setEditingCourse(null);
        setFormData({ name: '', description: '', price: '' });
    };

    if (loading) return <div>Carregando...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="page-center-wrapper">
            <h2>Cursos</h2>
            <button onClick={() => setShowForm(!showForm)}>{showForm ? 'Cancelar' : 'Novo Curso'}</button>

            {showForm && (
                <div className="card">
                    <h3>{editingCourse ? 'Editar Curso' : 'Novo Curso'}</h3>
                    <form onSubmit={handleSubmit}>
                        <label>Nome</label>
                        <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />

                        <label>Preço (R$)</label>
                        <input type="number" name="price" value={formData.price} onChange={handleInputChange} required min="0" step="0.01" />

                        <label>Descrição</label>
                        <textarea name="description" rows={3} value={formData.description} onChange={handleInputChange} required />

                        <button type="submit">{editingCourse ? 'Atualizar' : 'Criar'}</button>
                        <button type="button" onClick={handleCancel}>Cancelar</button>
                    </form>
                </div>
            )}

            {courses.map(course => (
                <div key={course.id} className="card">
                    <p><strong>{course.name}</strong> - R$ {parseFloat(course.price).toFixed(2)}</p>
                    <p>{course.description}</p>
                    <button onClick={() => handleEdit(course)}>Editar</button>
                    <button onClick={() => handleDelete(course.id)}>Excluir</button>
                </div>
            ))}
        </div>
    );
};

export default Courses;
