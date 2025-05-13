<?php

use App\Http\Controllers\ComplaintController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Public routes
Route::get('/', [ComplaintController::class, 'create'])->name('complaints.create');
Route::post('/complaints', [ComplaintController::class, 'store'])->name('complaints.store');
Route::get('/complaints/{complaint}', [ComplaintController::class, 'show'])->name('complaints.show');

// Protected routes
Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard routes based on role
    Route::get('/dashboard', function () {
        $user = auth()->user();
        
        if ($user->isAdmin()) {
            return redirect()->route('users.index');
        }
        
        if ($user->isCoordinator()) {
            return redirect()->route('complaints.index');
        }
        
        if ($user->isWorker()) {
            return redirect()->route('complaints.index');
        }
        
        if ($user->isManager()) {
            return redirect()->route('complaints.index');
        }
    })->name('dashboard');

    // User management routes (admin only)
    Route::resource('users', UserController::class);

    // Complaint management routes
    Route::get('/complaints', [ComplaintController::class, 'index'])->name('complaints.index');
    Route::patch('/complaints/{complaint}', [ComplaintController::class, 'update'])->name('complaints.update');

    // Profile routes
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
