<?php

namespace App\Http\Controllers;

use App\Models\ChatMessage;
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

    public function loadMessages(string $id) {
        try {
            $messages = $this->messages($id);
            return $this->ok($messages);
        } catch (\Exception $e) {
            return $this->oops($e->getMessage());
        }
    }

    public function show(string $id) {
        try {
            $user = User::find($id);
            $chats = $this->chats();
            $messages = $this->messages($id);

            if(!$user) {
                throw new \Exception('User or group not found');
            }
            $user->chat_type = ChatMessage::CHAT_TYPE;
            return Inertia::render('Chats/Show', [
                'chats' => $chats, 
                'user' => $user,
                'messages' => $messages
            ]);

        } catch (\Exception $e) {
            return back()->with([
                'error_msg' => $e->getMessage()
            ]);
        }
    }
}
