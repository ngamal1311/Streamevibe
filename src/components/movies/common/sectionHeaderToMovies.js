import SliderControls from "../../sliders/sliderContorl";

const SectionHeader = ({
    title,
    currentSlide,
    totalSlides,
    onPrev,
    onNext,
    isBeginning,
    isEnd,
}) => {
    return (
        <div className="flex items-center justify-between mb-6">

            <h2 className="text-white text-2xl font-bold">
                {title}
            </h2>

            <SliderControls
                currentSlide={currentSlide}
                totalSlides={totalSlides}
                onPrev={onPrev}
                onNext={onNext}
                isBeginning={isBeginning}
                isEnd={isEnd}
            />

        </div>
    );
};

export default SectionHeader;