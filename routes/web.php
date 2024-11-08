<?php

use App\Http\Controllers\ChatsController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'index'])->middleware('guest');

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/chats', fn () => "")->name('chats.index');
    Route::get('/chats', [ChatsController::class, 'index'])->name('chats.index');
    Route::get('/contacts', [ChatsController::class, 'index'])->name('contacts.index');
    Route::get('/archived-chats', [ChatsController::class, 'index'])->name('archived_chats.index');
    Route::patch('users/{id}', [UserController::class, 'update'])->name('users.update');
});

require __DIR__.'/auth.php';
