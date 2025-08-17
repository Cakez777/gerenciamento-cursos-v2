<?php

namespace App\Http\Controllers;

use App\Models\Enrollment;
use Illuminate\Http\Request;

class EnrollmentController extends Controller
{
    public function index()
    {
        return response()->json(Enrollment::with(['student', 'course'])->get());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'student_id' => 'required|exists:students,id',
            'course_id' => 'required|exists:courses,id',
            'start_date' => 'required|date',
            'price_paid' => 'required|numeric|min:0',
            'status' => 'required|in:active,cancelled,completed'
        ]);

        $enrollment = Enrollment::create($data);
        return response()->json($enrollment, 201);
    }

    public function show(Enrollment $enrollment)
    {
        return response()->json($enrollment->load(['student', 'course']));
    }

    public function update(Request $request, Enrollment $enrollment)
    {
        $data = $request->validate([
            'student_id' => 'sometimes|exists:students,id',
            'course_id' => 'sometimes|exists:courses,id',
            'start_date' => 'sometimes|date',
            'price_paid' => 'sometimes|numeric|min:0',
            'status' => 'sometimes|in:active,cancelled,completed'
        ]);

        $enrollment->update($data);
        return response()->json($enrollment);
    }

    public function destroy(Enrollment $enrollment)
    {
        $enrollment->delete();
        return response()->json(null, 204);
    }
}