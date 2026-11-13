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
        slug: "members-management",
        title: "Members Management",
        description:
            "Using this module one can easily handle member’s information of a society or multi-level marketing system for easy access to manage system members and can also develop hierarchy as per system input of various levels.",
       image: "/MemberManagement.webp",
    },
    {
        slug: "advisors-management",
        title: "Advisors Management",
        description:
            "This module is meant for a management of advisors connected with a financial organisation as agents. The system can self-generate hierarchy for management and mapping to use with different services offered by the organisation.",
        image: "/AdvisorManagement.webp",
    },
    {
        slug: "deposits-management",
        title: "Deposits Management",
        description:
            "A system prepared for a financial institution wherein one can easily configure and manage all deposit products like Fixed Deposits, Recurring Deposits, and Monthly Income Schemes.",
       image: "/Deposit.webp",
     },
    {
        slug: "loans-management",
        title: "Loans Management",
        description:
            "System is capable of handling various loan products for easy management of interest calculations, penalties, and principal payments. Includes application and approval workflows.",
        image: "/LoansManagemnt.webp",
    },
    {
        slug: "finance-accounting",
        title: "Finance and Accounting Management",
        description:
            "Account package to manage daily accounts along with performing complex tasks like profit and loss statements, managing ledgers and account heads. Customized for easy usage.",
        image: "/Finance.webp",
    },
    {
        slug: "commission-payouts",
        title: "Commission Payouts Management",
        description:
            "A complete module to calculate commissions for various levels in a hierarchy. It supports automatic calculation and disbursal for accurate and efficient payouts.",
        image: "/commission.webp",
    },
    {
        slug: "reports",
        title: "Reports",
        description:
            "A comprehensive reporting system that extracts data from various modules in required formats. Ideal for audits, MIS, and performance tracking.",
       image: "/Reports.webp",
    },
    {
        slug: "news-notification",
        title: "News and Notification",
        description:
            "Manage and publish news, notifications, or event details system-wide. Auto-generates notices and sends real-time updates to relevant users.",
        image: "/news.webp",
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
