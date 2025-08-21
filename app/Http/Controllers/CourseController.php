<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request; // ← FALTANDO ESTE IMPORT

class CourseController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json([
            'data' => Course::all() 
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        // ADICIONE VALIDAÇÃO
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0'
        ]);

        $course = Course::create($validated);
        return response()->json(['data' => $course], 201);
    }

    public function show($id): JsonResponse
    {
        $course = Course::findOrFail($id);
        return response()->json(['data' => $course]);
    }

    public function update(Request $request, $id): JsonResponse
    {
        // ADICIONE VALIDAÇÃO
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'price' => 'sometimes|numeric|min:0'
        ]);

        $course = Course::findOrFail($id);
        $course->update($validated);
        return response()->json(['data' => $course]);
    }

    public function destroy($id): JsonResponse
    {
        $course = Course::findOrFail($id);
        $course->delete();
        return response()->json(null, 204);
    }
}