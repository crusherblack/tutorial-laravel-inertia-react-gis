import React, { forwardRef } from "react";
import Slider from "react-slick";

const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    variableWidth: true,
    pauseOnHover: true,
    swipeToSlide: true,
};

const ItemSlider = forwardRef(
    (
        { locations = [], handleJumpTo = () => {}, setPopupInfo = () => {} },
        ref
    ) => {
        return (
            <Slider {...settings} ref={ref}>
                {locations.map((location) => (
                    <div
                        key={location.name}
                        className={
                            "pr-4 h-32 w-40 hover:cursor-pointer hover:opacity-80"
                        }
                        onClick={() => {
                            handleJumpTo(location);
                            setPopupInfo(location);
                        }}
                    >
                        <img
                            src={"/images/" + location.image}
                            className="object-cover h-full w-full aspect-video rounded-sm"
                        />
                        <p className="text-white/80 mt-2 w-40 text-lg">
                            {location.name}
                        </p>
                        <p className="text-white/80 mt-1 w-40 text-sm">
                            {location.description}
                        </p>
                    </div>
                ))}
            </Slider>
        );
    }
);

export default ItemSlider;
