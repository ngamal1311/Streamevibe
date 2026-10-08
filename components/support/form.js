import { useState } from "react";
import supportImage from "../../resources/images/suuportImage.png";

const Form = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        countryCode: "+20",
        phone: "",
        message: "",
        agree: false,
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setSuccess("");
        setError("");

        if (!formData.agree) {
        setError("Please agree to the Terms of Use and Privacy Policy.");
        return;
        }

        try {
        setLoading(true);

        const response = await fetch("http://localhost:8000/api/support/", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            country_code: formData.countryCode,
            phone_number: formData.phone,
            message: formData.message,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            console.log(data);
            setError("Something went wrong. Please try again.");
            return;
        }

        setSuccess("Your message has been sent successfully!");

        // Clear form
        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            countryCode: "+20",
            phone: "",
            message: "",
            agree: false,
        });
        } catch (error) {
        console.log("Support error:", error);
        setError("Failed to send your message.");
        } finally {
        setLoading(false);
        }
    };

    return (
        <section className="bg-[#141414] min-h-screen px-6 py-16 lg:px-16">
        <div className="max-w-[1100px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mt-20">
            {/* ================= LEFT ================= */}

            <div>
                {/* Heading */}
                <div className="max-w-[400px] mb-8">
                <h1 className="text-white text-4xl lg:text-5xl font-semibold leading-tight">
                    Welcome to our
                    <br />
                    support page!
                </h1>

                <p className="text-[#8c8c8c] text-sm leading-6 mt-5 max-w-[360px]">
                    We're here to help you with any problems you may be having with
                    our product.
                </p>
                </div>

                {/* Movies Image */}
                <div className="w-full max-w-[340px] h-[310px] overflow-hidden rounded-lg">
                <img
                    src={supportImage}
                    alt="Movies"
                    className="w-full h-full object-cover"
                />
                </div>
            </div>

            {/* ================= RIGHT - FORM ================= */}

            <div className="bg-[#111111] border border-[#292929] rounded-lg p-7 lg:p-8">
                <form onSubmit={handleSubmit}>
                {/* First Name + Last Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-7">
                    <div>
                    <label
                        htmlFor="firstName"
                        className="block text-white text-sm mb-3"
                    >
                        First Name
                    </label>

                    <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        placeholder="Enter First Name"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full h-11 px-3 bg-[#141414] border border-[#292929] rounded-md text-white text-sm placeholder:text-[#666] outline-none focus:border-red-600 transition"
                    />
                    </div>

                    <div>
                    <label
                        htmlFor="lastName"
                        className="block text-white text-sm mb-3"
                    >
                        Last Name
                    </label>

                    <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        placeholder="Enter Last Name"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full h-11 px-3 bg-[#141414] border border-[#292929] rounded-md text-white text-sm placeholder:text-[#666] outline-none focus:border-red-600 transition"
                    />
                    </div>
                </div>

                {/* Email + Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-7">
                    {/* Email */}
                    <div>
                    <label
                        htmlFor="email"
                        className="block text-white text-sm mb-3"
                    >
                        Email
                    </label>

                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full h-11 px-3 bg-[#141414] border border-[#292929] rounded-md text-white text-sm placeholder:text-[#666] outline-none focus:border-red-600 transition"
                    />
                    </div>

                    {/* Phone */}
                    <div>
                    <label
                        htmlFor="phone"
                        className="block text-white text-sm mb-3"
                    >
                        Phone Number
                    </label>

                    <div className="flex gap-2">
                        {/* Country */}
                        <select
                        name="countryCode"
                        value={formData.countryCode}
                        onChange={handleChange}
                        className="w-[62px] h-11 px-2 bg-[#141414] border border-[#292929] rounded-md text-white text-sm outline-none"
                        >
                        <option value="+20">🇪🇬</option>

                        <option value="+1">🇺🇸</option>

                        <option value="+44">🇬🇧</option>
                        </select>

                        <input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="Enter Phone Number"
                        value={formData.phone}
                        onChange={handleChange}
                        className="flex-1 min-w-0 h-11 px-3 bg-[#141414] border border-[#292929] rounded-md text-white text-sm placeholder:text-[#666] outline-none focus:border-red-600 transition"
                        />
                    </div>
                    </div>
                </div>

                {/* Message */}
                <div className="mb-7">
                    <label
                    htmlFor="message"
                    className="block text-white text-sm mb-3"
                    >
                    Message
                    </label>

                    <textarea
                    id="message"
                    name="message"
                    rows="5"
                    placeholder="Enter your Message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-3 py-3 bg-[#141414] border border-[#292929] rounded-md text-white text-sm placeholder:text-[#666] outline-none resize-none focus:border-red-600 transition"
                    />
                </div>
                {success && (
                    <p className="text-green-500 text-sm mb-5">
                        {success}
                    </p>
                )}

                {error && (
                    <p className="text-red-500 text-sm mb-5">
                        {error}
                    </p>
                )}

                {/* Bottom */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
                    {/* Checkbox */}
                    <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        name="agree"
                        checked={formData.agree}
                        onChange={handleChange}
                        className="w-4 h-4 accent-red-600 cursor-pointer"
                    />

                    <span className="text-[#777] text-xs">
                        I agree with Terms of Use and Privacy Policy
                    </span>
                    </label>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={!formData.agree || loading}
                        className="bg-red-600 hover:bg-red-700 disabled:bg-[#333] disabled:text-[#777] text-white text-sm font-medium px-7 py-3 rounded-md transition"
                    >
                        {loading ? "Sending..." : "Send Message"}
                    </button>
                </div>
                </form>
            </div>
            </div>
        </div>
        </section>
    );
};

export default Form;
