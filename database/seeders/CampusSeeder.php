<?php

namespace Database\Seeders;

use App\Models\Campus;
use Illuminate\Database\Seeder;

class CampusSeeder extends Seeder
{
    public function run(): void
    {
        $campuses = [
            ['name' => 'Campus A', 'code' => 'A'],
            ['name' => 'Campus B', 'code' => 'B'],
            ['name' => 'Campus C', 'code' => 'C'],
            ['name' => 'Campus D', 'code' => 'D'],
            ['name' => 'Campus E', 'code' => 'E'],
        ];

        foreach ($campuses as $campus) {
            Campus::create($campus);
        }
    }
} 