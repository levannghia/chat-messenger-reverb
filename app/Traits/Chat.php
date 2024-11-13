<?php

namespace App\Traits;

use App\Models\ChatMessage;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;

trait Chat
{
    public function chats()
    {
        if (request()->filled('query')) {
            $chats = User::where('name', 'LIKE', '%' . request('query') . '%')
                ->selectRaw('
                id,
                name,
                avatar,
                NULL as message_id,
                NULL as body,
                1 as is_read,
                0 as is_reply,
                IF(is_online = 1 AND active_status = 1, 1, 0) as is_online,
                active_status,
                NULL as created_at,
                ? as chat_type
            ', [ChatMessage::CHAT_TYPE])
                ->paginate(25)
                ->withQueryString()
                ->setPath(route('chats.users'));
        } else {
            $chats = ChatMessage::with('from')->paginate(25);
            foreach ($chats as $key => $message) {
                $mapped = new \stdClass;
                $mapped->id = $message->to->id;
                $mapped->name = $message->to->name;
                $mapped->avatar = $message->to->avatar;
                $mapped->from_id = $message->from_id;
                $mapped->body = $message->body;
                $mapped->is_read = true;
                $mapped->is_reply = false;
                $mapped->is_online = true;
                $mapped->chat_type = ChatMessage::CHAT_TYPE;
                $mapped->created_at = $message->created_at;

                $chats[$key] = $mapped;
            }
        }

        return $chats;
    }

    public function messages(string $id)
    {
        $chats = ChatMessage::with(['to', 'from', 'attachments'])
            ->where(function (Builder $query) use ($id) {
                $query->where('from_id', auth()->id())->where('to_id', $id);
            })
            ->orWhere(function (Builder $query) use ($id) {
                $query->where('from_id', $id)->where('to_id', auth()->id());
            })
            ->selectRaw(
                'id,
                from_id,
                to_id,
                body,
                to_type,
                IF(to_type = ?, ?, ?) as chat_type,
                seen_in_id,
                sort_id,
                created_at',
                [User::class, ChatMessage::CHAT_TYPE, ChatMessage::CHAT_GROUP_TYPE]
            )
            ->orderByDesc('sort_id')
            ->paginate(25)
            ->setPath(route('chats.messages', $id));

        return $chats;
    }
}
