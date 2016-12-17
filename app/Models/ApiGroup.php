<?php

namespace Bigecko\Pug\Models;

use Illuminate\Database\Eloquent\Model;

class ApiGroup extends Model
{

    protected $table = 'api_group';

    protected $fillable = ['name', 'desc', 'color', 'icon'];

}
