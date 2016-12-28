<?php

namespace Bigecko\Pug\Http\Controllers\Webapi;

use Bigecko\Pug\Http\Controllers\Controller;
use Bigecko\Pug\Models\ApiResponse;
use Bigecko\Pug\Models\ApiRequest;
use Illuminate\Http\Request;

class ResponseController extends Controller
{
    /**
     * @var ApiRequest
     */
    protected $apiRequest;

    public function __construct()
    {
        $this->middleware(function(Request $request, $next) {

            $request_id = $request->get('request_id');
            abort_if(empty($request_id), 404, 'request_id required');

            $this->apiRequest = ApiRequest::find($request_id);
            if (!$this->apiRequest || $this->apiRequest->user_id != $request->user()->id) {
                abort(404);
            }

            return $next($request);
        });
    }

    protected function validateData(Request $request)
    {
        $this->validate($request, [

        ]);
    }

    public function index()
    {
        return $this->apiRequest->responses;
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

    public function destroy(ApiResponse $response)
    {
        return $response->delete();
    }
}
