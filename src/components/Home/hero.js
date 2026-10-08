import React from "react";
import { FaPlay } from "react-icons/fa";

export default function Hero() {
    return (
        <div>
        <div
            className="px-5 py-12 text-center sm:px-8 md:py-16 lg:py-20 z-10 relative mt-0 shadow-[0_-80px_100px_rgba(20,20,20,0.95)] "
        >
            <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl">
            The Best Streaming Experience
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-xs leading-5 text-gray-300 sm:text-sm md:text-base md:leading-6">
            StreamVibe is the best streaming experience for watching your favorite
            movies and shows on demand, anytime, anywhere. With StreamVibe, you
            can enjoy a wide variety of content, including the latest
            blockbusters, classic movies, popular TV shows, and more. You can also
            create your own watchlists, so you can easily find the content you
            want to watch.
            </p>
            <button className="mt-7 inline-flex items-center gap-2 rounded-lg bg-red-600 px-6 py-3 text-sm font-semibold transition hover:bg-red-700">
            <FaPlay size={16} /> Start Watching Now
            </button>
        </div>
        </div>
    );
}
