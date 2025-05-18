<?php

use App\Http\Controllers\ComplaintController; 
use Illuminate\Support\Facades\Route;

// Public routes
Route::get('/', [ComplaintController::class, 'create'])->name('complaints.create');
Route::post('/complaints', [ComplaintController::class, 'store'])->name('complaints.store');
Route::get('/complaints/{complaint}', [ComplaintController::class, 'show'])->name('complaints.show');
Route::post('/complaints/track', [ComplaintController::class, 'track'])->name('complaints.track');

Route::get('/complaints', [ComplaintController::class, 'index'])->name('complaints.index');
Route::patch('/complaints/{complaint}', [ComplaintController::class, 'update'])->name('complaints.update');

