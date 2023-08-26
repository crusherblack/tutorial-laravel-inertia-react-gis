import React from "react";
import PrimaryButton from "./PrimaryButton";
import { Transition } from "@headlessui/react";
import InputError from "./InputError";
import TextInput from "./TextInput";
import InputLabel from "./InputLabel";
import DangerButton from "./DangerButton";

const LocationForm = ({
    setData = () => {},
    handleSubmit = () => {},
    handleResetForm = () => {},
    handleDeleteLocation = () => {},
    data,
    errors,
    processing,
    recentlySuccessful,
    isUpdateMode,
}) => {
    return (
        <form onSubmit={handleSubmit} className="w-full">
            <div>
                <InputLabel htmlFor="long" value="Longtitude" />

                <TextInput
                    value={data.long}
                    onChange={(e) => setData("long", e.target.value)}
                    type="text"
                    className="mt-1 block w-full"
                />

                <InputError message={errors.long} className="mt-2" />
            </div>

            <div className="mt-4" />

            <div>
                <InputLabel htmlFor="password" value="Latitude" />

                <TextInput
                    value={data.lat}
                    onChange={(e) => setData("lat", e.target.value)}
                    type="text"
                    className="mt-1 block w-full"
                />

                <InputError message={errors.lat} className="mt-2" />
            </div>

            <div className="mt-4" />

            <div>
                <InputLabel htmlFor="name" value="Name" />

                <TextInput
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                    type="text"
                    className="mt-1 block w-full"
                />

                <InputError message={errors.name} className="mt-2" />
            </div>

            <div className="mt-4" />

            <div>
                <InputLabel htmlFor="description" value="Description" />

                <TextInput
                    value={data.description}
                    onChange={(e) => setData("description", e.target.value)}
                    type="text"
                    className="mt-1 block w-full"
                />

                <InputError message={errors.description} className="mt-2" />
            </div>

            <div className="mt-4" />

            <div>
                <InputLabel htmlFor="rating" value="Rating" />

                <TextInput
                    value={data.rating}
                    onChange={(e) => setData("rating", e.target.value)}
                    type="number"
                    className="mt-1 block w-full"
                />

                <InputError message={errors.rating} className="mt-2" />
            </div>

            <div className="mt-4" />

            <div>
                <InputLabel htmlFor="image" value="Image" />

                <TextInput
                    onChange={(e) => setData("image", e.target.files[0])}
                    type="file"
                    className="mt-1 block w-full"
                />

                <InputError message={errors.image} className="mt-2" />
            </div>

            <div className="mt-8" />

            <div className="flex items-center gap-4">
                <PrimaryButton
                    type="button"
                    disabled={processing}
                    onClick={handleResetForm}
                >
                    Cancel
                </PrimaryButton>
                <PrimaryButton disabled={processing}>
                    {isUpdateMode ? "Update" : "Save"} Location
                </PrimaryButton>

                <Transition
                    show={recentlySuccessful}
                    enter="transition ease-in-out"
                    enterFrom="opacity-0"
                    leave="transition ease-in-out"
                    leaveTo="opacity-0"
                >
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        New Location Added
                    </p>
                </Transition>
            </div>

            <div className="mt-8">
                <DangerButton
                    type="button"
                    disabled={processing}
                    onClick={() => handleDeleteLocation(data.id)}
                >
                    Delete Location
                </DangerButton>
            </div>
        </form>
    );
};

export default LocationForm;
