<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SsoConsumeController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AiAgentsController;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/sso/callback', [SsoConsumeController::class, 'consume']);

// Route::middleware('auth')->group(function () {
//     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//     Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
// });

// require __DIR__.'/auth.php';
Route::prefix('api/v1')->group(function () {
    Route::post('/login', [LoginController::class, 'login'])
        ->name('auth.login.account');
    Route::middleware('auth')->group(function () {
        Route::post('create/ai-agent', [AiAgentsController::class, 'create'])
            ->name('ai_agents.create');
        Route::post('edit/ai-agent', [AiAgentsController::class, 'edit'])
            ->name('ai_agents.edit');
        Route::get('ai-agents', [AiAgentsController::class, 'index'])
            ->name('ai_agents.index');
        Route::post('duplicate/ai-agent', [AiAgentsController::class, 'duplicate'])
            ->name('ai_agents.duplicate');
        Route::post('delete/ai-agent', [AiAgentsController::class, 'delete'])
            ->name('ai_agents.delete');
    });
});



