<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\DeveloperController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('/developers', [DeveloperController::class,'index']);

Route::get('/developers?param=value', [DeveloperController::class,'queryString']);

Route::get('/developers/{id}', [DeveloperController::class,'show']);

Route::post('/developers', [DeveloperController::class,'store']);

Route::put('/developers/{id}', [DeveloperController::class,'update']);

Route::delete('/developers/{id}', [DeveloperController::class,'destroy']);
