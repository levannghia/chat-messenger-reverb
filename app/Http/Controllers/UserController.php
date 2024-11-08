<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    public function update(Request $request, string $id) {
        DB::beginTransaction();
        try {
            $user = User::find($id);
            if(!$user) {
                throw new \Exception('User not found');
            }

            $user->update($request->only('active_status'));
            DB::commit();

            return $this->ok($user);
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->oops($e->getMessage());
        }
    }
}
