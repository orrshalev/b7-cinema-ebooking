import React, { useState } from "react";
import Link from "next/link";
import type { NextPage } from "next";
import Head from "next/head";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { daysNames } from "../../utils/consts";
import Image from "next/image";
import TrailerModal from "../../components/TrailerModal";
import type { Movie } from "../../types/Movie";
import EditMovieModal from "../../scenes/modals/EditMovieModal";
import AddPromotionModal from "../../scenes/modals/AddPromotionModal";
import AddMovieModal from "../../scenes/modals/AddMovieModal";

type MoviePreviewCardProps = {
  movie: Movie;
  setTrailerModalOpen: (open: boolean) => void;
};

const MoviePreviewCard = (props: MoviePreviewCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { movie, setTrailerModalOpen } = props;

  return (
    <button
      className="relative transition duration-300 ease-in-out hover:scale-105"
      onClick={() => setTrailerModalOpen(true)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        width={200}
        height={200}
        src={movie.poster!}
        alt="Bee movie Poster"
        className="relative"
      ></Image>
      <Image
        width={39}
        height={39}
        src="/assets/svg/circle-play-regular.svg"
        alt="play button"
        className={` absolute top-[44%] left-[40%] ${
          isHovered ? "opacity-50" : ""
        } `}
      ></Image>
    </button>
  );
};

const AdminBrowse: NextPage = () => {
  const dayHoverEffect = "transition duration-300 hover:text-dark-red";

  const [day, setDay] = useState<(typeof daysNames)[number]>("Sunday");
  const [trailerModalOpen, setTrailerModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [promotionModalOpen, setPromotionModalOpen] = useState(false);
  const [addMovieModalOpen, setAddMovieModalOpen] = useState(false);

  const movies = [
    {
      id: "1",
      title: "Bee Movie",
      poster: "https://i.imgur.com/i1rDBqw.jpg",
      showtimes: Array.from(
        { length: 10 },
        (_, i) => new Date(2021, 10, 10, 10 + i, 0)
      ),
      trailerURL: "https://www.youtube.com/embed/VONRQMx78YI",
      genres: ["Comedy"],
      rating: "PG",
      length: 125,
    } satisfies Movie,
    {
      id: "2",
      title: "Rubber",
      poster: "https://i.imgur.com/w3R1CSY.jpg",
      showtimes: Array.from(
        { length: 10 },
        (_, i) => new Date(2021, 10, 10, 10 + i, 0)
      ),
      trailerURL: "https://www.youtube.com/embed/hVKgY1ilx0Y",
      genres: ["Horror"],
      rating: "X",
      length: 111,
    } satisfies Movie,
    {
      id: "3",
      title: "Mall Cop 2",
      poster: "https://i.imgur.com/ZF2d8hi.jpg",
      showtimes: Array.from(
        { length: 10 },
        (_, i) => new Date(2021, 10, 10, 10 + i, 0)
      ),
      trailerURL: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      genres: ["Comedy"],
      rating: "PG-13",
      length: 93,
    } satisfies Movie,
    {
      id: "4",
      title: "Sonic 3",
      poster: "https://i.imgur.com/yXSvn3h.png",
      showtimes: Array.from(
        { length: 10 },
        (_, i) => new Date(2021, 10, 10, 10 + i, 0)
      ),
      trailerURL: "https://www.youtube.com/embed/DuWEEKeJLMI",
      genres: ["Action"],
      rating: "G",
      length: 93,
    } satisfies Movie,
  ];

  return (
    <>
      <Head>
        <title>Cinema E-Booking App</title>
        <meta name="description" content="Buy your tickets today!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <Navbar /> */}

      <main className="my-10 flex min-h-screen flex-col items-center">
        <div className="flex w-3/5 flex-col gap-5">
          <h1 className="font-firasans text-4xl font-bold text-dark-red">
            Screenings
          </h1>
          <div className="flex flex-wrap">
            {/* TODO: Should add for small screeens a dropdown instead maybe */}
            <div className="flex flex-wrap justify-between gap-5 font-exo text-lg font-semibold text-black">
              {daysNames.map((dayName) => (
                <button
                  className={`${dayHoverEffect} ${
                    dayName === day ? "text-dark-red" : ""
                  }`}
                  key={dayName}
                  onClick={() => setDay(dayName)}
                >
                  {dayName}
                </button>
              ))}
              <button className="flex justify-between border-2 border-gray-400 px-1 py-1 text-black hover:border-gray-600">
                <Image
                  src="/assets/svg/calendar-icon.svg"
                  alt="calendar"
                  width={20}
                  height={20}
                ></Image>
              </button>
            </div>
          </div>
          {/* Should match today's date when done */}
          <div className="mb-5 flex flex-wrap items-center gap-5">
            <button
              className={`h-10 rounded-md bg-dark-red px-3 transition duration-200 ease-in-out hover:bg-light-red`}
              onClick={() => setAddMovieModalOpen(true)}
            >
              Add Movie
            </button>
            <h2 className="font-firasans font-semibold text-dark-red">
              Today&apos;s date
            </h2>
          </div>
        </div>
        {movies.map((movie) => (
          <>
            <hr className="h-[0.5rem] w-3/5 bg-dark-red" />
            <div className={`flex w-full flex-row bg-creme`}>
              <div className="mx-auto flex w-3/5 flex-wrap gap-5 p-5">
                <div className="flex basis-1/5 flex-col items-center gap-3">
                  <MoviePreviewCard
                    movie={movie}
                    setTrailerModalOpen={setTrailerModalOpen}
                  />
                  <button
                    className={`h-10 w-[90%] rounded-md bg-dark-red transition duration-200 ease-in-out hover:bg-light-red`}
                    onClick={() => setEditModalOpen(true)}
                  >
                    Edit
                  </button>
                  <button
                    className={`h-10 w-[90%] rounded-md bg-dark-red transition duration-200 ease-in-out hover:bg-light-red`}
                    onClick={() => setPromotionModalOpen(true)}
                  >
                    Promotions
                  </button>

                  <button
                    className={`h-10 w-[90%] rounded-md bg-dark-red transition duration-200 ease-in-out hover:bg-light-red`}
                  >
                    Remove Movie
                  </button>
                </div>
                <div className={`max-w-[70%]`}>
                  <h1 className="font-firasans text-4xl font-bold text-light-red">
                    {movie.title}
                  </h1>
                  <p className={`mx-1 my-1 font-firasans text-lg text-black`}>
                    {`${movie.rating} | ${movie.genres[0]!} | ${
                      movie.length
                    } min`}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {movie.showtimes.map((showtime) => (
                      <Link
                        href="/ticketCheckout"
                        key={showtime.toString()}
                        className="relative"
                      >
                        <button
                          className="mx-1 my-1 justify-center gap-1 
                        rounded-md bg-dark-red px-2 py-1 font-firasans text-lg
                        transition ease-in-out hover:bg-light-red "
                        >
                          {`${
                            showtime.getHours() % 12 === 0
                              ? 12
                              : showtime.getHours() % 12
                          }:${showtime
                            .getMinutes()
                            .toString()
                            .padStart(2, "0")} 
                      ${showtime.getHours() >= 12 ? "PM" : "AM"}`}
                        </button>

                        <button
                          className={`absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-center text-lg font-bold transition duration-200 ease-in-out hover:scale-125 hover:bg-red-500`}
                        >
                          -
                        </button>
                      </Link>
                    ))}
                    <form>
                      <input
                        type="time"
                        name="time"
                        id="time"
                        className="mx-1 my-1 h-[85%] w-[120] rounded-md bg-gray-100 px-3 text-center text-black"
                      />
                      <button
                        className="mx-3 my-1 w-[80px] justify-center
                        gap-1 rounded-md bg-dark-red px-2 py-1 font-firasans
                        text-lg transition ease-in-out hover:bg-light-red"
                      >
                        Add
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </>
        ))}

        <TrailerModal
          open={trailerModalOpen}
          setOpen={setTrailerModalOpen}
          // Need to change url to be dynamic
          url="https://www.youtube.com/embed/VONRQMx78YI"
        />
        <EditMovieModal
          open={editModalOpen}
          setOpen={setEditModalOpen}
          movie={movies[0]!}
        />
        <AddPromotionModal
          open={promotionModalOpen}
          setOpen={setPromotionModalOpen}
          movie={movies[0]!}
        />
        <AddMovieModal
          open={addMovieModalOpen}
          setOpen={setAddMovieModalOpen}
        />
      </main>

      {/* <Footer /> */}
    </>
  );
};

export default AdminBrowse;
