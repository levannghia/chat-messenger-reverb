<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasUuids;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */

    protected $guarded = ['id'];

    // protected $fillable = [
    //     'name',
    //     'email',
    //     'password',
    // ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    protected function isOnline(): Attribute
    {
        return Attribute::make(
            get: fn ($value, $attributes) => (bool) $value && (bool) $attributes['active_status'],
            set: fn ($value) => (int) $value
        );
    }

    protected function activeStatus(): Attribute {
        return Attribute::make(
            get: fn ($value, $attribute) => (bool) $value,
            set: fN ($value) => (int) $value 
        );
    }

    public function contacts() {
        return $this->hasMany(ChatContact::class, 'user_id');
    }

    public function chat_message_colors() {
        return $this->hasMany(ChatMessageColor::class, 'from_id');
    }

    public function message_color(string $id) {
        return $this->chat_message_colors()->where('to_id', $id)->first()?->message_color ?? null;
    }

    public function is_contact_blocked (string $id) {
        return $this->contacts()->where('contact_id', $id)->first()?->is_contact_blocked != null;
    }

    public function is_contact_saved (string $id) {
        return $this->contacts()->where('contact_id', $id)->first()?->is_contact_saved != null;
    }
}
