import { ArrowLeft, ArrowRight } from "lucide-react";

const SliderControls = ({
    currentSlide,
    totalSlides,
    onPrev,
    onNext,
    isBeginning,
    isEnd,
    }) => {
    return (
        <div className="flex items-center gap-3 rounded-xl border border-[#292929] bg-[#0f0f0f] p-2">
        {/* Previous Button */}
        <button
            type="button"
            onClick={onPrev}
            disabled={isBeginning}
            className={`flex h-10 w-10 items-center justify-center rounded-lg bg-[#181818] text-white transition ${
            isBeginning
                ? "cursor-not-allowed opacity-40"
                : "hover:bg-[#222222]"
            }`}
        >
            <ArrowLeft size={30} strokeWidth={1.8} />
        </button>

        {/* Slides Indicators */}
        <div className="hidden lg:flex items-center gap-1.5">
        {Array.from({ length: totalSlides }).map((_, index) => (
            <span
                key={index}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === currentSlide
                        ? "w-7 bg-red-500"
                        : "w-4 bg-[#3a3a3a]"
                }`}
            />
        ))}
        </div>

        {/* Next Button */}
        <button
            type="button"
            onClick={onNext}
            disabled={isEnd}
            className={`flex h-10 w-10 items-center justify-center rounded-lg bg-[#181818] text-white transition ${
            isEnd
                ? "cursor-not-allowed opacity-40"
                : "hover:bg-[#222222]"
            }`}
        >
            <ArrowRight size={30} strokeWidth={1.8} />
        </button>
        </div>
    );
};

export default SliderControls;