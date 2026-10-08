import React from "react";
import {Smartphone, Tablet, Tv, Laptop, Gamepad2, Glasses} from 'lucide-react';
const devices = [
    {
        name: "Smartphones",
        icon: <Smartphone />,
        description:
        "StreamVibe is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store",
    },
    {
        name: "Tablet",
        icon: <Tablet />,
        description:
        "StreamVibe is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store",
    },
    {
        name: "Smart TV",
        icon: <Tv />,
        description:
        "StreamVibe is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store",
    },
    {
        name: "Laptops",
        icon: <Laptop />,
        description:
        "StreamVibe is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store",
    },
    {
        name: "Gaming Consoles",
        icon: <Gamepad2 />,
        description:
        "StreamVibe is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store",
    },
    {
        name: "VR Headsets",
        icon: <Glasses />,
        description:
        "StreamVibe is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store",
    },
    ];

    function Devices() {
    return (
        <section className="bg-[#141414] px-5 py-16 text-white sm:px-8 lg:px-16">

        {/* Section Header */}
        <div className="mx-auto max-w-[1597px]">
            <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
            We Provide you streaming experience across various devices.
            </h2>

            <p className="mt-3 max-w-5xl text-sm leading-6 text-[#999]">
            With StreamVibe, you can enjoy your favorite movies and TV shows
            anytime, anywhere. Our platform is designed to be compatible with a
            wide range of devices, ensuring that you never miss a moment of
            entertainment.
            </p>
        </div>

        {/* Devices Cards */}
        <div className="mx-auto mt-12 grid max-w-[1597px] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

            {devices.map((device) => (
            <div
                key={device.name}
                className="rounded-lg border border-[#262626] bg-gradient-to-br from-[#1a0d0d] to-[#111111] p-7"
            >

                {/* Icon + Title */}
                <div className="flex items-center gap-4">

                <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-[#292929] bg-[#141414] text-xl">
                    {device.icon}
                </div>

                <h3 className="text-lg font-medium">
                    {device.name}
                </h3>

                </div>

                {/* Description */}
                <p className="mt-5 text-sm leading-6 text-[#999]">
                {device.description}
                </p>

            </div>
            ))}

        </div>

        </section>
    );
}

export default Devices;