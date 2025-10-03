<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SsoConsumeController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AiAgentsController;
use App\Http\Controllers\User\PagesController;


Route::get('/', function () {
    return view('auth.login');
})->name('login');



Route::get('/dashboard', [PagesController::class, 'home'])->name('dashboard');

Route::get('/dashboard/agents', [PagesController::class, 'agent'])->name('agent');
// Route::get('/dashboard/agents/builder', [PagesController::class, 'builder'])->name('builder');
Route::get('/dashboard/agents/builder/{agent}', [PagesController::class, 'builder'])
    ->name('builder');




// Route::get('/dashboard', function () {
//     return view('layouts.dashlayout');
// })->name('dashboard');



Route::get('/sso/callback', [SsoConsumeController::class, 'consume']);


