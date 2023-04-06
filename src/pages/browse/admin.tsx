import React, { useState } from "react";
import Link from "next/link";
import type { NextPage } from "next";
import Head from "next/head";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { daysNames } from "../../utils/consts";
import Image from "next/image";
import TrailerModal from "../../components/TrailerModal";
import type { Movie } from "@prisma/client";
// import EditMovieModal from "../../scenes/modals/EditMovieModal";
import AddPromotionModal from "../../scenes/modals/AddPromotionModal";
import AddMovieModal from "../../scenes/modals/AddMovieModal";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { api } from "../../utils/api";
import { useRouter } from "next/router";

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

const AdminBrowse: NextPage = () => {

  const dayHoverEffect = "transition duration-300 hover:text-dark-red";

  const [day, setDay] = useState<(typeof daysNames)[number]>(
    daysNames[currentWeekDay]!
  );
  const [dayNum, setDayNum] = useState(currentWeekDay)
  
  const allMovies = api.movie.getMovieByDate.useQuery({day: dayNum});
  const movies = allMovies.data ?? [];

  const [trailerModalOpen, setTrailerModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [promotionModalOpen, setPromotionModalOpen] = useState(false);
  const [addMovieModalOpen, setAddMovieModalOpen] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [movie, setMovie] = useState(movies[0]);
  const updateMovieMutation = api.movie.updateMovie.useMutation();
  const removeMovieMutation = api.movie.removeMovie.useMutation();
  const deleteShowTimeMutation = api.movie.deleteShowTime.useMutation();
  const addShowTimeMutation = api.movie.addShowTime.useMutation();


  const handleUpdateMovie = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateMovieMutation.mutateAsync({
      beforeTitle: movie?.title as string,
      afterTitle: document.getElementById("title")?.value as string,
      rating: document.getElementById("rating")?.value as string,
      genre: document.getElementById("genre")?.value as string,
      poster: document.getElementById("poster")?.value as string,
      trailer: document.getElementById("trailer")?.value as string,
      length: document.getElementById("length")?.value as string,
      synopsis: document.getElementById("synopsis")?.value as string,
      cast: document.getElementById("cast")?.value as string,
      directors: document.getElementById("directors")?.value as string,
      producers: document.getElementById("producers")?.value as string,
    });
    console.log(movie?.title);
    console.log(document.getElementById("length")?.value);
    closeModal();
  };

  function closeModal() {
    setIsOpen(false);
  }

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
                  onClick={() => {
                    setDay(dayName)
                    setDayNum(daysNames.indexOf(dayName))
                    console.log(daysNames.indexOf(dayName))
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
                    onClick={() => {
                      setIsOpen(true);
                      setMovie(movie);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className={`h-10 w-[90%] rounded-md bg-dark-red transition duration-200 ease-in-out hover:bg-light-red`}
                    onClick={() => {
                      setPromotionModalOpen(true);
                      console.log(movie);
                    }}
                  >
                    Promotions
                  </button>

                  <button
                    onClick={async () => {
                      await removeMovieMutation.mutateAsync({
                        title: movie.title,
                      });
                    }}
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
                    {`${movie.rating} | ${movie.genre} | ${movie.length} min`}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {movie.showtimes.map((showtime) => (
                      <div key={showtime.toString()} className="relative">
                        <button
                          onClick={() => (location.href = "/ticketCheckout")}
                          id="timeButton"
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
                          onClick={async () => {
                            const index = movie.showtimes.indexOf(showtime);
                            movie.showtimes.splice(index, 1);
                            await deleteShowTimeMutation.mutateAsync({
                              title: movie.title,
                              showtimes: movie.showtimes,
                            });
                            console.log("movie.showtimes:", movie.showtimes);
                          }}
                          id="deleteTimeButton"
                          className={`absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-center text-lg font-bold transition duration-200 ease-in-out hover:scale-125 hover:bg-red-500`}
                        >
                          -
                        </button>
                      </div>
                    ))}
                    <form
                      onSubmit={ async (e: React.FormEvent<HTMLFormElement>) => {
                        // e.preventDefault();
                        let dup = false;
                        const inputs =
                          document.querySelectorAll('input[type="time"]');
                        console.log(inputs);
                        let timeVal = null;
                        let validTime = false;
                        for (let i = 0; i < inputs.length; i++) {
                          if (inputs[i].value) {
                            console.log(inputs[i].value);
                            timeVal = inputs[i].value;
                            validTime = true;
                          }
                        }
                        if (!validTime) alert("Please schedule a valid time.");
                        const newShowtime = new Date(
                          weekDates[daysNames.findIndex((d) => d === day)] +
                            timeVal +
                            ":00.00-04:00"
                        );
                        movie?.showtimes.forEach(function (value: Date) {
                          if (
                            !(newShowtime > value) &&
                            !(newShowtime < value)
                          ) {
                            dup = true;
                          }
                        });
                        if (dup)
                          alert(
                            "You cannot schedule 2 movies at the same time."
                          );
                        else {
                          if (
                            !(await addShowTimeMutation.mutateAsync({
                              title: movie?.title,
                              newShowtime: newShowtime as Date,
                            }))
                          )
                            alert(
                              "You cannot schedule 2 movies at the same time."
                            );
                        }
                        console.log(movie?.showtimes);
                        console.log(
                          "time input",
                          document.getElementById("time")?.value
                        );
                        console.log("new date", newShowtime);
                        console.log(movie.title);
                      }}
                    >
                      <input
                        type="time"
                        name="time"
                        id="time"
                        className="mx-1 my-1 h-[85%] w-[120] rounded-md bg-gray-100 px-3 text-center text-black"
                      />
                      <button
                        type="submit"
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

        {/* <TrailerModal
          open={trailerModalOpen}
          setOpen={setTrailerModalOpen}
          // Need to change url to be dynamic
          url="https://www.youtube.com/embed/VONRQMx78YI"
        /> */}
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

      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                  <div className="my-auto grid w-full rounded-md bg-white p-6 shadow-md lg:max-w-xl">
                    <h1 className="mb-8 text-center text-3xl font-semibold text-dark-red">
                      {`Edit movie`}
                    </h1>
                    <form
                      onSubmit={handleUpdateMovie}
                      className="my-auto w-full max-w-lg"
                    >
                      <div className="-mx-3 mb-6 flex flex-wrap">
                        <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
                          <label
                            htmlFor="grid-first-name"
                            className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                          >
                            Title
                          </label>
                          <input
                            className="mb-3 block w-full appearance-none rounded border bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:bg-white focus:outline-none"
                            id="title"
                            type="text"
                            defaultValue={movie?.title}
                          />
                        </div>
                        <div className="w-full px-3 md:w-1/2">
                          <label
                            htmlFor="grid-last-name"
                            className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                          >
                            Genre
                          </label>
                          <input
                            className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                            id="genre"
                            type="text"
                            defaultValue={movie?.genre}
                          />
                        </div>
                      </div>
                      <div className="-mx-3 mb-6 flex flex-wrap">
                      <div className="w-full px-3">
                        <label
                          htmlFor="synopsis"
                          className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                        >
                          Synopsis
                        </label>
                        <textarea
                          className="mb-3 block h-[100px] w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3  px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                          id="synopsis"
                          defaultValue={movie?.synopsis}
                        />
                      </div>
                    </div>
                      <div className="-mx-3 mb-6 flex flex-wrap">
                        <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
                          <label
                            htmlFor="grid-city"
                            className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                          >
                            length
                          </label>
                          <input
                            className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                            id="length"
                            type="text"
                            defaultValue={movie?.length}
                          />
                        </div>
                        <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
                          <label
                            htmlFor="grid-state"
                            className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                          >
                            Rating
                          </label>
                          <div className="relative">
                            <select
                              className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                              id="rating"
                              defaultValue={movie?.rating}
                            >
                              <option>G</option>
                              <option>PG</option>
                              <option>PG-13</option>
                              <option>R</option>
                              <option>NC-17</option>
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
                      </div>
                      <div className="-mx-3 mb-6 flex flex-wrap">
                        <div className="w-full px-3">
                          <label
                            htmlFor="cast"
                            className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                          >
                            Cast
                          </label>
                          <textarea
                            className="mb-3 block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3  px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                            id="cast"
                            defaultValue={movie?.cast}
                          />
                        </div>
                      </div>
                      <div className="-mx-3 mb-6 flex flex-wrap">
                        <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
                          <label
                            htmlFor="directors"
                            className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                          >
                            Director
                          </label>
                          <input
                            className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                            id="directors"
                            type="text"
                            defaultValue={movie?.directors}
                          />
                        </div>
                        <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
                          <label
                            htmlFor="producers"
                            className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                          >
                            Producer
                          </label>
                          <input
                            className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                            id="producers"
                            type="text"
                            defaultValue={movie?.producers}
                          />
                        </div>
                      </div>
                      <div className="-mx-3 mb-6 flex flex-wrap">
                        <div className="w-full px-3">
                          <label
                            htmlFor="grid-email-address"
                            className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                          >
                            Poster URL
                          </label>
                          <input
                            className="mb-3 block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                            id="poster"
                            type="text"
                            defaultValue={movie?.poster}
                          />
                        </div>
                      </div>
                      <div className="-mx-3 mb-6 flex flex-wrap">
                        <div className="w-full px-3">
                          <label
                            htmlFor="grid-email-address"
                            className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                          >
                            Trailer URL
                          </label>
                          <input
                            className="mb-3 block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                            id="trailer"
                            type="text"
                            defaultValue={movie?.trailer}
                          />
                        </div>
                      </div>
                      <div className="mt-6">
                        <button
                          // onClick={closeModal}
                          type="submit"
                          className="w-full transform rounded-md bg-dark-red px-4 py-2 tracking-wide text-white transition-colors duration-200 hover:bg-light-coral focus:bg-light-coral focus:outline-none"
                        >
                          Make Changes
                        </button>
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default AdminBrowse;
