<?php


// main page
Route::get('/', function () {
    return view('pug');
})->middleware('auth');

Auth::routes();

Route::get('logout', 'Auth\LoginController@logout');

Route::group(['prefix' => 'webapi', 'namespace' => 'Webapi', 'middleware' => 'auth'], function() {

    Route::resource('group', 'GroupController', [
        'only' => ['index', 'store', 'update', 'destory'],
    ]);

    Route::resource('req', 'RequestController',[
        'only' => ['index', 'show', 'store', 'update', 'destory'],
    ]);

    Route::resource('response', 'ResponseController',[
        'only' => ['index', 'show', 'store', 'update', 'destory'],
    ]);

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
