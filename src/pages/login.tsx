import React, { type FormEventHandler, useState } from "react";
import Head from "next/head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import type { NextPage } from "next";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

const Login: NextPage = (props): JSX.Element => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });
  const [status, setStatus] = useState({status: 100})
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    signIn("credentials", {
      email: userInfo.email,
      password: userInfo.password,
      redirect: false
    }).then((response) => {
      if (response?.error == null) {
        alert("Login Success!");
        setStatus({...status, status: 200})
      } else if(response?.error == "verification") {
        alert("Please check your inbox and verify your account.")
      } else {
        alert("Invalid credentials. Please try again.")
      }
    }).catch((error) => {
      alert(error)
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
            <a href="#" className="text-xs text-dark-red hover:underline">
              Forget Password?
            </a>
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
