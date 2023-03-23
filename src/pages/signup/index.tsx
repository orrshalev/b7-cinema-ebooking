import React, { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
import { states } from "~/utils/consts";
import { Formik, Field, Form } from "formik";
import type { FormikHelpers } from "formik";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import bcrypt from "bcryptjs";

function combine(str1: string, str2: string) {
  return str1 + ", " + str2;
}

interface Values {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  homeStreet: string;
  homeCity: string;
  homeState: string;
  homeZip: string;
  cardNumber: string;
  billStreet: string;
  billCity: string;
  billState: string;
  billZip: string;
  cardType: string;
  billMonth: string;
  billYear: string;
  cvv: string;
}

const Signup: NextPage = () => {
  const email = "djgonzalez0209@gmail.com";
  const signupMutation = api.user.createUser.useMutation();
  const router = useRouter();

  const handleSignup = async (
    values: Values,
    { setSubmitting }: FormikHelpers<Values>
  ) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(values.password, saltRounds);
    const hashedCardNumber = await bcrypt.hash(values.cardNumber, saltRounds);
    const result = await signupMutation.mutateAsync({
      email: values.email,
      firstName: values.firstName,
      lastName: values.lastName,
      phoneNumber: values.phoneNumber,
      password: hashedPassword,
      homeStreet: values.homeStreet,
      homeCity: values.homeCity,
      homeState: values.homeState,
      homeZip: values.homeZip,
      cardNumber: hashedCardNumber,
      cardType: values.cardType,
      billStreet: values.billStreet,
      billCity: values.billCity,
      billState: values.billState,
      billZip: values.billZip,
      billMonth: values.billMonth,
      billYear: values.billYear,
      state: "ACTIVE",
    });
    setSubmitting(false);
    if (result == null) {
      alert("Email already exists!");
    } else {
      if (signupMutation.error) {
        alert(signupMutation.error.message);
      } else {
        await router.push("/signup/confirmation?email=" + values.email);
      }
    }
  };

  const [showPaymentForm, setShowPaymentForm] = useState(false);

  return (
    <>
      <Head>
        <title>Cinema E-Booking App</title>
        <meta name="description" content="Buy your tickets today!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="my-10 flex min-h-screen flex-col items-center">
        <div className="my-auto grid w-full rounded-md bg-white p-6 shadow-md lg:max-w-xl">
          <h1 className="mb-8 text-center text-3xl font-semibold text-dark-red">
            Sign Up
          </h1>
          <p className="pb-5 text-center text-xs text-red-500">* Required</p>
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              phoneNumber: "",
              password: "",
              homeStreet: "",
              homeState: "Alabama",
              homeCity: "",
              homeZip: "",
              cardNumber: "",
              billStreet: "",
              billCity: "",
              billState: "",
              billZip: "",
              cardType: "",
              billMonth: "",
              billYear: "",
              cvv: "",
            }}
            onSubmit={handleSignup}
          >
            <Form className="my-auto w-full max-w-lg">
              <div className="-mx-3 mb-6 flex flex-wrap">
                <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
                  <label
                    htmlFor="grid-first-name"
                    className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                  >
                    First Name<span className="text-red-500">*</span>
                  </label>
                  <Field
                    className="mb-3 block w-full appearance-none rounded border bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:bg-white focus:outline-none"
                    id="grid-first-name"
                    name="firstName"
                    type="text"
                    pattern="^[A-Za-z]{1,50}$"
                    placeholder="Jane"
                    required
                  />
                </div>
                <div className="w-full px-3 md:w-1/2">
                  <label
                    htmlFor="grid-last-name"
                    className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                  >
                    Last Name<span className="text-red-500">*</span>
                  </label>
                  <Field
                    className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                    id="grid-last-name"
                    name="lastName"
                    type="text"
                    pattern="^[A-Za-z]{1,50}$"
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>
              <div className="-mx-3 mb-6 flex flex-wrap">
                <div className="w-full px-3">
                  <label
                    htmlFor="grid-email-address"
                    className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                  >
                    Email<span className="text-red-500">*</span>
                  </label>
                  <Field
                    className="mb-3 block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                    id="grid-email-address"
                    name="email"
                    type="email"
                    placeholder="example@gmail.com"
                    required
                  />
                </div>
              </div>
              <div className="-mx-3 mb-6 flex flex-wrap">
                <div className="w-full px-3">
                  <label
                    htmlFor="grid-phone-number"
                    className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                  >
                    Phone number<span className="text-red-500">*</span>
                  </label>
                  <Field
                    className="mb-3 block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                    id="grid-phone-number"
                    type="tel"
                    name="phoneNumber"
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    placeholder="111-1111-1111"
                    required
                  />
                </div>
              </div>
              <div className="-mx-3 mb-6 flex flex-wrap">
                <div className="w-full px-3">
                  <label
                    htmlFor="grid-password"
                    className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                  >
                    Password<span className="text-red-500">*</span>
                  </label>
                  <Field
                    className="mb-3 block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                    id="grid-password"
                    type="password"
                    name="password"
                    placeholder="******************"
                    pattern=".{8,}"
                    required
                  />
                  <p className="text-xs italic text-gray-600">
                    Must be at least 8 characters long
                  </p>
                </div>
              </div>
              <div className="-mx-3 mb-6 flex flex-wrap">
                <div className="w-full px-3">
                  <label
                    htmlFor="grid-home-address"
                    className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                  >
                    Home Address
                  </label>
                  <Field
                    className="mb-3 block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                    id="grid-home-address"
                    type="text"
                    name="homeStreet"
                  />
                </div>
              </div>
              <div className="-mx-3 mb-2 flex flex-wrap">
                <div className="mb-6 w-full px-3 md:mb-0 md:w-1/3">
                  <label
                    htmlFor="grid-city"
                    className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                  >
                    City
                  </label>
                  <Field
                    className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                    id="grid-city"
                    type="text"
                    name="homeCity"
                    pattern="[a-zA-Z0-9 ]+"
                    placeholder="Albuquerque"
                  />
                </div>
                <div className="mb-6 w-full px-3 md:mb-0 md:w-1/3">
                  <label
                    htmlFor="grid-state"
                    className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                  >
                    State
                  </label>
                  <div className="relative">
                    <Field
                      as="select"
                      className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                      id="grid-state"
                      name="homeState"
                    >
                      {states.map((state) => (
                        <option key={state}>{state}</option>
                      ))}
                    </Field>
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
                <div className="mb-6 w-full px-3 md:mb-0 md:w-1/3">
                  <label
                    htmlFor="grid-zip"
                    className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                  >
                    Zip
                  </label>
                  <Field
                    className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                    id="grid-zip"
                    type="text"
                    name="homeZip"
                    pattern=".{4,5}[0-9]"
                    placeholder="90210"
                  />
                </div>
              </div>
              <div className="mt-6 w-full px-3 md:mb-0 md:w-1/3">
                <input
                  id="payment-checkbox"
                  type="checkbox"
                  value=""
                  className="text-dark-coral-600 focus:ring-dark-coral-500 dark:focus:ring-dark-coral-600 h-4 w-4 rounded border-gray-300 bg-gray-100 focus:ring-2 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
                  onChange={() => setShowPaymentForm((prev) => !prev)}
                />
                <label
                  htmlFor="payment-checkbox"
                  className="ml-2 text-sm font-medium text-gray-700"
                >
                  Add payment info
                </label>
              </div>
              {showPaymentForm && (
                <>
                  <div className="-mx-3 my-6 flex flex-wrap">
                    <div className="w-full px-3">
                      <label
                        htmlFor="grid-card-number"
                        className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                      >
                        Card Number<span className="text-red-500">*</span>
                      </label>
                      <Field
                        className="mb-3 block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                        id="grid-card-number"
                        type="text"
                        name="cardNumber"
                        pattern="[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}"
                        placeholder="####-####-####-####"
                        required
                      />
                    </div>
                  </div>
                  <div className="-mx-3 mb-6 flex flex-wrap">
                    <div className="w-full px-3">
                      <label
                        htmlFor="grid-home-address"
                        className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                      >
                        Billing Address<span className="text-red-500">*</span>
                      </label>
                      <Field
                        className="mb-3 block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                        id="grid-shipping-address"
                        type="text"
                        name="billStreet"
                        required
                      />
                    </div>
                  </div>
                  <div className="-mx-3 mb-10 flex flex-wrap">
                    <div className="mb-6 w-full px-3 md:mb-0 md:w-1/3">
                      <label
                        htmlFor="grid-city"
                        className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                      >
                        City<span className="text-red-500">*</span>
                      </label>
                      <Field
                        className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                        id="grid-city"
                        type="text"
                        name="billCity"
                        pattern="[a-zA-Z0-9 ]+"
                        placeholder="Albuquerque"
                        required
                      />
                    </div>
                    <div className="mb-6 w-full px-3 md:mb-0 md:w-1/3">
                      <label
                        htmlFor="grid-state"
                        className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                      >
                        State<span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Field
                          as="select"
                          className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                          id="grid-state"
                          name="billState"
                          required
                        >
                          {states.map((state) => (
                            <option key={state}>{state}</option>
                          ))}
                        </Field>
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
                    <div className="mb-6 w-full px-3 md:mb-0 md:w-1/3">
                      <label
                        htmlFor="grid-zip"
                        className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                      >
                        Zip<span className="text-red-500">*</span>
                      </label>
                      <Field
                        className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                        id="grid-zip"
                        type="text"
                        name="billZip"
                        pattern=".{4,5}[0-9]"
                        placeholder="90210"
                        required
                      />
                    </div>
                  </div>

                  <div className="-mx-3 mb-10 flex flex-wrap">
                    <div className="mb-6 w-full px-3 md:mb-0 md:w-1/3">
                      <label
                        htmlFor="grid-payment-type"
                        className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                      >
                        Payment Type<span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Field
                          as="select"
                          className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                          id="grid-payment-type"
                          required
                        >
                          <option value="Credit">Credit</option>
                          <option value="Debit">Debit</option>
                        </Field>
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
                    <div className="mb-6 w-full px-3 md:mb-0 md:w-1/6">
                      <label
                        htmlFor="grid-year"
                        className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                      >
                        Month<span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Field
                          className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                          id="grid-year"
                          name="billMonth"
                          placeholder="12"
                          pattern="([1-9]|1[012])"
                          required
                        />

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
                    <div className="mb-6 w-full px-3 md:mb-0 md:w-1/6">
                      <label
                        htmlFor="grid-year"
                        className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                      >
                        Year<span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Field
                          className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                          id="grid-year"
                          name="billYear"
                          placeholder="2023"
                          pattern="(\d\d\d\d)"
                          required
                        />
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
                    <div className="mb-6 w-full px-3 md:mb-0 md:w-1/3">
                      <label
                        htmlFor="grid-cvv"
                        className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                      >
                        CVV<span className="text-red-500">*</span>
                      </label>
                      <Field
                        className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                        id="grid-cvv"
                        type="text"
                        name="cvv"
                        pattern="([0-9]{3})"
                        placeholder="###"
                        required
                      />
                    </div>
                  </div>
                </>
              )}
              <div className="mt-6 flex justify-center">
                <button
                  type="submit"
                  className="w-full transform rounded-md bg-dark-red px-8 py-4 text-center tracking-wide text-white transition-colors duration-200 hover:bg-light-coral focus:bg-light-coral focus:outline-none"
                >
                  Sign up
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Signup;
