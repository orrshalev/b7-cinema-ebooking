import React, { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { states, months, days } from "../utils/consts";
import Link from "next/link";

const Signup: NextPage = () => {
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  return (
    <>
      <Head>
        <title>Cinema E-Booking App</title>
        <meta name="description" content="Buy your tickets today!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="my-10 flex min-h-screen flex-col items-center">
        <div className="my-auto grid w-full rounded-md bg-white p-6 shadow-md lg:max-w-xl">
          <h1 className="mb-8 text-center text-3xl font-semibold text-dark-red">
            Sign Up
          </h1>
          <p className="pb-5 text-center text-xs text-red-500">* Required</p>
          <form className="my-auto w-full max-w-lg">
            <div className="-mx-3 mb-6 flex flex-wrap">
              <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
                <label
                  htmlFor="grid-first-name"
                  className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                >
                  First Name<span className="text-red-500">*</span>
                </label>
                <input
                  className="mb-3 block w-full appearance-none rounded border bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:bg-white focus:outline-none"
                  id="grid-first-name"
                  type="text"
                  placeholder="Jane"
                />
              </div>
              <div className="w-full px-3 md:w-1/2">
                <label
                  htmlFor="grid-last-name"
                  className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                >
                  Last Name<span className="text-red-500">*</span>
                </label>
                <input
                  className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                  id="grid-last-name"
                  type="text"
                  placeholder="Doe"
                />
              </div>
            </div>
            <div className="-mx-3 mb-6 flex flex-wrap">
              <div className="w-full px-3">
                <label
                  htmlFor="grid-email-address"
                  className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                >
                  Email<span className="text-red-500">*</span>
                </label>
                <input
                  className="mb-3 block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                  id="grid-email-address"
                  type="text"
                  placeholder="example@gmail.com"
                />
              </div>
            </div>
            <div className="-mx-3 mb-6 flex flex-wrap">
              <div className="w-full px-3">
                <label
                  htmlFor="grid-phone-number"
                  className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                >
                  Phone number<span className="text-red-500">*</span>
                </label>
                <input
                  className="mb-3 block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                  id="grid-phone-number"
                  type="text"
                  placeholder="111-1111-1111"
                />
              </div>
            </div>
            <div className="-mx-3 mb-6 flex flex-wrap">
              <div className="w-full px-3">
                <label
                  htmlFor="grid-password"
                  className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                >
                  Password<span className="text-red-500">*</span>
                </label>
                <input
                  className="mb-3 block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                  id="grid-password"
                  type="password"
                  placeholder="******************"
                />
                <p className="text-xs italic text-gray-600">
                  Must be at least 8 characters long
                </p>
              </div>
            </div>
            <div className="-mx-3 mb-6 flex flex-wrap">
              <div className="w-full px-3">
                <label
                  htmlFor="grid-home-address"
                  className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                >
                  Home Address
                </label>
                <input
                  className="mb-3 block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                  id="grid-home-address"
                  type="text"
                />
              </div>
            </div>
            <div className="-mx-3 mb-2 flex flex-wrap">
              <div className="mb-6 w-full px-3 md:mb-0 md:w-1/3">
                <label
                  htmlFor="grid-city"
                  className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                >
                  City
                </label>
                <input
                  className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                  id="grid-city"
                  type="text"
                  placeholder="Albuquerque"
                />
              </div>
              <div className="mb-6 w-full px-3 md:mb-0 md:w-1/3">
                <label
                  htmlFor="grid-state"
                  className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                >
                  State
                </label>
                <div className="relative">
                  <select
                    className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                    id="grid-state"
                  >
                    {states.map((state) => {
                      return <option key={state}>{state}</option>;
                    })}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="h-4 w-4 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="mb-6 w-full px-3 md:mb-0 md:w-1/3">
                <label
                  htmlFor="grid-zip"
                  className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                >
                  Zip
                </label>
                <input
                  className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                  id="grid-zip"
                  type="text"
                  placeholder="90210"
                />
              </div>
            </div>
            <div className="mt-6 w-full px-3 md:mb-0 md:w-1/3">
            <input
                id="promo-checkbox"
                type="checkbox"
                value=""
                className="text-dark-coral-600 focus:ring-dark-coral-500 dark:focus:ring-dark-coral-600 h-4 w-4 rounded border-gray-300 bg-gray-100 focus:ring-2 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
              />
              <label
                htmlFor="promo-checkbox"
                className="ml-2 text-sm font-medium text-gray-700"
              >
                Subscribe for promotions
              </label><br/><br/>
              <input
                id="payment-checkbox"
                type="checkbox"
                value=""
                className="text-dark-coral-600 focus:ring-dark-coral-500 dark:focus:ring-dark-coral-600 h-4 w-4 rounded border-gray-300 bg-gray-100 focus:ring-2 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
                onChange={() => setShowPaymentForm((prev) => !prev)}
              />
              <label
                htmlFor="payment-checkbox"
                className="ml-2 text-sm font-medium text-gray-700"
              >
                Add payment info
              </label>
            </div>
            {showPaymentForm && (
              <>
                <div className="-mx-3 my-6 flex flex-wrap">
                  <div className="w-full px-3">
                    <label
                      htmlFor="grid-card-number"
                      className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                    >
                      Card Number<span className="text-red-500">*</span>
                    </label>
                    <input
                      className="mb-3 block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                      id="grid-card-number"
                      type="text"
                      placeholder="####-####-####-####"
                    />
                  </div>
                </div>
                <div className="-mx-3 mb-6 flex flex-wrap">
                  <div className="w-full px-3">
                    <label
                      htmlFor="grid-home-address"
                      className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                    >
                      Billing Address<span className="text-red-500">*</span>
                    </label>
                    <input
                      className="mb-3 block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                      id="grid-shipping-address"
                      type="text"
                    />
                  </div>
                </div>
                <div className="-mx-3 mb-10 flex flex-wrap">
                  <div className="mb-6 w-full px-3 md:mb-0 md:w-1/3">
                    <label
                      htmlFor="grid-city"
                      className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                    >
                      City<span className="text-red-500">*</span>
                    </label>
                    <input
                      className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                      id="grid-city"
                      type="text"
                      placeholder="Albuquerque"
                    />
                  </div>
                  <div className="mb-6 w-full px-3 md:mb-0 md:w-1/3">
                    <label
                      htmlFor="grid-state"
                      className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                    >
                      State<span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                        id="grid-state"
                      >
                        {states.map((state) => {
                          return <option key={state}>{state}</option>;
                        })}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg
                          className="h-4 w-4 fill-current"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="mb-6 w-full px-3 md:mb-0 md:w-1/3">
                    <label
                      htmlFor="grid-zip"
                      className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                    >
                      Zip<span className="text-red-500">*</span>
                    </label>
                    <input
                      className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                      id="grid-zip"
                      type="text"
                      placeholder="90210"
                    />
                  </div>
                </div>

                <div className="-mx-3 mb-10 flex flex-wrap">
                  <div className="mb-6 w-full px-3 md:mb-0 md:w-1/3">
                    <label
                      htmlFor="grid-payment-type"
                      className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                    >
                      Payment Type<span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                        id="grid-payment-type"
                      >
                        <option>Credit</option>
                        <option>Debit</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg
                          className="h-4 w-4 fill-current"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="mb-6 w-full px-3 md:mb-0 md:w-1/6">
                    <label
                      htmlFor="grid-month"
                      className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                    >
                      Month<span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                        id="grid-month"
                      >
                        {months.map((month) => {
                          return <option key={month}>{month}</option>;
                        })}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg
                          className="h-4 w-4 fill-current"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="mb-6 w-full px-3 md:mb-0 md:w-1/6">
                    <label
                      htmlFor="grid-month"
                      className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                    >
                      Day<span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                        id="grid-month"
                      >
                        {days.map((day) => {
                          return <option key={day}>{day}</option>;
                        })}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg
                          className="h-4 w-4 fill-current"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="mb-6 w-full px-3 md:mb-0 md:w-1/3">
                    <label
                      htmlFor="grid-cvv"
                      className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                    >
                      CVV<span className="text-red-500">*</span>
                    </label>
                    <input
                      className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                      id="grid-cvv"
                      type="text"
                      placeholder="###"
                    />
                  </div>
                </div>
              </>
            )}
            <div className="mt-6 flex justify-center">
              <Link
                href="/registration-confirmation"
                className="w-full transform rounded-md bg-dark-red px-8 py-4 text-center tracking-wide text-white transition-colors duration-200 hover:bg-light-coral focus:bg-light-coral focus:outline-none"
              >
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Signup;
