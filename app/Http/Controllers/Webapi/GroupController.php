<?php

namespace Bigecko\Pug\Http\Controllers\Webapi;

use Bigecko\Pug\Http\Controllers\Controller;
use Bigecko\Pug\Models\ApiGroup;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class GroupController extends Controller
{
    public function index(Request $request)
    {
        return ApiGroup::where('user_id', $request->user()->id)
            ->orderBy('order', 'desc')
            ->get();
    }

    public function store(Request $request)
    {
        $user = $request->user();
        $this->validate($request, [
            'name' => [
                'required',
                Rule::unique('api_group', 'name')->where('user_id', $user->id)
            ]
        ]);
        $group = new ApiGroup($request->all());
        $group->user_id = $request->user()->id;

        $group->save();

        return $group;
    }

    public function update(ApiGroup $group, Request $request)
    {
        $this->validate($request, ['name' => 'required']);
        $group->update($request->all());

        return $group;
    }
}
