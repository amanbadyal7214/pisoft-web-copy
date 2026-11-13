"use client";
import React from "react";
import { LayoutGrid } from "../layoutGrid";

export function LayoutGridDemo() {
    return (
        <div className="h-[50vh] md:h-[60vh] lg:h-screen pt-5 w-full">
            <LayoutGrid cards={cards} />
        </div>
    );
}

const SkeletonOne = () => {
    return (
        <div className="text-center">
            <p className="font-bold flex flex-row flex-wrap justify-center items-center md:text-4xl text-xl text-white">
                Finance and Accounting Management
            </p>
            <p className="font-normal text-center my-4 max-w-lg text-neutral-200">
                Account package to manage daily accounts along with performing complex tasks like profit and loss statement managing ledger and account heads to customized for easy usage and entries.
            </p>
        </div>
    );
};

const SkeletonTwo = () => {
    return (
        <div>
            <p className="font-bold md:text-4xl text-xl text-white">
                Reports Management
            </p>
            <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
                Comprehensive reporting across all modules. Extract data in required formats for MIS and operational review.
            </p>
        </div>
    );
};
const SkeletonThree = () => {
    return (
        <div>
            <p className="font-bold md:text-4xl text-xl text-white">
                Students Management
            </p>
            <p className="font-normal text-base text-white"></p>
            <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
                You can maintain student records as per the organization requirement. It includes personal information, address details, Courses for the candidates. Student management reduces lots of end to end overheads.
            </p>
        </div>
    );
};


const SkeletonFive = () => {
    return (
        <div>
            <p className="font-bold md:text-4xl text-xl text-white">
                Fee Management
            </p>
            <p className="font-normal text-base text-white"></p>
            <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
                Digitally manage thousands of financial transactions. Configure fees by quota, and generate receipts automatically. Supports monthly, quarterly, or annual fee patterns. Enables easy scholarship tracking, legal reporting, cheque management, and fund maintenance. Centralized system ensures every financial activity is controlled from one place.
            </p>
        </div>
    );
};
const SkeletonSix = () => {
    return (
        <div>
            <p className="font-bold md:text-4xl text-xl text-white">
                Student Login Panel
            </p>
            <p className="font-normal text-base text-white"></p>
            <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
                You can maintain student records as per the organization requirement. It includes personal information, address details, Courses for the candidates. Student management reduces lots of end to end overheads.
            </p>
        </div>
    );
};


const SkeletonFour = () => {
    return (
        <div>
            <p className="font-bold md:text-4xl text-xl text-white">
                Student Score and Evaluation
            </p>
            <p className="font-normal text-base text-white"></p>
            <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
                Maintain subject of class, grades, credits, student's marks, Date-sheets, Faculty mapping, Exam scheduling as per the organization requirement. You can mark student attendance as per the organization regulation. Manage timetable of student and teacher.
            </p>
        </div>
    );
};

const cards = [

    {
        id: 1,
        content: <SkeletonFour />,
        title: "Student Score and Evaluation",
        className: "md:col-span-2",
       thumbnail:
            "/coreEvaluation.webp",
    },
    {
        id: 2,
        content: <SkeletonTwo />,
        title: "Reports Management",
        className: "col-span-1",
        thumbnail:
            "/Reports.webp",
    },
    {
        id: 3,
        content: <SkeletonThree />,
        title: "Students Management",
        className: "col-span-1",
        thumbnail:
            "/SCHOOL.webp",
    },
    {
        id: 4,
        content: <SkeletonFive />,
        title: "Fee Management",
        className: "md:col-span-2",
        thumbnail:
            "/fee.webp",
    },

    {
        id: 5,
        content: <SkeletonOne />,
        title: "Finance and Accounting Management",
        className: "md:col-span-2",
        thumbnail:
            "/Finance.webp",
    },
    {
        id: 6,
        content: <SkeletonSix />,
        title: "Student Login Panel",
        className: "md:col-span-1",
        thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM9WdP7ZZ1Rxjvj-0encz2s_W343KRQpYrpQ&s",
    },
];
