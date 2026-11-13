"use client";
import React from "react";
import { LayoutGrid } from "../layoutGrid";

export function LayoutGridDemo() {
    return (
       <div className="h-screen pt-5 pb-35 md:pb-23 w-full">
            <LayoutGrid cards={cards} />
        </div>
    );
}

const SkeletonOne = () => {
    return (
        <div className="text-center">
            <p className="font-bold flex flex-row flex-wrap justify-center items-center md:text-4xl text-xl text-white">
                Customer Relationship Management
            </p>
            <p className="font-normal text-center my-4 max-w-lg text-neutral-200">
                Complete CRM system to manage client database that handles complete information of respective client along with personal and contact details etc. One can easily search desired information.
            </p>
        </div>
    );
};

const SkeletonTwo = () => {
    return (
        <div>
            <p className="font-bold md:text-4xl text-xl text-white">
                Finance and Accounting Management
            </p>
            <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
                Account package to manage daily accounts along with performing complex tasks like profit and loss statement managing ledger and account heads to customized for easy usage and entries.
            </p>
        </div>
    );
};
const SkeletonThree = () => {
    return (
        <div>
            <p className="font-bold md:text-4xl text-xl text-white">
                News and Notification
            </p>
            <p className="font-normal text-base text-white"></p>
            <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
                This module helps to manage your notice board by publishing new, notification or event details to the entire system member just selecting the category of notification. Auto generation of notice is also supported in automated way.
            </p>
        </div>
    );
};


const SkeletonFour = () => {
    return (
        <div>
            <p className="font-bold md:text-4xl text-xl text-white">
               Gifts And Incentive Management
            </p>
            <p className="font-normal text-base text-white"></p>
            <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
                Can be used to manage and track various vouchers and gift coupons having unique code for giving discounts or free services / products to customers for maintaining loyalty or promotions.
            </p>
        </div>
    );
};


const SkeletonFive = () => {
    return (
        
        <div>
            <p className="font-bold md:text-4xl text-xl text-white">
                Commission Payouts Management
            </p>
            <p className="font-normal text-base text-white"></p>
            <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
                A complete module to calculate commissions for various levels in hierarchy that can be configured for automatic calculation and disbursal for ease and accurate calcutaions.
            </p>
        </div>
    );
};
const SkeletonSix = () => {
    return (
        <div>
            <p className="font-bold md:text-4xl text-xl text-white">
                Finance And Accounting Management
            </p>
            <p className="font-normal text-base text-white"></p>
            <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
                Account package to manage daily accounts along with performing complex tasks like profit and loss statement managing ledger and account heads to customized for easy usage and entries.
            </p>
        </div>
    );
};


const cards = [
    {
        id: 1,
        content: <SkeletonOne />,
        title:"Service And Package Management",
        className: "md:col-span-2",
        thumbnail:
            "/ServicePackage.webp",
    },
    {
        id: 2,
        content: <SkeletonTwo />,
        title:" Appointment Management",
        className: "col-span-1",
        thumbnail:
            "/Appointment.webp",
    },
    {
        id: 3,
        content: <SkeletonThree />,
        title:"Billing And Collections Management",
        className: "col-span-1",
        thumbnail:
            "/billing.webp",
     },
    {
        id: 4,
        content: <SkeletonFour />,
        title:" Gifts And Incentive Management",
        className: "md:col-span-2",
        thumbnail:
            "/GiftIncentives.webp",
    },
    {
        id: 5,
        content: <SkeletonFive />,
        title:"Commission Payouts Management",
        className: "col-span-2",
        thumbnail:
            "/commission.webp",
    },
    {
        id: 6,
        content: <SkeletonSix />,
        title:"Finance And Accounting Management",
        className: "md:col-span-1",
        thumbnail:
            "/Finance.webp",
    },
];
