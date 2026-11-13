import { useState } from "react";
import { FollowerPointerCard } from "../../components/FloatingPointer";

const blogContents = [
    {
        slug: "hr-management",
        title: "Human Resource Management",
        description:
            "You can maintain employee's records as per the organization requirement. It includes Personal information, goal sheets, appraisals, etc. for the employees with a rich set of tools empower the employee. This system can be allotted the same recruitment and appraisal structure.",
        image: "/HR.avif"
    },
    {
        slug: "lead-management",
        title: "Lead Management",
        description:
            "Complete solution to where you can capture details of new business lead and system will automatically generates some unique details e.g. lead no. to communicate with the system in future. You maintain follow-ups of leads along with detailed remarks. You can search and update the records of leads by large number of filters and can assign for further follow up.",
        image: "/LeadManagement.webp",
    },
    {
        slug: "student-management",
        title: "Student Management",
        description:
            "You can maintain student records as per the institution requirement. It includes personal information, address details, courses/classes for the students. Student management reduces overheads and improves communication between management, parents, students, teachers, and staff. Admissions can easily enroll candidates, attach necessary documents, and grant portal access to students/parents. They can monitor homework, timetables, fees, and communicate with teachers.",
        image: "/SCHOOL.webp",
    },
    {
        slug: "student-fee-management",
        title: "Fee Management",
        description:
            "Digitally manage thousands of financial transactions. Configure fees by quota, and generate receipts automatically. Supports monthly, quarterly, or annual fee patterns. Enables easy scholarship tracking, legal reporting, cheque management, and fund maintenance. Centralized system ensures every financial activity is controlled from one place.",
         image: "/fee.webp",
    },
    {
        slug: "student-score-evaluation",
        title: "Score & Evaluation",
        description:
            "Manage class subjects, grades, credits, marks, faculty mapping, exam schedules, and attendance. Admins or teachers can configure exams and grading schemes, publish schedules, and generate report cards. Helps track academic progress throughout the year for students, parents, and faculty.",
        image: "/coreEvaluation.webp",
    },
    {
        slug: "task-management",
        title: "Task Management",
        description:
            "Comprehensive system for managing work management using task assignment system and measure achievement milestone.",
        image: "/TaskManagement.webp",
    },
    {
        slug: "inventory-management",
        title: "Assets Management",
        description:
            "Maintain internal or sales stock by product and batch. Manage warehouses, stores, vendors, indents, and dispatches. Easy inventory lookup and centralized control.",
         image: "/Assest.webp",
    },
    {
        slug: "finance-accounting-management",
        title: "Finance and Accounting Management",
        description:
            "An accounting package to manage daily finances and complex tasks like profit/loss, ledger, and account head tracking. Customized for ease of use, reporting, and maintaining institutional financial health.",
        image: "/Finance.webp",
    },
    {
        slug: "reporting",
        title: "Reports",
        description:
            "Comprehensive reporting across all modules. Extract data in required formats for MIS and operational review.",
         image: "/Reports.webp",
     },
    {
        slug: "news-notification",
        title: "News & Notification",
        description:
            "Publish news, notifications, and events. Supports auto-generated alerts for changes, updates, and real-time communication across user categories.",
        image: "/news.webp",
    },
];

const TitleComponent = ({ title }) => (
    <div className="flex items-center space-x-2">
        <p>{title}</p>
    </div>
);

export function FollowingPointerDemo() {
    const [expandedIndex, setExpandedIndex] = useState(null);
    const maxLength = 100;

    const toggleReadMore = (index) => {
        setExpandedIndex(prev => (prev === index ? null : index));
    };

    return (
        <div className="w-full px-4 py-8 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogContents.map((content, index) => {
                    const shouldTruncate = content.description.length > maxLength;
                    const isExpanded = expandedIndex === index;
                    const displayText = isExpanded
                        ? content.description
                        : content.description.slice(0, maxLength) + (shouldTruncate ? "..." : "");

                    return (
                        <FollowerPointerCard key={index} title={<TitleComponent title={content.title} />}>
                            <div className="group relative h-full overflow-hidden shadow-blue-950 rounded-2xl border border-gray-300 bg-white transition duration-200 hover:shadow-lg ">
                                <div
                                    className="relative aspect-[16/10] w-full overflow-hidden rounded-tl-lg rounded-tr-lg bg-gray-100 block"
                                >
                                    <img
                                        src={content.image}
                                        alt={content.title}
                                        loading="lazy"
                                        width="1280"
                                        height="800"
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        className="h-full w-full object-cover transition duration-200 group-hover:scale-95 group-hover:rounded-2xl"
                                    />
                                </div>
                                <div className="p-4">
                                    <div className="font-INB my-4 text-xl text-zinc-950">
                                        {content.title}
                                    </div>
                                    <p className="font-in text-lg text-blue-950">
                                        {displayText}
                                        {shouldTruncate && (
                                            <span
                                                onClick={() => toggleReadMore(index)}
                                                className="ml-2 cursor-pointer text-blue-500 hover:underline"
                                            >
                                                {isExpanded ? "Read less" : "Read more"}
                                            </span>
                                        )}
                                    </p>
                                </div>
                            </div>
                        </FollowerPointerCard>
                    );
                })}
            </div>
        </div>
    );
}
