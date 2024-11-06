<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ChatsController extends Controller
{
    public function index() {
        try {
            return Inertia::render('Chats/Index');
        } catch (\Exception $e) {
            //throw $th;
        }
    }
}
