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
  const { email } = router.query;
  const confirmationMutation = api.user.confirmUser.useMutation();

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
        confirmCode: values.code,
      });

      setSubmitting(false);

      if (confirmationMutation.error) {
        alert(confirmationMutation.error.message);
      } else if (!confirmed) {
        alert("Something went wrong! Try again.");
      } else {
        await router.push("/login");
      }
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
        <Formik initialValues={{ code: "" }} onSubmit={handleSignup}>
          <Form className="my-auto grid w-full place-content-center rounded-md bg-white p-6 shadow-md lg:max-w-xl">
            <h1 className="py-6 text-center text-3xl font-semibold text-dark-red">
              Registration Successful!
            </h1>
            <h4 className="pb-5 text-center text-dark-red">
              Please check your email for confirmation code
            </h4>
            <Field
              className=" border- mb-10 w-full rounded-md border-2 border-solid bg-white px-4 py-2 tracking-wide text-dark-red transition-colors  duration-200 focus:bg-white"
              type="text"
              name="code"
              placeholder="Enter Confirmation Code"
            />
            {/* Should be Link maybe */}
            <button
              type="submit"
              // href="/login"
              className="focus:outline-solid w-full transform rounded-md bg-dark-red px-4 py-2 text-center tracking-wide text-white transition-colors duration-200 hover:bg-light-coral focus:bg-light-coral focus:outline-light-coral"
            >
              Login
            </button>
          </Form>
        </Formik>
      </main>
      <Footer />
    </>
  );
};

export default Confirmation;
