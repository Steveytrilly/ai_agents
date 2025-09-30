<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('agent_actions', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id');
            $table->boolean('active')->default(true);
            $table->text('category')->nullable();
            $table->string('action_type');
            $table->text('action_data')->nullable();
            $table->integer('agent_id')->unsigned()->references('id')->on('ai_agents')->onDelete('cascade');
            $table->timestamps();
        });
        Schema::table('ai_agents', function (Blueprint $table) {
            $table->text('run_id')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('agent_actions');
    }
};
