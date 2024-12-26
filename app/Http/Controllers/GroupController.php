<?php

namespace App\Http\Controllers;

use App\Http\Requests\GroupRequest;
use App\Models\ChatGroup;
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

            /**
             * @var ChatGroup $group
             */
            $group = ChatGroup::create([
                'name' => $request->name,
                'avatar' => $avatar,
                'creator_id' => auth()->id(),
                'description' => $request->description,
            ]);

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
        }
    }
}
