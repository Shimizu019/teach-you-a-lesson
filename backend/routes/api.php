<?php

use Illuminate\Support\Facades\Route;

// Foundation health check (verification only; application APIs come later).
Route::get('/health', function () {
    return response()->json(['status' => 'ok']);
});
