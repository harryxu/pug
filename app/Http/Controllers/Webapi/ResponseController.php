<?php

namespace Bigecko\Pug\Http\Controllers\Webapi;

use Bigecko\Pug\Http\Controllers\Controller;
use Bigecko\Pug\Models\ApiResponse;
use Bigecko\Pug\Models\ApiSpec;
use Illuminate\Http\Request;

class ResponseController extends Controller
{
    /**
     * @var ApiSpec
     */
    protected $spec;

    public function __construct(Request $request)
    {
        $specId = $request->get('spec_id');
        abort_if(empty($specId), 404);

        $this->spec = ApiSpec::find($specId);
        if (!$this->spec || $this->spec->user_id != $request->user()->id) {
            abort(404);
        }
    }

    protected function validateData(Request $request)
    {
        $this->validate($request, [

        ]);
    }

    public function index()
    {
        return $this->spec->responses;
    }

    public function show(ApiResponse $response)
    {
        return $response;
    }

    public function store(Request $request)
    {
        $apiResponse = ApiResponse::create($request->all());

        return $apiResponse;
    }

    public function update(ApiResponse $response, Request $request)
    {
        $response->update($request->except('spec_id'));

        return $response;
    }

}
