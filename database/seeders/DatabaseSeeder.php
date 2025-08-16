<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
   public function run()
{
    \App\Models\Student::factory(10)->create();
    \App\Models\Course::factory(5)->create();
    \App\Models\Enrollment::factory(20)->create();
}
}