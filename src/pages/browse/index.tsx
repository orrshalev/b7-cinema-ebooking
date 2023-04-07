import React, { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { daysNames } from "../../utils/consts";
import Image from "next/image";
import TrailerModal from "../../components/TrailerModal";
import type { Movie } from "@prisma/client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import AdminBrowse from "./admin";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

type MoviePreviewCardProps = {
  movie: Movie;
  setTrailerModalOpen: (open: boolean) => void;
};

const MoviePreviewCard = (props: MoviePreviewCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [url, setUrl] = useState("https://www.youtube.com/embed/VONRQMx78YI")
  const [isOpen, setIsOpen] = useState(false);
  const { movie, setTrailerModalOpen } = props;

  return (
    <>
    <button
      className="relative transition duration-300 ease-in-out hover:scale-105"
      onClick={() => {
        setIsOpen(true)
        setUrl(movie.trailer)
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        width={200}
        height={200}
        src={movie.poster}
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
    <Transition.Root show={isOpen} as={Fragment}>
    <Dialog as="div" className="relative z-10" onClose={setIsOpen}>
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </Transition.Child>

      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <Dialog.Panel className="relative transform rounded-lg bg-white text-left shadow-xl transition-all sm:my-8  sm:max-w-5xl">
              <iframe width="854" height="480" src={url}></iframe>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </div>
    </Dialog>
  </Transition.Root>
  </>
  );
};

const currentDate = new Date();
const currentWeekDay = currentDate.getDay();
const beforeDays = daysNames
  .filter((_, i) => i < currentWeekDay)
  .slice(0)
  .reverse()
  .map((_, i) => new Date(new Date().setDate(new Date().getDate() - i - 1)))
  .reverse(); // this is the cleanest code i've ever written
const afterDays = daysNames
  .filter((_, i) => i > currentWeekDay)
  .map((_, i) => new Date(new Date().setDate(new Date().getDate() + i + 1)));
// I can't believe this is the way to get yesterday's day in javascript
const weekDates = [...beforeDays, currentDate, ...afterDays].map((d) =>
  d.toISOString().slice(0, d.toISOString().indexOf("T") + 1)
);

const Browse: NextPage = () => {
  const { data } = useSession();
  const router = useRouter();
  const searchMovie = router.query.movie as string;
  const searchGenre = router.query.genre as string;
  const dayHoverEffect = "transition duration-300 hover:text-dark-red";

  // make a union type based on daysNames
  const [day, setDay] = useState<(typeof daysNames)[number]>(
    daysNames[currentWeekDay]!
  );

  const [dayNum, setDayNum] = useState(currentWeekDay);

  const onSubmit = async () => {
    if (!data?.user) {
      alert("Please log in to purchase.");
      await router.push("/login");
    } else {
      await router.push("/ticketCheckout");
    }
  };

  const allMovies = api.movie.getMovieByDate.useQuery({ day: dayNum });
  let movies = allMovies.data ?? [];
  const searchedMovieArray = movies.filter(
    (movie) => movie.title.replace(/\s+/g, "-").toLowerCase().includes(searchMovie)
  );
  const searchedGenreMovieArray = movies.filter(
    (movie) => movie.genre.replace(/\s+/g, "-").toLowerCase().includes(searchGenre)
  );
  const [trailerModalOpen, setTrailerModalOpen] = useState(false);
  if (searchedMovieArray.length > 0) {
    console.log("search by title", searchMovie)
    movies = searchedMovieArray;
  } else if (searchedGenreMovieArray.length > 0) {
    console.log("search by genre", searchGenre)
    movies = searchedGenreMovieArray;
    console.log(movies)
  } else if (searchMovie) {
    movies = [];
  } else if (searchGenre) {
    movies = [];
  }

  return (
    <>
      <Head>
        <title>Cinema E-Booking App</title>
        <meta name="description" content="Buy your tickets today!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      {api.user.isAdmin.useQuery({ email: data?.user.email }).data == true ? (
        <AdminBrowse></AdminBrowse>
      ) : (
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
                    onClick={() => {
                      setDay(dayName);
                      setDayNum(daysNames.indexOf(dayName));
                      console.log(daysNames.indexOf(dayName));
                    }}
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
            <h2 className="mb-5 font-firasans font-semibold text-dark-red">
              Today&apos;s date
            </h2>
          </div>
          {movies.map((movie) => (
            <>
              <hr className="h-[0.5rem] w-3/5 rounded-sm bg-dark-red" />
              <div className={`flex w-full flex-row bg-creme`}>
                <div className="mx-auto flex w-3/5 flex-wrap gap-5 p-5">
                  <div className="basis-1/5">
                    <MoviePreviewCard
                      movie={movie}
                      setTrailerModalOpen={setTrailerModalOpen}
                    />
                  </div>
                  <div className={`max-w-[70%]`}>
                    <h1 className="font-firasans text-4xl font-bold text-light-red">
                      {movie.title}
                    </h1>
                    <p className={`mx-1 my-1 font-firasans text-lg text-black`}>
                      {/* Adult | Action | 125 min */}
                      {`${movie.rating} | ${movie.genre} | ${movie.length} min`}
                      <br />
                      {`Cast: ${movie.cast} | Directors: ${movie.directors} | Producers: ${movie.producers}`}
                      <br />
                      {`Synopsis: ${movie.synopsis}`}
                      <br />
                      Reviews:
                      <br />
                      {movie.reviews.map((review) => (
                        <div className="flex flex-col gap-1">
                          <p className="font-firasans text-lg text-black">
                            {review}
                          </p>
                        </div>
                      ))}
                    </p>
                    <div className="flex flex-wrap">
                      {movie.showtimes.map((showtime) => (
                        // <Link href="/ticketCheckout" key={showtime.toString()} id="timeButton">
                        <button
                          onClick={onSubmit}
                          key={showtime.toString()}
                          className="mx-1 my-1 justify-center gap-1 rounded-md bg-dark-red px-2 py-1 font-firasans text-lg transition ease-in-out hover:bg-light-red"
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
                        // </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </>
          ))}

          {/* <TrailerModal
            open={trailerModalOpen}
            setOpen={setTrailerModalOpen}
            // Need to change url to be dynamic
            url={"https://www.youtube.com/embed/VONRQMx78YI"}
          /> */}
        </main>
      )}
      <Footer />
    </>
  );
};

export default Browse;
