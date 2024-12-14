<?php

use App\Http\Controllers\ChatsController;
use App\Http\Controllers\CheckTotalCompany;
use App\Http\Controllers\ContactsController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'index'])->middleware('guest');
Route::get('/total-company', [CheckTotalCompany::class, 'index']);
// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::patch('users/{id}', [UserController::class, 'update'])->name('users.update');
    Route::get('/chats', fn () => "")->name('chats.index');
    Route::get('/chats', [ChatsController::class, 'index'])->name('chats.index');
    Route::get('/chats/users', [ChatsController::class, 'loadChats'])->name('chats.users');
    Route::get('/chats/{id}', [ChatsController::class, 'show'])->name('chats.show');
    Route::get('/chats/{id}/messages', [ChatsController::class, 'loadMessages'])->name('chats.messages');
    Route::post('/chats', [ChatsController::class, 'store'])->name('chats.store');
    Route::delete('chats/{id}', [ChatsController::class, 'destroy'])->name('chats.destroy');
    Route::delete('chats/{id}/file/{file_name}', [ChatsController::class, 'deleteSelectedFile'])->name('chats.delete_file');
    Route::delete('chats/{id}/delete', [ChatsController::class, 'destroyAll'])->name('chats.destroy_all');
    Route::post('/chats/{id}/read', [ChatsController::class, 'markAsRead'])->name('chats.mark_as_read');
    Route::post('/chats/{id}/unread', [ChatsController::class, 'markAsUnread'])->name('chats.mark_as_unread');
    Route::post('chats/{id}/customize', [ChatsController::class, 'customizeChat'])->name('chats.customize_chat');
    Route::post('/chats/{id}/archive', [ChatsController::class, 'archiveChat'])->name('chats.archive');
    Route::post('/chats/{id}/unarchive', [ChatsController::class, 'unarchiveChat'])->name('chats.unarchive');
    Route::get('/chats/{id}/media', [ChatsController::class, 'loadMedia'])->name('chats.media');
    Route::get('/chats/{id}/files', [ChatsController::class, 'loadFiles'])->name('chats.files');
    Route::get('/chats/{id}/links', [ChatsController::class, 'loadLinks'])->name('chats.links');
    Route::get('/contacts', [ChatsController::class, 'index'])->name('contacts.index');
    Route::post('/contacts/{id}/block', [ContactsController::class, 'blockContact'])->name('contacts.block');
    Route::post('/contacts/{id}/unblock', [ContactsController::class, 'unblockContact'])->name('contacts.unblock');
    Route::post('/contacts/{id}/save', [ContactsController::class, 'saveContact'])->name('contacts.save');
    Route::get('/archived-chats', [ChatsController::class, 'index'])->name('archived_chats.index');
    
});

require __DIR__.'/auth.php';
