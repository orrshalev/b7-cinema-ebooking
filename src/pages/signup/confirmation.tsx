import React from "react";
import Head from "next/head";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
import { useRouter } from "next/router";
import { Formik, Field, Form } from "formik";
import { api } from "~/utils/api";
import type { FormikHelpers } from "formik";
import type { NextPage } from "next";
import Link from "next/link";

const Confirmation: NextPage = () => {
  const router = useRouter();

  type SubmitValues = {
    code: string;
  };
  const handleSignup = async (
    values: SubmitValues,
    { setSubmitting }: FormikHelpers<SubmitValues>
  ) => {
    const result = await api.user.confirmUser(values.code);
    setSubmitting(false);

    if (signupMutation.error) {
      alert(signupMutation.error.message);
    } else {
      await router.push("/signup/confirmation?email=" + values.email);
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
        <Formik initialValues={{ code: "" }} onSubmit={}>
          <div className="my-auto grid w-full place-content-center rounded-md bg-white p-6 shadow-md lg:max-w-xl">
            <h1 className="py-6 text-center text-3xl font-semibold text-dark-red">
              Registration Successful!
            </h1>
            <h4 className="pb-5 text-center text-dark-red">
              Please check your email for confirmation code
            </h4>
            <input
              className=" border- mb-10 w-full rounded-md border-2 border-solid bg-white px-4 py-2 tracking-wide text-dark-red transition-colors  duration-200 focus:bg-white"
              type="text"
              placeholder="Enter Confirmation Code"
            />
            <Link
              href="/login"
              className="focus:outline-solid w-full transform rounded-md bg-dark-red px-4 py-2 text-center tracking-wide text-white transition-colors duration-200 hover:bg-light-coral focus:bg-light-coral focus:outline-light-coral"
            >
              Login
            </Link>
          </div>
        </Formik>
      </main>
      <Footer />
    </>
  );
};

export default Confirmation;
