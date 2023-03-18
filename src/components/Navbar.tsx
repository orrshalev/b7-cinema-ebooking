import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const { data } = useSession();

  return (
    <nav className="px-auto  top-0 w-full border-gray-200 bg-dark-red py-2.5 font-exo sm:px-4">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src={"/assets/svg/movie-icon.svg"}
            className="mr-3 h-6 sm:h-9"
            alt="Movie Logo"
            width={50}
            height={50}
          ></Image>
          <span className="self-center whitespace-nowrap text-xl font-semibold text-creme dark:text-white">
            Cinema E-Booking
          </span>
        </Link>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-dark-red md:text-sm md:font-medium md:dark:bg-dark-red">
            <li>
              <Link
                href="/"
                className="bg-dark-coral-700 md:text-dark-coral-700 text-dark-white block rounded py-2 pl-3 pr-4 font-bold dark:text-white sm:text-lg md:bg-transparent md:p-0"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/browse"
                className="block rounded py-2 pl-3 pr-4 font-bold text-creme transition duration-300 ease-in-out hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white sm:text-lg md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-white"
              >
                Browse
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="block rounded py-2 pl-3 pr-4 font-bold text-creme transition duration-300 ease-in-out hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white sm:text-lg md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-white"
              >
                Search
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="block rounded py-2 pl-3 pr-4 font-bold text-creme transition duration-300 ease-in-out hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white sm:text-lg md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-white"
              >
                Contact
              </Link>
            </li>
              {data?.user ? (
                <>
            <li>
              <Link
                onClick={() => signOut()}
                id="logoutlink"
                href="#"
                className="block rounded py-2 pl-3 pr-4 font-bold text-creme transition duration-300 ease-in-out hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white sm:text-lg md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-white"
              >
                Logout
              </Link>
              </li>
              </>
              ): (
                <li>
                <Link
                  id="loginlink"
                  href="/login"
                  className="block rounded py-2 pl-3 pr-4 font-bold text-creme transition duration-300 ease-in-out hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white sm:text-lg md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-white"
                >
                  Login
                </Link>
                </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
