import Background from "./Home/background";
import Hero from "./Home/hero";
import Categories from "./Home/categories";
import React from "react";
import Devices from "./Home/devices";
import FAQ from "./Home/FAQ";
import Pricing from "./Home/pricing";
import FreeTrial from "./Home/freeTiral";
import Header from "./header";
import Footer from "./footer";

function Home() {
    return (
        <>
        <Background />
        <Hero />
        <Categories />
        <Devices />
        <FAQ />
        <Pricing />
        <FreeTrial />
        </>
    );
}

export default Home;
