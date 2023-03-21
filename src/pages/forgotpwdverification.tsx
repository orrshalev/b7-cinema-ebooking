import React, { useState } from "react";
import Head from "next/head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { FormikHelpers, Formik, Form, Field } from "formik";
// import { Form } from "react-router-dom";

const PwdEmailVerify: NextPage = () => {
  const router = useRouter();
  const email = router.query.email
  const confirmationMutation = api.user.confirmUserPwd.useMutation();

  type SubmitValues = {
    code: string;
  };
  const handleSignup = async (
    values: SubmitValues,
    { setSubmitting }: FormikHelpers<SubmitValues>
  ) => {

    if (typeof email === "string") {
      const confirmed = await confirmationMutation.mutateAsync({
        email: email,
        changePwCode: values.code,
      });

      setSubmitting(false);

      if (confirmationMutation.error) {
        alert(confirmationMutation.error.message);
      } else if (!confirmed) {
        alert("Something went wrong! Try again.");
      } else {
        alert("Confirmed!");
        await router.push("/forgotpwdchange?email=" + email);
      }
    }
  };

  // jennyngo1925@gmail.com
  return (
    <>
      <Head>
        <title>Cinema E-Booking App</title>
        <meta name="description" content="Buy your tickets today!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center ">
        <Formik initialValues={{ code: "" }} onSubmit={handleSignup}>
          <Form className="my-auto grid w-full place-content-center rounded-md bg-white p-6 shadow-md lg:max-w-xl">
          <h1 className="py-6 text-center text-3xl font-semibold text-dark-red">
            Verification Code Sent!
          </h1>
          <h4 className="pb-5 text-center text-dark-red">
            Please check your email for verification code
          </h4>
          <Field
            className=" mb-10 w-full rounded-md border-solid bg-white px-4 py-2 tracking-wide text-dark-red transition-colors  duration-200 focus:bg-white"
            type="text"
            name="code"
            placeholder="Enter Verification Code"
          />
          <button 
              type="submit"
              className="focus:outline-solid w-full transform rounded-md bg-dark-red px-4 py-2 text-center tracking-wide text-white transition-colors duration-200 hover:bg-light-coral focus:bg-light-coral focus:outline-light-coral"
            >
              Verify
          </button>
          </Form>
        </Formik>
      </main>
      <Footer />
    </>
  );
};

export default PwdEmailVerify;
