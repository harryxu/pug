<?php

namespace Bigecko\Pug\Http\Controllers\Webapi;

use Bigecko\Pug\Http\Controllers\Controller;
use Bigecko\Pug\Models\ApiGroup;
use Illuminate\Http\Request;

class GroupController extends Controller
{
    public function index(Request $request)
    {
        return ApiGroup::where('user_id', $request->user()->id)
            ->orderBy('order', 'desc')
            ->get();
    }
}
