<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StudentController;

// Rota de teste
Route::get('/test', function () {
    return ['status' => 'api_ok'];
});

// Rotas do seu controller
Route::apiResource('students', StudentController::class);