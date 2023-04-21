import { useState } from "react";
import { ticketPrices } from "~/utils/consts";
import { type NextPage } from "next";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Image from "next/image";
import Head from "next/head";
import { api } from "~/utils/api";
import { useRouter } from "next/router";

//import type { Ticket } from "../types/ticket";

type CounterProps = {
  initialValue: number;
  id: string;
};

const TicketCheckout: NextPage = () => {
  const router = useRouter();
  const movieTitle = router.query.movie as string;
  const movie = api.movie.getMovie.useQuery({ title: movieTitle });
  const movieData = movie.data;
  const showtime = new Date(router.query.showtime as string);
  const [adultTickets, setAdultTickets] = useState(0);
  const [childTickets, setChildTickets] = useState(0);
  const [seniorTickets, setSeniorTickets] = useState(0);

  const onSubmit = async () => {
    adultTickets === 0 && childTickets === 0 && seniorTickets === 0
      ? alert("Must select at least one ticket!")
      : await router.push(
          `/seatCheckout?showtime=${showtime.toISOString()}&movie=${movieTitle}&adult=${adultTickets}&senior=${seniorTickets}&child=${childTickets}`
        );
  };

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
          <div className="top-20 mt-5 flex h-[40vh] w-screen flex-row items-center justify-center">
            <Image
              width={250}
              height={300}
              src={movieData?.poster}
              alt="Movie Poster"
              className="relative"
            ></Image>
            <div className="center flex flex-col">
              <h1 className="px-5 text-4xl font-bold text-black">
                {movieTitle}
              </h1>
              <p className="px-5 text-xl text-black">{`${showtime.toLocaleDateString()} ${
                (showtime.getHours() + 4) % 12 === 0
                  ? 12
                  : (showtime.getHours() + 4) % 12
              }:${showtime.getMinutes().toString().padStart(2, "0")} 
                      ${showtime.getHours() >= 12 ? "PM" : "AM"}`}</p>
              <p className="max-w-sm px-5 text-xl text-black">
                {movieData?.synopsis}
              </p>
            </div>
          </div>
          <div className="flex w-full flex-col items-center justify-center rounded-md">
            <h1 className="py-5 text-4xl font-bold text-dark-red">
              Ticket Checkout
            </h1>
            <h1 className="py-5 pb-12 text-3xl font-bold text-dark-red">
              <span className="py-10 text-3xl font-bold text-gray-500 underline">
                Tickets
              </span>
              &gt; Seats &gt; Payment
            </h1>
            {/* <div className="flex w-full flex-row justify-center space-x-5">
              <label className="text-2xl font-bold text-dark-red">
                Promotion Code:
              </label>
              <input
                className="center rounded border-2 border-gray-400 px-2 text-black hover:border-gray-600"
                placeholder=" Promo Code"
              />
              <button className="rounded bg-dark-red px-5 py-2 text-center">
                Add
              </button>
            </div> */}
            <div className="grid grid-flow-col grid-cols-3 grid-rows-5 gap-y-5 pt-10">
              <div className="flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold text-dark-red">
                  Select Tickets
                </h2>
              </div>
              <div className="flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold text-dark-red">Adult</h2>
                <hr className="mt-8 h-[0.1rem] w-full bg-gray-400" />
              </div>
              <div className="flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold text-dark-red">Senior</h2>
                <hr className="mt-8 h-[0.1rem] w-full bg-gray-400" />
              </div>
              <div className="flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold text-dark-red">Child</h2>
                <hr className="mt-8 h-[0.1rem] w-full bg-gray-400" />
              </div>
              <div className="flex flex-col items-center justify-center">
                <h2 className="text-3xl font-bold text-dark-red">TOTAL</h2>
                <p className="text-lg text-black">Excluding Booking Fees</p>
              </div>
              <div></div>
              <div className="flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold text-dark-red">
                  ${ticketPrices.adult.toFixed(2)}
                </h2>
                <hr className="mt-8 h-[0.1rem] w-full bg-gray-400" />
              </div>
              <div className="flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold text-dark-red">
                  ${ticketPrices.senior.toFixed(2)}
                </h2>
                <hr className="mt-8 h-[0.1rem] w-full bg-gray-400" />
              </div>
              <div className="flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold text-dark-red">
                  ${ticketPrices.child.toFixed(2)}
                </h2>
                <hr className="mt-8 h-[0.1rem] w-full bg-gray-400" />
              </div>
              <div />
              <div />
              <div className="flex flex-col items-center justify-center">
                <div className="flex items-center justify-center">
                  <button
                    type="button"
                    className="mr-2 rounded-full bg-gray-200 px-3 py-1 text-dark-red"
                    onClick={() =>
                      setAdultTickets((prev) => (prev > 0 ? prev - 1 : prev))
                    }
                  >
                    -
                  </button>
                  <span className="text-2xl font-bold text-dark-red">
                    {adultTickets}
                  </span>
                  <button
                    type="button"
                    className="ml-2 rounded-full bg-gray-200 px-3 py-1 text-dark-red"
                    onClick={() => setAdultTickets((prev) => prev + 1)}
                  >
                    +
                  </button>
                </div>
                <hr className="mt-8 h-[0.1rem] w-full bg-gray-400" />
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="flex items-center justify-center">
                  <button
                    type="button"
                    className="mr-2 rounded-full bg-gray-200 px-3 py-1 text-dark-red"
                    onClick={() =>
                      setSeniorTickets((prev) => (prev > 0 ? prev - 1 : prev))
                    }
                  >
                    -
                  </button>
                  <span className="text-2xl font-bold text-dark-red">
                    {seniorTickets}
                  </span>
                  <button
                    type="button"
                    className="ml-2 rounded-full bg-gray-200 px-3 py-1 text-dark-red"
                    onClick={() => setSeniorTickets((prev) => prev + 1)}
                  >
                    +
                  </button>
                </div>
                <hr className="mt-8 h-[0.1rem] w-full bg-gray-400" />
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="flex items-center justify-center">
                  <button
                    type="button"
                    className="mr-2 rounded-full bg-gray-200 px-3 py-1 text-dark-red"
                    onClick={() =>
                      setChildTickets((prev) => (prev > 0 ? prev - 1 : prev))
                    }
                  >
                    -
                  </button>
                  <span className="text-2xl font-bold text-dark-red">
                    {childTickets}
                  </span>
                  <button
                    type="button"
                    className="ml-2 rounded-full bg-gray-200 px-3 py-1 text-dark-red"
                    onClick={() => setChildTickets((prev) => prev + 1)}
                  >
                    +
                  </button>
                </div>
                <hr className="mt-8 h-[0.1rem] w-full bg-gray-400" />
              </div>
              <div className="flex flex-col items-center justify-center">
                <h2 className="text-4xl font-bold text-dark-red">
                  $
                  {(
                    adultTickets * ticketPrices.adult +
                    childTickets * ticketPrices.child +
                    seniorTickets * ticketPrices.senior
                  ).toFixed(2)}
                </h2>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center py-10">
              <button
                type="submit"
                onClick={onSubmit}
                className="rounded bg-dark-red px-10 py-4 text-center text-2xl"
              >
                CONFIRM TICKETS
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default TicketCheckout;
