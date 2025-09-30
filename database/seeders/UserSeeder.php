<?php

namespace Database\Seeders;

use App\Models\User;
use Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Admin User',
            'email' => 'onyebuchiprincee@gmail.com',
            'password' => Hash::make('12345678'), // always hash!
            'user_type' => 'admin',
        ]);

        // // You can add more users here
        // User::factory()->count(2)->create(); // generates 5 random users
    }
}
