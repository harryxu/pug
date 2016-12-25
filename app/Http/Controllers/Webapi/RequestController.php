<?php

namespace Bigecko\Pug\Http\Controllers\Webapi;

use Bigecko\Pug\Http\Controllers\Controller;
use Bigecko\Pug\Models\ApiRequest;
use Illuminate\Database\Query\Builder;
use Illuminate\Http\Request;

class RequestController extends Controller
{

    public function __construct()
    {
        $this->middleware(function(Request $request, $next) {

            $req = $request->route('req');
            if ($req instanceof ApiRequest && $req->user_id != $request->user()->id) {
                abort(404);
            }

            return $next($request);
        });
    }

    public function index(Request $request)
    {
        /** @var Builder $query **/
        $query = ApiRequest::where('user_id', $request->user()->id);

        if ($request->has('gid')) {
            $query->where('group_id', $request->get('gid'));
        }
        else {
            $query->whereNull('group_id');
        }

        return $query->orderBy('order', 'desc')->get(['id', 'name', 'path', 'method']);
    }

    public function show(ApiRequest $req)
    {
        return $req;
    }

    public function store(Request $request)
    {
        $this->validateSpec($request);

        $spec = new ApiRequest($request->all());
        $spec->user_id = $request->user()->id;
        $spec->save();

        return $spec;
    }

    public function update(ApiRequest $req, Request $request)
    {
        $this->validateSpec($request);

        $req->update($request->all());

        return $req;
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
