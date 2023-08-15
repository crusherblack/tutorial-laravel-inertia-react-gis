import Map from "react-map-gl";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Dashboard GIS
                </h2>
            }
        >
            <Head title="Dashboard GIS" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg mb-2">
                        <div className="p-6 text-gray-900 dark:text-gray-100 ">
                            Selamat Datang
                        </div>
                    </div>
                    <div className="h-max">
                        <Map
                            mapboxAccessToken="pk.eyJ1IjoiY3J1c2hlcmJsYWNrIiwiYSI6ImNsOXk3cTZzajAyazYzbnBkbWs0Y3AyNjcifQ.hXpOiJw9u5SzTTbFi-a_zQ"
                            initialViewState={{
                                longitude: 106.8291201,
                                latitude: -6.1836782,
                                zoom: 12,
                            }}
                            style={{ width: "100%", height: 600 }}
                            mapStyle="mapbox://styles/mapbox/streets-v9"
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
