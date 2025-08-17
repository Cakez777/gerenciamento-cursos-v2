<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\EnrollmentController;


// Rota de teste
Route::get('/test', function () {
    return ['status' => 'api_ok'];
});

// Rotas do seu controller
Route::apiResource('students', StudentController::class);
Route::apiResource('courses', CourseController::class);
Route::apiResource('enrollment', EnrollmentController::class);