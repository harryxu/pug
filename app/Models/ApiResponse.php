<?php

namespace Bigecko\Pug\Models;

use Illuminate\Database\Eloquent\Model;

class ApiResponse extends Model
{
    protected $table = 'api_response';

    protected $fillable = [
        'request_id', 'content_type', 'status_code', 'body',
    ];
}
