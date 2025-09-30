<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SsoConsumeController;
use App\Http\Controllers\AiAgentsController;
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Route::get('/dashboard', function () {
//     return view('layouts.dashlayout');
// })->middleware(['auth:sanctum'])->name('dashboard');



Route::prefix('v1')->group(function () {
    Route::post('/login', [LoginController::class, 'login'])
        ->name('auth.login.account');
    Route::middleware('auth:sanctum')->group(function () {
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
        Route::post('use/ai-agent', [AiAgentsController::class, 'useAgent'])
            ->name('ai_agents.use');
        Route::post('build/ai-agent', [AiAgentsController::class, 'build'])
            ->name('ai_agents.build');
    });
});
