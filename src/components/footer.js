const footerLinks = [
    {
        title: "Home",
        links: ["Categories", "Devices", "Pricing", "FAQ"],
    },
    {
        title: "Movies",
        links: ["Genres", "Trending", "New Release", "Popular"],
    },
    {
        title: "Shows",
        links: ["Genres", "Trending", "New Release", "Popular"],
    },
    {
        title: "Support",
        links: ["Contact Us"],
    },
    {
        title: "Subscription",
        links: ["Plans", "Features"],
    },
    ];

    function Footer() {
    return (
        <footer className="bg-[#0f0f0f] px-5 pt-14 text-white sm:px-8 lg:px-16">

        {/* Main Footer */}
        <div className="mx-auto max-w-[1597px]">

            <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-6 lg:gap-8">

            {/* Links */}
            {footerLinks.map((section) => (
                <div key={section.title}>

                <h3 className="text-sm font-medium">
                    {section.title}
                </h3>

                <ul className="mt-5 space-y-4">
                    {section.links.map((link) => (
                    <li key={link}>
                        <a
                        href="#"
                        className="text-sm text-[#999] transition hover:text-white"
                        >
                        {link}
                        </a>
                    </li>
                    ))}
                </ul>

                </div>
            ))}

            {/* Social Media */}
            <div>
                <h3 className="text-sm font-medium">
                Connect With Us
                </h3>

                <div className="mt-5 flex gap-2">

                <a
                    href="#"
                    className="flex h-9 w-9 items-center justify-center rounded-md border border-[#292929] bg-[#1a1a1a] text-sm font-bold transition hover:bg-[#252525]"
                >
                    f
                </a>

                <a
                    href="#"
                    className="flex h-9 w-9 items-center justify-center rounded-md border border-[#292929] bg-[#1a1a1a] text-sm font-bold transition hover:bg-[#252525]"
                >
                    𝕏
                </a>

                <a
                    href="#"
                    className="flex h-9 w-9 items-center justify-center rounded-md border border-[#292929] bg-[#1a1a1a] text-sm font-bold transition hover:bg-[#252525]"
                >
                    in
                </a>

                </div>
            </div>

            </div>

            {/* Divider */}
            <div className="mt-16 border-t border-[#262626]"></div>

            {/* Bottom Footer */}
            <div className="flex flex-col gap-5 py-6 text-xs text-[#999] md:flex-row md:items-center md:justify-between">

            <p>
                ©2023 streamvib, All Rights Reserved
            </p>

            <div className="flex flex-wrap gap-4">

                <a href="#" className="transition hover:text-white">
                Terms of Use
                </a>

                <span className="text-[#333]">|</span>

                <a href="#" className="transition hover:text-white">
                Privacy Policy
                </a>

                <span className="text-[#333]">|</span>

                <a href="#" className="transition hover:text-white">
                Cookie Policy
                </a>

            </div>

            </div>

        </div>
        </footer>
    );
}

export default Footer;