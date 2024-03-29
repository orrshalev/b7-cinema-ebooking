import React, { type FormEventHandler, useState } from "react";
import Head from "next/head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import type { NextPage } from "next";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { api } from "~/utils/api";

const Login: NextPage = (props): JSX.Element => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });
  const [status, setStatus] = useState({ status: 100 });
  const isBanned = api.user.isSuspended.useQuery({ email: userInfo.email });

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (isBanned.data === "SUSPENDED") {
      alert("You are banned");
      return;
    }

    signIn("credentials", {
      email: userInfo.email,
      password: userInfo.password,
      redirect: false,
    })
      .then(async (response) => {
        if (response?.error == null) {
          alert("Login Successful!");
          setStatus({ ...status, status: 200 });
          router.push("/");
        } else if (response?.error == "verification") {
          alert("Please check your inbox and verify your account.");
        } else {
          alert("Invalid credentials. Please try again.");
        }
      })
      .catch((error) => {
        alert(error);
      });
  };
  return (
    <>
      <Head>
        <title>Cinema E-Booking App</title>
        <meta name="description" content="Buy your tickets today!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center ">
        <div className="my-auto w-full rounded-md bg-white p-6 shadow-md lg:max-w-xl">
          <h1 className="text-center text-3xl font-semibold text-dark-red">
            Sign in
          </h1>
          <form onSubmit={handleSubmit} className="mt-6">
            <div className="mb-2">
              <label className="block text-sm font-semibold text-gray-800">
                Email
              </label>
              <input
                value={userInfo.email}
                onChange={({ target }) =>
                  setUserInfo({ ...userInfo, email: target.value })
                }
                id="email"
                type="email"
                className="mt-2 block w-full rounded-md border bg-white px-4 py-2 text-dark-red focus:border-light-coral focus:outline-none focus:ring focus:ring-light-coral focus:ring-opacity-40"
                required
              />
              <div className="text-danger"></div>
            </div>
            <div className="mb-2">
              <label className="block text-sm font-semibold text-gray-800">
                Password
              </label>
              <input
                value={userInfo.password}
                onChange={({ target }) =>
                  setUserInfo({ ...userInfo, password: target.value })
                }
                id="password"
                type="password"
                pattern=".{8,}"
                className="mt-2 block w-full rounded-md border bg-white px-4 py-2 text-dark-red focus:border-light-coral focus:outline-none focus:ring focus:ring-light-coral focus:ring-opacity-40"
                required
              />
              <div className="text-danger"></div>
            </div>
            <Link
              href="/forgotpwdemail"
              className="text-xs text-dark-red hover:underline"
            >
              Forget Password?
            </Link>

            <div className="mb-4 flex flex-col">
              <div className="my-5 w-full">
                <input
                  id="rememberMe-checkbox"
                  type="checkbox"
                  name="rememberMe"
                  className="text-dark-coral-600 focus:ring-dark-coral-500 dark:focus:ring-dark-coral-600 h-4 w-4 rounded border-gray-300 bg-gray-100 focus:ring-2 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
                />
                <label
                  htmlFor="rememberMe-checkbox"
                  className="ml-2 text-sm font-medium text-gray-700"
                >
                  Remember me
                </label>
              </div>
            </div>
            <div className="mt-6">
              <button className="w-full transform rounded-md bg-dark-red px-4 py-2 tracking-wide text-white transition-colors duration-200 hover:bg-light-coral focus:bg-light-coral focus:outline-none">
                Login
              </button>
            </div>
          </form>

          <p className="mt-8 text-center text-xs font-light text-gray-700">
            {" "}
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="font-medium text-dark-red hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Login;
