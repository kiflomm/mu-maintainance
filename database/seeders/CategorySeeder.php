<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Health',
                'description' => 'Health-related complaints and concerns',
            ],
            [
                'name' => 'Café',
                'description' => 'Food service and cafeteria related issues',
            ],
            [
                'name' => 'Library',
                'description' => 'Library services and facilities',
            ],
            [
                'name' => 'Facilities',
                'description' => 'Building maintenance and facilities management',
            ],
            [
                'name' => 'IT Services',
                'description' => 'Technology and IT infrastructure issues',
            ],
            [
                'name' => 'Security',
                'description' => 'Campus security and safety concerns',
            ],
        ];

        foreach ($categories as $category) {
            Category::create([
                'name' => $category['name'],
                'slug' => Str::slug($category['name']),
                'description' => $category['description'],
            ]);
        }
    }
} 