import { plans } from "./plansData";

const features = [
    {
        name: "Price",
        key: "price",
    },
    {
        name: "Content",
        key: "content",
    },
    {
        name: "Devices",
        key: "devices",
    },
    {
        name: "Free Trial",
        key: "freeTrial",
    },
    {
        name: "Cancel Anytime",
        key: "cancelAnytime",
    },
    {
        name: "HDR",
        key: "hdr",
    },
    {
        name: "Dolby Atmos",
        key: "dolbyAtmos",
    },
    {
        name: "Ad-Free",
        key: "adFree",
    },
    {
        name: "Offline Viewing",
        key: "offlineViewing",
    },
    {
        name: "Family Sharing",
        key: "familySharing",
    },
];


const PlansSection = () => {
    return (
        <section className="bg-[#141414] min-h-screen px-6 py-12 lg:px-16">

            <div className="max-w-[1100px] mx-auto">

                {/* ================= HEADER ================= */}

                <div className="mb-12">

                    <h1 className="text-white text-3xl lg:text-4xl font-semibold">
                        Compare our plans and find the right one for you
                    </h1>

                    <p className="text-[#888] text-sm leading-6 mt-3 max-w-[900px]">
                        StreamVibe offers three different plans to fit your needs:
                        Basic, Standard, and Premium. Compare the features of each
                        plan and choose the one that's right for you.
                    </p>

                </div>


                {/* ================= TABLE ================= */}

                <div className="w-full overflow-x-auto rounded-lg border border-[#292929]">

                    <table className="w-full min-w-[900px] border-collapse">

                        {/* ================= TABLE HEADER ================= */}

                        <thead>

                            <tr className="bg-[#111111]">

                                {/* Features */}
                                <th className="w-[25%] text-left px-5 py-5 text-white text-sm font-medium border-r border-[#292929] border-b">
                                    Features
                                </th>


                                {/* Plans */}
                                {plans.map((plan) => (
                                    <th
                                        key={plan.name}
                                        className="text-left px-5 py-5 text-white text-sm font-medium border-r border-[#292929] border-b last:border-r-0"
                                    >
                                        <div className="flex items-center gap-2">

                                            <span>
                                                {plan.name}
                                            </span>

                                            {plan.popular && (
                                                <span className="bg-red-600 text-white text-[10px] font-medium px-2 py-1 rounded-sm">
                                                    Popular
                                                </span>
                                            )}

                                        </div>
                                    </th>
                                ))}

                            </tr>

                        </thead>


                        {/* ================= TABLE BODY ================= */}

                        <tbody>

                            {features.map((feature) => (
                                <tr
                                    key={feature.key}
                                    className="bg-[#141414] hover:bg-[#171717] transition"
                                >

                                    {/* Feature Name */}
                                    <td className="px-5 py-5 text-[#999] text-sm border-r border-[#292929] border-b">
                                        {feature.name}
                                    </td>


                                    {/* Feature Values */}
                                    {plans.map((plan) => (
                                        <td
                                            key={`${plan.name}-${feature.key}`}
                                            className="px-5 py-5 text-[#999] text-sm leading-5 border-r border-[#292929] border-b last:border-r-0"
                                        >
                                            {plan[feature.key]}
                                        </td>
                                    ))}

                                </tr>
                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </section>
    );
};

export default PlansSection;