import backgroundImage from "../../resources/images/Container.png";

function FreeTrial() {
    return (
        <section className="bg-[#141414] px-5 py-16 sm:px-8 lg:px-16">
        <div
            className="relative mx-auto max-w-[1597px] overflow-hidden rounded-lg border border-[#292929] bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/70"></div>

            {/* Content */}
            <div className="relative z-10 flex min-h-[190px] flex-col justify-center gap-6 px-8 py-10 md:flex-row md:items-center md:justify-between md:px-12 lg:px-14">

            <div>
                <h2 className="text-3xl font-bold sm:text-4xl">
                Start your free trial today!
                </h2>

                <p className="mt-3 text-sm text-[#999]">
                This is a clear and concise call to action that encourages users
                to sign up for a free trial of StreamVibe.
                </p>
            </div>

            <button className="w-fit shrink-0 rounded-md bg-red-600 px-6 py-3 text-sm font-medium transition hover:bg-red-700">
                Start a Free Trial
            </button>

            </div>

        </div>
        </section>
    );
}

export default FreeTrial;