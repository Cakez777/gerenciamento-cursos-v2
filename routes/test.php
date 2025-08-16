<?php

Route::get('/hardcoded', function () {
    return response()->json(['status' => 'success']);
});