<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

class Complaint extends Model
{
    protected $fillable = [
        'ticket_id',
        'campus_id',
        'category_id',
        'description',
        'contact_name',
        'contact_email',
        'contact_phone',
        'status',
        'coordinator_id',
        'worker_id',
        'internal_notes',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($complaint) {
            $complaint->ticket_id = 'TICKET-' . strtoupper(Str::random(8));
        });
    }

    public function campus(): BelongsTo
    {
        return $this->belongsTo(Campus::class);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function coordinator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'coordinator_id');
    }

    public function worker(): BelongsTo
    {
        return $this->belongsTo(User::class, 'worker_id');
    }
} 