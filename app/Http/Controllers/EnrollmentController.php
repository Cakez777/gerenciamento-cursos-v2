<?php

namespace App\Http\Controllers;

use App\Models\Enrollment;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class EnrollmentController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json([
            'data' => Enrollment::with(['student', 'course'])->get()
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'student_id' => 'required|exists:students,id',
            'course_id' => 'required|exists:courses,id',
            'start_date' => 'required|date',
            'price_paid' => 'required|numeric|min:0',
            'status' => 'required|in:active,cancelled,completed'
        ]);

        $enrollment = Enrollment::create($validated);
        return response()->json(['data' => $enrollment->load(['student', 'course'])], 201);
    }

    public function show($id): JsonResponse
    {
        $enrollment = Enrollment::with(['student', 'course'])->findOrFail($id);
        return response()->json(['data' => $enrollment]);
    }

    public function update(Request $request, $id): JsonResponse
    {
        $validated = $request->validate([
            'student_id' => 'sometimes|exists:students,id',
            'course_id' => 'sometimes|exists:courses,id',
            'start_date' => 'sometimes|date',
            'price_paid' => 'sometimes|numeric|min:0',
            'status' => 'sometimes|in:active,cancelled,completed'
        ]);

        $enrollment = Enrollment::findOrFail($id);
        $enrollment->update($validated);
        return response()->json(['data' => $enrollment->load(['student', 'course'])]);
    }

    public function destroy($id): JsonResponse
    {
        $enrollment = Enrollment::findOrFail($id);
        $enrollment->delete();
        return response()->json(null, 204);
    }
}