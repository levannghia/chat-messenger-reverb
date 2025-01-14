<?php

use App\Http\Controllers\ChatsController;
use App\Http\Controllers\CheckTotalCompany;
use App\Http\Controllers\ContactsController;
use App\Http\Controllers\GroupController;
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
    Route::patch('/users/{id}', [UserController::class, 'update'])->name('users.update');
    Route::get('/users', [UserController::class, 'index'])->name('users.index');

    Route::prefix('chats')->name('chats.')->group(function () {
        Route::get('/', [ChatsController::class, 'index'])->name('index');
        Route::get('/users', [ChatsController::class, 'loadChats'])->name('users');
        Route::get('/{id}', [ChatsController::class, 'show'])->name('show');
        Route::get('/{id}/messages', [ChatsController::class, 'loadMessages'])->name('messages');
        Route::post('/', [ChatsController::class, 'store'])->name('store');
        Route::delete('/{id}', [ChatsController::class, 'destroy'])->name('destroy');
        Route::delete('/{id}/file/{file_name}', [ChatsController::class, 'deleteSelectedFile'])->name('delete_file');
        Route::delete('/{id}/delete', [ChatsController::class, 'destroyAll'])->name('destroy_all');
        Route::post('/{id}/read', [ChatsController::class, 'markAsRead'])->name('mark_as_read');
        Route::post('/{id}/unread', [ChatsController::class, 'markAsUnread'])->name('mark_as_unread');
        Route::post('/{id}/customize', [ChatsController::class, 'customizeChat'])->name('customize_chat');
        Route::post('/{id}/archive', [ChatsController::class, 'archiveChat'])->name('archive');
        Route::post('/{id}/unarchive', [ChatsController::class, 'unarchiveChat'])->name('unarchive');
        Route::get('/{id}/media', [ChatsController::class, 'loadMedia'])->name('media');
        Route::get('/{id}/files', [ChatsController::class, 'loadFiles'])->name('files');
        Route::get('/{id}/links', [ChatsController::class, 'loadLinks'])->name('links');
    });

    Route::prefix('contacts')->name('contacts.')->group(function () {
        Route::get('/', [ContactsController::class, 'index'])->name('index');
        Route::get('/data', [ContactsController::class, 'loadData'])->name('data');
        Route::post('/{id}/block', [ContactsController::class, 'blockContact'])->name('block');
        Route::post('/{id}/unblock', [ContactsController::class, 'unblockContact'])->name('unblock');
        Route::post('/{id}/save', [ContactsController::class, 'saveContact'])->name('save');
    });

    Route::prefix('group')->name('group.')->group(function () {
        Route::post('/', [GroupController::class, 'store'])->name('store');
        Route::get('/{id}', [GroupController::class, 'members'])->name('members');
        Route::patch('/{id}', [GroupController::class, 'update'])->name('update');
        Route::delete('/{id}', [GroupController::class, 'exit'])->name('exit');
    });

    Route::get('/archived-chats', [ChatsController::class, 'index'])->name('archived_chats.index');
});

require __DIR__ . '/auth.php';
