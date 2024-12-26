<?php

namespace App\Http\Controllers;

use App\Http\Requests\GroupRequest;
use App\Models\ChatGroup;
use App\Models\ChatMessage;
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

            $groupMembers = collect([auth()->id(), ...$request->group_members])
                            ->map(fn ($member_id) => compact('member_id'));
            $group->group_members()->createMany($groupMembers);
            $chat = ChatMessage::create([
                'from_id' => auth()->id(),
                'body' => 'Create Group ' . $group->name,
                'to_id' => $group->id,
                'to_type' => ChatGroup::class,
            ]);

            DB::commit();
            return to_route('chats.show', $group->id);
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with([
                'error_msg' => $e->getMessage(),
            ]);
        }
    }
}
