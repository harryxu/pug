<?php

use Illuminate\Http\Request;


// main page
Route::get('/', function (Request $request) {
    return view('pug', ['basePath' => $request->getBasePath()]);
})->middleware('auth');

Route::get('b/{path}', function (Request $request) {
    return view('pug', ['basePath' => $request->getBasePath()]);
})->where('path', '.*')->middleware('auth');

Auth::routes();

Route::get('logout', 'Auth\LoginController@logout');

Route::group(['prefix' => 'webapi', 'namespace' => 'Webapi', 'middleware' => 'auth'], function() {

    Route::resource('group', 'GroupController', [
        'only' => ['index', 'store', 'update', 'destroy'],
    ]);

    Route::resource('req', 'RequestController',[
        'only' => ['index', 'show', 'store', 'update', 'destroy'],
    ]);

    Route::resource('response', 'ResponseController',[
        'only' => ['index', 'show', 'store', 'update', 'destroy'],
    ]);
    Route::post('response/update-order', 'ResponseController@updateOrder');

});

Route::get('webapi/scripts', function(\Illuminate\Http\Request $request) {
    $datavars = [
        'csrfToken' => csrf_token(),
        'user' => $request->user()
    ];

    $json = json_encode($datavars);

    return "var pugConfig = $json";
});

Route::any('i/{user}/{path}', 'RequestApiController@processRequest')
    ->where('path', '.+');
