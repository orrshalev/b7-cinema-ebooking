import { type NextPage } from "next";
import Footer from "../components/Footer";
import Head from "next/head";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import { api } from "../utils/api";
import TrailerModal from "../components/TrailerModal";
import Navbar from "../components/Navbar";
import type { Movie } from "@prisma/client";
import dateRange from "src/pages/lib/dateRange";

type MoviePreviewCardProps = {
  movie: Movie;
  setTrailerModalOpen: (open: boolean) => void;
};

const MoviePreviewCard = (props: MoviePreviewCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { movie, setTrailerModalOpen } = props;

  return (
    <div
      className="flex w-[249] flex-col items-center justify-center gap-4 rounded-xl bg-dark-red p-4 text-white transition ease-in-out hover:scale-110"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h2 className="font-exo text-2xl font-bold">{movie.title}</h2>
      <button className="relative" onClick={() => setTrailerModalOpen(true)}>
        <Image
          width={299}
          height={399}
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
      <button className="h-[49px] w-3/5 rounded-lg bg-dark-coral">
        <h3 className="font-exo text-lg font-bold">Buy Tickets</h3>
      </button>
    </div>
  );
};

const dateRangeArr = dateRange();
console.log("date range", dateRangeArr[142]);

const Home: NextPage = () => {
  const movies = api.movie.getTodayMovies.useQuery({
    limit: 4,
    range: dateRangeArr,
    comingSoon: false,
  });
  const moviesData = movies.data ?? [];
  const comingSoonMovies = api.movie.getUpcomingMovies.useQuery({
    limit: 4,
    comingSoon: true,
  });
  const comingSoonMoviesData = comingSoonMovies.data ?? [];
  const router = useRouter();

  const [selectedMovies, setSelectedMovies] = useState<
    "NOW_PLAYING" | "COMING_SOON"
  >("NOW_PLAYING");

  const [trailerModalOpen, setTrailerModalOpen] = useState(false);
  const allMovies = api.movie.getMovies.useQuery();
  const allMoviesData = allMovies.data ?? []

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
                  id="search-field"
                />
                <button
                  className="btn flex items-center rounded bg-dark-red px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition  duration-150 ease-in-out hover:bg-light-coral hover:shadow-lg focus:bg-light-coral focus:shadow-lg focus:outline-none focus:ring-0 active:bg-dark-red active:shadow-lg"
                  type="button"
                  id="button-addon2"
                  onClick={() => {
                    let isMovie = false;
                    const searchField =
                      document.getElementById("search-field")?.value;
                    allMoviesData.forEach((movie) => {
                      if (movie.title.toLowerCase() === searchField.toLowerCase()) {
                        router.push(
                          `/browse?movie=${searchField
                            .replace(/\s+/g, "-")
                            .toLowerCase()}`
                        );    
                        isMovie = true;                   
                      }
                    })
                    if (isMovie === false) {
                      alert ("No movies called \"" + searchField + "\"")
                      return false;
                    }
                  }}
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
          <div className="mb-10 flex w-4/5 items-center justify-between">
            <h2 className="font-firasans text-xl font-semibold text-light-red">
              Movies at Our Cinema
            </h2>
            <div className="flex gap-14">
              <button
                onClick={() => setSelectedMovies("NOW_PLAYING")}
                className={`relative font-firasans text-light-red before:absolute before:-bottom-1 before:z-10 before:h-1 before:w-full before:bg-light-red before:opacity-0 before:transition before:duration-500 before:hover:opacity-100 ${
                  selectedMovies == "NOW_PLAYING" ? "before:opacity-100" : ""
                }`}
              >
                Now Playing
              </button>
              <button
                onClick={() => setSelectedMovies("COMING_SOON")}
                className={`relative font-firasans text-light-red before:absolute before:-bottom-1 before:z-10 before:h-1 before:w-full before:bg-light-red before:opacity-0 before:transition before:duration-500 before:hover:opacity-100 ${
                  selectedMovies == "COMING_SOON" ? "before:opacity-100" : ""
                }`}
              >
                Coming Soon
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <button className="my-auto mx-5 transition ease-in-out hover:opacity-70">
            <Image
              src={"/assets/svg/arrow-left-solid.svg"}
              alt="sample"
              width={50}
              height={50}
            ></Image>
          </button>
          <div className="flex w-[70%] flex-col gap-20 pb-10 md:grid md:grid-cols-4">
            {selectedMovies == "NOW_PLAYING"
              ? moviesData.map((movie) => (
                  <MoviePreviewCard
                    movie={movie}
                    setTrailerModalOpen={setTrailerModalOpen}
                    key={movie.id}
                  />
                ))
              : comingSoonMoviesData.map((movie) => (
                  <MoviePreviewCard
                    movie={movie}
                    setTrailerModalOpen={setTrailerModalOpen}
                    key={movie.id}
                  />
                ))}
          </div>
          <button className="my-auto mx-5 transition ease-in-out hover:opacity-70">
            <Image
              src={"/assets/svg/arrow-right-solid.svg"}
              alt="sample"
              width={50}
              height={50}
            ></Image>
          </button>
        </div>

        <TrailerModal
          open={trailerModalOpen}
          setOpen={setTrailerModalOpen}
          // Need to change url to be dynamic
          url="https://www.youtube.com/embed/VONRQMx78YI"
        />
      </main>
      <Footer />
    </>
  );
};

export default Home;
