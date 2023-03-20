import React, { useState } from "react";
import Head from "next/head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import type { NextPage } from "next";
import Link from "next/link";

const pwdEmailVerify: NextPage = () => {
  const [code, setCode] = useState({ code: "" });

  const onSubmit = async (e) => {
    // if (localStorage.getItem("pwCode") == code.code) alert("SUCCESS!");
    // else alert("BAD");
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
            Verification Code Sent!
          </h1>
          <h4 className="pb-5 text-center text-dark-red">
            Please check your email for verification code
          </h4>
          <input
            value={code.code}
            className=" mb-10 w-full rounded-md border-solid bg-white px-4 py-2 tracking-wide text-dark-red transition-colors  duration-200 focus:bg-white"
            type="text"
            placeholder="Enter Verification Code"
            onChange={({ target }) => setCode({ ...code, code: target.value })}
          />
          <button onClick={onSubmit}>
            <Link
              href="/forgotpwdchange"
              className="focus:outline-solid w-full transform rounded-md bg-dark-red px-4 py-2 text-center tracking-wide text-white transition-colors duration-200 hover:bg-light-coral focus:bg-light-coral focus:outline-light-coral"
            >
              Verify
            </Link>
          </button>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default pwdEmailVerify;
