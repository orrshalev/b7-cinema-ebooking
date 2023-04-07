import { type NextPage } from "next";
import Footer from "../components/Footer";
import Head from "next/head";
import { useState } from "react";
import Image from "next/image";

import { api } from "../utils/api";
import TrailerModal from "../components/TrailerModal";
import Navbar from "../components/Navbar";
import type { Movie } from "@prisma/client";

const Search: NextPage = () => {
    const movies = api.movie.getTodayMovies.useQuery
  
    return (
      <>
        <Head>
          <title>Cinema E-Booking App</title>
          <meta name="description" content="Buy your tickets today!" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Navbar />
        <main className="flex min-h-screen flex-col items-center pt-10">
          <div className="flex flex-col items-center justify-center gap-14 px-4 pt-20">
            <h1 className="text-center font-firasans text-5xl font-extrabold tracking-tight text-dark-red sm:text-[5rem]">
              Cinema E-Booking App
            </h1>
            {/* Search bar */}
            <div className="flex justify-center">
              <div className="mb-3 xl:w-96">
                <div className="relative flex w-full items-stretch">
                  <input
                    type="search"
                    className="form-control focus:border-dark-coral-600 relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:bg-white focus:text-gray-700 focus:outline-none"
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="button-addon2"
                  />
                  <button
                    className="btn flex items-center rounded bg-dark-red px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition  duration-150 ease-in-out hover:bg-light-coral hover:shadow-lg focus:bg-light-coral focus:shadow-lg focus:outline-none focus:ring-0 active:bg-dark-red active:shadow-lg"
                    type="button"
                    id="button-addon2"
                  >
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="search"
                      className="w-4"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="white"
                        d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
            <Footer />
            </>
    );
    };

export default Search;