import SliderControls from "./sliderControlToShows";

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
    <div className="mb-6 flex items-center justify-between">

      <h2 className="text-xl font-semibold text-white md:text-2xl">
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