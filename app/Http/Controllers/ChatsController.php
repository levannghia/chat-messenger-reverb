<?php

namespace App\Http\Controllers;

use App\Models\ChatMessage;
use App\Models\User;
use App\Traits\Chat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Str;

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
            return $this->oops($e->getMessage());
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
            $messages = $this->messages($id);
            // dd($chats);
            if(!$user) {
                throw new \Exception('User or group not found');
            }
            $user->chat_type = ChatMessage::CHAT_TYPE;
            
            return Inertia::render('Chats/Show', [
                'chats' => $this->chats(), 
                'user' => $user,
                'messages' => $messages
            ]);

        } catch (\Exception $e) {
            return back()->with([
                'error_msg' => $e->getMessage()
            ]);
        }
    }

    public function store(Request $request) {
        DB::beginTransaction();
        try {
            $attachments = [];

            /**
             * @var \Illuminate\Http\UploadedFile $attachment
             */

            if($request->hasFile('attachments')) {
                foreach ($request->file('attachments') as $key => $attachment) {
                    $extension = $attachment->getClientOriginalExtension();
                    $fileName = Str::uuid() . '.' . $extension;

                    array_push($attachments, [
                        'original_name' => $attachment->getClientOriginalName(),
                        'file_name' => $fileName,
                        'file_path' => '/storage/chats/' . auth()->id(),
                        'file_size' => $attachment->getSize(),
                        'file_type' => in_array($extension, $this->validImageExtensions) ? 'media' : 'file',
                        'sent_by_id' => auth()->id()
                    ]);

                    Storage::disk('public')->putFileAs('/chats/' . auth()->id(), $attachment, $fileName);
                }
            }

            /**
             * @var ChatMessage $chat
             */
            $chat = ChatMessage::create([
                'from_id' => auth()->id(),
                'to_id' => $request->to_id,
                'to_type' => User::class,
                'body' => $request->body,
                'deleted_in_id' => null,
            ]);

            $chat->attachments()->createMany($attachments);
            $chat->attachments = $chat->attachments;

            DB::commit();
            return $this->ok(data: $chat, code: 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->oops($e->getMessage());
        }
    }

    public function destroy(string $id) {
        DB::beginTransaction();
        try {
            $chat = ChatMessage::find($id);
            if(!$chat) {
                throw new \Exception("Chat not found");
            }

            $deletedInId = collect(json_decode($chat->deleted_in_id) ?? []);

            if($chat->to instanceof User && count($deletedInId) > 0) {
                $chat->delete();
                foreach ($chat->attachments as $key => $attachment) {
                    $filePath = $attachment->file_path . DIRECTORY_SEPARATOR . $attachment->file_name;
                    remove_file($filePath);
                }
            } else {
                $chat->update([
                    'deleted_in_id' => json_encode($deletedInId->push(['id' => auth()->id()])->toArray())
                ]);

                foreach ($chat->attachments as $attachment) {
                    $deletedAttachmentInId = collect(json_decode(($attachment->deleted_in_id)) ?? []);
                    $attachment->update([
                        'deleted_in_id' => json_encode($deletedAttachmentInId->push(['id' => auth()->id()])->toArray())
                    ]);
                }
            }

            DB::commit();
            return $this->ok(code: 204);
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->oops($e->getMessage());
        }
    }

    public function deleteSelectedFile(string $id, string $file_name) {
        DB::beginTransaction();
        try {
            $chat = ChatMessage::find($id);
            if(!$chat) {
                throw new \Exception("Chat not found");
            }

            $attachment = $chat->attachments->where('file_name', $file_name)->first();
            if($attachment) {
                $deletedAttachmentInIds = collect(json_decode($attachment->deleted_in_id) ?? []);
                $attachment->update([
                    'deleted_in_id' => json_encode($deletedAttachmentInIds->push(['id' => auth()->id()])->toArray())
                ]);
            }

            DB::commit();
            return $this->ok(code: 204);
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->oops($e->getMessage());
        }
    }

    public function markAsRead(string $id) {
        DB::beginTransaction();

        try {
            ChatMessage::forUserOrGroup($id)
            ->notSeen()
            ->select('id', 'seen_in_id')
            ->get()
            ->each(function($chat) {
                $seenInId = collect(json_decode($chat->seen_in_id));
                $seenInId = json_encode($seenInId->push(['id' => auth()->id(), 'seen_at' => now()])->toArray());

                $chat->update([
                    'seen_in_id' => $seenInId,
                ]);
            });

            $latestMessage = ChatMessage::forUserOrGroup($id)->latest()->first();
            DB::commit();

            return $this->ok($latestMessage);
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->oops($e->getMessage());
        }
    }
}
