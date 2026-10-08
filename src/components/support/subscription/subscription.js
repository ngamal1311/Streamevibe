import Pricing from "../../Home/pricing";
import React from "react";
import PlansSection from './planSection'
import FreeTrial from "../../Home/freeTiral";

export default function Subscription() {
    return (
        <>
            <div className="md:mx-16 xl:mx-32">
                <Pricing />
                <PlansSection />
                <FreeTrial />
            </div>
        </>
    );
}
