<?php

namespace Bigecko\Pug\Models;

use Illuminate\Database\Eloquent\Model;

class ApiSpec extends Model
{
    protected $table = 'api_spec';

    protected $fillable = [
        'user_id', 'group_id', 'path', 'name', 'desc',
        'method', 'default_response_id',
    ];

    public function responses()
    {
        return $this->hasMany(ApiResponse::class, 'spec_id');
    }
}
