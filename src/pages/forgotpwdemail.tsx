import React, { useState } from "react";
import Head from "next/head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import type { NextPage } from "next";
import Link from "next/link";
import { user } from "@userfront/core";

interface EmailOptions {
  to: string;
  subject: string;
  text: string;
}

const Pwdemail: NextPage = () => {
  const [userEmail, setUserEmail] = useState({ email: "" });

  const onSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('../api/sendConfirmationEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userEmail.email),
      });
      console.log(userEmail)
      const data = await response.json();
      return
      console.log(data)
    } catch (error) {
      console.error(error);
    }
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
        <div className="my-auto grid w-full place-content-center rounded-md bg-white p-6 shadow-md lg:max-w-xl">
          <h1 className="py-6 text-center text-3xl font-semibold text-dark-red">
            Forgot Password
          </h1>
          <h4 className="pb-5 text-center text-dark-red">
            Please enter your email address associated with your account
          </h4>
          <input
            value={userEmail.email}
            onChange={({ target }) =>
              setUserEmail({ ...userEmail, email: target.value })
            }
            type="email"
            placeholder="Enter Email Address"
            className=" mb-10 w-full rounded-md border-solid bg-white px-4 py-2 tracking-wide text-dark-red transition-colors  duration-200 focus:bg-white"
            required
          />
          <button
            onClick={onSubmit}>
            <Link
              href="/forgotpwdverification"
              className="focus:outline-solid w-full transform rounded-md bg-dark-red px-4 py-2 text-center tracking-wide text-white transition-colors duration-200 hover:bg-light-coral focus:bg-light-coral focus:outline-light-coral"
            >
              Send Verification Code
            </Link>
          </button>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Pwdemail;
