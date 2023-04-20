import { useState } from "react";
import { type NextPage } from "next";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Image from "next/image";
import Head from "next/head";
import type { Promotion } from "@prisma/client";
import Link from "next/link";
import { states, months, days } from "../utils/consts";
import { api } from "~/utils/api";

//import type { Ticket } from "../types/ticket";

const paymentCheckout: NextPage = () => {
  // const router = useRouter();
  // const movieTitle = router.query.movie as string;
  // const allPromo = api.promotion.getPromotion.useQuery({ title: movieTitle });
  // const allMovies = api.movie.getMovieByDate.useQuery({ day: dayNum });
  // let movies = allMovies.data ?? [];
  // const searchedMovieArray = movies.filter(
  //   (movie) => movie.title.replace(/\s+/g, "-").toLowerCase().includes(searchMovie)
  // );

  return (
    <>
      <Head>
        <title>Cinema E-Booking App</title>
        <meta name="description" content="Buy your tickets today!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center">
        <div className="flex flex-col items-center justify-center px-4">
          <div className="top-20 flex h-[40vh] w-screen flex-row items-center justify-center">
            <Image
              width={250}
              height={300}
              src={`https://i.imgur.com/i1rDBqw.jpg`}
              alt="Bee movie Poster"
              className="relative"
            ></Image>
            <div className="center flex flex-col">
              <h1 className="px-5 text-4xl font-bold text-black">Bee Movie</h1>
              <p className="px-5 text-xl text-black">Date and Time</p>
              <p className="px-5 text-xl text-black">Movie Info...</p>
            </div>
          </div>
          <div className="flex w-full flex-col items-center justify-center rounded-md">
            <h1 className="py-5 text-4xl font-bold text-dark-red">
              Ticket Checkout
            </h1>
            <h1 className="py-5 pb-12 text-3xl font-bold text-gray-500 ">
              <Link
                className="py-10 text-3xl font-bold text-gray-500 transition duration-300 ease-in-out hover:text-dark-red"
                href="/ticketCheckout"
              >
                Tickets
              </Link>
              &gt;
              <Link
                className="py-10 text-3xl font-bold text-gray-500 transition duration-300 ease-in-out hover:text-dark-red"
                href="/seatCheckout"
              >
                Seats
              </Link>
              &gt;
              <span className="text-3xl font-bold text-gray-500 underline">
                Payment
              </span>
            </h1>
            {/* <div className="flex w-full flex-row justify-center space-x-5">
              <label className="text-2xl font-bold text-dark-red">
                Promotion Code:
              </label>
              <input
                className="center rounded border-2 border-gray-400 px-2 text-black hover:border-gray-600"
                placeholder=" Promo Code"
                id="promoCode"
              />
              <button className="rounded bg-dark-red px-5 py-2 text-center"
              onClick={() => {
                let isPromo = false;
                const inputCode = document.getElementById("promoCode").value;
                allPromoData.forEach((promotion) => {
                  if (promotion.code.includes(inputCode)) {
                    router.push(
                      `/browse?movie=${searchField
                        .replace(/\s+/g, "-")
                        .toLowerCase()}`
                    );    
                    isPromo = true;                   
                  }
                })
                if (isPromo === false) {
                  alert ("No search results for \"" + code + "\"")
                  return false;
                }
              }}
              >
                Add
              </button>
            </div> */}
            <div className="grid grid-flow-col grid-cols-3 grid-rows-6 gap-y-5">
              <div className="flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold text-dark-red">
                  Order Summary
                </h2>
              </div>
              <div className="flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold text-dark-red">Adult x2</h2>
                <hr className="mt-8 h-[0.1rem] w-full bg-gray-400" />
              </div>
              <div className="flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold text-dark-red">Senior x1</h2>
                <hr className="mt-8 h-[0.1rem] w-full bg-gray-400" />
              </div>
              <div className="flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold text-dark-red">Child x1</h2>
                <hr className="mt-8 h-[0.1rem] w-full bg-gray-400" />
              </div>
              <div className="flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold text-dark-red">Subtotal</h2>
                <p className="text-lg font-bold text-dark-red">Booking Fee</p>
                <p className="text-lg font-bold text-dark-red">Promotion</p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <h2 className="text-3xl font-bold text-dark-red">TOTAL</h2>
              </div>
              <div></div>
              <div className="flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold text-dark-red">$19.99</h2>
                <hr className="mt-8 h-[0.1rem] w-full bg-gray-400" />
              </div>
              <div className="flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold text-dark-red">$17.99</h2>
                <hr className="mt-8 h-[0.1rem] w-full bg-gray-400" />
              </div>
              <div className="flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold text-dark-red">$14.99</h2>
                <hr className="mt-8 h-[0.1rem] w-full bg-gray-400" />
              </div>
              <div></div>
              <div></div>
              <div></div>
              <div className="flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold text-dark-red">$39.98</h2>
                <hr className="mt-8 h-[0.1rem] w-full bg-gray-400" />
              </div>
              <div className="flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold text-dark-red">$17.99</h2>
                <hr className="mt-8 h-[0.1rem] w-full bg-gray-400" />
              </div>
              <div className="flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold text-dark-red">$14.99</h2>
                <hr className="mt-8 h-[0.1rem] w-full bg-gray-400" />
              </div>
              <div className="flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold text-dark-red">$72.96</h2>
                <p className="text-lg font-bold text-dark-red">$5.00</p>
                <p className="text-lg font-bold text-dark-red">$0.00</p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <h2 className="text-4xl font-bold text-dark-red">$77.96</h2>
                <p className="text-md text-dark-red">
                  Includes applicable state and local sales taxes.
                </p>
              </div>
            </div>
            <div className="grid grid-flow-col grid-cols-3 grid-rows-2 gap-y-5">
              <h2 className="py-5 text-2xl font-bold text-dark-red">
                Payment Methods
              </h2>
              <h3 className="text-xl font-bold text-dark-red">
                Add Payment Method
              </h3>
            </div>
            <div className="flex flex-col">
              <label htmlFor="checkbox" className="inline-flex items-center">
                <input
                  type="checkbox"
                  id="checkbox"
                  className="form-checkbox h-5 w-5 text-gray-600"
                />
                <span className="ml-2 text-gray-700">Save Payment</span>
              </label>
            </div>
            <div className="-mx-3 my-6 flex flex-row">
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
            <div className="flex flex-col items-center justify-center py-10">
              <Link
                href="/checkoutSuccess"
                className="rounded bg-dark-red px-10 py-4 text-center text-2xl"
              >
                COMPLETE ORDER
              </Link>
              <Link href="/" className="mt-5 text-sm text-dark-red underline">
                cancel order
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default paymentCheckout;
