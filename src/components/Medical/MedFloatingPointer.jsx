import { useState } from "react";
import { FollowerPointerCard } from "../../components/FloatingPointer";
const blogContents = [
    {
        slug: "hr-management",
        title: "Human Resource Management",
        description:
            "You can maintain employee's records as per the organization requirement. It includes Personal information, goal sheets, appraisals, etc. for the employees with a rich set of tools empower the employee. This system can be allotted the same recruitment and appraisal structure.",
        image: "/HR.avif",
    },
    {
        slug: "lead-management",
        title: "Lead Management",
        description:
            "Complete solution to where you can capture details of new business lead and system will automatically generates some unique details e.g. lead no. to communicate with the system in future. You maintain follow-ups of leads along with detailed remarks. You can search and update the records of leads by large number of filters and can assign for further follow up.",
        image: "/LeadManagement.webp",
    },
    {
        slug: "appointment-management",
        title: "Appointment Management",
        description:
            "Booking of appointment, managing and maintaining records of visitors with an easy online booking by patients and customers and maintaining records of visitors.",
        image: "/Appointment.webp",
    },
    {
        slug: "patient-management",
        title: "Patient Management System",
        description:
            "For a doctor or hospital the system manages patient details, visits, medical history.",
        image: "/PatientManagement.webp",
    },
    {
        slug: "clinic-opd-management",
        title: "Clinic OPD Management",
        description:
            "Manage diagnosis and prescription with patient history for sharing precise information for further referral and treatments.",
        image: "/ClinicOPD.webp"
    },
    {
        slug: "stocks-inventory",
        title: "Stocks and Inventory Management",
        description:
            "Here stock and inventory can be maintained of an organisation of internal usage or sales. Smoother system to search stocks by product and batch information. Has an ability to manage different warehouse and stores for easy management. Can be used to manage vendors and suppliers for indent and dispatches.",
        image: "/Stocks.webp"
    },
    {
        slug: "billing-collections",
        title: "Billing and Collections Management",
        description:
            "For any business made easy the bill generation and its management, receipts of collections and invoicing. Can also be used to track auto service bill generation and pendency.",
        image: "/billing.webp"
    },
    {
        slug: "finance-accounting",
        title: "Finance and Accounting Management",
        description:
            "Account package to manage daily accounts along with performing complex tasks like profit and loss statement managing ledger and account heads to customized for easy usage and entries.",
        image: "/Finance.webp"
    },
    {
        slug: "reports",
        title: "Reports",
        description:
            "A comprehensive reporting system for different modules to extract information as per required format and MIS coordination.",
        image: "/Reports.webp"
    },
    {
        slug: "news-notification",
        title: "News and Notification",
        description:
            "This module helps to manage your notice board by publishing new, notification or event details to the entire system member just selecting the category of notification. Auto generation of notice is also supported in automated way to give them the information of various updates of users category and pass alerts of different events happened in real-time so the users can login and see the information a gets updated at the time of relevant modification or updation.",
        image: "/news.webp"
    }
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
                                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-tl-lg rounded-tr-lg bg-gray-100 block">
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
