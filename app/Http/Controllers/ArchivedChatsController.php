<?php

namespace App\Http\Controllers;

use App\Traits\Chat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Request as FacadesRequest;
use Inertia\Inertia;

class ArchivedChatsController extends Controller
{
    use Chat;

    public function index()
    {
        try {
            FacadesRequest::merge(['archived_chats' => true]);

            return Inertia::render('archivedChats/Index', [
                'chats' => fn () => $this->chats()
            ]);
        } catch (\Exception $e) {
            return back()->with([
                'error_msg' => $e->getMessage()
            ]);
        }
    }

    public function show(string $id)
    {
        
    }
}
