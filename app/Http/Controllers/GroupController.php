<?php

namespace App\Http\Controllers;

use App\Http\Requests\GroupRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class GroupController extends Controller
{
    public function store(GroupRequest $request) {
        DB::beginTransaction();
        
        try {
            $request->validated();
            $avatar = null;
            if($request->hasFile('avatar')) {
                $avatar = upload_file($request->file('avatar'), 'group');
            }
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
        }
    }
}
