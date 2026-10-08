import heroImage from "../../resources/images/hero.png";
import React from "react";
function Background() {
    return (
        <section className="relative min-h-screen mt-0">
        {/* Background Image */}
        <div className="absolute inset-0">
            <img
            src={heroImage}
            alt="Movies"
            className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/10"></div>
            {/* Top Gradient */}
            <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-black/90 to-transparent"></div>
        </div>
        </section>
    );
}

export default Background;