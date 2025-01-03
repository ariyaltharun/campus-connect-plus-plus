import { useState } from 'react';

const FAQs = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const faqs = [
        {
            question: "Where can I (Student) find and apply to projects?",
            answer: "You can find projects in 'Find Projects' section. From there, you can view the details of the project and submit the proposal if you are interested to work for it. The faculty incharge will review your proposal and get back to you."
        },
        {
            question: "How can I (Faculty) approach a student directly?",
            answer: "You can find best suitable students according to their area of interests and skill sets from 'Find student' section. You can view their profile and contact them directly through the contact details provided in their profile."
        },
        {
            question: "Where will I (Faculty or Student) find tasks and reminders related to a project?",
            answer: "You can go to the project page from your dashboard. The project page will be linked to its own kanban board and calendar pages. If you are working on multiple projects, you will have separate kanban boards and calendar pages for each project."
        }
    ];

    const toggleFAQ = index => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="mx-auto py-15 px-8 md:px-15 lg:px-20 bg-white dark:bg-gray-900 ">
            <h2 className="mb-8 text-3xl font-bold sm:text-4xl text-center text-black dark:text-white">Frequently Asked Questions</h2>
            <div className="space-y-4 max-w-4xl mx-auto">
                {faqs.map((faq, index) => (
                    <div key={index} className="border-b border-gray-300 dark:border-gray-700">
                        <button
                            className="w-full text-left py-2 focus:outline-none"
                            onClick={() => toggleFAQ(index)}
                        >
                            <div className="flex justify-between items-center">
                                <span className="text-lg font-medium text-black dark:text-white">{faq.question}</span>
                                <span className="text-black dark:text-white">{activeIndex === index ? '-' : '+'}</span>
                            </div>
                        </button>
                        {activeIndex === index && (
                            <div className="py-2 text-gray-700 dark:text-gray-300">
                                {faq.answer}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQs;