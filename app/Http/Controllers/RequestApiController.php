<?php

namespace Bigecko\Pug\Http\Controllers;

use Bigecko\Pug\Models\ApiRequest;
use Bigecko\Pug\Models\ApiResponse;
use Bigecko\Pug\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;

class RequestApiController extends Controller
{

    public function processRequest(User $user, $path, Request $request)
    {
        $req = $this->findApiRequest($user, $path, $request);

        $resp = $this->findBestResponse($req, $request);

        $contentType = $resp->content_type ?: 'text/html';

        return response($resp->body)
                    ->header('Content-Type', $contentType);
    }

    protected function findApiRequest(User $user, $path, Request $request)
    {
        $req = ApiRequest::where('user_id', $user->id)
                    ->where('path', $path)
                    ->firstOrFail();

        $reqMethod = strtolower($req->method);

        if ($reqMethod != 'any' && !$request->isMethod($reqMethod)) {
            throw new MethodNotAllowedHttpException([$reqMethod]);
        }


        return $req;
    }

    protected function findBestResponse(ApiRequest $req, Request $request)
    {
        /** @var Collection $resps */
        $resps = ApiResponse::where('request_id', $req->id)
                    ->orderBy('order')
                    ->get();

        $matched = $resps->first();

        $requestData = [
            'querystr' => $_SERVER['QUERY_STRING'],
            'raw' => $request->getContent(),
            'post' => $_POST,
        ];

        $requestJSON = json_encode($requestData);

        $matched = $resps->first(function($resp) use ($requestJSON) {

            if (!empty($resp->match_pattern)) {
                $pattern = '/'.$resp->match_pattern.'/';
                return (bool) preg_match($pattern, $requestJSON);
            }

            return false;

        }, $matched);

        return $matched;
    }
}
