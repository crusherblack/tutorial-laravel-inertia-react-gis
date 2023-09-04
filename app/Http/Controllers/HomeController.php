<?php

namespace App\Http\Controllers;

use App\Models\Location;
use Illuminate\Http\Request;
use Inertia\Inertia;


class HomeController extends Controller
{
    public function index()
    {
        $locations = Location::all();

        return Inertia::render('Welcome', [
            'locations' => $locations
        ]);
    }
}
