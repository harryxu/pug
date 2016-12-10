<?php


// main page
Route::get('/', function () {
    return view('pug');
})->middleware('auth');

Auth::routes();

Route::group(['prefix' => 'webapi', 'namespace' => 'Webapi', 'middleware' => 'auth'], function() {

    Route::resource('group', 'GroupController', [
        'only' => ['index', 'store', 'update', 'destory'],
    ]);

    Route::resource('spec', 'SpecController',[
        'only' => ['index', 'store', 'update', 'destory'],
    ]);

});

