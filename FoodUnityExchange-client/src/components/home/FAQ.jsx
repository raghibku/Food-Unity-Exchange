import React, { useState } from 'react';

const FAQ = () => {
    const [faqs, setFaqs] = useState([
        {
            question: 'What is Food Unity Exchange?',
            answer: 'Food Unity Exchange is a community-driven platform that connects people to share surplus food, reducing waste and fostering neighborly bonds.',
        },
        {
            question: 'How does Food Unity Exchange work?',
            answer: 'Users can list surplus food items, and others can request or offer food. It is a simple way to share and reduce food waste.',
        },
        {
            question: 'Is Food Unity Exchange safe to use?',
            answer: 'Yes, safety is a top priority. User profiles and reviews help build trust, and we provide guidelines for safe food sharing.',
        },
        {
            question: 'What kind of food can I share or request?',
            answer: 'You can share or request all types of food, from homemade dishes to surplus groceries, promoting diverse sharing.',
        },
    ]);

    return (
        <div name="faq" className="hero min-h-screen bg-base-100">
            <div className="hero-content flex-col lg:flex-row">
                <img src="/images/undraw_Questions_re_1fy7.png" className="hidden lg:flex max-w-sm rounded-lg shadow-[0_35px_60px_-15px_rgba(58,191,248,0.3)]" />
                <section id="faq" className=" py-12">
                    <div className="container mx-auto px-4">
                        <h2 className="text-5xl font-semibold mb-6 text-primary">Frequently Asked Questions</h2>
                        <div className="space-y-6">
                            {faqs.map((faq, index) => (
                                <div className="collapse collapse-arrow bg-base-200">
                                    <input type="radio" name="my-accordion-4" />
                                    <div className="collapse-title text-xl font-medium">
                                        {faq.question}
                                    </div>
                                    <div className="collapse-content text-primary-focus">
                                        {faq.answer}
                                    </div>
                                </div>

                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </div>

    );
};

export default FAQ;
