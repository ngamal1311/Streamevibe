import { useState, useEffect } from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import SectionHeader from "../movies/common/sectionHeaderToMovies";
const MediaSlider = ({
    title,
    items,
    renderItem,
    slidesPerView = 5,
    slidesPerGroup = 5,
    }) => {
    const [swiper, setSwiper] = useState(null);

    const [currentSlide, setCurrentSlide] = useState(0);

    const [totalSlides, setTotalSlides] = useState(1);

    const [isBeginning, setIsBeginning] = useState(true);

    const [isEnd, setIsEnd] = useState(false);

    const handleSwiper = (swiperInstance) => {
        setSwiper(swiperInstance);

        setTotalSlides(Math.max(swiperInstance.snapGrid.length, 1));

        setIsBeginning(swiperInstance.isBeginning);
        setIsEnd(swiperInstance.isEnd);
    };

    useEffect(() => {
        if (!swiper) return;

        swiper.update();

        setTotalSlides(Math.max(swiper.snapGrid.length, 1));

        setIsBeginning(swiper.isBeginning);
        setIsEnd(swiper.isEnd);
    }, [items, swiper]);

    const handleSlideChange = (swiperInstance) => {
        setCurrentSlide(swiperInstance.snapIndex);

        setIsBeginning(swiperInstance.isBeginning);

        setIsEnd(swiperInstance.isEnd);
    };

    const handlePrev = () => {
        swiper?.slidePrev();
    };

    const handleNext = () => {
        swiper?.slideNext();
    };

    return (
        <section className="mb-20">
        <SectionHeader
            title={title}
            currentSlide={currentSlide}
            totalSlides={totalSlides}
            onPrev={handlePrev}
            onNext={handleNext}
            isBeginning={isBeginning}
            isEnd={isEnd}
        />

        <Swiper
            onSwiper={handleSwiper}
            onSlideChange={handleSlideChange}
            spaceBetween={16}
            slidesPerView={1.5}
            slidesPerGroup={1}
            breakpoints={{
            640: {
                slidesPerView: 2.5,
                slidesPerGroup: 2,
            },

            768: {
                slidesPerView: 3,
                slidesPerGroup: 3,
            },

            1024: {
                slidesPerView: 4,
                slidesPerGroup: 4,
            },

            1280: {
                slidesPerView: slidesPerView,
                slidesPerGroup: slidesPerGroup,
            },
            }}
        >
            {items?.map((item) => (
            <SwiperSlide key={item.id}>{renderItem(item)}</SwiperSlide>
            ))}
        </Swiper>
        </section>
    );
};

export default MediaSlider;
