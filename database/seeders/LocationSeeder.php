<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Location;

class LocationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $locations = [
            [
                'name' => 'Delicious Bites',
                'description' => 'A trendy restaurant offering a fusion of Indonesian and Western cuisines.',
                'image' => 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/00/bf/95/buffet-spread.jpg?w=500&h=-1&s=1',
                'lat' => -6.2146,
                'long' => 106.8451,
                'rating' => 4,
                'is_active' => 1
            ],
            [
                'name' => 'Spice Garden',
                'description' => 'Experience the flavors of India in the heart of Jakarta. Enjoy authentic Indian dishes in a vibrant setting.',
                'image' => 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/18/f3/b9/8c/babi-hong.jpg?w=600&h=-1&s=1',
                'lat' => -6.2088,
                'long' => 106.8456,
                'rating' => 2,
                'is_active' => 1
            ],
            [
                'name' => 'Oceanic Delights',
                'description' => 'Savor delectable seafood dishes while enjoying a stunning view of the Jakarta Bay.',
                'image' => 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/18/f3/b7/92/kuluyuk-ayam.jpg?w=600&h=400&s=1',
                'lat' => -6.2263,
                'long' => 106.8308,
                'rating' => 3.5,
                'is_active' => 1
            ],
            [
                'name' => 'Sushi Haven',
                'description' => 'A cozy sushi bar offering an extensive menu of fresh sushi and sashimi.',
                'image' => 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/08/e3/6d/6a/sushi-tei-plaza-indonesia.jpg?w=600&h=400&s=1',
                'lat' => -6.2219,
                'long' => 106.8059,
                'rating' => 5,
                'is_active' => 1
            ],
            [
                'name' => 'La Patisserie',
                'description' => 'Indulge in a wide array of delectable pastries, cakes, and desserts at this charming French-inspired patisserie.',
                'image' => 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/72/01/3b/diponegoro-dining-hall.jpg?w=600&h=400&s=1',
                'lat' => -6.1941,
                'long' => 106.8239,
                'rating' => 3,
                'is_active' => 1
            ],
            [
                'name' => 'Rooftop Lounge',
                'description' => 'Enjoy panoramic views of the city skyline while sipping on handcrafted cocktails and sampling delicious bar bites.',
                'image' => 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/b3/5c/28/img20190307155916-largejpg.jpg?w=600&h=400&s=1',
                'lat' => -6.1966,
                'long' => 106.8223,
                'rating' => 5,
                'is_active' => 1
            ],
            [
                'name' => 'Mama Mia Pizza',
                'description' => 'A family-friendly pizzeria serving traditional wood-fired pizzas with a variety of mouthwatering toppings.',
                'image' => 'https://menufyproduction.imgix.net/637865014833715521+765921.png?auto=compress,format&h=1080&w=1920&fit=max',
                'lat' => -6.2189,
                'long' => 106.7998,
                'rating' => 4.5,
                'is_active' => 1
            ],
            [
                'name' => 'Noodle House',
                'description' => 'Step into this cozy noodle house and savor a wide selection of Asian noodle dishes, from ramen to stir-fried noodles.',
                'image' => 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/50/6e/59/teras-dharmawangsa.jpg?w=600&h=-1&s=1',
                'lat' => -6.2173,
                'long' => 106.7974,
                'rating' => 4,
                'is_active' => 1
            ],
            [
                'name' => 'The Grill House',
                'description' => 'A steakhouse known for its perfectly grilled steaks, accompaniedby flavorful sauces and sides.',
                'image' => 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/85/79/0d/la-grillade.jpg?w=600&h=400&s=1',
                'lat' => -6.2081,
                'long' => 106.7972,
                'rating' => 5,
                'is_active' => 1
            ],
            [
                'name' => 'Cafe Mornings',
                'description' => 'Start your day with a delicious breakfast spread and a cup of freshly brewed coffee at this cozy cafe.',
                'image' => 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/f3/24/3c/1f-9.jpg?w=600&h=400&s=1',
                'lat' => -6.2150,
                'long' => 106.8169,
                'rating' => 4.5,
                'is_active' => 1
            ],
        ];

        foreach ($locations as $location) {
            Location::create($location);
        }
    }
}
