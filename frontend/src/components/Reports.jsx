import React, { useState, useEffect } from 'react';
import { reportService } from '../services/api';
import '../App.css';

const Reports = () => {
    const [totalInvestedByStudent, setTotalInvestedByStudent] = useState([]);
    const [topCourses, setTopCourses] = useState([]);
    const [revenueByCourse, setRevenueByCourse] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchReports();
    }, []);

    const fetchReports = async () => {
        try {
            setLoading(true);
            const [investedResponse, topResponse, revenueResponse] = await Promise.all([
                reportService.getTotalInvestedByStudent(),
                reportService.getTopCourses(),
                reportService.getRevenueByCourse()
            ]);

            const investedData = Array.isArray(investedResponse?.data) ? investedResponse.data : investedResponse?.data?.data || [];
            const topData = Array.isArray(topResponse?.data) ? topResponse.data : topResponse?.data?.data || [];
            const revenueData = Array.isArray(revenueResponse?.data) ? revenueResponse.data : revenueResponse?.data?.data || [];

            setTotalInvestedByStudent(investedData);
            setTopCourses(topData);
            setRevenueByCourse(revenueData);

        } catch (err) {
            setError('Falha ao buscar relatórios');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Carregando relatórios...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="page-center-wrapper">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Relatórios</h2>

            <div className="grid grid-cols-1 gap-6 mb-6">
                {/* Total Investido por Aluno */}
                <div className="bg-white shadow overflow-hidden sm:rounded-lg card">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                            Total Investido por Aluno
                        </h3>
                    </div>
                    <div className="border-t border-gray-200">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th>Aluno</th>
                                    <th>Total Investido (R$)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {totalInvestedByStudent.length ? totalInvestedByStudent.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.name}</td>
                                        <td>R$ {parseFloat(item.total_invested).toFixed(2)}</td>
                                    </tr>
                                )) : <tr><td colSpan="2">Nenhum dado encontrado</td></tr>}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Cursos com Mais Alunos */}
                <div className="bg-white shadow overflow-hidden sm:rounded-lg card">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                            Cursos com Mais Alunos
                        </h3>
                    </div>
                    <div className="border-t border-gray-200">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th>Curso</th>
                                    <th>Total de Alunos</th>
                                </tr>
                            </thead>
                            <tbody>
                                {topCourses.length ? topCourses.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.name}</td>
                                        <td>{item.total_students}</td>
                                    </tr>
                                )) : <tr><td colSpan="2">Nenhum dado encontrado</td></tr>}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Faturamento por Curso */}
                <div className="bg-white shadow overflow-hidden sm:rounded-lg card">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                            Faturamento por Curso
                        </h3>
                    </div>
                    <div className="border-t border-gray-200">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th>Curso</th>
                                    <th>Faturamento (R$)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {revenueByCourse.length ? revenueByCourse.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.name}</td>
                                        <td>R$ {parseFloat(item.total_revenue).toFixed(2)}</td>
                                    </tr>
                                )) : <tr><td colSpan="2">Nenhum dado encontrado</td></tr>}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reports;
