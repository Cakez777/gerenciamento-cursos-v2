<?php

use Illuminate\Support\Facades\Route;

Route::get('/test-web', function () {
    return response()->json(['status' => 'web_ok']);
});


Route::get('/', function () {
    return view('welcome');
});