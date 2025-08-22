import React, { useState, useEffect } from 'react';
import { enrollmentService, studentService, courseService } from '../services/api';
import { useLocation } from 'react-router-dom';
import '../App.css';

const Enrollments = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingEnrollment, setEditingEnrollment] = useState(null);
  const [formData, setFormData] = useState({
    student_id: '',
    course_id: '',
    start_date: '',
    price_paid: '',
    status: 'active'
  });

  const location = useLocation();

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);
        await Promise.all([fetchEnrollments(), fetchStudents(), fetchCourses()]);
      } finally {
        setLoading(false);

        if (location.state?.newStudent) {
          setFormData(prev => ({ ...prev, student_id: location.state.newStudent.id }));
          setShowForm(true);
          if (location.state.message) alert(location.state.message);
        }
      }
    };
    fetchAll();
  }, [location]);

  const fetchEnrollments = async () => {
    try {
      const response = await enrollmentService.getAll();
      const list = response?.data?.data || response?.data || [];
      setEnrollments(Array.isArray(list) ? list : []);
    } catch {
      setError('Falha ao buscar matrículas');
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await studentService.getAll();
      const list = response?.data?.data || response?.data || [];
      setStudents(Array.isArray(list) ? list : []);
    } catch {
      setError('Falha ao buscar alunos');
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await courseService.getAll();
      const list = response?.data?.data || response?.data || [];
      setCourses(Array.isArray(list) ? list : []);
    } catch {
      setError('Falha ao buscar cursos');
    }
  };

  const handleInputChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...formData, price_paid: formData.price_paid === '' ? null : parseFloat(formData.price_paid) };
      if (editingEnrollment) await enrollmentService.update(editingEnrollment.id, payload);
      else await enrollmentService.create(payload);

      setFormData({ student_id: '', course_id: '', start_date: '', price_paid: '', status: 'active' });
      setShowForm(false);
      setEditingEnrollment(null);
      await fetchEnrollments();
    } catch {
      setError('Falha ao salvar matrícula');
    }
  };

  const handleEdit = (e) => {
    setEditingEnrollment(e);
    setFormData({
      student_id: e.student_id || '',
      course_id: e.course_id || '',
      start_date: e.start_date || '',
      price_paid: e.price_paid != null ? String(e.price_paid) : '',
      status: e.status || 'active'
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Deseja realmente excluir esta matrícula?')) return;
    try {
      await enrollmentService.delete(id);
      await fetchEnrollments();
    } catch {
      setError('Falha ao excluir matrícula');
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingEnrollment(null);
    setFormData({ student_id: '', course_id: '', start_date: '', price_paid: '', status: 'active' });
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active': return 'Ativa';
      case 'cancelled': return 'Cancelada';
      case 'completed': return 'Concluída';
      default: return status;
    }
  };

  if (loading) return <div>Carregando...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div className="page-center-wrapper">
      <h2>Matrículas</h2>
      <button onClick={() => setShowForm(v => !v)}>{showForm ? 'Cancelar' : 'Nova Matrícula'}</button>

      {showForm && (
        <div className="card">
          <form onSubmit={handleSubmit}>
            <label>Aluno</label>
            <select name="student_id" value={formData.student_id} onChange={handleInputChange} required>
              <option value="">Selecione um aluno</option>
              {students.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>

            <label>Curso</label>
            <select name="course_id" value={formData.course_id} onChange={handleInputChange} required>
              <option value="">Selecione um curso</option>
              {courses.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>

            <label>Data de Início</label>
            <input type="date" name="start_date" value={formData.start_date} onChange={handleInputChange} required />

            <label>Valor Pago</label>
            <input type="number" name="price_paid" value={formData.price_paid} onChange={handleInputChange} min="0" step="0.01" required />

            <label>Status</label>
            <select name="status" value={formData.status} onChange={handleInputChange} required>
              <option value="active">Ativa</option>
              <option value="cancelled">Cancelada</option>
              <option value="completed">Concluída</option>
            </select>

            <button type="submit">{editingEnrollment ? 'Atualizar' : 'Criar'}</button>
            <button type="button" onClick={handleCancel}>Cancelar</button>
          </form>
        </div>
      )}

      {enrollments.map(e => (
        <div key={e.id} className="card">
          <p><strong>{e.student?.name} - {e.course?.name}</strong></p>
          <p>Início: {new Date(e.start_date).toLocaleDateString('pt-BR')}</p>
          <p>Pago: R$ {e.price_paid != null ? Number(e.price_paid).toFixed(2) : '0.00'}</p>
          <p>Status: {getStatusText(e.status)}</p>
          <button onClick={() => handleEdit(e)}>Editar</button>
          <button onClick={() => handleDelete(e.id)}>Excluir</button>
        </div>
      ))}
    </div>
  );
};

export default Enrollments;
