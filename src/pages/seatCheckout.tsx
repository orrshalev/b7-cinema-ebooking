import { useState } from "react";
import { type NextPage } from "next";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Image from "next/image";
import Head from "next/head";
import type { Movie } from "../types/Movie";
import Link from "next/link";
import { useRouter } from "next/router";
import { constants } from "fs/promises";

//import type { Ticket } from "../types/ticket";

type SeatProps = {
  id: string;
  row: string;
  seat: number;
  selected: boolean;
  onSelect: (id: string) => void;
};

function Seat({ id, row, seat, selected, onSelect }: SeatProps) {
  const handleClick = async () => {
    onSelect(id);
  };

  const img = selected ? (
    <Image
      className="rounded-md"
      src={"/assets/svg/solid-seat-icon.svg"}
      width={20}
      height={20}
      alt="seat"
    />
  ) : (
    <Image
      className="rounded-md"
      src={"/assets/svg/available-seat-icon.svg"}
      width={20}
      height={20}
      alt="seat"
    />
  );

  return (
    <button
      type="button"
      className={`bg-${
        selected ? "green-500" : "gray-300"
      } m-1 rounded-md p-2 text-sm font-bold text-dark-red`}
      onClick={handleClick}
    >
      {img}
    </button>
  );
}

type SeatRowProps = {
  row: string;
  numSeats: number;
  selectedSeats: string[];
  onSelect: (id: string) => void;
};

function SeatRow({ row, numSeats, selectedSeats, onSelect }: SeatRowProps) {
  const seats = [];
  for (let i = 1; i <= numSeats; i++) {
    const id = `${row}${i}`;
    seats.push(
      <Seat
        key={id}
        id={id}
        row={row}
        seat={i}
        selected={selectedSeats.includes(id)}
        onSelect={onSelect}
      />
    );
  }

  return <div className="mb-4 flex items-center justify-center">{seats}</div>;
}

const SeatCheckout: NextPage = () => {
  const router = useRouter();
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  let seatsString = "";
  selectedSeats.forEach(
    (selectedSeat) => (seatsString = seatsString + selectedSeat + ",")
  );
  // console.log(seatsString);

  const onSubmit = async () => {
    await router.push(`/paymentCheckout?seats=${seatsString}`);
  };

  const handleSeatSelect = async (id: string) => {
    if (selectedSeats.includes(id)) {
      setSelectedSeats((prevSelectedSeats) =>
        prevSelectedSeats.filter((seat) => seat !== id)
      );
    } else {
      setSelectedSeats((prevSelectedSeats) => [...prevSelectedSeats, id]);
    }
  };

  const rowLetters = ["A", "B", "C"];
  const numRows = rowLetters.length;

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
            <h1 className="py-5 pb-12 text-3xl font-bold text-dark-red">
              <Link
                className="py-10 text-3xl font-bold text-gray-500 transition duration-300 ease-in-out hover:text-dark-red"
                href="/ticketCheckout"
              >
                Tickets
              </Link>
              <span className="text-gray-500">&gt;</span>
              <span className="py-10 text-3xl font-bold text-gray-500 underline">
                Seats
              </span>
              &gt; Payment
            </h1>
            <div className="flex w-full flex-col items-center justify-center">
              <h3 className="text-2xl font-bold text-dark-red">Select Seats</h3>
              <p className="text-lg text-dark-red">
                Please select the seats you prefer on the map.
              </p>
              <div className="grid grid-cols-3 gap-4 py-5">
                <div className="flex flex-row items-center justify-center">
                  <Image
                    className="rounded-md"
                    src={"/assets/svg/available-seat-icon.svg"}
                    width={20}
                    height={20}
                    alt="seat"
                  />
                  <p className="text-md pl-1 text-dark-red">Available</p>
                </div>
                <div className="flex flex-row items-center justify-center">
                  <Image
                    className="rounded-md"
                    src={"/assets/svg/solid-seat-icon.svg"}
                    width={20}
                    height={20}
                    alt="seat"
                  />
                  <p className="text-md pl-1 text-dark-red">Selected</p>
                </div>
                <div className="flex flex-row items-center justify-center">
                  <Image
                    className="rounded-md"
                    src={"/assets/svg/booked-seat-icon.svg"}
                    width={20}
                    height={20}
                    alt="seat"
                  />
                  <p className="text-md pl-1 text-dark-red">Booked</p>
                </div>
              </div>

              {/* <MovieSeatSelection /> */}

              <div className="container mx-auto p-4">
                <div className="grid-row-1 mx-auto grid grid-cols-3 py-5 text-center text-dark-red">
                  <div></div>
                  <div className="text-md bg-gray-400 font-bold">SCREEN</div>
                  <div></div>
                </div>
                {rowLetters.map((row, index) => (
                  <SeatRow
                    key={row}
                    row={row}
                    numSeats={10}
                    selectedSeats={selectedSeats}
                    onSelect={handleSeatSelect}
                  />
                ))}
                <hr className="my-4 h-[0.2rem] bg-gray-400 " />
                <div className="mx-auto max-w-md">
                  <h2 className="mb-2 text-xl font-bold text-dark-red">
                    Selected seats:
                  </h2>
                  {selectedSeats.length === 0 ? (
                    <p className="text-lg text-dark-red">No seats selected</p>
                  ) : (
                    <ul className="text-lg text-dark-red">
                      {selectedSeats.map((seat) => (
                        <li key={seat}>Seat {seat}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* <MovieSeatSelection /> */}
              
            </div>
            <div className="flex flex-col items-center justify-center py-10">
              <button
                type="submit"
                onClick={onSubmit}
                href="/paymentCheckout"
                className="rounded bg-dark-red px-10 py-4 text-center text-2xl"
              >
                CONFIRM SEATS
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default SeatCheckout;
