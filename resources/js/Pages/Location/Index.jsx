import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { Head, useForm, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Map, {
    FullscreenControl,
    GeolocateControl,
    Marker,
    NavigationControl,
    Popup,
    ScaleControl,
} from "react-map-gl";
import ItemSlider from "@/Components/ItemSlider";
import LocationForm from "@/Components/LocationForm";
import PrimaryButton from "@/Components/PrimaryButton";
// import * as MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";

// const directions = new MapboxDirections({
//     accessToken:
//         "pk.eyJ1IjoiY3J1c2hlcmJsYWNrIiwiYSI6ImNsOXk3cTZzajAyazYzbnBkbWs0Y3AyNjcifQ.hXpOiJw9u5SzTTbFi-a_zQ",
//     unit: "metric",
//     profile: "mapbox/cycling",
// });

const Location = ({ auth }) => {
    const { locations } = usePage().props;

    const [allLocations, setAllLocations] = useState([]);

    useEffect(() => {
        setAllLocations(locations);
    }, [locations]);

    const sliderRef = useRef();
    const mapRef = useRef();

    const [popupInfo, setPopupInfo] = useState(null);
    const [isCreateMode, setIsCreateMode] = useState(false);
    const [isUpdateMode, setIsUpdateMode] = useState(false);

    const {
        setData,
        post: postHTTPMethod,
        delete: deleteHTTPMethod,
        reset,
        data,
        errors,
        processing,
        recentlySuccessful,
    } = useForm({
        long: "",
        lat: "",
        name: "",
        description: "",
        image: "",
    });

    const scrollToSlide = useCallback(
        (index) => {
            sliderRef.current.slickGoTo(index);
        },
        [sliderRef]
    );

    const handleJumpTo = useCallback(
        (data) => {
            setIsUpdateMode(true);

            setData({
                id: data.id,
                lat: data.lat,
                long: data.long,
                name: data.name,
                description: data.description,
                rating: data.rating,
            });

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
        [mapRef, isCreateMode]
    );

    // useEffect(() => {
    //     if (!mapRef.current) return;
    //     mapRef.current.addControl(directions, "top-right");
    // }, [mapRef.current]);

    const pins = useMemo(
        () =>
            allLocations.map((location, index) => (
                <Marker
                    key={`marker-${index}`}
                    longitude={location.long}
                    latitude={location.lat}
                    anchor="bottom"
                    onClick={(e) => {
                        e.originalEvent.stopPropagation();

                        //make sure user can't click marker when in create mode
                        if (isCreateMode) return;

                        setPopupInfo(location);
                        scrollToSlide(index);
                        handleJumpTo(location);
                    }}
                    draggable={location.id === data.id}
                    onDragStart={() => setPopupInfo(null)}
                    onDragEnd={(e) => {
                        const copiedLocations = [...allLocations];

                        copiedLocations[index] = {
                            ...copiedLocations[index],
                            lat: e.lngLat.lat,
                            long: e.lngLat.lng,
                        };

                        setAllLocations(copiedLocations);

                        setData({
                            ...data,
                            lat: e.lngLat.lat,
                            long: e.lngLat.lng,
                        });
                    }}
                >
                    <img
                        src="https://cdn.iconscout.com/icon/free/png-256/free-restaurant-1495593-1267764.png?f=webp"
                        className={`h-8 w-8 ${
                            isCreateMode ||
                            (isUpdateMode && location.id !== data.id)
                                ? "opacity-40"
                                : "opacity-100"
                        }`}
                    />
                </Marker>
            )),
        [data, isCreateMode, allLocations]
    );

    const handleSetLocation = useCallback(
        (e) => {
            if (!isCreateMode) return;

            setData({
                long: e.lngLat.lng,
                lat: e.lngLat.lat,
            });
        },
        [isCreateMode]
    );

    const handleSubmit = useCallback(
        (e) => {
            e.preventDefault();

            if (isCreateMode) {
                postHTTPMethod(route("location.create", data), {
                    onSuccess: () => {
                        handleResetForm();
                    },
                });
            } else {
                postHTTPMethod(route("location.update", data), {
                    onSuccess: () => {
                        handleResetForm();
                    },
                });
            }
        },
        [isCreateMode, data]
    );

    const handleDeleteLocation = useCallback((id) => {
        deleteHTTPMethod(
            route("location.delete", {
                id,
            }),
            {
                onSuccess: () => {
                    handleResetForm();
                },
            }
        );
    }, []);

    const handleResetForm = useCallback(() => {
        setPopupInfo(null);
        setIsCreateMode(false);
        setIsUpdateMode(false);
        setAllLocations(locations);
        reset();
    }, []);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Master Location
                </h2>
            }
        >
            <Head name="Dashboard GIS" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex gap-4">
                    <div className="h-max w-3/4">
                        <Map
                            reuseMaps
                            ref={mapRef}
                            mapboxAccessToken="pk.eyJ1IjoiY3J1c2hlcmJsYWNrIiwiYSI6ImNsOXk3cTZzajAyazYzbnBkbWs0Y3AyNjcifQ.hXpOiJw9u5SzTTbFi-a_zQ"
                            initialViewState={{
                                longitude: 106.8291201,
                                latitude: -6.1836782,
                                zoom: 12,
                                bearing: 0,
                                pitch: 0,
                            }}
                            style={{ width: "100%", height: 600 }}
                            mapStyle="mapbox://styles/mapbox/streets-v9"
                            onClick={handleSetLocation}
                            cursor={isCreateMode ? "pointer" : "auto"}
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
                    <div className="w-1/4">
                        {!isCreateMode && !isUpdateMode && (
                            <PrimaryButton
                                className="mb-4"
                                onClick={() => setIsCreateMode(true)}
                            >
                                Tambah Marker
                            </PrimaryButton>
                        )}

                        {isCreateMode && (
                            <p className="text-green-500 font-semibold text-sm mb-2">
                                Click On Map To Add New Location
                            </p>
                        )}

                        {(isCreateMode || isUpdateMode) && (
                            <LocationForm
                                data={data}
                                setData={setData}
                                errors={errors}
                                handleSubmit={handleSubmit}
                                handleResetForm={handleResetForm}
                                handleDeleteLocation={handleDeleteLocation}
                                processing={processing}
                                recentlySuccessful={recentlySuccessful}
                                isUpdateMode={isUpdateMode}
                            />
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Location;
