import { useState } from "react";
import { Link } from "react-router-dom";

const questions = [
  {
    id: "01",
    question: "What is StreamVibe?",
    answer:
      "StreamVibe is a streaming service that allows you to watch movies and shows on demand.",
  },
  {
    id: "02",
    question: "How much does StreamVibe cost?",
    answer:
      "StreamVibe offers different subscription plans to suit your needs.",
  },
  {
    id: "03",
    question: "What content is available on StreamVibe?",
    answer:
      "You can enjoy a wide variety of movies, TV shows, and other entertainment content.",
  },
  {
    id: "04",
    question: "How can I watch StreamVibe?",
    answer:
      "You can watch StreamVibe on your smartphone, tablet, laptop, Smart TV, and other supported devices.",
  },
  {
    id: "05",
    question: "How do I sign up for StreamVibe?",
    answer:
      "Simply create an account and choose the subscription plan that works best for you.",
  },
  {
    id: "06",
    question: "What is the StreamVibe free trial?",
    answer:
      "StreamVibe offers a free trial so you can explore the platform before subscribing.",
  },
  {
    id: "07",
    question: "How do I contact StreamVibe customer support?",
    answer:
      "You can contact our customer support team through the support section.",
  },
  {
    id: "08",
    question: "What are the StreamVibe payment methods?",
    answer:
      "We support multiple secure payment methods including cards and other available options.",
  },
];

function FAQ() {
  const [openQuestion, setOpenQuestion] = useState("01");

  const toggleQuestion = (id) => {
    setOpenQuestion(openQuestion === id ? null : id);
  };

  return (
    <section className="bg-[#141414] px-5 py-16 text-white sm:px-8 lg:px-16">
      {/* Header */}
      <div className="mx-auto flex max-w-[1597px] flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div>
          <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
            Frequently Asked Questions
          </h2>

          <p className="mt-3 max-w-4xl text-sm leading-6 text-[#999]">
            Got questions? We've got answers! Check out our FAQ section to find
            answers to the most common questions about StreamVibe.
          </p>
        </div>

        <Link to="/support" className="block">
          <button className="w-fit rounded-md bg-red-600 px-5 py-3 text-sm font-medium transition hover:bg-red-700">
            Ask a Question
          </button>
        </Link>
      </div>

      {/* Questions */}
      <div className="mx-auto mt-14 grid max-w-[1597px] grid-cols-1 gap-x-16 lg:grid-cols-2">
        {questions.map((item) => (
          <div key={item.id} className="border-b border-[#3a1717]">
            {/* Question */}
            <button
              onClick={() => toggleQuestion(item.id)}
              className="flex w-full items-center gap-3 py-5 text-left"
            >
              {/* Number */}
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#222] text-sm">
                {item.id}
              </span>

              {/* Question text */}
              <span className="flex-1 text-sm sm:text-base">
                {item.question}
              </span>

              {/* Plus / Minus */}
              <span className="text-2xl font-light">
                {openQuestion === item.id ? "−" : "+"}
              </span>
            </button>

            {/* Answer */}
            {openQuestion === item.id && (
              <div className="pb-6 pl-[52px] pr-8 text-sm leading-6 text-[#999]">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default FAQ;
