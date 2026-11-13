'use client'
import React from 'react'
import { LayoutGrid } from '../layoutGrid'

export function LayoutGridDemo() {
  return (
    <div className='h-[50vh] md:h-[60vh] lg:h-screen pt-5 w-full'>
      <LayoutGrid cards={cards} />
    </div>
  )
}

const SkeletonOne = () => {
  return (
    <div className='text-center'>
      <p className='font-bold flex flex-row flex-wrap justify-center items-center md:text-4xl text-xl text-white'>
        Patient Management System
      </p>
      <p className='font-normal text-center my-4 max-w-lg text-neutral-200'>
        For a doctor or hospital the system manages patient details, visits,
        medical history.
      </p>
    </div>
  )
}

const SkeletonTwo = () => {
  return (
    <div>
      <p className='font-bold md:text-4xl text-xl text-white'>
        Appointment Management
      </p>
      <p className='font-normal text-base my-4 max-w-lg text-neutral-200'>
        Booking of appointment, managing and maintaining records of visitors
        with an easy online booking by patients and customers and maintaining
        records of visitors.
      </p>
    </div>
  )
}
const SkeletonThree = () => {
  return (
    <div>
      <p className='font-bold md:text-4xl text-xl text-white'>
        Clinic OPD Management
      </p>
      <p className='font-normal text-base text-white'></p>
      <p className='font-normal text-base my-4 max-w-lg text-neutral-200'>
        Manage diagnosis and prescription with patient history for sharing
        precise information for further referral and treatments.
      </p>
    </div>
  )
}

const SkeletonFour = () => {
  return (
    <div>
      <p className='font-bold md:text-4xl text-xl text-white'>Reports</p>
      <p className='font-normal text-base text-white'></p>
      <p className='font-normal text-base my-4 max-w-lg text-neutral-200'>
        A comprehensive reporting system for different modules to extract
        information as per required format and MIS coordination.
      </p>
    </div>
  )
}

const SkeletonFive = () => {
  return (
    <div>
      <p className='font-bold md:text-4xl text-xl text-white'>
        Billing And Collections Management
      </p>
      <p className='font-normal text-base text-white'></p>
      <p className='font-normal text-base my-4 max-w-lg text-neutral-200'>
        For any business made easy the bill generation and its management,
        receipts of collections and invoicing. Can also be used to track auto
        service bill generation and pendency.
      </p>
    </div>
  )
}
const SkeletonSix = () => {
  return (
    <div>
      <p className='font-bold md:text-4xl text-xl text-white'>
        Finance And Accounting Management
      </p>
      <p className='font-normal text-base text-white'></p>
      <p className='font-normal text-base my-4 max-w-lg text-neutral-200'>
        Account package to manage daily accounts along with performing complex
        tasks like profit and loss statement managing ledger and account heads
        to customized for easy usage and entries.
      </p>
    </div>
  )
}

const cards = [
  {
    id: 1,
    content: <SkeletonOne />,
    title: 'Patient Management System',
    className: 'md:col-span-2',
    thumbnail:
      "/PatientManagement.webp",
  },
  {
    id: 2,
    content: <SkeletonTwo />,
    title: ' Appointment Management',
    className: 'col-span-1',
    thumbnail:
      "/Appointment.webp",
  },
  {
    id: 3,
    content: <SkeletonThree />,
    title: 'Clinic OPD Management',
    className: 'col-span-1',
    thumbnail:
      "/ClinicOPD.webp",
  },
  {
    id: 4,
    content: <SkeletonFour />,
    title: ' Reports',
    className: 'md:col-span-2',
    thumbnail:
      "/Reports.webp",
  },
  {
    id: 5,
    content: <SkeletonFive />,
    title: 'Billing And Collections Management',
    className: 'col-span-2',
    thumbnail:
      "/billing.webp",
  },
  {
    id: 6,
    content: <SkeletonSix />,
    title: 'Finance And Accounting Management',
    className: 'md:col-span-1',
    thumbnail:
      "/Finance.webp",
  }
]
