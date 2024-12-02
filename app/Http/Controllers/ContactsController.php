<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ContactsController extends Controller
{
    public function blockContact(string $id) {
        DB::beginTransaction();
        try {
            //code...
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->oops($e->getMessage());
        }
    }

    public function unblockContact(string $id) {
        
    }
}
