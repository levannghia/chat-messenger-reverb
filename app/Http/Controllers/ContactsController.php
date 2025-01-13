<?php

namespace App\Http\Controllers;

use App\Models\ChatContact;
use App\Traits\Chat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ContactsController extends Controller
{
    use Chat;
    public function index() {
        try {
            $chats = $this->chats();

            return Inertia::render('contacts/Index', [
                'chats' => fn () => $chats
            ]);
        } catch (\Exception $e) {
            dd($e->getMessage());
        }
    }

    public function saveContact(string $id)
    {
        DB::beginTransaction();

        try {
            $contact = ChatContact::where('user_id', auth()->id())->where('contact_id', $id)->first();
            if (!$contact) {
                $contact = ChatContact::create([
                    'user_id' => auth()->id(),
                    'contact_id' => $id,
                    'is_contact_saved' => true
                ]);
            }
            DB::commit();

            return $this->ok($contact);
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->oops($e->getMessage());
        }
    }

    public function blockContact(string $id)
    {
        DB::beginTransaction();
        try {
            $contact = ChatContact::where('user_id', auth()->id())->where('contact_id', $id)->first();

            if (!$contact) {
                $contact = ChatContact::create([
                    'user_id' => auth()->id(),
                    'contact_id' => $id,
                    'is_contact_saved' => false,
                    'is_contact_blocked' => true
                ]);
            } else {
                $contact->update([
                    'is_contact_saved' => false,
                    'is_contact_blocked' => true
                ]);
            }

            DB::commit();
            return $this->ok($contact);
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->oops($e->getMessage());
        }
    }

    public function unblockContact(string $id)
    {
        DB::beginTransaction();
        try {
            $contact = ChatContact::where('user_id', auth()->id())->where('contact_id', $id)->first();

            if (!$contact) {
                throw new \Exception("Not found contact");
            } else {
                $contact->update([
                    'is_contact_saved' => false,
                    'is_contact_blocked' => false
                ]);
            }

            DB::commit();
            return $this->ok($contact);
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->oops($e->getMessage());
        }
    }

    public function destroy(string $id)
    {
        DB::beginTransaction();
        try {
            $contact = ChatContact::where('user_id', auth()->id())
                ->where('contact_id', $id)
                ->first();

            if (!$contact) {
                throw new \Exception('Contact not found');
            }

            $contact->delete();

            DB::commit();

            return $this->ok(code: 204);
        } catch (\Exception $e) {
            DB::rollBack();
            
            return $this->oops($e->getMessage());
        }
    }
}
