import React, { useState } from 'react';
import Students from './components/Students';
import Courses from './components/Courses';
import Enrollments from './components/Enrollments';
import Reports from './components/Reports';

function App() {
    const [activeTab, setActiveTab] = useState('students');

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex-shrink-0 flex items-center">
                                <h1 className="text-xl font-bold text-gray-900">Gerenciamento de Cursos</h1>
                            </div>
                            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                                <button
                                    onClick={() => setActiveTab('students')}
                                    className={`${
                                        activeTab === 'students'
                                            ? 'border-indigo-500 text-gray-900'
                                            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                    } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                                >
                                    Alunos
                                </button>
                                <button
                                    onClick={() => setActiveTab('courses')}
                                    className={`${
                                        activeTab === 'courses'
                                            ? 'border-indigo-500 text-gray-900'
                                            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                    } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                                >
                                    Cursos
                                </button>
                                <button
                                    onClick={() => setActiveTab('enrollments')}
                                    className={`${
                                        activeTab === 'enrollments'
                                            ? 'border-indigo-500 text-gray-900'
                                            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                    } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                                >
                                    Matrículas
                                </button>
                                <button
                                    onClick={() => setActiveTab('reports')}
                                    className={`${
                                        activeTab === 'reports'
                                            ? 'border-indigo-500 text-gray-900'
                                            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                    } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                                >
                                    Relatórios
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <main>
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    {activeTab === 'students' && <Students />}
                    {activeTab === 'courses' && <Courses />}
                    {activeTab === 'enrollments' && <Enrollments />}
                    {activeTab === 'reports' && <Reports />}
                </div>
            </main>
        </div>
    );
}

export default App;