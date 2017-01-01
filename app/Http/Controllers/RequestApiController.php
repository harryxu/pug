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

        $content = $this->prepareContent($resp->body, $request);

        $headers = [
            'Content-Type' => $contentType,
            'Access-Control-Allow-Origin' => '*',
            'Access-Control-Allow-Methods' => 'GET, POST, PUT, DELETE, OPTIONS'
        ];

        return response($content, $resp->status_code, $headers);
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

    protected function prepareContent($body, Request $request)
    {
        $pattern = '/\$\{([\w_-]+)\}/';

        preg_match_all($pattern, $body, $placeholders);
        $placeholders = array_unique($placeholders[1]);

        $data = $request->all();
        $patterns = [];
        $values = [];
        foreach ($placeholders as $keyname) {
            if (isset($data[$keyname])) {
                $patterns[] = '/\$\{'.$keyname.'\}/';
                $values[] = $data[$keyname];
            }
        }

        return preg_replace($patterns, $values, $body);
    }
}
