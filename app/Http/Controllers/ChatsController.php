<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Traits\Chat;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ChatsController extends Controller
{
    use Chat;

    public function index() {
        try {
            $chats = $this->chats();
            return Inertia::render('Chats/Index', [
                'chats' => $chats,
            ]);
        } catch (\Exception $e) {
           dd($e->getMessage());
        }
    }

    public function loadChats() {
        try {
            $chats = $this->chats();
            return $this->ok($chats);
        } catch (\Exception $e) {
            return $this->oops($e->getMessage());
        }
    }

    public function show(string $id) {
        try {
            $user = User::find($id);
            if(!$user) {
                throw new \Exception('User or group not found');
            }
        } catch (\Exception $e) {
            return back()->with([
                'error_msg' => $e->getMessage()
            ]);
        }
    }
}
