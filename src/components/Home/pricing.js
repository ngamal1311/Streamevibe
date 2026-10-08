import { useState } from "react";

const plans = {
  monthly: [
    {
      name: "Basic Plan",
      description:
        "Enjoy an extensive library of movies and shows, featuring a range of content, including recently released titles.",
      price: "9.99",
    },
    {
      name: "Standard Plan",
      description:
        "Access to a wider selection of movies and shows, including most new releases and exclusive content.",
      price: "12.99",
    },
    {
      name: "Premium Plan",
      description:
        "Access to a widest selection of movies and shows, including all new releases and Offline Viewing.",
      price: "14.99",
    },
  ],

  yearly: [
    {
      name: "Basic Plan",
      description:
        "Enjoy an extensive library of movies and shows, featuring a range of content, including recently released titles.",
      price: "99.99",
    },
    {
      name: "Standard Plan",
      description:
        "Access to a wider selection of movies and shows, including most new releases and exclusive content.",
      price: "129.99",
    },
    {
      name: "Premium Plan",
      description:
        "Access to a widest selection of movies and shows, including all new releases and Offline Viewing.",
      price: "149.99",
    },
  ],
};

function Pricing() {
  const [billing, setBilling] = useState("monthly");

  return (
    <section className="bg-[#141414] px-5 py-16 text-white sm:px-8 lg:px-16">

      {/* Header */}
      <div className="mx-auto flex max-w-[1597px] flex-col gap-6 md:flex-row md:items-center md:justify-between mt-20">

        <div>
          <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
            Choose the plan that’s right for you
          </h2>

          <p className="mt-3 max-w-5xl text-sm leading-6 text-[#999]">
            Join StreamVibe and select from our flexible subscription options
            tailored to suit your viewing preferences. Get ready for non-stop
            entertainment!
          </p>
        </div>

        {/* Monthly / Yearly */}
        <div className="flex w-fit rounded-lg border border-[#292929] bg-[#0f0f0f] p-1">

          <button
            onClick={() => setBilling("monthly")}
            className={`rounded-md px-5 py-3 text-sm transition ${
              billing === "monthly"
                ? "bg-[#262626] text-white"
                : "text-[#999]"
            }`}
          >
            Monthly
          </button>

          <button
            onClick={() => setBilling("yearly")}
            className={`rounded-md px-5 py-3 text-sm transition ${
              billing === "yearly"
                ? "bg-[#262626] text-white"
                : "text-[#999]"
            }`}
          >
            Yearly
          </button>

        </div>
      </div>

      {/* Plans */}
      <div className="mx-auto mt-12 grid max-w-[1597px] grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">

        {plans[billing].map((plan) => (
          <div
            key={plan.name}
            className="rounded-lg border border-[#292929] bg-[#1a1a1a] p-7"
          >

            {/* Plan name */}
            <h3 className="text-lg font-semibold">
              {plan.name}
            </h3>

            {/* Description */}
            <p className="mt-3 min-h-[72px] text-sm leading-5 text-[#999]">
              {plan.description}
            </p>

            {/* Price */}
            <div className="mt-6 flex items-end">
              <span className="text-3xl font-semibold">
                ${plan.price}
              </span>

              <span className="mb-1 ml-1 text-sm text-[#999]">
                /month
              </span>
            </div>

            {/* Buttons */}
            <div className="mt-7 flex gap-3">

              <button className="flex-1 rounded-md border border-[#292929] bg-[#141414] px-4 py-3 text-sm transition hover:bg-[#222]">
                Start Free Trial
              </button>

              <button className="flex-1 rounded-md bg-red-600 px-4 py-3 text-sm font-medium transition hover:bg-red-700">
                Choose Plan
              </button>

            </div>

          </div>
        ))}

      </div>

    </section>
  );
}

export default Pricing;