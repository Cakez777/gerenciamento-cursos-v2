<?php
namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    
    public function index()
    {
        $students = Student::all();
        return response()->json($students);
    }


    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:students',
            'cpf' => 'required|string|unique:students|max:14'
        ]);

        $student = Student::create($data);
        return response()->json($student, 201);
    }


    public function show(Student $student)
    {
        return response()->json($student);
    }

    public function update(Request $request, Student $student)
    {
        $data = $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:students,email,' . $student->id,
            'cpf' => 'sometimes|string|max:14|unique:students,cpf,' . $student->id
        ]);

        $student->update($data);
        return response()->json($student);
    }

    
    public function destroy(Student $student)
    {
        $student->delete();
        return response()->json(null, 204); 
    }
}