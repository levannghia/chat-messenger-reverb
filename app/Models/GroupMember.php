<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GroupMember extends Model
{
    use HasFactory, HasUuids;

    protected $guarded = ['id'];

    public function user() {
        return $this->hasOne(User::class, 'id', 'member_id');
    }
}
