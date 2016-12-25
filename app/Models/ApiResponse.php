<?php

namespace Bigecko\Pug\Models;

use Illuminate\Database\Eloquent\Model;

class ApiResponse extends Model
{
    protected $table = 'api_response';

    protected $fillable = [
        'name', 'request_id', 'content_type', 'status_code', 'body', 'match_pattern'
    ];

    protected $casts = [
        'status_code' => 'integer',
    ];
}
