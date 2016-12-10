<?php

namespace Bigecko\Pug\Models;

use Illuminate\Database\Eloquent\Model;

class ApiGroup extends Model
{

    protected $table = 'api_group';

    protected $fillable = ['user_id', 'name', 'desc', 'color', 'icon'];

}
