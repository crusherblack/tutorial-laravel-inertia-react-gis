import React, { useCallback, useMemo, useRef, useState } from "react";

import { Head, Link, usePage } from "@inertiajs/react";
import Map, {
    FullscreenControl,
    GeolocateControl,
    Marker,
    NavigationControl,
    Popup,
    ScaleControl,
} from "react-map-gl";
import ItemSlider from "@/Components/ItemSlider";

const Welcome = ({ auth }) => {
    const { locations } = usePage().props;

    const sliderRef = useRef();
    const mapRef = useRef();

    const [popupInfo, setPopupInfo] = useState(null);

    const scrollToSlide = useCallback(
        (index) => {
            sliderRef.current.slickGoTo(index);
        },
        [sliderRef]
    );

    const handleJumpTo = useCallback(
        (data) => {
            mapRef.current.easeTo(
                {
                    center: [data.long, data.lat],
                    zoom: 13, // Zoom level of the target location
                    bearing: 0, // Bearing of the map (optional)
                    pitch: 0, // Pitch of the map (optional)
                },
                {
                    duration: 2000, // Animation duration in milliseconds
                    easing: (t) => t, // Easing function, default is linear
                }
            );
        },
        [mapRef]
    );

    const pins = useMemo(
        () =>
            locations.map((location, index) => (
                <Marker
                    key={`marker-${index}`}
                    longitude={location.long}
                    latitude={location.lat}
                    anchor="bottom"
                    onClick={(e) => {
                        e.originalEvent.stopPropagation();

                        setPopupInfo(location);
                        scrollToSlide(index);
                        handleJumpTo(location);
                    }}
                >
                    <img
                        src="https://cdn.iconscout.com/icon/free/png-256/free-restaurant-1495593-1267764.png?f=webp"
                        className={`h-8 w-8`}
                    />
                </Marker>
            )),
        [locations]
    );

    return (
        <div className="bg-gray-900">
            <div className="p-6 text-right">
                {auth.user ? (
                    <Link
                        href={route("dashboard")}
                        className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                    >
                        Dashboard
                    </Link>
                ) : (
                    <>
                        <Link
                            href={route("login")}
                            className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                        >
                            Log in
                        </Link>

                        <Link
                            href={route("register")}
                            className="ml-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                        >
                            Register
                        </Link>
                    </>
                )}
            </div>
            <Head name="Dashboard GIS" />
            <div className="pt-6 min-h-[100vh]">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex gap-4">
                    <div className="h-max w-full">
                        <Map
                            reuseMaps
                            ref={mapRef}
                            mapboxAccessToken="YOUR MAPBOX API TOKEN HERE"
                            initialViewState={{
                                longitude: 106.8291201,
                                latitude: -6.1836782,
                                zoom: 12,
                                bearing: 0,
                                pitch: 0,
                            }}
                            style={{ width: "100%", height: 600 }}
                            mapStyle="mapbox://styles/mapbox/streets-v9"
                            cursor={"pointer"}
                        >
                            <GeolocateControl position="top-left" />
                            <FullscreenControl position="top-left" />
                            <NavigationControl position="top-left" />
                            <ScaleControl />
                            {pins}

                            {popupInfo && (
                                <Popup
                                    anchor="top"
                                    longitude={Number(popupInfo.long)}
                                    latitude={Number(popupInfo.lat)}
                                    onClose={() => setPopupInfo(null)}
                                >
                                    <div className="mb-3">
                                        <h2 className="font-semibold mb-2 text-lg">
                                            {popupInfo.name}
                                        </h2>
                                        <p>{popupInfo.description}</p>
                                        <p>Rating: {popupInfo.rating}</p>
                                    </div>
                                    <img
                                        width="100%"
                                        src={"/images/" + popupInfo.image}
                                        className="object-cover rounded-sm"
                                    />
                                </Popup>
                            )}
                        </Map>

                        <div className="mt-8" />

                        <ItemSlider
                            locations={locations}
                            ref={sliderRef}
                            handleJumpTo={handleJumpTo}
                            setPopupInfo={setPopupInfo}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Welcome;
