<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChatContact extends Model
{
    use HasUlids, HasFactory;

    protected $guarded = ["id"];
}
