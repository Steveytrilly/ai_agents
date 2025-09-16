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

// Route::get('/dashboard', function () {
//     return view('layouts.dashlayout');
// })->name('dashboard');

Route::get('/dashboard', [PagesController::class, 'dashboard'])->name('dashboard');

Route::get('/dashboard/agents', [PagesController::class, 'agent'])->name('agent');


// Route::get('/dashboard', function () {
//     return view('dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/sso/callback', [SsoConsumeController::class, 'consume']);

// Route::middleware('auth')->group(function () {
//     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//     Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
// });

// require __DIR__.'/auth.php';

