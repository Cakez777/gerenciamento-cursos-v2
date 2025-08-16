<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class StudentController extends Controller
{
    /**
     * Lista todos os alunos
     */
    public function index()
    {
        $students = Student::with('enrollments')->get();
        return response()->json(['data' => $students]);
    }

    /**
     * Cria um novo aluno
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:students,email',
            'cpf' => 'required|string|unique:students,cpf|size:11'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => $validator->errors()
            ], 422);
        }

        $student = Student::create($request->all());
        return response()->json([
            'message' => 'Aluno criado com sucesso',
            'data' => $student
        ], 201);
    }

    /**
     * Mostra um aluno específico
     */
    public function show($id)
    {
        $student = Student::with('enrollments')->find($id);
        
        if (!$student) {
            return response()->json([
                'error' => 'Aluno não encontrado'
            ], 404);
        }

        return response()->json(['data' => $student]);
    }

    /**
     * Atualiza um aluno
     */
    public function update(Request $request, $id)
    {
        $student = Student::find($id);
        
        if (!$student) {
            return response()->json([
                'error' => 'Aluno não encontrado'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:students,email,'.$id,
            'cpf' => 'sometimes|string|unique:students,cpf,'.$id.'|size:11'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => $validator->errors()
            ], 422);
        }

        $student->update($request->all());
        return response()->json([
            'message' => 'Aluno atualizado com sucesso',
            'data' => $student
        ]);
    }

    /**
     * Remove um aluno (soft delete)
     */
    public function destroy($id)
    {
        $student = Student::find($id);
        
        if (!$student) {
            return response()->json([
                'error' => 'Aluno não encontrado'
            ], 404);
        }

        $student->delete();
        return response()->json([
            'message' => 'Aluno removido com sucesso'
        ], 204);
    }
}