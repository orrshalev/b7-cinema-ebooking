import { useState } from "react";
import { type NextPage } from "next";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Image from "next/image";
import Head from "next/head";
import type { Movie } from "../types/Movie";
import Link from "next/link";

//import type { Ticket } from "../types/ticket";

type CounterProps = {
  initialValue: number;
  id: string;
};

function Counter({ initialValue }: CounterProps) {
  const [count, setCount] = useState<number>(initialValue);

  function increment() {
    setCount((prevCount) => prevCount + 1);
  }

  function decrement() {
    setCount((prevCount) => {
      if (prevCount <= 0) {
        return 0;
      }
      return prevCount - 1;
    });
  }

  return (
    <div className="flex items-center justify-center">
      <button
        type="button"
        className="mr-2 rounded-full bg-gray-200 px-3 py-1 text-dark-red"
        onClick={decrement}
      >
        -
      </button>
      <span className="text-2xl font-bold text-dark-red">{count}</span>
      <button
        type="button"
        className="ml-2 rounded-full bg-gray-200 px-3 py-1 text-dark-red"
        onClick={increment}
      >
        +
      </button>
    </div>
  );
}

const ticketCheckout: NextPage = () => {
  //   const [ticket, setTicket] = useState<Ticket>({
  //     movieTitle: "",
  //     showtime: "",
  //     seat: "",
  //     price: 0,
  //   });

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
            <h1 className="py-5 pb-12 text-3xl font-bold text-dark-red">
              <span className="py-10 text-3xl font-bold text-gray-500 underline">
                Tickets
              </span>
              &gt; Seats &gt; Payment
            </h1>
            <div className="flex w-full flex-row justify-center space-x-5">
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
            </div>
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
              <div className="flex flex-col items-center justify-center">
                <Counter id="adultTik" initialValue={0} />
                <hr className="mt-8 h-[0.1rem] w-full bg-gray-400" />
              </div>
              <div className="flex flex-col items-center justify-center">
                <Counter id="seniorTik" initialValue={0} />
                <hr className="mt-8 h-[0.1rem] w-full bg-gray-400" />
              </div>
              <div className="flex flex-col items-center justify-center">
                <Counter id="childTik" initialValue={0} />
                <hr className="mt-8 h-[0.1rem] w-full bg-gray-400" />
              </div>
              <div className="flex flex-col items-center justify-center">
                <h2 className="text-4xl font-bold text-dark-red">$0.00</h2>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center py-10">
              <Link
                href="/seatCheckout"
                className="rounded bg-dark-red px-10 py-4 text-center text-2xl"
              >
                CONFIRM TICKETS
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ticketCheckout;
