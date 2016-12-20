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

        if ($request->has('gid')) {
            $query->where('group_id', $request->get('gid'));
        }
        else {
            $query->whereNull('group_id');
        }

        return $query->orderBy('order', 'desc')->get();
    }

    public function store(Request $request)
    {
        $this->validateSpec($request);

        $spec = new ApiSpec($request->all());
        $spec->user_id = $request->user()->id;
        $spec->save();

        return $spec;
    }

    public function update(ApiSpec $spec, Request $request)
    {
        $this->validateSpec($request);

        $spec->update($request->all());

        return $spec;
    }

    protected function validateSpec(Request $request)
    {
        $this->validate($request, [
            'path' => 'required',
            'name' => 'required',
            'method' => 'required'
        ]);
    }
}
