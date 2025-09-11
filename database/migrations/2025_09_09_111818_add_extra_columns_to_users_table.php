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
        Schema::table('users', function (Blueprint $table) {
            $table->boolean('is_active')->default(true);
            $table->boolean('is_onboarded')->default(false);
            $table->enum('user_type', ['member', 'admin', 'sub_admin', 'member_client', 'member_team_mate']);
            $table->text('profile_image')->nullable();
            $table->timestamp('last_login')->nullable();
            $table->integer('admin_id')->default(1);
            $table->enum('added_by',['admin', 'support', 'ipn', 'reviewer', 'reseller', 'member', 'whitelabel', 'signup'])->default('signup');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            //
        });
    }
};
