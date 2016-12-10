<?php

namespace Bigecko\Pug\Http\Controllers\Webapi;

use Bigecko\Pug\Http\Controllers\Controller;
use Bigecko\Pug\Models\ApiSpec;
use Illuminate\Database\Query\Builder;
use Illuminate\Http\Request;

class SpecController extends Controller
{
    public function index(Request $request)
    {
        /** @var Builder $query **/
        $query = ApiSpec::where('user_id', $request->user()->id);

        if ($request->has('group_id')) {
            $query->where('group_id', $request->get('group_id'));
        }
        else {
            $query->whereNull('group_id');
        }

        return $query->orderBy('order', 'desc')->get();
    }
}
