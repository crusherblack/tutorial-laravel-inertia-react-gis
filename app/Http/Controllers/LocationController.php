<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;

use Inertia\Inertia;
use Inertia\Response;
use App\Models\Location;

class LocationController extends Controller
{
    public function index(): Response{
        $locations = Location::all();

        return Inertia::render('Location/Index', [
            'locations' => $locations
        ]);
    }

    public function create(Request $request): RedirectResponse{
        $validateForm = $request->validate([
            'lat' => ['required', 'min:4', 'max:100'],
            'long' => ['required', 'min:4', 'max:100'],
            'name' => ['required', 'min:3', 'max:255'],
            'description' => ['max:500'],
            'image' => ['required','mimes:jpg,jpeg,png,avif', 'max:4096'],
            'rating' => ['required'],
        ]);

        $formData = [
            'lat' => $request->lat,
            'long' => $request->long,
            'name' => $request->name,
            'description' => $request->description,
            'rating' => $request->rating,
            'is_active' => 1
        ];

        if($request->image){
            $originalImage = $request->image;
            $filename = uniqid() . '.' . $request->image->getClientOriginalExtension();
            $originalImage->move(public_path().'/images/', $filename);

            $formData['image'] = $filename;
        }

        Location::create($formData);

        return Redirect::route('location.index');
    }

    public function update(Request $request): RedirectResponse{
        $location = Location::find($request->id);

        $validateForm = $request->validate([
            'lat' => ['required', 'min:4', 'max:100'],
            'long' => ['required', 'min:4', 'max:100'],
            'name' => ['required', 'min:3', 'max:255'],
            'description' => ['max:500'],
            'image' => ['mimes:jpg,jpeg,png,avif', 'max:4096'],
            'rating' => ['required'],
        ]);

        $formData = [
            'lat' => $request->lat,
            'long' => $request->long,
            'name' => $request->name,
            'description' => $request->description,
            'rating' => $request->rating,
            'is_active' => 1
        ];

        //if have previous image delete it and replace with new image
        if($request->image){
            $imagePath = public_path().'/images/' . $location->image;

            if (file_exists($imagePath)) {
                unlink($imagePath);
            }

            $originalImage = $request->image;
            $filename = uniqid() . '.' . $request->image->getClientOriginalExtension();
            $originalImage->move(public_path().'/images/', $filename);

            $formData['image'] = $filename;
        }

        $location->update($formData);

        return Redirect::route('location.index');
    }

    public function delete($id): RedirectResponse{
        $location = Location::find($id);
        $location->delete();

        return Redirect::route('location.index');
    }
}

