const SliderControls = ({
    currentSlide,
    totalSlides,
    onPrev,
    onNext,
    isBeginning,
    isEnd,
}) => {
    return (
        <div className="flex items-center gap-2 bg-[#181818] border border-[#292929] rounded-lg p-2">

            {/* Previous Button */}
            <button
                onClick={onPrev}
                disabled={isBeginning}
                className={`w-10 h-10 flex items-center justify-center rounded-md text-white transition
                    ${
                        isBeginning
                            ? "bg-[#151515] text-gray-600 cursor-not-allowed"
                            : "bg-[#222222] hover:bg-[#2b2b2b]"
                    }
                `}
            >
                ←
            </button>

            {/* Indicators */}
            <div className="flex items-center gap-1 px-1">
                {Array.from({ length: totalSlides }).map((_, index) => (
                    <span
                        key={index}
                        className={`h-0.5 rounded-full transition-all duration-300
                            ${
                                index === currentSlide
                                    ? "w-4 bg-red-600"
                                    : "w-4 bg-gray-600"
                            }
                        `}
                    />
                ))}
            </div>

            {/* Next Button */}
            <button
                onClick={onNext}
                disabled={isEnd}
                className={`w-10 h-10 flex items-center justify-center rounded-md text-white transition
                    ${
                        isEnd
                            ? "bg-[#151515] text-gray-600 cursor-not-allowed"
                            : "bg-[#222222] hover:bg-[#2b2b2b]"
                    }
                `}
                
            >
                →
            </button>

        </div>
    );
};

export default SliderControls;