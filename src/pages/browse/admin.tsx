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

const date = new Date("2021-09-01T00:00:00.000Z");

const AdminBrowse: NextPage = () => {

  const allMovies = api.movie.getAllMovies.useQuery();
  const movies = allMovies.data ?? [];

  // const allMovies = api.movie.getMovies.useQuery({
  //   date: date,
  //   limit: 6,
  //   comingSoon: false,
  // });
  // const movies = allMovies.data ?? [];

  // console.log("all movies length:", movies.length)

  const dayHoverEffect = "transition duration-300 hover:text-dark-red";

  const [day, setDay] = useState<(typeof daysNames)[number]>("Sunday");
  const [trailerModalOpen, setTrailerModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [promotionModalOpen, setPromotionModalOpen] = useState(false);
  const [addMovieModalOpen, setAddMovieModalOpen] = useState(false);


  // const movies = [
  //   {
  //     id: "1",
  //     title: "Bee Movie",
  //     poster: "https://i.imgur.com/i1rDBqw.jpg",
  //     showtimes: Array.from(
  //       { length: 10 },
  //       (_, i) => new Date(2021, 10, 10, 10 + i, 0)
  //     ),
  //     trailerURL: "https://www.youtube.com/embed/VONRQMx78YI",
  //     genres: ["Comedy"],
  //     rating: "PG",
  //     length: 125,
  //   } satisfies Movie,
  //   {
  //     id: "2",
  //     title: "Rubber",
  //     poster: "https://i.imgur.com/w3R1CSY.jpg",
  //     showtimes: Array.from(
  //       { length: 10 },
  //       (_, i) => new Date(2021, 10, 10, 10 + i, 0)
  //     ),
  //     trailerURL: "https://www.youtube.com/embed/hVKgY1ilx0Y",
  //     genres: ["Horror"],
  //     rating: "X",
  //     length: 111,
  //   } satisfies Movie,
  //   {
  //     id: "3",
  //     title: "Mall Cop 2",
  //     poster: "https://i.imgur.com/ZF2d8hi.jpg",
  //     showtimes: Array.from(
  //       { length: 10 },
  //       (_, i) => new Date(2021, 10, 10, 10 + i, 0)
  //     ),
  //     trailerURL: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  //     genres: ["Comedy"],
  //     rating: "PG-13",
  //     length: 93,
  //   } satisfies Movie,
  //   {
  //     id: "4",
  //     title: "Sonic 3",
  //     poster: "https://i.imgur.com/yXSvn3h.png",
  //     showtimes: Array.from(
  //       { length: 10 },
  //       (_, i) => new Date(2021, 10, 10, 10 + i, 0)
  //     ),
  //     trailerURL: "https://www.youtube.com/embed/DuWEEKeJLMI",
  //     genres: ["Action"],
  //     rating: "G",
  //     length: 93,
  //   } satisfies Movie,
  // ];

  const [isOpen, setIsOpen] = useState(false)
  const [movie, setMovie] = useState(movies[0])
  const updateMovieMutation = api.movie.updateMovie.useMutation();
  const removeMovieMutation = api.movie.removeMovie.useMutation();

  // const handleChangeMovie = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   if (movie) {
  //     setMovie((prevMovie) => ({ ...prevMovie, [name]: value }));
  //   }
  // };

  
  // const [movieInfo, setMovieInfo] = useState();

  const handleUpdateMovie = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateMovieMutation.mutateAsync({
      beforeTitle: movie?.title as string,
      afterTitle: document.getElementById("title")?.value as string,
      // synopsis: document.getElementById("synopsis")?.value as string,
      rating: document.getElementById("rating")?.value as string,
      genres: "Horror,Comedy,Thriller".split(","),
      // document.getElementById("genres")?.value as string[]
      // showtimes: document.getElementById("showtimes")?.value as string,
      poster: document.getElementById("poster")?.value as string,
      trailer: document.getElementById("trailer")?.value as string,
      length: parseInt(document.getElementById("length")?.value),
      // cast: document.getElementById("cast")?.value as string,
      // directors: document.getElementById("directors")?.value as string,
      // producers: document.getElementById("producers")?.value as string,
      // reviews: document.getElementById("reviews")?.value as string,
    });
    console.log(movie?.title)
    console.log(document.getElementById("length")?.value)
    console.log("hello")
    closeModal();
  };

  function closeModal() {
    setIsOpen(false)
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
                    onClick={() => {
                      setIsOpen(true)
                      setMovie(movie)
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className={`h-10 w-[90%] rounded-md bg-dark-red transition duration-200 ease-in-out hover:bg-light-red`}
                    onClick={() => {setPromotionModalOpen(true) 
                      console.log(movie)}}
                  >
                    Promotions
                  </button>

                  <button
                    onClick = {async () => {
                      await removeMovieMutation.mutateAsync({title: movie.title})
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

        {/* <TrailerModal
          open={trailerModalOpen}
          setOpen={setTrailerModalOpen}
          // Need to change url to be dynamic
          url="https://www.youtube.com/embed/VONRQMx78YI"
        />
        {/* <EditMovieModal
          open={editModalOpen}
          setOpen={setEditModalOpen}
          movie={movies[0]!}
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
                    {`Edit ${movie.title}`}
                  </h1>
                  <form
                  onSubmit={handleUpdateMovie}
                  className="my-auto w-full max-w-lg">
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
                          defaultValue={movie?.genres}
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
                          type="number"
                          defaultValue={movie?.length}
                          // onChange={({ target }) =>
                          //   setMovieInfo({ ...movieInfo, length: target.value })
                          // }
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
                          htmlFor="grid-email-address"
                          className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                        >
                          Thumbnail URL
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
                      className="w-full transform rounded-md bg-dark-red px-4 py-2 tracking-wide text-white transition-colors duration-200 hover:bg-light-coral focus:bg-light-coral focus:outline-none">
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
