<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\EnrollmentController;
use App\Http\Controllers\ReportController;

Route::get('reports/total-invested', [ReportController::class, 'totalInvestedByStudent']);
Route::get('reports/top-courses', [ReportController::class, 'topCourses']);
Route::get('reports/revenue', [ReportController::class, 'revenueByCourse']);


Route::apiResource('students', StudentController::class);
Route::apiResource('courses', CourseController::class);
Route::apiResource('enrollments', EnrollmentController::class);

Route::get('/dashboard/stats', function() {
    return response()->json([
        'total_students' => App\Models\Student::count(),
        'total_courses' => App\Models\Course::count(),
        'total_enrollments' => App\Models\Enrollments::count(),
        'revenue' => App\Models\Enrollments::sum('price_paid')
    ]);
});
