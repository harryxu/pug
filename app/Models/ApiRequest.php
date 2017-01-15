<?php

namespace Bigecko\Pug\Models;

use Illuminate\Database\Eloquent\Model;

class ApiRequest extends Model
{
    protected $table = 'api_request';

    protected $fillable = [
        'user_id', 'group_id', 'path', 'name', 'desc',
        'method', 'default_response_id',
    ];

    public function responses()
    {
        return $this->hasMany(ApiResponse::class, 'request_id')
                ->orderBy('order')
                ->orderBy('created_at');
    }
}
